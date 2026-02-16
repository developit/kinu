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

const attributeDescriptions = new Map([
  ['variant', 'Visual style variant selector.'],
  ['size', 'Controls component sizing.'],
  ['loading', 'Boolean flag to show pending state.'],
  ['open', 'Reflects whether the element is expanded.'],
  ['orientation', 'Switch between horizontal and vertical styling.'],
  ['placement', 'Preferred overlay placement relative to the trigger.'],
  ['side', 'Controls which edge the overlay anchors to.'],
  ['state', 'State flag used by CSS for styling.'],
  ['data-state', 'Data attribute emitted by the component for styling state.'],
  ['data-orientation', 'Orientation emitted for styling purposes.'],
  ['command', 'Command dispatched to native dialog APIs.'],
  ['commandfor', 'Target dialog identifier for command dispatch.'],
]);

function analyzeExports(sourceFile, sourceText) {
  const exports = [];
  const attachments = [];

  sourceFile.forEachChild(function visit(node) {
    if (ts.isVariableStatement(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue;
        const name = decl.name.text;
        const info = {name, kind: 'function', pNames: new Set()};
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
        for (const match of text.matchAll(/<[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
          info.pNames.add(match[1]);
        }
        exports.push(info);
      }
    } else if (ts.isFunctionDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) && node.name) {
      const info = {
        name: node.name.text,
        kind: 'function',
        pNames: new Set(),
      };
      const text = node.getText(sourceFile);
      for (const match of text.matchAll(/<[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
        info.pNames.add(match[1]);
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

async function extractCssAttributes(folder, pNames) {
  const cssPath = path.join(componentsDir, folder, 'style.css');
  try {
    const cssText = await fs.readFile(cssPath, 'utf8');
    const results = new Map();
    const ruleRegex = /([^{}]+)\{/g;
    let match;
    while ((match = ruleRegex.exec(cssText))) {
      const selector = match[1];
      const attrRegex = /\[([^\]=\s]+)(?:="([^"]*)")?\]/g;
      const pTokens = [];
      const attrs = [];
      let attrMatch;
      while ((attrMatch = attrRegex.exec(selector))) {
        const attrName = attrMatch[1];
        const value = attrMatch[2];
        if (attrName === 'p') {
          pTokens.push(attrMatch[2]);
        } else {
          attrs.push({name: attrName, value});
        }
      }
      for (const pToken of pTokens) {
        if (!pNames.has(pToken)) continue;
        let attrMap = results.get(pToken);
        if (!attrMap) {
          attrMap = new Map();
          results.set(pToken, attrMap);
        }
        for (const attr of attrs) {
          let values = attrMap.get(attr.name);
          if (!values) {
            values = new Set();
            attrMap.set(attr.name, values);
          }
          values.add(attr.value ?? '__BOOLEAN__');
        }
      }
    }
    return results;
  } catch (err) {
    if (err.code === 'ENOENT') return new Map();
    throw err;
  }
}

function describeExport(exp) {
  if (exp.kind === 'alias') {
    return `Alias of ${exp.aliasTarget}.`;
  }
  const parts = [];
  if (exp.kind === 'simple') {
    if (exp.tag) parts.push(`Wraps <${exp.tag}> and sets p="${[...exp.pNames].join(', ')}".`);
    else if (exp.dynamicTag) parts.push(`Resolves the underlying element at runtime using ${exp.dynamicTag}.`);
    else parts.push(`Styled wrapper that sets p="${[...exp.pNames].join(', ')}".`);
  } else {
    if (exp.pNames.size > 0) {
      parts.push(`Renders markup that includes p="${[...exp.pNames].join(', ')}".`);
    } else {
      parts.push('Custom component implemented in the source file.');
    }
  }
  if (exp.defaultProps) parts.push(`Defaults props to ${exp.defaultProps}.`);
  if (exp.hasRefCallback) parts.push('Attaches a ref callback for additional behaviour.');
  return parts.join(' ');
}

const attributeDescriptionsFallback = 'Forwarded attribute used by the component styling.';

const typeDocCache = new Map();

function formatDocText(text) {
  return text?.trim() || '—';
}

function formatTagText(tagText) {
  if (!tagText) return '';
  if (typeof tagText === 'string') return tagText.trim();
  return tagText.map((part) => part.text).join('').trim();
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
        type: typeText,
        doc: formatDocText(doc),
        default: defaultValue || '—',
      });
    }

    results.set(componentName, props);
  });

  typeDocCache.set(typesPath, results);
  return results;
}

function formatValues(values) {
  const options = [...values].filter((v) => v !== '__BOOLEAN__');
  const hasBoolean = values.has('__BOOLEAN__');
  if (options.length === 0 && hasBoolean) return 'boolean';
  if (options.length && hasBoolean) return `${options.join(' | ')} (omit for default)`;
  if (options.length) return options.join(' | ');
  return '—';
}

function describeAttribute(attr) {
  return attributeDescriptions.get(attr) ?? attributeDescriptionsFallback;
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

  const allPTokens = new Set();
  for (const exp of exports) for (const token of exp.pNames) allPTokens.add(token);
  const cssAttributes = await extractCssAttributes(folder, allPTokens);

  const exportRows = exports.map((exp) => {
    const dom = exp.kind === 'simple' && exp.tag ? `<${exp.tag}>` : exp.kind === 'alias' && exp.aliasTarget ? `Alias of ${exp.aliasTarget}` : exp.pNames.size ? `p="${[...exp.pNames].join(', ')}"` : '—';
    return `| ${exp.name} | ${dom} | ${describeExport(exp)} |`;
  });

  const attachmentRows = attachments.map((item) => `- \`${item.owner}.${item.property} = ${item.target}\``);

  const attributeRows = [];
  for (const exp of exports) {
    for (const token of exp.pNames) {
      const attrMap = cssAttributes.get(token);
      if (!attrMap) continue;
      for (const [attr, values] of attrMap) {
        attributeRows.push(
          `| ${exp.name} | ${attr} | ${formatValues(values)} | ${describeAttribute(attr)} |`,
        );
      }
    }
  }

  const usageSnippet = entry.usage ?? `<${exports[0]?.name ?? entry.title.replace(/\s+/g, '')} />`;
  const importNames = exports.map((exp) => exp.name).sort();
  const importLine = importNames.length ? `import {${importNames.join(', ')}} from 'pui';` : `import {${entry.title}} from 'pui';`;

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
    lines.push('| Name | DOM element | Details |');
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
          `| ${prop.name} | ${prop.type} | ${prop.default} | ${prop.doc} |`,
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
  if (attributeRows.length) {
    lines.push('## Attributes');
    lines.push('');
    lines.push('| Export | Attribute | Values | Notes |');
    lines.push('| --- | --- | --- | --- |');
    lines.push(...attributeRows);
    lines.push('');
  } else {
    lines.push('## Attributes');
    lines.push('');
    const base = exports.find((exp) => exp.kind === 'simple' && exp.tag);
    if (base) {
      lines.push(`Inherits all native attributes from <${base.tag}>. No additional styling attributes are required.`);
    } else {
      lines.push('Relies on forwarded native attributes; no additional styling attributes are defined.');
    }
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
