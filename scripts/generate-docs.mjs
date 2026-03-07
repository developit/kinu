import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import metadata from '../docs/metadata.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(projectRoot, 'src', 'components');
const docsComponentsDir = path.join(projectRoot, 'docs', 'components');

const sectionWeights = new Map([
  ['Foundations', 0],
  ['Components', 1],
]);

function sectionRank(section) {
  if (!section) return sectionWeights.size + 1;
  return sectionWeights.get(section) ?? sectionWeights.size + 1;
}



function analyzeExports(sourceFile, sourceText) {
  const exports = [];
  const attachments = [];

  sourceFile.forEachChild(function visit(node) {
    if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        const name = decl.name.text;
        const info = {name, kind: 'function', pNames: new Set(), elementMap: new Map()};
        if (decl.initializer) {
          if (
            ts.isCallExpression(decl.initializer) &&
            ts.isIdentifier(decl.initializer.expression) &&
            decl.initializer.expression.text === 'createSimpleComponent'
          ) {
            info.kind = 'simple';
            const args = decl.initializer.arguments;
            if (args[0] && ts.isStringLiteral(args[0])) info.pNames.add(args[0].text);
            if (args[1]) {
              if (ts.isStringLiteral(args[1])) info.tag = args[1].text;
              else info.dynamicTag = args[1].getText(sourceFile);
            }
            if (args[2]) info.defaultProps = args[2].getText(sourceFile);
            if (args[3]) info.hasRefCallback = true;
          } else if (ts.isIdentifier(decl.initializer)) {
            info.kind = 'alias';
            info.aliasTarget = decl.initializer.text;
          } else {
            info.kind = 'function';
          }
        }
        const text = decl.initializer ? decl.initializer.getText(sourceFile) : '';
        // Extract element name along with k attribute
        for (const match of text.matchAll(/<(\w+)[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
          const element = match[1];
          const pName = match[2];
          info.pNames.add(pName);
          info.elementMap.set(pName, element);
        }
        exports.push(info);
      }
    } else if (ts.isFunctionDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) && node.name) {
      const info = {
        name: node.name.text,
        kind: 'function',
        pNames: new Set(),
        elementMap: new Map(),
      };
      const text = node.getText(sourceFile);
      // Extract element name along with k attribute
      for (const match of text.matchAll(/<(\w+)[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
        const element = match[1];
        const pName = match[2];
        info.pNames.add(pName);
        info.elementMap.set(pName, element);
      }
      exports.push(info);
    } else if (ts.isExpressionStatement(node)) {
      const expr = node.expression;
      if (
        ts.isBinaryExpression(expr) &&
        expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(expr.left)
      ) {
        const owner = expr.left.expression.getText(sourceFile);
        const property = expr.left.name.getText(sourceFile);
        const target = expr.right.getText(sourceFile);
        attachments.push({owner, property, target});
      }
    }
  });

  return {exports, attachments};
}

function describeExport(exp) {
  if (exp.kind === 'alias') {
    return `Alias of ${exp.aliasTarget}.`;
  }
  const parts = [];
  if (exp.kind === 'simple') {
    if (exp.tag) parts.push(`Wraps \`<${exp.tag}>\` and sets \`k="${[...exp.pNames].join(', ')}"\`.`);
    else if (exp.dynamicTag) parts.push(`Resolves the underlying element at runtime using \`${exp.dynamicTag}\`.`);
    else parts.push(`Styled wrapper that sets \`k="${[...exp.pNames].join(', ')}"\`.`);
  } else {
    if (exp.pNames.size > 0) {
      parts.push(`Renders markup that includes \`k="${[...exp.pNames].join(', ')}"\`.`);
    } else {
      parts.push('Custom component implemented in the source file.');
    }
  }
  if (exp.defaultProps) parts.push(`Defaults props to \`${exp.defaultProps}\`.`);
  if (exp.hasRefCallback) parts.push('Attaches a ref callback for additional behaviour.');
  return parts.join(' ');
}

const typeDocCache = new Map();

function formatDocText(text) {
  return text?.trim() || '—';
}

function formatTagText(tagText) {
  if (!tagText) return '';
  if (typeof tagText === 'string') return tagText.trim();
  return tagText.map((part) => part.text).join('').trim();
}

const intrinsicTypePattern = /JSX\.IntrinsicElements\['([^']+)'\]\['([^']+)'\]/;
const elementAliasTypePattern = /(\w+ElementProps)\['([^']+)'\]/;

