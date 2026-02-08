/**
 * gen-tokens.mjs - Radix Themes → PUI token generator
 *
 * Reads @radix-ui/colors CSS + vendored Radix Themes token CSS,
 * resolves variables for the configured accent/gray,
 * converts to HSL triplets, and emits src/generated/tokens.css.
 *
 * Usage: node src/build/gen-tokens.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, '../..');
const COLORS_DIR = resolve(PKG_ROOT, 'node_modules/@radix-ui/colors');
const RADIX_SRC = resolve(PKG_ROOT, 'src/radix-src');
const OUTPUT = resolve(PKG_ROOT, 'src/generated/tokens.css');

// ─── Load token map ────────────────────────────────────────────────────────────

const tokenMap = JSON.parse(readFileSync(resolve(__dirname, 'token-map.json'), 'utf8'));
const { defaults, map: puiMap } = tokenMap;

// ─── Color parsing helpers ─────────────────────────────────────────────────────

/**
 * Parse a CSS hex color (#RGB, #RRGGBB, #RRGGBBAA) to { r, g, b, a } (0-255, a 0-1)
 */
function parseHex(hex) {
  hex = hex.trim();
  if (hex[0] !== '#') return null;
  hex = hex.slice(1);
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  if (hex.length === 6) hex += 'ff';
  if (hex.length !== 8) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: parseInt(hex.slice(6, 8), 16) / 255,
  };
}

/**
 * Parse rgba(...) to { r, g, b, a }
 */
function parseRgba(str) {
  const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (!m) return null;
  return {
    r: parseFloat(m[1]),
    g: parseFloat(m[2]),
    b: parseFloat(m[3]),
    a: m[4] !== undefined ? parseFloat(m[4]) : 1,
  };
}

/**
 * Parse any CSS color string we encounter in Radix sources (hex or rgba)
 */
