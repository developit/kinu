import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const themeRoot = path.resolve(__dirname, '..');
const mapPath = path.join(__dirname, 'token-map.json');
const entryPath = path.join(__dirname, 'css', 'radix-entry.css');
const outputPath = path.join(themeRoot, 'generated', 'tokens.css');

const tokenMap = JSON.parse(await fs.readFile(mapPath, 'utf8'));

const colorsDir = path.join(themeRoot, 'radix-src', 'colors');

const entryCss = await fs.readFile(entryPath, 'utf8');

const processed = await postcss([
  postcssImport({
    resolve(id, basedir) {
      if (id.startsWith('@radix-ui/colors/')) {
        return path.join(colorsDir, id.replace('@radix-ui/colors/', ''));
      }
      return path.resolve(basedir, id);
    },
  }),
  postcssNesting(),
]).process(entryCss, {from: entryPath});

const root = postcss.parse(processed.css);

const rules = [];
root.walkRules((rule) => {
  if (isInsideAtRule(rule, new Set(['media', 'supports']))) return;
  const decls = [];
  rule.walkDecls((decl) => {
    if (!decl.prop.startsWith('--')) return;
    decls.push({prop: decl.prop, value: decl.value});
  });
  if (decls.length === 0) return;
  for (const selector of rule.selectors) {
    rules.push({selector, decls});
  }
});

const lightScope = buildScope({
  dark: false,
  accent: tokenMap.defaults.accent,
  gray: tokenMap.defaults.gray,
  panelBackground: tokenMap.defaults.panelBackground,
});
const darkScope = buildScope({
  dark: true,
  accent: tokenMap.defaults.accent,
  gray: tokenMap.defaults.gray,
  panelBackground: tokenMap.defaults.panelBackground,
});

const lightTokens = resolvePuiTokens(lightScope);
const darkTokens = resolvePuiTokens(darkScope);

const output = [
  '/* src/generated/tokens.css - GENERATED; DO NOT EDIT */',
  '',
  formatTokenBlock(tokenMap.output.lightSelector, lightTokens),
  '',
  '@media (prefers-color-scheme: dark) {',
  indent(formatTokenBlock(tokenMap.output.lightSelector, darkTokens)),
  '}',
  '',
  formatTokenBlock(tokenMap.output.darkSelector, darkTokens),
  '',
].join('\n');

await fs.mkdir(path.dirname(outputPath), {recursive: true});
await fs.writeFile(outputPath, output, 'utf8');

function isInsideAtRule(rule, names) {
  let parent = rule.parent;
  while (parent) {
    if (parent.type === 'atrule' && names.has(parent.name)) return true;
    parent = parent.parent;
  }
  return false;
}

function buildScope({dark, accent, gray, panelBackground}) {
  const rootVars = applyRules({dark, accent, gray, panelBackground}, 'root');
  const themeVars = applyRules({dark, accent, gray, panelBackground}, 'theme');
  return {...rootVars, ...themeVars};
}

function applyRules(context, target) {
  const vars = {};
  for (const rule of rules) {
    if (!selectorMatches(rule.selector, context, target)) continue;
    for (const decl of rule.decls) {
      vars[decl.prop] = decl.value;
    }
  }
  return vars;
}