function normalizeIntrinsicType(tagName, propName) {
  if (propName === 'value') return 'string | number | readonly string[] | undefined';
  if (propName === 'type' || propName === 'target' || propName === 'rel') return 'string | undefined';
  if (propName === 'onInput') return '(event: InputEvent) => void';
  if (propName === 'onChange') return '(event: Event) => void';
  if (propName === 'onBlur') return '(event: FocusEvent) => void';
  if (propName === 'onFocus') return '(event: FocusEvent) => void';
  if (propName === 'onClick') return '(event: MouseEvent) => void';
  return `${tagName}.${propName}`;
}

function normalizeDisplayedType(typeText, member, sourceFile) {
  const rawTypeText = member.type?.getText(sourceFile) ?? '';
  const hasNull = /\|\s*null/.test(rawTypeText);
  const withNull = (normalized) => (hasNull ? `${normalized} | null` : normalized);

  const rawMatch = rawTypeText.match(intrinsicTypePattern);
  if (rawMatch) {
    const [, tagName, propName] = rawMatch;
    return withNull(normalizeIntrinsicType(tagName, propName));
  }

  const rawAliasMatch = rawTypeText.match(elementAliasTypePattern);
  if (rawAliasMatch) {
    const [, aliasName, propName] = rawAliasMatch;
    return withNull(normalizeIntrinsicType(aliasName, propName));
  }

  const typeMatch = typeText.match(intrinsicTypePattern);
  if (typeMatch) {
    const [, tagName, propName] = typeMatch;
    return withNull(normalizeIntrinsicType(tagName, propName));
  }

  if (typeText === 'any') {
    const propTokenMatch = rawTypeText.match(/\['([^']+)'\]/);
    if (propTokenMatch) return withNull(normalizeIntrinsicType('element', propTokenMatch[1]));
  }

  return typeText;
}

function extractPropsFromTypes(typesPath) {
  if (typeDocCache.has(typesPath)) return typeDocCache.get(typesPath);

  const options = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: 'preact',
  };
  const program = ts.createProgram([typesPath], options);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(typesPath);
  const results = new Map();

  if (!sourceFile) {
    typeDocCache.set(typesPath, results);
    return results;
  }

  sourceFile.forEachChild((node) => {
    if (!ts.isInterfaceDeclaration(node) || !node.name) return;
    const name = node.name.text;
    if (!name.endsWith('OwnProps')) return;
    const componentName = name.replace(/OwnProps$/, '');
    const props = [];

    for (const member of node.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      let propName = '';
      if (ts.isIdentifier(member.name)) propName = member.name.text;
      else if (ts.isStringLiteral(member.name)) propName = member.name.text;
      else propName = member.name.getText(sourceFile);

      const symbol = checker.getSymbolAtLocation(member.name);
      const doc = symbol
        ? ts.displayPartsToString(symbol.getDocumentationComment(checker))
        : '';
      const defaultTag = symbol
        ? symbol.getJsDocTags().find((tag) => tag.name === 'default')
        : undefined;
      const defaultValue = defaultTag ? formatTagText(defaultTag.text) : '';
      const type = checker.getTypeAtLocation(member);
      const typeText = checker.typeToString(
        type,
        member,
        ts.TypeFormatFlags.NoTruncation |
          ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
      );

      props.push({
        name: propName,
        type: normalizeDisplayedType(typeText, member, sourceFile),
        doc: formatDocText(doc),
        default: defaultValue || '—',
      });
    }

    results.set(componentName, props);
  });

  typeDocCache.set(typesPath, results);
  return results;
}

