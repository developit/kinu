// @vitest-environment jsdom
import {afterEach, describe, expect, it} from 'vitest';
// Vite externalizes static node:fs imports in this jsdom environment.
const {readFileSync} = process.getBuiltinModule('fs');
const {fileURLToPath} = process.getBuiltinModule('url');

function readCss(path: string) {
  return readFileSync(
    fileURLToPath(new URL(path, import.meta.url).href),
    'utf8',
  );
}

// jsdom does not evaluate responsive layout. Inspect the real stylesheet's
// media rules to guard scope/opt-outs; geometry and cascade need a browser.
function mobileRules(path: string) {
  const style = document.createElement('style');
  style.textContent = readCss(path).replace(/^@import .*;$/gm, '');
  document.head.append(style);
  return Array.from(style.sheet!.cssRules)
    .filter(
      (rule): rule is CSSMediaRule =>
        'conditionText' in rule && rule.conditionText === '(max-width: 640px)',
    )
    .flatMap((rule) => Array.from(rule.cssRules) as CSSStyleRule[]);
}

function declarations(rules: CSSStyleRule[], el: Element, property: string) {
  return rules
    .filter((rule) => el.matches(rule.selectorText))
    .map((rule) => rule.style.getPropertyValue(property))
    .filter(Boolean);
}

afterEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  document.documentElement.removeAttribute('data-kinu-density');
});

describe('mobile menu stylesheet policy', () => {
  it('enlarges only default context/dropdown menus, not drawers or other overlays', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    for (const kind of [
      'dropdown-content',
      'context-menu',
      'popover-content',
      'combobox-list',
      'listbox-list',
      'list',
    ]) {
      for (const drawer of [false, true]) {
        const panel = document.createElement('div');
        panel.setAttribute('k', kind);
        if (drawer) panel.setAttribute('mobile', 'drawer');
        document.body.append(panel);
        const enlarged =
          !drawer && ['dropdown-content', 'context-menu'].includes(kind);
        expect(declarations(rules, panel, '--k-row-h')).toEqual(
          enlarged ? ['44px'] : [],
        );
        expect(declarations(rules, panel, '--k-row-font')).toEqual(
          enlarged ? ['17px'] : [],
        );
        const width = declarations(rules, panel, 'min-inline-size');
        expect(width).toHaveLength(enlarged ? 1 : 0);
        if (enlarged) {
          expect(width[0]).toContain('18rem');
          expect(width[0]).toContain('100vw');
        }
      }
    }
  });

  it('respects all explicit density settings, including the empty opt-out', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    const panel = document.createElement('dialog');
    panel.setAttribute('k', 'dropdown-content');
    document.body.append(panel);
    for (const density of ['', 'sm', 'md', 'lg']) {
      document.documentElement.setAttribute('data-kinu-density', density);
      expect(declarations(rules, panel, '--k-row-h')).toEqual([]);
      expect(declarations(rules, panel, '--k-row-font')).toEqual([]);
      expect(declarations(rules, panel, '--k-menu-radius')).not.toEqual([]);
    }
  });

  it('wraps menu actions and field rows, without changing other Item consumers', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    for (const kind of [
      'dropdown-content',
      'context-menu',
      'combobox-list',
      'list',
    ]) {
      document.body.innerHTML = `<div k="${kind}"><button k="item"></button><label k="item"></label></div>`;
      for (const item of document.querySelectorAll('[k="item"]')) {
        expect(declarations(rules, item, 'white-space')).toEqual(
          ['dropdown-content', 'context-menu'].includes(kind) ? ['normal'] : [],
        );
      }
    }
  });

  it('keeps coordinate clamping exclusive to floating context menus', () => {
    const rules = mobileRules('../components/context-menu/style.css');
    document.body.innerHTML =
      '<dialog k="context-menu"></dialog><dialog k="context-menu" mobile="drawer"></dialog>';
    const [floating, drawer] = document.querySelectorAll('dialog');
    expect(
      declarations(rules, floating, '--k-context-menu-shift-x')[0],
    ).toContain('100vw');
    expect(
      declarations(rules, floating, '--k-context-menu-shift-y')[0],
    ).toContain('100dvh');
    expect(declarations(rules, floating, '--k-menu-ox')[0]).toContain(
      '--k-context-menu-shift-x',
    );
    expect(declarations(rules, drawer, 'translate')).toEqual([]);
    expect(declarations(rules, floating, 'position-try-fallbacks')).toEqual([
      'none',
    ]);
  });

  it('uses one-pixel dividers for all separator representations, without a filled band', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    for (const kind of ['dropdown-content', 'context-menu']) {
      document.body.innerHTML = `<dialog k="${kind}"><hr><div role="separator"></div><div k="separator"></div></dialog>`;
      for (const separator of document.querySelector('dialog')!.children) {
        expect(declarations(rules, separator, 'height')).toEqual(['1px']);
        expect(parseFloat(declarations(rules, separator, 'border')[0])).toBe(0);
        expect(parseFloat(declarations(rules, separator, 'padding')[0])).toBe(
          0,
        );
        expect(declarations(rules, separator, 'line-height')).toEqual(['0']);
      }
    }
  });

  it('provides distinct entry/exit transitions only for floating menus', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    document.body.innerHTML =
      '<dialog k="dropdown-content"><button k="item"></button></dialog><dialog k="dropdown-content" mobile="drawer"><button k="item"></button></dialog>';
    const [floating, drawer] = document.querySelectorAll('dialog');
    for (const prop of ['clip-path', 'filter', 'transform']) {
      expect(declarations(rules, floating, prop)).toHaveLength(1);
      expect(declarations(rules, drawer, prop)).toEqual([]);
    }
    expect(declarations(rules, floating, 'transition')[0]).toContain(
      'allow-discrete',
    );
    floating.setAttribute('open', '');
    drawer.setAttribute('open', '');
    expect(declarations(rules, floating, 'filter')).toContain('none');
    expect(declarations(rules, floating, 'transition-duration')).toHaveLength(1);
    expect(declarations(rules, drawer, 'transition')).toEqual([]);
    expect(
      declarations(rules, floating.firstElementChild!, 'animation'),
    ).toHaveLength(1);
    expect(declarations(rules, drawer.firstElementChild!, 'animation')).toEqual(
      [],
    );
  });

  it('adds no mobile backdrop styling for menus; drawers share the global scrim', () => {
    const rules = mobileRules('../components/dropdown-menu/style.css');
    expect(rules.filter((rule) => rule.selectorText?.includes('::backdrop'))).toEqual([]);
  });

  it('allows claw to use mobile panel geometry while retaining desktop fallbacks', () => {
    const theme = readCss('../themes/claw.css');
    expect(theme).toContain('padding: var(--k-menu-padding, 6px)');
    expect(theme).toContain('border-radius: var(--k-menu-radius, 8px)');
  });
});