function selectorMatches(selector, context, target) {
  const normalized = stripNot(selector);
  const hasRadixThemes = normalized.includes('.radix-themes');
  const hasAccentAttr = /data-accent-color/.test(normalized);
  const hasGrayAttr = /data-gray-color/.test(normalized);
  const hasPanelAttr = /data-panel-background/.test(normalized);
  const isThemeSelector = hasRadixThemes || hasAccentAttr || hasGrayAttr || hasPanelAttr;

  if (target === 'theme' && !isThemeSelector) return false;
  if (target === 'root' && isThemeSelector) return false;

  const needsDark = normalized.includes('.dark') || normalized.includes('.dark-theme');
  const needsLight = normalized.includes('.light') || normalized.includes('.light-theme');

  if (target === 'root') {
    if (needsDark && !context.dark) return false;
    if (needsLight && context.dark) return false;
    return true;
  }

  if (needsDark && !context.dark) return false;
  if (needsLight && context.dark) return false;
  if (hasRadixThemes && !normalized.includes('.radix-themes')) return false;

  const accentMatch = normalized.match(/data-accent-color(?:\s*=\s*['"]?([\w-]+)['"]?)?/);
  if (accentMatch) {
    if (accentMatch[1]) {
      if (accentMatch[1] !== context.accent) return false;
    } else if (!context.accent || context.accent === 'gray') {
      return false;
    }
  }

  const grayMatch = normalized.match(/data-gray-color(?:\s*=\s*['"]?([\w-]+)['"]?)?/);
  if (grayMatch) {
    if (grayMatch[1]) {
      if (grayMatch[1] !== context.gray) return false;
    } else if (!context.gray) {
      return false;
    }
  }

  const panelMatch = normalized.match(/data-panel-background(?:\s*=\s*['"]?([\w-]+)['"]?)?/);
  if (panelMatch) {
    if (panelMatch[1]) {
      if (panelMatch[1] !== context.panelBackground) return false;
    } else if (!context.panelBackground) {
      return false;
    }
  }

  return true;
}

function stripNot(selector) {
  let output = '';
  let i = 0;
  while (i < selector.length) {
    if (selector.startsWith(':not(', i)) {
      i += 5;
      let depth = 1;
      while (i < selector.length && depth > 0) {
        const char = selector[i];
        if (char === '(') depth += 1;
        if (char === ')') depth -= 1;
        i += 1;
      }
      continue;
    }
    output += selector[i];
    i += 1;
  }
  return output;
}

function resolvePuiTokens(scopeVars) {
  const resolved = {};
  const compositeOver = tokenMap.hslConversion?.compositeAlphaOver;
  for (const [puiVar, entry] of Object.entries(tokenMap.map)) {
    if (entry.type === 'raw') {
      resolved[puiVar] = entry.value;
      continue;
    }
    if (entry.type === 'rawColor') {
      const rawValue = resolveValue(entry.radixVar, scopeVars, new Set());
      if (!rawValue) {
        throw new Error(`Missing value for ${entry.radixVar}`);
      }
      resolved[puiVar] = rawValue;
      continue;
    }
    const raw = resolveValue(entry.radixVar, scopeVars, new Set());
    if (!raw) {
      throw new Error(`Missing value for ${entry.radixVar}`);
    }
    const color = parseColor(raw);
    if (!color) {
      throw new Error(`Unable to parse color for ${entry.radixVar}: ${raw}`);
    }
    let finalColor = color;
    if (color.a < 1 && compositeOver) {
      const bgRaw = resolveValue(compositeOver, scopeVars, new Set());
      const bgColor = parseColor(bgRaw);
      if (bgColor) {
        finalColor = compositeColors(color, bgColor);
      }
    }
    resolved[puiVar] = rgbToHslTriplet(finalColor);
  }
  return resolved;
}

function resolveValue(varName, vars, seen) {
  if (!varName) return null;
  const value = vars[varName];
  if (!value) return null;
  return resolveCssValue(value, vars, seen);
}

function resolveCssValue(value, vars, seen) {
  const varRegex = /var\((--[\w-]+)(?:\s*,\s*([^\)]+))?\)/g;
  let result = value;
  let match;
  while ((match = varRegex.exec(result))) {
    const name = match[1];
    const fallback = match[2];
    if (seen.has(name)) {
      return fallback ? resolveCssValue(fallback.trim(), vars, seen) : null;
    }
    seen.add(name);
    const resolved = resolveValue(name, vars, seen);
    seen.delete(name);
    const replacement = resolved ?? (fallback ? resolveCssValue(fallback.trim(), vars, seen) : '');
    result = result.replace(match[0], replacement ?? '');
    varRegex.lastIndex = 0;
  }
  return result.trim();
}

function parseColor(value) {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed === 'white') {
    return {r: 255, g: 255, b: 255, a: 1};
  }
  if (trimmed === 'black') {
    return {r: 0, g: 0, b: 0, a: 1};
  }
  if (trimmed === 'transparent') {
    return {r: 0, g: 0, b: 0, a: 0};
  }
  if (trimmed.startsWith('color(')) {
    return null;
  }
  if (trimmed.startsWith('#')) {
    return parseHex(trimmed);
  }
  if (trimmed.startsWith('rgb')) {
    return parseRgb(trimmed);
  }
  if (trimmed.startsWith('hsl')) {
    return parseHsl(trimmed);
  }
  return null;
}

function parseHex(value) {
  const hex = value.replace('#', '').trim();
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    return {r, g, b, a: 1};
  }
  if (hex.length === 4) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    const a = parseInt(hex[3] + hex[3], 16) / 255;
    return {r, g, b, a};
  }
  if (hex.length === 6 || hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return {r, g, b, a};
  }
  return null;
}

function parseRgb(value) {
  const content = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
  const parts = content.split('/').map((part) => part.trim());
  const rgbPart = parts[0].replace(/,/g, ' ').trim();
  const nums = rgbPart.split(/\s+/).filter(Boolean).map(Number);
  if (nums.length < 3) return null;
  const [r, g, b] = nums;
  const alpha = parts[1] ? Number(parts[1].replace(/%/g, '')) : 1;
  const a = parts[1] && parts[1].includes('%') ? alpha / 100 : alpha;
  return {r, g, b, a: Number.isNaN(a) ? 1 : a};
}

function parseHsl(value) {
  const content = value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
  const parts = content.split('/').map((part) => part.trim());
  const hslPart = parts[0].replace(/,/g, ' ').trim();
  const nums = hslPart.split(/\s+/).filter(Boolean);
  if (nums.length < 3) return null;
  const h = Number(nums[0]);
  const s = parseFloat(nums[1]) / 100;
  const l = parseFloat(nums[2]) / 100;
  const alpha = parts[1] ? Number(parts[1].replace(/%/g, '')) : 1;
  const a = parts[1] && parts[1].includes('%') ? alpha / 100 : alpha;
  return {...hslToRgb(h, s, l), a: Number.isNaN(a) ? 1 : a};
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (h >= 0 && h < 60) {
    r1 = c;
    g1 = x;
  } else if (h < 120) {
    r1 = x;
    g1 = c;
  } else if (h < 180) {
    g1 = c;
    b1 = x;
  } else if (h < 240) {
    g1 = x;
    b1 = c;
  } else if (h < 300) {
    r1 = x;
    b1 = c;
  } else {
    r1 = c;
    b1 = x;
  }
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function compositeColors(foreground, background) {
  const alpha = foreground.a;
  const r = Math.round(foreground.r * alpha + background.r * (1 - alpha));
  const g = Math.round(foreground.g * alpha + background.g * (1 - alpha));
  const b = Math.round(foreground.b * alpha + background.b * (1 - alpha));
  return {r, g, b, a: 1};
}

function rgbToHslTriplet({r, g, b}) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  if (delta > 0) {
    if (max === rNorm) {
      h = ((gNorm - bNorm) / delta) % 6;
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return `${formatNumber(h)} ${formatPercent(s)} ${formatPercent(l)}`;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, '');
}

function formatPercent(value) {
  const percent = value * 100;
  return `${formatNumber(Math.round(percent * 10) / 10)}%`;
}

function formatTokenBlock(selector, tokens) {
  const lines = [`${selector} {`];
  for (const [name, value] of Object.entries(tokens)) {
    lines.push(`  ${name}: ${value};`);
  }
  lines.push('}');
  return lines.join('\n');
}

function indent(text) {
  return text
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n');
}