function getComponentDescription(componentName, entry) {
  // Simple component-name-to-description mapping
  const descriptions = {
    Badge: 'Inline status indicator',
    Button: 'Interactive action control',
    Card: 'Surface container',
    Input: 'Text input field',
    Checkbox: 'Selection control',
    Select: 'Dropdown selection',
    Switch: 'Toggle control',
    Slider: 'Range input',
    Textarea: 'Multi-line text input',
    Label: 'Form field label',
    Dialog: 'Modal overlay',
    Alert: 'Status message',
    Avatar: 'User profile image',
    Tooltip: 'Hover hint',
    Progress: 'Loading indicator',
    Spinner: 'Loading animation',
    Skeleton: 'Content placeholder',
    Accordion: 'Collapsible section',
    Tabs: 'Tabbed navigation',
    Tab: 'Tab trigger',
    TabList: 'Tab container',
    TabPanel: 'Tab content',
    Table: 'Data table',
    Popover: 'Floating content',
    Drawer: 'Slide-out panel',
    Sheet: 'Overlay panel',
    Sidebar: 'Side navigation',
    Breadcrumb: 'Navigation trail',
    BreadcrumbList: 'Trail container',
    BreadcrumbItem: 'Trail item',
    BreadcrumbLink: 'Trail link',
    NavigationMenu: 'Menu container',
    NavigationMenuList: 'Menu list',
    NavigationMenuItem: 'Menu item',
    NavigationMenuLink: 'Menu link',
    Pagination: 'Page navigation',
    PaginationList: 'Page list',
    PaginationItem: 'Page item',
    PaginationLink: 'Page link',
    Menubar: 'Horizontal menu',
    MenubarItem: 'Menu item',
    Carousel: 'Image slider',
    CarouselContent: 'Slider content',
    CarouselItem: 'Slide item',
    CarouselPrevious: 'Previous button',
    CarouselNext: 'Next button',
    Combobox: 'Autocomplete input',
    ComboboxInput: 'Search input',
    ComboboxList: 'Results list',
    ComboboxOption: 'Result option',
    ContextMenu: 'Right-click menu',
    ContextMenuTrigger: 'Menu trigger',
    ContextMenuContent: 'Menu content',
    ContextMenuItem: 'Menu item',
    DropdownMenu: 'Dropdown menu',
    DropdownMenuTrigger: 'Menu trigger',
    DropdownMenuContent: 'Menu content',
    DropdownMenuItem: 'Menu item',
    HoverCard: 'Hover preview',
    HoverCardTrigger: 'Hover target',
    HoverCardContent: 'Preview content',
    Calendar: 'Date picker',
    DatePicker: 'Date input',
    RadioGroup: 'Radio group',
    Radio: 'Radio input',
    ToggleGroup: 'Toggle group',
    Toggle: 'Toggle button',
    Separator: 'Divider',
    AspectRatio: 'Ratio container',
    ScrollArea: 'Scrollable area',
    Resizable: 'Resizable panel',
    Collapsible: 'Collapsible content',
    AlertDialog: 'Alert modal',
    Tree: 'Tree view',
    TreeRoot: 'Tree container',
    TreeGroup: 'Tree branch',
    TreeGroupLabel: 'Branch label',
    TreeGroupItems: 'Branch items',
    TreeItem: 'Tree leaf',
    InputGroup: 'Input group',
    PopoverTrigger: 'Popover trigger',
    PopoverContent: 'Popover content',
    DialogTrigger: 'Dialog trigger',
    DialogContent: 'Dialog content',
    DialogClose: 'Close button',
    SheetTrigger: 'Sheet trigger',
    SheetContent: 'Sheet content',
    SheetClose: 'Close button',
    DrawerTrigger: 'Drawer trigger',
    DrawerContent: 'Drawer content',
    DrawerClose: 'Close button',
    SidebarTrigger: 'Sidebar toggle',
  };

  return descriptions[componentName] || 'Component';
}


