/**
 * generate-llms-txt.mjs
 *
 * Generates llms.txt and llms-full.txt for LLM coding agents.
 * Hooks into the same metadata and TypeScript analysis pipeline as generate-docs.mjs.
 *
 * Output:
 *   demo/public/llms.txt       – concise quick-reference (component index + usage)
 *   demo/public/llms-full.txt  – exhaustive reference (every prop, type, token, pattern)
 *
 * Run:  node scripts/generate-llms-txt.mjs
 */

import {promises as fs} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import metadata from '../docs/metadata.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(projectRoot, 'src', 'components');
const outDir = path.join(projectRoot, 'demo', 'public');

// ── TypeScript analysis helpers (shared logic with generate-docs.mjs) ───────

function analyzeExports(sourceFile) {
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
          } else if (ts.isIdentifier(decl.initializer)) {
            info.kind = 'alias';
            info.aliasTarget = decl.initializer.text;
          }
        }
        const text = decl.initializer ? decl.initializer.getText(sourceFile) : '';
        for (const match of text.matchAll(/<(\w+)[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
          info.pNames.add(match[2]);
          info.elementMap.set(match[2], match[1]);
        }
        exports.push(info);
      }
    } else if (ts.isFunctionDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) && node.name) {
      const info = {name: node.name.text, kind: 'function', pNames: new Set(), elementMap: new Map()};
      const text = node.getText(sourceFile);
      for (const match of text.matchAll(/<(\w+)[^>]*\bp\s*=\s*["']([^"']+)["']/g)) {
        info.pNames.add(match[2]);
        info.elementMap.set(match[2], match[1]);
      }
      exports.push(info);
    } else if (ts.isExpressionStatement(node)) {
      const expr = node.expression;
      if (
        ts.isBinaryExpression(expr) &&
        expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isPropertyAccessExpression(expr.left)
      ) {
        attachments.push({
          owner: expr.left.expression.getText(sourceFile),
          property: expr.left.name.getText(sourceFile),
          target: expr.right.getText(sourceFile),
        });
      }
    }
  });

  return {exports, attachments};
}

const typeDocCache = new Map();

function formatTagText(tagText) {
  if (!tagText) return '';
  if (typeof tagText === 'string') return tagText.trim();
  return tagText.map((part) => part.text).join('').trim();
}

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

const intrinsicTypePattern = /JSX\.IntrinsicElements\['([^']+)'\]\['([^']+)'\]/;
const elementAliasTypePattern = /(\w+ElementProps)\['([^']+)'\]/;

function normalizeDisplayedType(typeText, member, sourceFile) {
  const rawTypeText = member.type?.getText(sourceFile) ?? '';
  const hasNull = /\|\s*null/.test(rawTypeText);
  const withNull = (n) => (hasNull ? `${n} | null` : n);

  const rawMatch = rawTypeText.match(intrinsicTypePattern);
  if (rawMatch) return withNull(normalizeIntrinsicType(rawMatch[1], rawMatch[2]));

  const rawAliasMatch = rawTypeText.match(elementAliasTypePattern);
  if (rawAliasMatch) return withNull(normalizeIntrinsicType(rawAliasMatch[1], rawAliasMatch[2]));

  const typeMatch = typeText.match(intrinsicTypePattern);
  if (typeMatch) return withNull(normalizeIntrinsicType(typeMatch[1], typeMatch[2]));

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
      const doc = symbol ? ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim() : '';
      const defaultTag = symbol ? symbol.getJsDocTags().find((t) => t.name === 'default') : undefined;
      const defaultValue = defaultTag ? formatTagText(defaultTag.text) : '';
      const type = checker.getTypeAtLocation(member);
      const typeText = checker.typeToString(
        type,
        member,
        ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
      );

      props.push({
        name: propName,
        type: normalizeDisplayedType(typeText, member, sourceFile),
        doc: doc || '—',
        default: defaultValue || '—',
      });
    }

    results.set(componentName, props);
  });

  typeDocCache.set(typesPath, results);
  return results;
}

// ── Gather component data ───────────────────────────────────────────────────