function parseColor(str) {
  if (!str) return null;
  str = str.trim();
  if (str.startsWith('#')) return parseHex(str);
  if (str.startsWith('rgb')) return parseRgba(str);
  if (str === 'white') return { r: 255, g: 255, b: 255, a: 1 };
  if (str === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  return null;
}

/**
 * Composite RGBA color over an opaque background
 */
function compositeOver(fg, bg) {
  const a = fg.a;
  return {
    r: Math.round(fg.r * a + bg.r * (1 - a)),
    g: Math.round(fg.g * a + bg.g * (1 - a)),
    b: Math.round(fg.b * a + bg.b * (1 - a)),
    a: 1,
  };
}

/**
 * Convert { r, g, b } (0-255) to HSL triplet string "H S% L%"
 */
function rgbToHslTriplet({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) {
    return `0 0% ${round(l * 100)}%`;
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${round(h * 360)} ${round(s * 100)}% ${round(l * 100)}%`;
}

function round(n) {
  return Math.round(n * 10) / 10;
}

// ─── CSS variable extraction ───────────────────────────────────────────────────

/**
 * Extract CSS custom property declarations from a CSS string.
 * Returns Map of varName → value (only sRGB rules, skips @supports P3 blocks).
 *
 * @param {string} css
 * @param {string} scopeFilter - Only extract from rules matching this selector pattern.
 *                                'light' → :root / .light / .light-theme
 *                                'dark' → .dark / .dark-theme
 *                                'all' → any
 */
function extractVars(css, scopeFilter = 'all') {
  const vars = new Map();

  // Strip @supports (color: color(display-p3 ...)) blocks entirely (we only want sRGB)
  css = stripP3Blocks(css);

  // Simple regex-based extraction of --var: value; declarations
  // We need to be scope-aware, so let's parse block by block
  const blocks = parseBlocks(css);

  for (const block of blocks) {
    if (!matchesScope(block.selector, scopeFilter)) continue;
    const declRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = declRegex.exec(block.body)) !== null) {
      vars.set(m[1], m[2].trim());
    }
  }
  return vars;
}

/**
 * Strip @supports (color: color(display-p3 ...)) { ... } blocks
 */
function stripP3Blocks(css) {
  let result = '';
  let i = 0;
  while (i < css.length) {
    const supportIdx = css.indexOf('@supports', i);
    if (supportIdx === -1) {
      result += css.slice(i);
      break;
    }
    // Check if this is a P3 supports block
    const parenStart = css.indexOf('(', supportIdx);
    if (parenStart === -1) {
      result += css.slice(i);
      break;
    }
    // Find matching brace
    const braceStart = css.indexOf('{', supportIdx);
    if (braceStart === -1) {
      result += css.slice(i);
      break;
    }
    const preamble = css.slice(supportIdx, braceStart);
    if (preamble.includes('display-p3') || preamble.includes('color-gamut')) {
      // Skip this entire @supports block
      result += css.slice(i, supportIdx);
      // Find matching closing brace
      let depth = 0;
      let j = braceStart;
      for (; j < css.length; j++) {
        if (css[j] === '{') depth++;
        else if (css[j] === '}') { depth--; if (depth === 0) break; }
      }
      i = j + 1;
    } else {
      result += css.slice(i, braceStart + 1);
      i = braceStart + 1;
    }
  }
  return result;
}

/**
 * Parse CSS into blocks of { selector, body }
 */
function parseBlocks(css) {
  const blocks = [];
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  // Flatten nested blocks for our purposes - just find top-level rule blocks
  let i = 0;
  while (i < css.length) {
    // Skip whitespace
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;

    // Find the opening brace
    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) break;

    const selector = css.slice(i, braceIdx).trim();

    // Find matching closing brace
    let depth = 0;
    let j = braceIdx;
    for (; j < css.length; j++) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') { depth--; if (depth === 0) break; }
    }
    const body = css.slice(braceIdx + 1, j);
    blocks.push({ selector, body });

    // Also parse nested blocks within this body
    const nested = parseBlocks(body);
    for (const nb of nested) {
      blocks.push({ selector: `${selector} ${nb.selector}`, body: nb.body });
    }

    i = j + 1;
  }
  return blocks;
}

function matchesScope(selector, scopeFilter) {
  if (scopeFilter === 'all') return true;
  if (scopeFilter === 'light') {
    return /(:root|\.light|\.light-theme)/.test(selector) && !/(\.dark|\.dark-theme)/.test(selector);
  }
  if (scopeFilter === 'dark') {
    return /(\.dark|\.dark-theme)/.test(selector);
  }
  return true;
}

// ─── Load all @radix-ui/colors CSS files ───────────────────────────────────────

function loadRadixColorFiles(scope) {
  const vars = new Map();
  const files = readdirSync(COLORS_DIR).filter(f => f.endsWith('.css'));
  for (const file of files) {
    const css = readFileSync(resolve(COLORS_DIR, file), 'utf8');
    const fileVars = extractVars(css, scope);
    for (const [k, v] of fileVars) {
      vars.set(k, v);
    }
  }
  return vars;
}

// ─── Build resolved variable universe ──────────────────────────────────────────

function buildVarUniverse(scope) {
  // 1. Load raw color scales from @radix-ui/colors
  const vars = loadRadixColorFiles(scope);

  // 2. Apply accent mapping: --accent-* → --{accent}-*
  const accent = defaults.accent;
  for (let i = 1; i <= 12; i++) {
    vars.set(`--accent-${i}`, vars.get(`--${accent}-${i}`) || '');
    vars.set(`--accent-a${i}`, vars.get(`--${accent}-a${i}`) || '');
  }
  vars.set('--accent-contrast', vars.get(`--${accent}-contrast`) || 'white');
  vars.set('--accent-surface', vars.get(`--${accent}-surface`) || '');
  vars.set('--accent-indicator', vars.get(`--${accent}-indicator`) || '');
  vars.set('--accent-track', vars.get(`--${accent}-track`) || '');

  // 3. Apply gray mapping: --gray-* → --{gray}-*
  const gray = defaults.gray;
  for (let i = 1; i <= 12; i++) {
    vars.set(`--gray-${i}`, vars.get(`--${gray}-${i}`) || '');
    vars.set(`--gray-a${i}`, vars.get(`--${gray}-a${i}`) || '');
  }
  vars.set('--gray-contrast', vars.get(`--${gray}-contrast`) || 'white');
  vars.set('--gray-surface', vars.get(`--${gray}-surface`) || '');

  // 4. Focus = accent
  for (let i = 1; i <= 12; i++) {
    vars.set(`--focus-${i}`, vars.get(`--accent-${i}`) || '');
    vars.set(`--focus-a${i}`, vars.get(`--accent-a${i}`) || '');
  }

  // 5. Semantic colors from color.css
  if (scope === 'light') {
    vars.set('--color-background', 'white');
    vars.set('--color-overlay', vars.get('--black-a6') || 'rgba(0, 0, 0, 0.4)');
    vars.set('--color-panel-solid', 'white');
    vars.set('--color-panel-translucent', 'rgba(255, 255, 255, 0.7)');
    vars.set('--color-surface', 'rgba(255, 255, 255, 0.85)');
  } else {
    // dark: --color-background = --gray-1
    vars.set('--color-background', vars.get('--gray-1') || '#111113');
    vars.set('--color-overlay', vars.get('--black-a8') || 'rgba(0, 0, 0, 0.6)');
    vars.set('--color-panel-solid', vars.get('--gray-2') || '#18191b');
    vars.set('--color-panel-translucent', vars.get('--gray-a2') || '');
    vars.set('--color-surface', 'rgba(0, 0, 0, 0.25)');
  }

  // 6. Read vendored color extension files (blue.css, red.css, slate.css, etc.)
  //    These define --{color}-surface, --{color}-contrast, etc.
  const colorsDir = resolve(RADIX_SRC, 'tokens/colors');
  try {
    const colorFiles = readdirSync(colorsDir).filter(f => f.endsWith('.css'));
    for (const file of colorFiles) {
      const css = readFileSync(resolve(colorsDir, file), 'utf8');
      const fileVars = extractVars(css, scope);
      // Resolve any var() references in these
      for (const [k, v] of fileVars) {
        vars.set(k, v);
      }
    }
  } catch (e) { /* optional */ }

  // Re-apply accent/gray surface/contrast after loading extension files
  if (vars.has(`--${accent}-surface`)) vars.set('--accent-surface', vars.get(`--${accent}-surface`));
  if (vars.has(`--${accent}-contrast`)) vars.set('--accent-contrast', vars.get(`--${accent}-contrast`));
  if (vars.has(`--${gray}-surface`)) vars.set('--gray-surface', vars.get(`--${gray}-surface`));
  if (vars.has(`--${gray}-contrast`)) vars.set('--gray-contrast', vars.get(`--${gray}-contrast`));

  // Also need --red-contrast / --red-surface for destructive
  if (vars.has('--red-contrast')) { /* already set */ }
  else { vars.set('--red-contrast', 'white'); }

  return vars;
}

/**
 * Resolve a var() reference chain to a final literal value
 */
function resolveVar(varName, vars, visited = new Set()) {
  if (visited.has(varName)) return null;
  visited.add(varName);
  let val = vars.get(varName);
  if (!val) return null;
  // Resolve nested var() references
  while (val && /var\(--[\w-]+\)/.test(val)) {
    val = val.replace(/var\((--[\w-]+)\)/g, (_, ref) => {
      return resolveVar(ref, vars, new Set(visited)) || '';
    });
  }
  return val.trim();
}

// ─── Generate token values ─────────────────────────────────────────────────────

function generateTokens(scope) {
  const vars = buildVarUniverse(scope);
  const bgColor = parseColor(resolveVar('--color-background', vars)) || { r: 255, g: 255, b: 255, a: 1 };
  const tokens = {};

  for (const [puiVar, config] of Object.entries(puiMap)) {
    if (config.type === 'raw') {
      tokens[puiVar] = config.value;
      continue;
    }

    // Color type: resolve Radix var, convert to HSL
    const radixVar = config.radixVar;
    const resolved = resolveVar(radixVar, vars);
    if (!resolved) {
      console.warn(`[${scope}] Could not resolve ${radixVar} for ${puiVar}`);
      tokens[puiVar] = '0 0% 50%'; // fallback gray
      continue;
    }

    let color = parseColor(resolved);
    if (!color) {
      console.warn(`[${scope}] Could not parse color "${resolved}" for ${puiVar} (from ${radixVar})`);
      tokens[puiVar] = '0 0% 50%';
      continue;
    }

    // Composite alpha colors over background
    if (color.a < 1) {
      color = compositeOver(color, bgColor);
    }

    tokens[puiVar] = rgbToHslTriplet(color);
  }

  return tokens;
}

// ─── Emit tokens.css ───────────────────────────────────────────────────────────

const lightTokens = generateTokens('light');
const darkTokens = generateTokens('dark');

function formatBlock(selector, tokens, indent = '  ') {
  let css = `${selector} {\n`;
  for (const [k, v] of Object.entries(tokens)) {
    css += `${indent}${k}: ${v};\n`;
  }
  css += '}\n';
  return css;
}

const banner = `/* src/generated/tokens.css
 * GENERATED by gen-tokens.mjs - DO NOT EDIT
 *
 * Source: Radix Themes (accent: ${defaults.accent}, gray: ${defaults.gray})
 * Generated: ${new Date().toISOString().slice(0, 10)}
 */\n\n`;

let output = banner;
output += formatBlock(':root', lightTokens);
output += '\n';
output += '@media (prefers-color-scheme: dark) {\n';
output += formatBlock('  :root', darkTokens, '    ').replace(/^}/m, '  }');
output += '\n}\n\n';
output += formatBlock('.dark', darkTokens);

writeFileSync(OUTPUT, output, 'utf8');
console.log(`Generated ${OUTPUT}`);
console.log(`  Light tokens: ${Object.keys(lightTokens).length}`);
console.log(`  Dark tokens: ${Object.keys(darkTokens).length}`);
