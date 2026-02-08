import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const postcss = require('postcss');

const root = resolve(__dirname, '..');
const outputDir = resolve(root, 'src/themes/radix');

// ============================================================================
// Selector Mapping Tables
// ============================================================================

const COMPONENT_MAP = {
  '.rt-BaseButton': '[p="button"]',
  '.rt-Button': '[p="button"]',
  '.rt-BaseCard': '[p="card"]',
  '.rt-Card': '[p="card"]',
  '.rt-TextFieldRoot': '[p="input"]',
  '.rt-TextFieldInput': '[p="input"]',
  '.rt-TextFieldSlot': '[p="input"]',
  '.rt-BaseCheckboxRoot': '[p="checkbox"]',
  '.rt-CheckboxRoot': '[p="checkbox"]',
  '.rt-BaseCheckboxIndicator': '[p="checkbox"]::after',
  '.rt-Badge': '[p="badge"]',
  '.rt-SwitchRoot': '[p="switch"]',
  '.rt-SwitchThumb': '[p="switch"]::before',
  '.rt-BaseDialogContent': '[p="dialog-content"]',
  '.rt-BaseDialogOverlay': '[p="dialog-content"]::backdrop',
  '.rt-BaseDialogScroll': '[p="dialog-content"]',
  '.rt-BaseDialogScrollPadding': '[p="dialog-content"]',
  '.rt-SelectTrigger': '[p="select"]',
  '.rt-SelectTriggerInner': '[p="select"]',
  '.rt-SelectContent': '[p="dropdown-content"]',
  '.rt-SelectItem': '[p="dropdown-menu-item"]',
  '.rt-SelectIcon': '[p="select"]::after',
  '.rt-SelectLabel': '[p="dropdown-content"]',
  '.rt-SelectViewport': '[p="dropdown-content"]',
  '.rt-SelectItemIndicatorIcon': '[p="dropdown-menu-item"]::before',
  '.rt-SliderRoot': '[p="slider"]',
  '.rt-SliderTrack': '[p="slider"]::before',
  '.rt-SliderRange': '[p="slider"]',
  '.rt-SliderThumb': '[p="slider"]::-webkit-slider-thumb',
  '.rt-BaseTabList': '[p="tablist"]',
  '.rt-BaseTabListTrigger': '[p="tab"]',
  '.rt-BaseTabListTriggerInner': '[p="tab"]',
  '.rt-BaseTabListTriggerInnerHidden': '[p="tab"][aria-hidden]',
  '.rt-TabNavLink': '[p="tab"]',
  '.rt-TabsContent': '[p="tab-panel"]',
  '.rt-Separator': '[p="separator"]',
  '.rt-ProgressRoot': '[p="progress"]',
  '.rt-ProgressIndicator': '[p="progress"]::-webkit-progress-value',
  '.rt-TextAreaRoot': '[p="textarea"]',
  '.rt-TextAreaInput': '[p="textarea"]',
  '.rt-TableRootTable': '[p="table"]',
  '.rt-TableRoot': '[p="table"]',
  '.rt-TableHeader': '[p="table"] thead',
  '.rt-TableBody': '[p="table"] tbody',
  '.rt-TableRow': '[p="table"] tr',
  '.rt-TableCell': '[p="table"] td',
  '.rt-TableColumnHeaderCell': '[p="table"] th',
  '.rt-ScrollAreaRoot': '[p="scroll-area"]',
  '.rt-ScrollAreaViewport': '[p="scroll-area"]',
  '.rt-ScrollAreaScrollbar': '[p="scroll-area"]::-webkit-scrollbar',
  '.rt-ScrollAreaViewportFocusRing': '[p="scroll-area"]:focus-visible',
  '.rt-AvatarRoot': '[p="avatar"]',
  '.rt-AvatarImage': '[p="avatar"] img',
  '.rt-AvatarFallback': '[p="avatar"]::before',
  '.rt-TooltipContent': '[p="tooltip"]',
  '.rt-TooltipText': '[p="tooltip"]',
  '.rt-TooltipArrow': '[p="tooltip"]::after',
  '.rt-Skeleton': '[p="skeleton"]',
  '.rt-PopoverContent': '[p="popover-content"]',
  '.rt-PopperContent': '[p="popover-content"]',
  '.rt-BaseRadioRoot': '[p="radio"]',
  '.rt-RadioGroupRoot': '[p="radio-group"]',
  '.rt-RadioGroupItem': '[p="radio"]',
  '.rt-ContextMenuContent': '[p="context-menu"]',
  '.rt-BaseMenuContent': '[p="dropdown-content"]',
  '.rt-BaseMenuItem': '[p="dropdown-menu-item"]',
  '.rt-BaseMenuCheckboxItem': '[p="dropdown-menu-item"]',
  '.rt-BaseMenuRadioItem': '[p="dropdown-menu-item"]',
  '.rt-BaseMenuLabel': '[p="dropdown-content"]',
  '.rt-BaseMenuShortcut': '[p="dropdown-menu-item"]',
  '.rt-BaseMenuSubTrigger': '[p="dropdown-menu-item"]',
  '.rt-BaseMenuSubTriggerIcon': '[p="dropdown-menu-item"]::after',
  '.rt-BaseMenuItemIndicatorIcon': '[p="dropdown-menu-item"]::before',
  '.rt-BaseMenuViewport': '[p="dropdown-content"]',
  '.rt-DropdownMenuContent': '[p="dropdown-content"]',
  '.rt-HoverCardContent': '[p="hover-card-content"]',
};