async function generateComponentDoc(entry) {
  const folder = entry.folder ?? entry.slug;
  const indexPath = path.join(componentsDir, folder, 'index.tsx');
  const typesPath = path.join(componentsDir, folder, 'types.ts');
  const sourceText = await fs.readFile(indexPath, 'utf8');
  const sourceFile = ts.createSourceFile(indexPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const {exports, attachments} = analyzeExports(sourceFile, sourceText);

  let propDocs = new Map();
  try {
    await fs.access(typesPath);
    propDocs = extractPropsFromTypes(typesPath);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  const exportRows = exports.map((exp) => {
    // Rendered HTML column
    let renderedHtml = '—';
    if (exp.kind === 'simple' && exp.tag && exp.pNames.size) {
      renderedHtml = '`<' + exp.tag + ' k="' + [...exp.pNames].join(' ') + '">`';
    } else if (exp.kind === 'alias' && exp.aliasTarget) {
      renderedHtml = `Alias of ${exp.aliasTarget}`;
    } else if (exp.pNames.size) {
      // Use elementMap to get the actual element name
      const pName = [...exp.pNames][0];
      const element = exp.elementMap?.get(pName);
      if (element) {
        renderedHtml = '`<' + element + ' k="' + [...exp.pNames].join(' ') + '">`';
      } else {
        renderedHtml = '`k="' + [...exp.pNames].join(' ') + '"`';
      }
    }

    // Description - use a shortened version from entry description or component name
    const description = getComponentDescription(exp.name, entry);

    return `| ${exp.name} | ${description} | ${renderedHtml} |`;
  });

  const attachmentRows = attachments.map((item) => `- \`${item.owner}.${item.property} = ${item.target}\``);

  const usageSnippet = entry.usage ?? `<${exports[0]?.name ?? entry.title.replace(/\s+/g, '')} />`;
  const importNames = exports.map((exp) => exp.name).sort();
  const importLine = importNames.length ? `import {${importNames.join(', ')}} from 'kinu';` : `import {${entry.title}} from 'kinu';`;

  const lines = [];
  lines.push(`# ${entry.title}`);
  lines.push('');
  if (entry.description) {
    lines.push(entry.description);
    lines.push('');
  }
  lines.push('## Usage');
  lines.push('');
  lines.push('```tsx');
  lines.push(importLine);
  lines.push('');
  lines.push(usageSnippet);
  lines.push('```');
  lines.push('');
  if (exportRows.length) {
    lines.push('## Exports');
    lines.push('');
    lines.push('| Name | Description | Rendered HTML |');
    lines.push('| --- | --- | --- |');
    lines.push(...exportRows);
    lines.push('');
  }
  const propSections = exports
    .map((exp) => ({
      name: exp.name,
      props: propDocs.get(exp.name) || [],
    }))
    .filter((section) => section.props.length > 0);

  if (propSections.length) {
    lines.push('## Props');
    lines.push('');
    const includeHeading = propSections.length > 1;
    for (const section of propSections) {
      if (includeHeading) {
        lines.push(`### ${section.name}Props`);
        lines.push('');
      }
      lines.push('| Prop | Type | Default | Description |');
      lines.push('| --- | --- | --- | --- |');
      for (const prop of section.props) {
      lines.push(
        `| ${prop.name} | \`${prop.type}\` | ${prop.default} | ${prop.doc} |`,
      );
      }
      lines.push('');
    }
  }
  if (attachmentRows.length) {
    lines.push('### Static Shortcuts');
    lines.push('');
    lines.push(...attachmentRows);
    lines.push('');
  }
  if (entry.notes?.length) {
    lines.push('## Notes');
    lines.push('');
    for (const note of entry.notes) lines.push(`- ${note}`);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push(`_Source: \`src/components/${folder}/index.tsx\``);
  lines.push('');

  await fs.writeFile(path.join(docsComponentsDir, `${entry.slug}.md`), lines.join('\n'));
}

async function build() {
  await fs.mkdir(docsComponentsDir, {recursive: true});
  const manifest = [];

  for (const entry of metadata) {
    if (entry.folder) {
      await generateComponentDoc(entry);
      manifest.push({
        slug: entry.slug,
        title: entry.title,
        section: entry.section,
        category: entry.category,
        order: entry.order ?? 0,
        file: `components/${entry.slug}.md`,
        description: entry.description ?? '',
      });
    } else {
      manifest.push({
        slug: entry.slug,
        title: entry.title,
        section: entry.section,
        category: entry.category,
        order: entry.order ?? 0,
        file: entry.file,
        description: entry.description ?? '',
      });
    }
  }

  manifest.sort((a, b) =>
    sectionRank(a.section) - sectionRank(b.section) ||
    (a.order ?? 0) - (b.order ?? 0) ||
    (a.section || '').localeCompare(b.section || '') ||
    (a.category || '').localeCompare(b.category || '') ||
    a.title.localeCompare(b.title),
  );

  await fs.writeFile(
    path.join(projectRoot, 'docs', 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  );
}

build().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