async function gatherComponentData(entry) {
  const folder = entry.folder ?? entry.slug;
  const indexPath = path.join(componentsDir, folder, 'index.tsx');
  const typesPath = path.join(componentsDir, folder, 'types.ts');

  let sourceText;
  try {
    sourceText = await fs.readFile(indexPath, 'utf8');
  } catch {
    return null;
  }

  const sourceFile = ts.createSourceFile(indexPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const {exports, attachments} = analyzeExports(sourceFile);

  let propDocs = new Map();
  try {
    await fs.access(typesPath);
    propDocs = extractPropsFromTypes(typesPath);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  return {entry, exports, attachments, propDocs};
}

function resolveRenderedElement(exp) {
  if (exp.kind === 'simple' && exp.tag) return `<${exp.tag}>`;
  if (exp.kind === 'alias') return `(alias of ${exp.aliasTarget})`;
  if (exp.pNames.size) {
    const pName = [...exp.pNames][0];
    const el = exp.elementMap?.get(pName);
    if (el) return `<${el}>`;
  }
  return '(composite)';
}

// ── CSS token reading ───────────────────────────────────────────────────────

async function readDesignTokens() {
  const css = await fs.readFile(path.join(projectRoot, 'src', 'variables.css'), 'utf8');
  const tokens = [];
  // Only capture tokens from :root (light mode)
  const rootBlock = css.match(/:root\s*\{([^}]+)\}/);
  if (rootBlock) {
    for (const match of rootBlock[1].matchAll(/--(k-[\w-]+)\s*:\s*([^;]+)/g)) {
      tokens.push({name: `--${match[1]}`, value: match[2].trim()});
    }
  }
  return tokens;
}

// ── Foundation page reading ─────────────────────────────────────────────────

async function readFoundationPage(filePath) {
  try {
    return await fs.readFile(path.join(projectRoot, 'docs', filePath), 'utf8');
  } catch {
    return null;
  }
}

// ── Build llms.txt (concise quick-reference) ────────────────────────────────

function buildQuickReference(components, foundationPages) {
  const lines = [];

  lines.push('# Kinu – LLM Quick Reference');
  lines.push('');
  lines.push('> Kinu is a performance-focused Preact UI component library (~1.2 KB JS, ~6 KB CSS).');
  lines.push('> It enhances native HTML elements with a `k` attribute for CSS styling and minimal JS behavior.');
  lines.push('> Peer dependency: preact@^10.26.8');
  lines.push('');
  lines.push('## Setup');
  lines.push('');
  lines.push('```bash');
  lines.push('pnpm add kinu   # or: npm install kinu');
  lines.push('```');
  lines.push('');
  lines.push('```ts');
  lines.push("import 'kinu/style.css';           // Load once at app root");
  lines.push("import { Button, Card } from 'kinu'; // Tree-shake individual components");
  lines.push('```');
  lines.push('');
  lines.push('## How It Works');
  lines.push('');
  lines.push('- Components render native HTML with a `k="component-name"` attribute for CSS targeting.');
  lines.push('- Props map directly to HTML attributes — no runtime prop filtering.');
  lines.push('- Overlays use the native `<dialog>` element with a command/commandFor polyfill.');
  lines.push('- All types are exported: `import type { ButtonProps } from \'kinu\';`');
  lines.push('');
  lines.push('## Shared Props (BaseProps)');
  lines.push('');
  lines.push('Every component extends BaseProps:');
  lines.push('');
  lines.push('| Prop | Type | Description |');
  lines.push('| --- | --- | --- |');
  lines.push('| command | `"show-modal" \\| "close" \\| "show-popover" \\| "hide-popover" \\| "toggle-popover" \\| \\`--\\${string}\\`` | Command to invoke on target |');
  lines.push('| commandFor | `string` | ID of target element for the command |');
  lines.push('| children | `ComponentChildren` | Component contents |');
  lines.push('');

  // ── Component index table ──
  lines.push('## Component Index');
  lines.push('');
  lines.push('| Component | Category | Renders As | Description |');
  lines.push('| --- | --- | --- | --- |');

  for (const comp of components) {
    const {entry, exports} = comp;
    const mainExport = exports[0];
    const element = mainExport ? resolveRenderedElement(mainExport) : '—';
    const allExports = exports.map((e) => e.name).join(', ');
    lines.push(`| ${allExports} | ${entry.category} | ${element} | ${entry.description || entry.title} |`);
  }
  lines.push('');

  // ── Per-component usage ──
  lines.push('## Component Usage');
  lines.push('');

  for (const comp of components) {
    const {entry, exports, attachments, propDocs} = comp;
    const importNames = exports.map((e) => e.name).sort();
    const importLine = `import {${importNames.join(', ')}} from 'kinu';`;

    lines.push(`### ${entry.title}`);
    lines.push('');
    if (entry.description) lines.push(entry.description);
    lines.push('');

    // Exports with elements
    for (const exp of exports) {
      const el = resolveRenderedElement(exp);
      if (el !== '(composite)') {
        lines.push(`- **${exp.name}** → ${el}`);
      } else {
        lines.push(`- **${exp.name}**`);
      }
    }
    lines.push('');

    // Static shortcuts
    if (attachments.length) {
      for (const a of attachments) {
        lines.push(`- \`${a.owner}.${a.property}\` = \`${a.target}\``);
      }
      lines.push('');
    }

    lines.push('```tsx');
    lines.push(importLine);
    lines.push('');
    lines.push(entry.usage ?? `<${exports[0]?.name ?? entry.title} />`);
    lines.push('```');
    lines.push('');

    // Compact props (only custom OwnProps)
    const allProps = exports.flatMap((exp) => {
      const p = propDocs.get(exp.name) || [];
      return p.map((prop) => ({...prop, component: exp.name}));
    });

    if (allProps.length) {
      lines.push('| Prop | Type | Default | Description |');
      lines.push('| --- | --- | --- | --- |');
      for (const p of allProps) {
        const prefix = exports.length > 1 ? `${p.component}.` : '';
        lines.push(`| ${prefix}${p.name} | \`${p.type}\` | ${p.default} | ${p.doc} |`);
      }
      lines.push('');
    }

    if (entry.notes?.length) {
      for (const note of entry.notes) lines.push(`- ${note}`);
      lines.push('');
    }
  }

  // Toast (API-based, not a folder-based component)
  lines.push('### Toast');
  lines.push('');
  lines.push('Event-driven notification system. Render `<ToastContainer />` once near the app root.');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { toast, ToastContainer } from 'kinu';");
  lines.push('');
  lines.push("<ToastContainer />");
  lines.push("toast.show('Saved!');");
  lines.push("toast.show('Uploaded', { title: 'Success', icon: '✅', action: <button>Undo</button>, duration: 4000 });");
  lines.push('```');
  lines.push('');
  lines.push('| Option | Type | Default | Description |');
  lines.push('| --- | --- | --- | --- |');
  lines.push('| title | `ComponentChild` | — | Title above the toast body |');
  lines.push('| icon | `ComponentChild` | — | Icon element |');
  lines.push('| action | `ComponentChild` | — | Action element (e.g. undo button) |');
  lines.push('| duration | `number` | 3000 | Auto-dismiss delay in ms |');
  lines.push('');

  // ── Theming ──
  lines.push('## Theming');
  lines.push('');
  lines.push('Override `--k-*` CSS custom properties. Values are space-separated HSL triplets.');
  lines.push('');
  lines.push('```css');
  lines.push(':root { --k-primary: 221 83% 53%; --k-radius: 0.625rem; }');
  lines.push('[data-theme="dark"] { --k-background: 224 71% 4%; }');
  lines.push('```');
  lines.push('');
  lines.push('Toggle dark mode: `document.documentElement.dataset.theme = "dark";`');
  lines.push('');

  // ── Commands ──
  lines.push('## Commands');
  lines.push('');
  lines.push('Declarative dialog control via `command`/`commandFor` attributes (polyfilled):');
  lines.push('');
  lines.push('```tsx');
  lines.push('<Button command="show-modal" commandFor="my-dialog">Open</Button>');
  lines.push('<dialog id="my-dialog">...</dialog>');
  lines.push('```');
  lines.push('');
  lines.push('Built-in commands: `show-modal`, `show`, `close`, `show-popover`, `hide-popover`, `toggle-popover`.');
  lines.push('Custom commands start with `--` (e.g. `--prev`, `--next` for Carousel).');
  lines.push('');

  // ── CSS selectors ──
  lines.push('## CSS Selectors');
  lines.push('');
  lines.push('```css');
  lines.push('[k="button"] { }                          /* Base button */');
  lines.push('[k="button"][variant="secondary"] { }     /* Variant */');
  lines.push('[k="button"][size="sm"] { }               /* Size */');
  lines.push('[k="button"][loading] { }                 /* Boolean state */');
  lines.push('[k="button"][disabled] { }                /* Disabled */');
  lines.push('```');
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('For the full API with every prop, type alias, design token, and pattern, see llms-full.txt.');
  lines.push('');

  return lines.join('\n');
}

// ── Build llms-full.txt (exhaustive reference) ──────────────────────────────

function buildFullReference(components, foundationPages, tokens) {
  const lines = [];

  lines.push('# Kinu – Comprehensive LLM Reference');
  lines.push('');
  lines.push('> This is the exhaustive reference for Kinu, a performance-focused Preact UI component library.');
  lines.push('> For a concise quick-reference, see llms.txt.');
  lines.push('');

  // ── Table of Contents ──
  lines.push('## Table of Contents');
  lines.push('');
  lines.push('1. [Architecture & Philosophy](#architecture--philosophy)');
  lines.push('2. [Installation & Setup](#installation--setup)');
  lines.push('3. [Component Factory Pattern](#component-factory-pattern)');
  lines.push('4. [Shared Types (BaseProps)](#shared-types-baseprops)');
  lines.push('5. [Design Tokens](#design-tokens)');
  lines.push('6. [Theming & Dark Mode](#theming--dark-mode)');
  lines.push('7. [Command Attributes](#command-attributes)');
  lines.push('8. [Typography](#typography)');
  lines.push('9. [Base Styles](#base-styles)');
  lines.push('10. [Component Reference](#component-reference)');
  lines.push('11. [Toast System](#toast-system)');
  lines.push('12. [CSS Selector Patterns](#css-selector-patterns)');
  lines.push('13. [Complete Import Map](#complete-import-map)');
  lines.push('14. [Accessibility Patterns](#accessibility-patterns)');
  lines.push('15. [Integration Examples](#integration-examples)');
  lines.push('');

  // ── 1. Architecture ──
  lines.push('## Architecture & Philosophy');
  lines.push('');
  lines.push('Kinu is a constraint-driven collection of Preact components that enhance native HTML instead of');
  lines.push('replacing it. Every component forwards props to the underlying HTML element, keeping semantics,');
  lines.push('accessibility, and native performance. CSS drives state, variants, and animation; JavaScript only');
  lines.push('wires up what the platform cannot express on its own.');
  lines.push('');
  lines.push('### Core Principles');
  lines.push('');
  lines.push('- **Platform first** — Components wrap native elements (`<button>`, `<dialog>`, `<details>`, `<input>`)');
  lines.push('- **CSS as logic** — Props map to attributes; selectors read them. No runtime prop filtering.');
  lines.push('- **Tiny runtime** — ~1.2 KB JS + ~6 KB CSS. No router, store, or theme engine.');
  lines.push('- **Composable primitives** — Complex widgets stitch together smaller building blocks.');
  lines.push('- **Tree-shakeable** — Import only what you need from the `kinu` package.');
  lines.push('');
  lines.push('### How Components Render');
  lines.push('');
  lines.push('`<Button variant="secondary" />` outputs `<button k="button" variant="secondary" />`.');
  lines.push('The `k` attribute is the CSS hook. All other props pass through to the native element.');
  lines.push('TypeScript knows the exact HTML attributes available for each component.');
  lines.push('');

  // ── 2. Installation ──
  lines.push('## Installation & Setup');
  lines.push('');
  lines.push('```bash');
  lines.push('pnpm add kinu    # or: npm install kinu');
  lines.push('```');
  lines.push('');
  lines.push('Peer dependency: `preact@^10.26.8`');
  lines.push('');
  lines.push('```ts');
  lines.push("// 1. Import stylesheet once at app entry:");
  lines.push("import 'kinu/style.css';");
  lines.push('');
  lines.push("// 2. Import components as needed:");
  lines.push("import { Button, Card, Input, Dialog } from 'kinu';");
  lines.push('');
  lines.push("// 3. Types are also exported:");
  lines.push("import type { ButtonProps, ButtonVariant } from 'kinu';");
  lines.push('```');
  lines.push('');
  lines.push('Package exports:');
  lines.push('- `kinu` → `dist/index.js` (ES module) + `dist/index.d.ts` (types)');
  lines.push('- `kinu/style.css` → `dist/index.css` (all component styles)');
  lines.push('');

  // ── 3. Factory Pattern ──
  lines.push('## Component Factory Pattern');
  lines.push('');
  lines.push('Most components are created via `createSimpleComponent(name, tag, defaultProps?, refCallback?)`:');
  lines.push('');
  lines.push('```ts');
  lines.push("// This sets k=\"card\" on a <div> and merges defaultProps");
  lines.push("const Card = createSimpleComponent('card', 'div');");
  lines.push("const Input = createSimpleComponent('input', 'input', { type: 'text' });");
  lines.push('```');
  lines.push('');
  lines.push('The factory:');
  lines.push('1. Sets `k={name}` on the rendered element for CSS targeting');
  lines.push('2. Resolves the HTML tag (static string or dynamic function)');
  lines.push('3. Merges default props via prototype chain (zero allocation)');
  lines.push('4. Forwards refs with optional cleanup callbacks');
  lines.push('5. Sets `displayName` for devtools');
  lines.push('');

  // ── 4. Shared Types ──
  lines.push('## Shared Types (BaseProps)');
  lines.push('');
  lines.push('```typescript');
  lines.push('interface BaseProps {');
  lines.push("  command?: 'show-modal' | 'close' | 'show-popover' | 'hide-popover' | 'toggle-popover' | `--${string}` | null;");
  lines.push('  commandFor?: string | null;');
  lines.push('  children?: ComponentChildren;');
  lines.push('}');
  lines.push('');
  lines.push('interface RequiredChildrenProps extends BaseProps {');
  lines.push('  children: ComponentChildren;');
  lines.push('}');
  lines.push('```');
  lines.push('');
  lines.push('Component prop types follow the pattern:');
  lines.push('- `FooOwnProps` — custom kinu props (variant, size, etc.)');
  lines.push('- `FooProps` = `FooOwnProps & Omit<JSX.IntrinsicElements[tag], keyof FooOwnProps>`');
  lines.push('- This means every native HTML attribute for the base element is supported.');
  lines.push('');

  // ── 5. Design Tokens ──
  lines.push('## Design Tokens');
  lines.push('');
  lines.push('All tokens use the `--k-` prefix. Color values are space-separated HSL triplets');
  lines.push('used as `hsl(var(--k-primary))`.');
  lines.push('');
  lines.push('### Light Theme Defaults');
  lines.push('');
  lines.push('| Token | Default Value | Purpose |');
  lines.push('| --- | --- | --- |');

  const tokenDescriptions = {
    '--k-background': 'Page background',
    '--k-foreground': 'Default text color',
    '--k-card': 'Card surface',
    '--k-card-foreground': 'Card text',
    '--k-popover': 'Popover/dialog surface',
    '--k-popover-foreground': 'Popover text',
    '--k-sidebar': 'Sidebar surface',
    '--k-primary': 'Primary action color',
    '--k-primary-foreground': 'Text on primary',
    '--k-primary-hover': 'Primary hover state',
    '--k-secondary': 'Secondary action color',
    '--k-secondary-foreground': 'Text on secondary',
    '--k-secondary-hover': 'Secondary hover state',
    '--k-muted': 'Muted backgrounds',
    '--k-muted-foreground': 'Muted text',
    '--k-accent': 'Accent highlights',
    '--k-accent-foreground': 'Text on accent',
    '--k-destructive': 'Destructive action color',
    '--k-destructive-foreground': 'Text on destructive',
    '--k-destructive-hover': 'Destructive hover state',
    '--k-border': 'Default border color',
    '--k-input': 'Input border color',
    '--k-ring': 'Focus ring color',
    '--k-radius': 'Default border radius',
    '--k-ease-fallback': 'Fallback easing curve',
    '--k-ease-out': 'Standard ease-out curve',
    '--k-ease-elastic': 'Elastic animation curve',
    '--k-ease-spring': 'Spring animation curve',
    '--k-ease': 'Main animation easing (alias)',
  };

  for (const token of tokens) {
    const desc = tokenDescriptions[token.name] || '';
    const val = token.value.length > 50 ? token.value.substring(0, 47) + '...' : token.value;
    lines.push(`| \`${token.name}\` | \`${val}\` | ${desc} |`);
  }
  lines.push('');

  lines.push('### Dark Mode Tokens');
  lines.push('');
  lines.push('Applied via `@media (prefers-color-scheme: dark)` or `.dark` class:');
  lines.push('');
  lines.push('```css');
  lines.push('[data-theme="dark"], .dark {');
  lines.push('  --k-background: 222.2 50% 7%;');
  lines.push('  --k-foreground: 210 40% 98%;');
  lines.push('  --k-primary: 210 40% 98%;');
  lines.push('  --k-primary-foreground: 222.2 47.4% 11.2%;');
  lines.push('  /* ... all tokens have dark variants */');
  lines.push('}');
  lines.push('```');
  lines.push('');

  // ── 6. Theming ──
  lines.push('## Theming & Dark Mode');
  lines.push('');
  lines.push('Override tokens at root or within a scope:');
  lines.push('');
  lines.push('```css');
  lines.push(':root {');
  lines.push('  --k-radius: 0.625rem;');
  lines.push('  --k-primary: 221 83% 53%;');
  lines.push('}');
  lines.push('');
  lines.push('[data-theme="dark"] {');
  lines.push('  --k-background: 224 71% 4%;');
  lines.push('}');
  lines.push('```');
  lines.push('');
  lines.push('Toggle dark mode in JS:');
  lines.push('');
  lines.push('```ts');
  lines.push("document.documentElement.dataset.theme = 'dark';");
  lines.push("document.documentElement.classList.toggle('dark');");
  lines.push('```');
  lines.push('');
  lines.push('Custom component variants via CSS:');
  lines.push('');
  lines.push('```css');
  lines.push('[k="button"][variant="brand"] {');
  lines.push('  background-color: hsl(var(--brand));');
  lines.push('}');
  lines.push('```');
  lines.push('');

  // ── 7. Command Attributes ──
  lines.push('## Command Attributes');
  lines.push('');
  lines.push('Kinu uses a lightweight polyfill for the HTML Command API to declaratively control dialogs:');
  lines.push('');
  lines.push('```tsx');
  lines.push('<button command="show-modal" commandFor="my-dialog">Open</button>');
  lines.push('<dialog id="my-dialog">Content</dialog>');
  lines.push('```');
  lines.push('');
  lines.push('### Available Commands');
  lines.push('');
  lines.push('| Command | Effect |');
  lines.push('| --- | --- |');
  lines.push('| `show-modal` | Calls `showModal()` on target dialog |');
  lines.push('| `show` | Calls `show()` on target dialog (non-modal) |');
  lines.push('| `close` | Closes the target dialog |');
  lines.push('| `show-popover` | Shows a popover |');
  lines.push('| `hide-popover` | Hides a popover |');
  lines.push('| `toggle-popover` | Toggles a popover |');
  lines.push('| `--custom` | Fires a CustomEvent on the target |');
  lines.push('');
  lines.push('The polyfill auto-installs when any dialog/dropdown/sheet component renders.');
  lines.push('Commands dispatch as CustomEvents (`kinu-command`) for interception.');
  lines.push('');

  // ── 8. Typography ──
  lines.push('## Typography');
  lines.push('');
  lines.push('Typography is CSS-only — use native HTML elements with `k` attributes:');
  lines.push('');
  lines.push('```html');
  lines.push('<h1 k="h1">Page title</h1>');
  lines.push('<p k="lead">Intro paragraph</p>');
  lines.push('<p k="muted">Secondary text</p>');
  lines.push('<p k="small">Fine print</p>');
  lines.push('```');
  lines.push('');
  lines.push('Available typography attributes: `k="h1"` through `k="h4"`, `k="lead"`, `k="muted"`, `k="small"`.');
  lines.push('');

  // ── 9. Base Styles ──
  lines.push('## Base Styles');
  lines.push('');
  lines.push('`kinu/style.css` includes:');
  lines.push('- Modern CSS reset (box-sizing, typography smoothing, dialog/backdrop defaults)');
  lines.push('- Design tokens for light/dark themes as `--k-*` custom properties');
  lines.push('- All component selectors keyed off the `k` attribute');
  lines.push('');
  lines.push('Import once before custom overrides:');
  lines.push('');
  lines.push('```ts');
  lines.push("import 'kinu/style.css';");
  lines.push('```');
  lines.push('');

  // ── 10. Component Reference ──
  lines.push('## Component Reference');
  lines.push('');

  const categories = new Map();
  for (const comp of components) {
    const cat = comp.entry.category || 'Other';
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat).push(comp);
  }

  for (const [category, comps] of categories) {
    lines.push(`### ${category}`);
    lines.push('');

    for (const comp of comps) {
      const {entry, exports, attachments, propDocs} = comp;
      const importNames = exports.map((e) => e.name).sort();

      lines.push(`#### ${entry.title}`);
      lines.push('');
      if (entry.description) {
        lines.push(entry.description);
        lines.push('');
      }

      // Source
      const folder = entry.folder ?? entry.slug;
      lines.push(`**Source:** \`src/components/${folder}/index.tsx\``);
      lines.push('');

      // Exports table
      lines.push('**Exports:**');
      lines.push('');
      lines.push('| Export | Renders As | k Attribute |');
      lines.push('| --- | --- | --- |');
      for (const exp of exports) {
        const el = resolveRenderedElement(exp);
        const kAttr = exp.pNames.size ? `k="${[...exp.pNames].join(', ')}"` : '—';
        lines.push(`| \`${exp.name}\` | \`${el}\` | \`${kAttr}\` |`);
      }
      lines.push('');

      // Static shortcuts
      if (attachments.length) {
        lines.push('**Compound access:**');
        for (const a of attachments) {
          lines.push(`- \`${a.owner}.${a.property}\` = \`${a.target}\``);
        }
        lines.push('');
      }

      // Props
      const propSections = exports
        .map((exp) => ({name: exp.name, props: propDocs.get(exp.name) || []}))
        .filter((s) => s.props.length > 0);

      if (propSections.length) {
        lines.push('**Props:**');
        lines.push('');
        for (const section of propSections) {
          if (propSections.length > 1) {
            lines.push(`*${section.name}OwnProps:*`);
            lines.push('');
          }
          lines.push('| Prop | Type | Default | Description |');
          lines.push('| --- | --- | --- | --- |');
          for (const p of section.props) {
            lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.default} | ${p.doc} |`);
          }
          lines.push('');

          // Note the base element props
          const mainExport = exports.find((e) => e.name === section.name);
          if (mainExport) {
            const el = resolveRenderedElement(mainExport);
            if (el.startsWith('<') && el !== '(composite)') {
              lines.push(`*Also accepts all native \`${el}\` HTML attributes.*`);
              lines.push('');
            }
          }
        }
      } else {
        // Even if no OwnProps, note the native element
        const mainExport = exports[0];
        if (mainExport) {
          const el = resolveRenderedElement(mainExport);
          if (el.startsWith('<')) {
            lines.push(`*Accepts all native \`${el}\` HTML attributes.*`);
            lines.push('');
          }
        }
      }

      // Usage
      lines.push('**Usage:**');
      lines.push('');
      lines.push('```tsx');
      lines.push(`import {${importNames.join(', ')}} from 'kinu';`);
      lines.push('');
      lines.push(entry.usage ?? `<${exports[0]?.name ?? entry.title} />`);
      lines.push('```');
      lines.push('');

      // Notes
      if (entry.notes?.length) {
        lines.push('**Notes:**');
        for (const note of entry.notes) lines.push(`- ${note}`);
        lines.push('');
      }

      lines.push('---');
      lines.push('');
    }
  }

  // ── 11. Toast System ──
  lines.push('## Toast System');
  lines.push('');
  lines.push('Imperative notification API — not a component with props, but an event-driven system.');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { toast, ToastContainer } from 'kinu';");
  lines.push('');
  lines.push('// Render once near app root:');
  lines.push('<ToastContainer />');
  lines.push('');
  lines.push("// Show toasts from anywhere:");
  lines.push("toast.show('Settings saved');");
  lines.push("toast.show('File uploaded', {");
  lines.push("  title: 'Success',");
  lines.push("  icon: '✅',");
  lines.push("  action: <button onClick={undo}>Undo</button>,");
  lines.push("  duration: 4000");
  lines.push('});');
  lines.push('```');
  lines.push('');
  lines.push('### ToastOptions Interface');
  lines.push('');
  lines.push('```typescript');
  lines.push('interface ToastOptions {');
  lines.push('  title?: ComponentChild;    // Title above toast body');
  lines.push('  icon?: ComponentChild;     // Icon element');
  lines.push('  action?: ComponentChild;   // Action button');
  lines.push('  duration?: number;         // Auto-dismiss delay (default: 3000ms)');
  lines.push('}');
  lines.push('');
  lines.push('interface ToastApi {');
  lines.push('  show(content: ComponentChild, options?: ToastOptions): void;');
  lines.push('}');
  lines.push('```');
  lines.push('');
  lines.push('### Toast CSS Hooks');
  lines.push('');
  lines.push('```css');
  lines.push('[k="toast"] { }                 /* Base toast */');
  lines.push('[k="toast"][data-mounted] { }    /* Entrance animation */');
  lines.push('[k="toast"][data-closing] { }    /* Exit animation */');
  lines.push('```');
  lines.push('');
  lines.push('Max 3 toasts visible at once. Staggered entrance animations. DOM-event-driven (no prop drilling).');
  lines.push('');

  // ── 12. CSS Selector Patterns ──
  lines.push('## CSS Selector Patterns');
  lines.push('');
  lines.push('All components style via `[k="name"]` attribute selectors:');
  lines.push('');
  lines.push('```css');
  lines.push('/* Target a component */');
  lines.push('[k="button"] { }');
  lines.push('');
  lines.push('/* Variant */');
  lines.push('[k="button"][variant="secondary"] { }');
  lines.push('[k="badge"][variant="destructive"] { }');
  lines.push('');
  lines.push('/* Size */');
  lines.push('[k="button"][size="sm"] { }');
  lines.push('[k="input"][size="lg"] { }');
  lines.push('');
  lines.push('/* Boolean state */');
  lines.push('[k="button"][loading] { opacity: 0.6; }');
  lines.push('[k="button"][disabled] { }');
  lines.push('[k="input"][invalid] { }');
  lines.push('');
  lines.push('/* ARIA state */');
  lines.push('[k="tab"][aria-selected="true"] { }');
  lines.push('[k="toggle"][aria-pressed="true"] { }');
  lines.push('');
  lines.push('/* Combined */');
  lines.push('[k="button"][variant="destructive"][size="lg"] { }');
  lines.push('```');
  lines.push('');
  lines.push('### Component → k Attribute Map');
  lines.push('');
  lines.push('| Component | k Value(s) |');
  lines.push('| --- | --- |');
  for (const comp of components) {
    for (const exp of comp.exports) {
      if (exp.pNames.size) {
        lines.push(`| ${exp.name} | ${[...exp.pNames].map(p => `\`${p}\``).join(', ')} |`);
      }
    }
  }
  lines.push('');

  // ── 13. Complete Import Map ──
  lines.push('## Complete Import Map');
  lines.push('');
  lines.push('```tsx');
  lines.push("// Components");

  const allImports = [];
  for (const comp of components) {
    for (const exp of comp.exports) {
      allImports.push(exp.name);
    }
  }
  allImports.push('ToastContainer', 'toast');
  allImports.sort();

  lines.push(`import {`);
  // Group into lines of ~4 imports each
  for (let i = 0; i < allImports.length; i += 4) {
    const chunk = allImports.slice(i, i + 4);
    const isLast = i + 4 >= allImports.length;
    lines.push(`  ${chunk.join(', ')}${isLast ? '' : ','}`);
  }
  lines.push(`} from 'kinu';`);
  lines.push('');

  lines.push('// Types (each component exports FooProps, FooOwnProps, and variant types)');
  lines.push("import type { ButtonProps, ButtonOwnProps, ButtonVariant, ButtonSize } from 'kinu';");
  lines.push("import type { DialogProps, DialogContentProps, DialogTriggerProps } from 'kinu';");
  lines.push("import type { ToastOptions, ToastApi } from 'kinu';");
  lines.push('// ... pattern: {ComponentName}Props, {ComponentName}OwnProps');
  lines.push('```');
  lines.push('');

  // ── 14. Accessibility ──
  lines.push('## Accessibility Patterns');
  lines.push('');
  lines.push('### Keyboard Navigation');
  lines.push('- All interactive components support keyboard navigation');
  lines.push('- Overlays (Dialog, Sheet, Drawer, DropdownMenu) trap focus and close on Escape');
  lines.push('- TabList supports arrow-key navigation between tabs');
  lines.push('- DropdownMenu/ContextMenu support arrow-key item navigation');
  lines.push('');
  lines.push('### ARIA Best Practices');
  lines.push('```tsx');
  lines.push('// Always label form controls:');
  lines.push('<Label htmlFor="email">Email</Label>');
  lines.push('<Input id="email" type="email" required />');
  lines.push('');
  lines.push('// Tabs need roles and aria-selected:');
  lines.push('<TabList role="tablist">');
  lines.push('  <Tab role="tab" aria-selected="true">Active</Tab>');
  lines.push('</TabList>');
  lines.push('<TabPanel role="tabpanel">Content</TabPanel>');
  lines.push('');
  lines.push('// Toggle uses aria-pressed automatically:');
  lines.push('<Toggle pressed={isBold}>Bold</Toggle>');
  lines.push('');
  lines.push('// Spinners and loading states:');
  lines.push('<Spinner aria-label="Loading" />');
  lines.push('<Button loading disabled>Saving...</Button>');
  lines.push('');
  lines.push('// Pagination current page:');
  lines.push('<PaginationLink aria-current="page">1</PaginationLink>');
  lines.push('```');
  lines.push('');

  // ── 15. Integration Examples ──
  lines.push('## Integration Examples');
  lines.push('');
  lines.push('### Login Form');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Button, Card, Input, Label, toast, ToastContainer } from 'kinu';");
  lines.push('');
  lines.push('function LoginForm() {');
  lines.push('  const [email, setEmail] = useState(\'\');');
  lines.push('  const [password, setPassword] = useState(\'\');');
  lines.push('');
  lines.push('  return (');
  lines.push('    <>');
  lines.push('      <form onSubmit={(e) => { e.preventDefault(); toast.show("Logged in!"); }}>');
  lines.push('        <Card>');
  lines.push('          <Label htmlFor="email">Email</Label>');
  lines.push('          <Input id="email" type="email" value={email} onInput={(e) => setEmail(e.currentTarget.value)} required />');
  lines.push('          <Label htmlFor="pw">Password</Label>');
  lines.push('          <Input id="pw" type="password" value={password} onInput={(e) => setPassword(e.currentTarget.value)} required />');
  lines.push('          <Button type="submit">Sign In</Button>');
  lines.push('        </Card>');
  lines.push('      </form>');
  lines.push('      <ToastContainer />');
  lines.push('    </>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('### Dashboard with Sidebar');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Sidebar, SidebarTrigger, NavigationMenu, NavigationMenuList,");
  lines.push("  NavigationMenuItem, NavigationMenuLink, Card, Progress, ToastContainer } from 'kinu';");
  lines.push('');
  lines.push('function Dashboard() {');
  lines.push('  return (');
  lines.push('    <div style={{ display: "flex" }}>');
  lines.push('      <Sidebar id="main-sidebar">');
  lines.push('        <nav>');
  lines.push('          <a href="/dashboard" aria-current="page">Dashboard</a>');
  lines.push('          <a href="/users">Users</a>');
  lines.push('          <a href="/settings">Settings</a>');
  lines.push('        </nav>');
  lines.push('      </Sidebar>');
  lines.push('      <main>');
  lines.push('        <SidebarTrigger commandFor="main-sidebar">☰</SidebarTrigger>');
  lines.push('        <Card><Progress value={75} max={100} /></Card>');
  lines.push('      </main>');
  lines.push('      <ToastContainer />');
  lines.push('    </div>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('### Dialog with Form');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Dialog, Button, Input, Label } from 'kinu';");
  lines.push('');
  lines.push('function EditDialog() {');
  lines.push('  return (');
  lines.push('    <Dialog>');
  lines.push('      <Dialog.Trigger><Button>Edit Profile</Button></Dialog.Trigger>');
  lines.push('      <Dialog.Content>');
  lines.push('        <h3>Edit Profile</h3>');
  lines.push('        <Label htmlFor="name">Name</Label>');
  lines.push('        <Input id="name" placeholder="Your name" />');
  lines.push('        <Dialog.Close><Button variant="outline">Cancel</Button></Dialog.Close>');
  lines.push('        <Button type="submit">Save</Button>');
  lines.push('      </Dialog.Content>');
  lines.push('    </Dialog>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('### Dropdown with Actions');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from 'kinu';");
  lines.push('');
  lines.push('function ActionsMenu() {');
  lines.push('  return (');
  lines.push('    <DropdownMenu>');
  lines.push('      <DropdownMenuTrigger><Button variant="outline">Actions</Button></DropdownMenuTrigger>');
  lines.push('      <DropdownMenuContent>');
  lines.push('        <DropdownMenuItem onClick={() => console.log("edit")}>Edit</DropdownMenuItem>');
  lines.push('        <DropdownMenuItem shortcut="⌘D">Duplicate</DropdownMenuItem>');
  lines.push('        <DropdownMenuItem destructive>Delete</DropdownMenuItem>');
  lines.push('      </DropdownMenuContent>');
  lines.push('    </DropdownMenu>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('### Data Table');
  lines.push('');
  lines.push('```tsx');
  lines.push("import { Table, Badge, Button, Card } from 'kinu';");
  lines.push('');
  lines.push('function UsersTable({ users }) {');
  lines.push('  return (');
  lines.push('    <Card>');
  lines.push('      <Table>');
  lines.push('        <thead><tr><th>Name</th><th>Status</th><th>Actions</th></tr></thead>');
  lines.push('        <tbody>');
  lines.push('          {users.map(u => (');
  lines.push('            <tr key={u.id}>');
  lines.push('              <td>{u.name}</td>');
  lines.push('              <td><Badge variant={u.active ? undefined : "secondary"}>{u.active ? "Active" : "Inactive"}</Badge></td>');
  lines.push('              <td><Button size="sm" variant="ghost">Edit</Button></td>');
  lines.push('            </tr>');
  lines.push('          ))}');
  lines.push('        </tbody>');
  lines.push('      </Table>');
  lines.push('    </Card>');
  lines.push('  );');
  lines.push('}');
  lines.push('```');
  lines.push('');

  lines.push('---');
  lines.push('');
  lines.push('*Generated from source by `scripts/generate-llms-txt.mjs`.*');
  lines.push('');

  return lines.join('\n');
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(outDir, {recursive: true});

  // Gather component data from metadata entries that have a folder
  const componentEntries = metadata.filter((e) => e.folder);
  const components = (await Promise.all(componentEntries.map(gatherComponentData))).filter(Boolean);

  // Sort by category then order
  components.sort((a, b) => {
    const catCmp = (a.entry.category || '').localeCompare(b.entry.category || '');
    if (catCmp !== 0) return catCmp;
    return (a.entry.order ?? 0) - (b.entry.order ?? 0);
  });

  // Read foundation pages
  const foundationEntries = metadata.filter((e) => e.file && !e.folder);
  const foundationPages = {};
  for (const entry of foundationEntries) {
    const content = await readFoundationPage(entry.file);
    if (content) foundationPages[entry.slug] = content;
  }

  // Read design tokens
  const tokens = await readDesignTokens();

  // Generate both files
  const quickRef = buildQuickReference(components, foundationPages);
  const fullRef = buildFullReference(components, foundationPages, tokens);

  await fs.writeFile(path.join(outDir, 'llms.txt'), quickRef);
  await fs.writeFile(path.join(outDir, 'llms-full.txt'), fullRef);

  const quickLines = quickRef.split('\n').length;
  const fullLines = fullRef.split('\n').length;
  console.log(`✓ llms.txt      → ${quickLines} lines`);
  console.log(`✓ llms-full.txt → ${fullLines} lines`);
  console.log(`  Output: ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