const VARIANT_MAP = {
  '.rt-variant-solid': '[variant="solid"]',
  '.rt-variant-soft': '[variant="soft"]',
  '.rt-variant-ghost': '[variant="ghost"]',
  '.rt-variant-outline': '[variant="outline"]',
  '.rt-variant-surface': '[variant="surface"]',
  '.rt-variant-classic': '[variant="classic"]',
};

const SIZE_MAP = {
  '.rt-r-size-1': '[size="1"]',
  '.rt-r-size-2': '[size="2"]',
  '.rt-r-size-3': '[size="3"]',
  '.rt-r-size-4': '[size="4"]',
  '.rt-r-size-5': '[size="5"]',
  '.rt-r-size-6': '[size="6"]',
  '.rt-r-size-7': '[size="7"]',
  '.rt-r-size-8': '[size="8"]',
  '.rt-r-size-9': '[size="9"]',
};

const ORIENTATION_MAP = {
  '.rt-r-orientation-horizontal': '[orientation="horizontal"]',
  '.rt-r-orientation-vertical': '[orientation="vertical"]',
};

const ALIGN_MAP = {
  '.rt-r-align-start': '[align="start"]',
  '.rt-r-align-center': '[align="center"]',
  '.rt-r-align-end': '[align="end"]',
};

const UTILITY_CLASS_MAP = {
  '.rt-one-letter': '[data-letters="1"]',
  '.rt-two-letters': '[data-letters="2"]',
};

// Components to completely ignore (no PUI equivalent)
const IGNORE_CLASSES = new Set([
  'rt-reset',
  'rt-Box', 'rt-Flex', 'rt-Grid', 'rt-Section',
  'rt-Container', 'rt-ContainerInner',
  'rt-Text', 'rt-Heading', 'rt-Em', 'rt-Strong',
  'rt-Code', 'rt-Blockquote', 'rt-Quote', 'rt-Kbd',
  'rt-ThemePanel', 'rt-ThemePanelRadioCard', 'rt-ThemePanelSwatch',
  'rt-Inset', 'rt-Link',
  'rt-SegmentedControl', 'rt-SegmentedControlRoot', 'rt-SegmentedControlItem',
  'rt-SegmentedControlIndicator', 'rt-SegmentedControlItemLabel',
  'rt-RadioCards', 'rt-RadioCardsRoot', 'rt-RadioCardsItem',
  'rt-CheckboxCards', 'rt-CheckboxCardsRoot', 'rt-CheckboxCardsItem',
  'rt-DataList', 'rt-DataListRoot', 'rt-DataListItem',
  'rt-CalloutRoot', 'rt-CalloutIcon',
  'rt-Spinner', 'rt-SpinnerLeaf',
  'rt-IconButton',
  'rt-TabNav', 'rt-TabNavLink',
]);

// Regex for responsive prefix classes to drop
const RESPONSIVE_PREFIX_RE = /\.(xs|sm|md|lg|xl)\\:/;

