import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import { converter, parse } from 'culori';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const tokenMapPath = path.join(__dirname, 'token-map.json');
const entryPath = path.join(__dirname, 'css', 'radix-entry.css');
const outputPath = path.join(rootDir, 'generated', 'tokens.css');

const tokenMap = JSON.parse(await fs.readFile(tokenMapPath, 'utf8'));

const rgb = converter('rgb');
const hsl = converter('hsl');

const rawCss = await fs.readFile(entryPath, 'utf8');
const processed = await postcss([postcssImport(), postcssNesting()]).process(rawCss, {
  from: entryPath,
});

const root = postcss.parse(processed.css);

function isSelectorMatch(selector, scope) {
  const trimmed = selector.trim();
  if (trimmed.includes(':root')) return true;

  const { rootScopeSelector, darkScopeSelector } = tokenMap.radix;
  const hasRoot = trimmed.includes(rootScopeSelector);
  const hasDark = darkScopeSelector ? trimmed.includes(darkScopeSelector) : false;
  const hasDarkClass = trimmed.includes('.dark') || trimmed.includes('.dark-theme');

  if (!hasRoot) return false;

  if (scope === 'dark') {
    return hasDark || hasDarkClass;
  }

  return !hasDarkClass;
}

function matchesAttr(selector, attrName, value) {
  if (!selector.includes(attrName)) return true;
  const doubleQuoted = `[${attrName}="${value}"]`;
  const singleQuoted = `[${attrName}='${value}']`;
  return selector.includes(doubleQuoted) || selector.includes(singleQuoted) || selector.includes(`[${attrName}]`);
}

function collectVars(scopeName) {
  const vars = new Map();
  const accent = tokenMap.defaults.accent;
  const gray = tokenMap.defaults.gray;

  root.walkRules((rule) => {
    const selectors = rule.selectors || [];
    const matches = selectors.some((selector) => {
      if (!isSelectorMatch(selector, scopeName)) return false;
      if (!matchesAttr(selector, 'data-accent-color', accent)) return false;
      if (!matchesAttr(selector, 'data-gray-color', gray)) return false;
      return true;
    });

    if (!matches) return;

    rule.walkDecls((decl) => {
      if (!decl.prop.startsWith('--')) return;
      vars.set(decl.prop, decl.value.trim());
    });
  });

  return vars;
}

function resolveVar(value, vars, stack = []) {
  let output = value;
  const varRegex = /var\((--[^,\s)]+)(?:,\s*([^\)]+))?\)/g;

  let match;
  while ((match = varRegex.exec(output))) {
    const [full, name, fallback] = match;
    if (stack.includes(name)) {
      throw new Error(`Circular var reference: ${[...stack, name].join(' -> ')}`);
    }
    const replacement = vars.get(name);
    if (replacement) {
      const resolved = resolveVar(replacement, vars, [...stack, name]);
      output = output.replace(full, resolved);
    } else if (fallback) {
      output = output.replace(full, fallback.trim());
    } else {
      throw new Error(`Missing var ${name} for value ${value}`);
    }
    varRegex.lastIndex = 0;
  }

  return output;
}

function compositeOver(fg, bg) {
  const alpha = fg.alpha ?? 1;
  return {
    mode: 'rgb',
    r: fg.r * alpha + bg.r * (1 - alpha),
    g: fg.g * alpha + bg.g * (1 - alpha),
    b: fg.b * alpha + bg.b * (1 - alpha),
    alpha: 1,
  };
}

function formatNumber(value) {
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 10) / 10;
}

function toHslTriplet(value, vars, backgroundValue) {
  const resolved = resolveVar(value, vars);
  const parsed = parse(resolved);
  if (!parsed) {
    throw new Error(`Unable to parse color value: ${resolved}`);
  }
  let rgbColor = rgb(parsed);
  if (!rgbColor) {
    throw new Error(`Unable to convert color value: ${resolved}`);
  }

  if ((rgbColor.alpha ?? 1) < 1) {
    const backgroundResolved = resolveVar(backgroundValue, vars);
    const backgroundParsed = parse(backgroundResolved);
    const backgroundRgb = rgb(backgroundParsed);
    rgbColor = compositeOver(rgbColor, backgroundRgb);
  }

  const hslColor = hsl(rgbColor);
  const hue = formatNumber(hslColor.h ?? 0);
  const saturation = formatNumber((hslColor.s ?? 0) * 100);
  const lightness = formatNumber((hslColor.l ?? 0) * 100);
  return `${hue} ${saturation}% ${lightness}%`;
}

function buildOutput(scopeName) {
  const vars = collectVars(scopeName);
  const output = [];
  const backgroundVar = tokenMap.hslConversion.compositeAlphaOver;
  const backgroundValue = vars.get(backgroundVar);
  if (!backgroundValue) {
    throw new Error(`Missing background var ${backgroundVar} for ${scopeName}`);
  }

  for (const [key, entry] of Object.entries(tokenMap.map)) {
    if (entry.type === 'raw') {
      output.push([key, entry.value]);
      continue;
    }
    const radixValue = vars.get(entry.radixVar);
    if (!radixValue) {
      throw new Error(`Missing radix var ${entry.radixVar} for ${scopeName}`);
    }
    const hslTriplet = toHslTriplet(radixValue, vars, backgroundValue);
    output.push([key, hslTriplet]);
  }

  return output;
}

function renderBlock(selector, entries) {
  const lines = [`${selector} {`];
  for (const [name, value] of entries) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push('}');
  return lines.join('\n');
}

const lightEntries = buildOutput('light');
const darkEntries = buildOutput('dark');

const output = [
  '/* src/generated/tokens.css - GENERATED; DO NOT EDIT */',
  renderBlock(tokenMap.output.lightSelector, lightEntries),
  '',
  '@media (prefers-color-scheme: dark) {',
  renderBlock(tokenMap.output.lightSelector, darkEntries)
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n'),
  '}',
  '',
  renderBlock(tokenMap.output.darkSelector, darkEntries),
  '',
].join('\n');

await fs.writeFile(outputPath, `${output}\n`);