// ============================================================================
// Transformation Functions
// ============================================================================

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function transformSelector(selector) {
  let result = selector;
  let hasMapping = false;

  // 1. Check if this selector references any ignored component
  for (const ignoreClass of IGNORE_CLASSES) {
    const pattern = new RegExp(`\\.${ignoreClass}(?=[^a-zA-Z0-9-]|$)`);
    if (pattern.test(result)) {
      return null; // Drop this selector
    }
  }

  // 2. Skip responsive prefixed selectors
  if (RESPONSIVE_PREFIX_RE.test(result)) {
    return null;
  }

  // 3. Replace component classes with PUI attribute selectors
  for (const [radixClass, puiSelector] of Object.entries(COMPONENT_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      hasMapping = true;
      result = result.replace(pattern, puiSelector);
    }
  }

  // 4. Replace variant classes
  for (const [radixClass, puiAttr] of Object.entries(VARIANT_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      hasMapping = true;
      result = result.replace(pattern, puiAttr);
    }
  }

  // 5. Replace size classes
  for (const [radixClass, puiAttr] of Object.entries(SIZE_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      hasMapping = true;
      result = result.replace(pattern, puiAttr);
    }
  }

  // 5b. Replace orientation classes
  for (const [radixClass, puiAttr] of Object.entries(ORIENTATION_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      hasMapping = true;
      result = result.replace(pattern, puiAttr);
    }
  }

  // 5c. Replace alignment classes
  for (const [radixClass, puiAttr] of Object.entries(ALIGN_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      result = result.replace(pattern, puiAttr);
    }
  }

  // 5d. Replace utility classes
  for (const [radixClass, puiAttr] of Object.entries(UTILITY_CLASS_MAP)) {
    const escaped = escapeRegex(radixClass);
    const pattern = new RegExp(escaped + '(?=[^a-zA-Z0-9-]|$)', 'g');
    if (pattern.test(result)) {
      result = result.replace(pattern, puiAttr);
    }
  }

  // 6. Replace state selectors
  result = result
    .replace(/\[data-state=['"]checked['"]\]/g, ':checked')
    .replace(/\[data-state=['"]unchecked['"]\]/g, ':not(:checked)')
    .replace(/\[data-state=['"]open['"]\]/g, '[open]')
    .replace(/\[data-state=['"]closed['"]\]/g, ':not([open])')
    .replace(/\[data-disabled\]/g, ':disabled')
    .replace(/\.rt-high-contrast/g, '[high-contrast]')
    .replace(/\.rt-loading/g, '[loading]');

  // 7. Unwrap :where() around attribute selectors for proper specificity
  result = result.replace(/:where\((\[[^\]]+\])\)/g, '$1');

  // 8. Re-scope .radix-themes to :root
  result = result.replace(/\.radix-themes/g, ':root');

  // 9. Handle pseudo-element state reordering
  // Move state selectors before pseudo-elements: ::before:checked -> :checked::before
  result = result.replace(/(::(?:before|after|backdrop))((?::[\w-]+(?:\([^)]*\))?)+)/g, '$2$1');

  return hasMapping ? result : null;
}

function processComponentCSS(cssContent) {
  const ast = postcss.parse(cssContent);

  ast.walkRules((rule) => {
    const transformedSelectors = rule.selectors
      .map(sel => transformSelector(sel))
      .filter(sel => sel !== null);

    if (transformedSelectors.length === 0) {
      rule.remove();
      return;
    }

    rule.selector = transformedSelectors.join(',\n');
  });

  // Remove empty @media blocks
  ast.walkAtRules('media', (atRule) => {
    if (!atRule.nodes || atRule.nodes.length === 0) {
      atRule.remove();
    }
  });

  // Remove @keyframes that are Radix-specific (rt- prefixed)
  ast.walkAtRules('keyframes', (atRule) => {
    if (atRule.params.startsWith('rt-')) {
      atRule.remove();
    }
  });

  return ast.toString();
}

function processTokenCSS(cssContent) {
  const ast = postcss.parse(cssContent);

  ast.walkRules((rule) => {
    // Re-scope selectors
    rule.selector = rule.selector
      .replace(/\.radix-themes/g, ':root')
      .replace(/\.dark-theme/g, '.dark')
      .replace(/\.light-theme/g, '.light')
      .replace(/:where\(:root\)/g, ':root')
      // Simplify :root, .light, .light-theme to just :root, .light
      .replace(/:root,\s*\.light,\s*\.light/g, ':root, .light');
  });

  return ast.toString();
}

// ============================================================================
// Main Execution
// ============================================================================

console.log('🎨 Reprojecting Radix UI Themes CSS onto PUI selectors...\n');

// Read source CSS files
console.log('📖 Reading Radix CSS files...');
const componentsCSS = readFileSync(
  resolve(root, 'node_modules/@radix-ui/themes/components.css'),
  'utf8'
);
const tokensCSS = readFileSync(
  resolve(root, 'node_modules/@radix-ui/themes/tokens.css'),
  'utf8'
);

console.log(`   - components.css: ${componentsCSS.split('\n').length} lines`);
console.log(`   - tokens.css: ${tokensCSS.split('\n').length} lines\n`);

// Process component CSS
console.log('🔄 Transforming component CSS...');
const transformedComponents = processComponentCSS(componentsCSS);
console.log(`   - Output: ${transformedComponents.split('\n').length} lines\n`);

// Process token CSS
console.log('🔄 Transforming token CSS...');
const transformedTokens = processTokenCSS(tokensCSS);
console.log(`   - Output: ${transformedTokens.split('\n').length} lines\n`);

// Create output directory
console.log('📁 Creating output directory...');
mkdirSync(outputDir, { recursive: true });

// Write transformed CSS files
console.log('💾 Writing transformed CSS files...');
writeFileSync(
  resolve(outputDir, 'components.css'),
  `/* Auto-generated from @radix-ui/themes/components.css */\n/* Selectors remapped to PUI's [p="component"] system */\n\n${transformedComponents}`
);
writeFileSync(
  resolve(outputDir, 'tokens.css'),
  `/* Auto-generated from @radix-ui/themes/tokens.css */\n/* Re-scoped from .radix-themes to :root */\n\n${transformedTokens}`
);

// Create index.css entrypoint
console.log('📄 Creating theme entrypoint...');
const indexCSS = `/* Radix UI Themes reprojected onto PUI */
@import "./tokens.css";
@import "./components.css";
`;
writeFileSync(resolve(outputDir, 'index.css'), indexCSS);

console.log('\n✅ Radix theme generated successfully!');
console.log(`\n📦 Output location: ${outputDir}`);
console.log('\nTo use this theme in your demo:');
console.log('  import "pui/themes/radix/index.css";');
