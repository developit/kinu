# PUI - Recommended Next Steps for Publishing

This document outlines researched tasks to make PUI ready for npm publishing and extremely competitive with shadcn/ui.

---

## Executive Summary

PUI is already in excellent shape with a solid architecture:
- **~17KB JS** (5KB gzipped) + **~28KB CSS** (6KB gzipped) for all 43+ components
- Clean factory-based component architecture
- CSS-driven logic via attribute selectors
- Native platform integration (dialog, details, etc.)
- Preact-first with minimal runtime overhead

The following tasks would make PUI ready for an initial release that stands out against competitors like shadcn/ui.

---

## High Priority Tasks

### 1. NPM Publishing Preparation

**Goal:** Prepare the package for npm publishing with proper metadata and documentation.

**Current State:**
- `package.json` exists with basic metadata
- No LICENSE file
- No CHANGELOG
- No contribution guidelines

**Actions Required:**
```bash
# Files to add:
- LICENSE (MIT as per package.json)
- CHANGELOG.md
- CONTRIBUTING.md
```

**package.json updates needed:**
```json
{
  "name": "@pui/core",  // or "pui-preact" to avoid conflicts
  "repository": {
    "type": "git",
    "url": "https://github.com/developit/pui.git"
  },
  "bugs": {
    "url": "https://github.com/developit/pui/issues"
  },
  "homepage": "https://pui-demo.netlify.app"
}
```

**Verification:**
- Run `npm pack --dry-run` to verify published contents
- Ensure `dist/` contains only necessary files
- Test installation from tarball in a fresh project

**Estimated Effort:** 1-2 hours

---

### 2. TypeScript Type Definitions Export

**Goal:** Ensure TypeScript consumers get proper type definitions.

**Current State:**
- `types` field points to `./dist/index.d.ts`
- Build does NOT currently generate `.d.ts` files
- Types exist in source but aren't extracted

**Actions Required:**
1. Add TypeScript declaration generation to build:
   ```bash
   # Option A: Use vite-plugin-dts
   pnpm add -D vite-plugin-dts
   ```
   
2. Update `vite.config.ts`:
   ```ts
   import dts from 'vite-plugin-dts';
   
   export default defineConfig({
     plugins: [dts({ include: ['src'] })],
     // ...existing config
   });
   ```

3. Alternatively, run `tsc` after vite build:
   ```json
   {
     "scripts": {
       "build": "vite build && tsc --declaration --emitDeclarationOnly --outDir dist"
     }
   }
   ```

**TypeScript config adjustments:**
```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true
  }
}
```

**Verification:**
- Build and check `dist/index.d.ts` exists
- Import in a TS project and verify IntelliSense works

**Estimated Effort:** 2-3 hours

---

### 3. Tailwind CSS Compatibility

**Goal:** Allow PUI to work seamlessly with Tailwind CSS projects.

**Current State:**
- PUI uses CSS custom properties (`--p-*`)
- Styles are applied via `[p="component"]` attribute selectors
- No Tailwind integration exists

**Strategy: Non-Breaking Coexistence**

PUI's architecture is already Tailwind-compatible because:
1. It doesn't use global element selectors
2. All component styles scope to `[p="..."]` attributes
3. CSS variables can be mapped to Tailwind's design tokens

**Implementation Options:**

**Option A: Tailwind Plugin (Recommended)**
Create `tailwind-preset.js` or a separate `@pui/tailwind` package:

```js
// tailwind-preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Map PUI tokens to Tailwind
        'pui-background': 'hsl(var(--p-background))',
        'pui-foreground': 'hsl(var(--p-foreground))',
        'pui-primary': 'hsl(var(--p-primary))',
        'pui-primary-foreground': 'hsl(var(--p-primary-foreground))',
        'pui-secondary': 'hsl(var(--p-secondary))',
        'pui-secondary-foreground': 'hsl(var(--p-secondary-foreground))',
        'pui-muted': 'hsl(var(--p-muted))',
        'pui-muted-foreground': 'hsl(var(--p-muted-foreground))',
        'pui-accent': 'hsl(var(--p-accent))',
        'pui-accent-foreground': 'hsl(var(--p-accent-foreground))',
        'pui-destructive': 'hsl(var(--p-destructive))',
        'pui-destructive-foreground': 'hsl(var(--p-destructive-foreground))',
        'pui-border': 'hsl(var(--p-border))',
        'pui-input': 'hsl(var(--p-input))',
        'pui-ring': 'hsl(var(--p-ring))',
      },
      borderRadius: {
        'pui': 'var(--p-radius)',
      },
    },
  },
};
```

**Option B: CSS Variables Only (Simpler)**
Document how to use PUI with Tailwind by importing the CSS:

```tsx
// app.tsx
import 'pui/style.css';  // Import PUI styles first
import './tailwind.css';  // Tailwind after (or before)

// Now you can use both:
<Button className="mt-4 px-8">Mixed Styling</Button>
```

**Option C: shadcn/ui Token Compatibility**
Map PUI tokens to match shadcn/ui's naming convention:

```css
:root {
  /* shadcn-compatible aliases */
  --background: var(--p-background);
  --foreground: var(--p-foreground);
  --primary: var(--p-primary);
  --primary-foreground: var(--p-primary-foreground);
  /* etc. */
}
```

**Documentation to Add:**
- `docs/pages/tailwind.md` explaining integration
- Example project in `examples/with-tailwind/`

**Verification:**
- Create test project with Tailwind + PUI
- Verify no style conflicts
- Test dark mode toggling

**Estimated Effort:** 4-6 hours

---

### 4. React Compatibility Layer

**Goal:** Allow React projects to use PUI (massive market expansion).

**Current State:**
- PUI is Preact-only
- Uses `preact/hooks` and `preact/compat` types

**Strategy: Dual Package Build**

Preact components work in React via `preact/compat`, but a native React build is cleaner.

**Implementation:**

1. Create `src/index-react.ts` with React imports:
   ```ts
   // Switch imports from 'preact' to 'react'
   export * from './components/button';
   // etc.
   ```

2. Use package.json exports for dual builds:
   ```json
   {
     "exports": {
       ".": {
         "preact": "./dist/preact/index.js",
         "react": "./dist/react/index.js",
         "default": "./dist/preact/index.js"
       }
     }
   }
   ```

3. Build script generates both:
   ```bash
   # Build for Preact (default)
   vite build --outDir dist/preact
   
   # Build for React (with preact-compat aliased to react)
   vite build --outDir dist/react --config vite.config.react.ts
   ```

**Alternative (simpler):**
Document using with `preact/compat` in React projects:
```js
// vite.config.js or webpack config
alias: {
  'react': 'preact/compat',
  'react-dom': 'preact/compat',
}
```

**Estimated Effort:** 8-12 hours (full dual build) or 2 hours (documentation only)

---

### 5. Component API Completeness Audit

**Goal:** Ensure all components have feature parity with shadcn/ui.

**Current State Analysis:**

| Component | PUI Status | shadcn/ui Parity | Notes |
|-----------|------------|------------------|-------|
| Button | ✅ Complete | ✅ | All variants present |
| Input | ✅ Complete | ✅ | Size variants, validation |
| Dialog | ✅ Complete | ✅ | Uses native dialog |
| Card | ✅ Complete | ✅ | |
| Accordion | ✅ Complete | ✅ | Uses details/summary |
| Tabs | ⚠️ Basic | Partial | Missing keyboard nav |
| Select | ✅ Complete | ✅ | Native select |
| Checkbox | ✅ Complete | ✅ | |
| Radio | ✅ Complete | ✅ | |
| Switch | ✅ Complete | ✅ | |
| Slider | ✅ Complete | ✅ | |
| Progress | ✅ Complete | ✅ | |
| Toast | ✅ Complete | ✅ | Event-driven |
| Tooltip | ⚠️ Basic | Partial | CSS-only, no positioning |
| Popover | ✅ Complete | ✅ | |
| DropdownMenu | ✅ Complete | ✅ | |
| ContextMenu | ✅ Complete | ✅ | |
| Combobox | ✅ Complete | ✅ | |
| Calendar | ⚠️ Basic | Partial | Uses native input |
| DatePicker | ⚠️ Basic | Partial | Uses native input |
| Form | ❌ Missing | Missing | Form validation helpers |
| Command | ❌ Missing | Missing | cmdk-style command palette |

**Priority Enhancements:**

1. **Tabs keyboard navigation** - Arrow keys, Home/End
2. **Tooltip positioning** - Currently CSS-only (top placement)
3. **Form validation wrapper** - Composable form with error messages
4. **Command palette** - High-impact feature for power users

**Estimated Effort:** 4-8 hours per component enhancement

---

### 6. Accessibility (a11y) Audit

**Goal:** Ensure WCAG 2.1 AA compliance.

**Current State:**
- Uses semantic HTML elements
- Some ARIA attributes present
- Missing focus management in some components

**Audit Checklist:**

- [ ] **Keyboard Navigation** - All interactive elements reachable
- [ ] **Focus Indicators** - Visible focus rings (currently present)
- [ ] **Screen Reader Labels** - aria-label, aria-describedby
- [ ] **Role Attributes** - Proper ARIA roles for custom widgets
- [ ] **Color Contrast** - 4.5:1 ratio for text
- [ ] **Motion** - Respect prefers-reduced-motion

**Components Needing Attention:**

1. **Tabs** - Add `role="tablist"`, `aria-selected`, keyboard nav
2. **Dialog** - Focus trap, return focus on close
3. **Combobox** - `aria-expanded`, `aria-activedescendant`
4. **DropdownMenu** - Proper menu roles

**Actions:**
```css
/* Add to base.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Verification:**
- Run axe-core or Lighthouse accessibility audit
- Test with screen reader (VoiceOver, NVDA)
- Keyboard-only navigation test

**Estimated Effort:** 6-10 hours

---

### 7. Documentation Website Enhancement

**Goal:** Create compelling documentation that rivals shadcn/ui.

**Current State:**
- Basic documentation exists in `docs/`
- Demo app at `demo/src/`
- Markdown-based component docs

**Enhancements Needed:**

1. **Copy-to-Clipboard for Code Examples**
   - Add copy button to all code blocks
   
2. **Live Component Previews**
   - Interactive demos for each component
   
3. **API Reference Tables**
   - Props, types, defaults for each component
   
4. **Installation Wizard**
   - Step-by-step setup guide
   
5. **Search Functionality**
   - Quick search across all docs
   
6. **Dark Mode Toggle**
   - Demonstrate theming in action

**Content Additions:**

- `docs/pages/installation.md` - Detailed setup
- `docs/pages/tailwind.md` - Tailwind integration
- `docs/pages/react.md` - React usage guide
- `docs/pages/migration.md` - Migrating from shadcn/ui
- `docs/examples/` - Real-world examples

**Estimated Effort:** 12-20 hours

---

### 8. Bundle Size Optimization

**Goal:** Maintain industry-leading bundle size.

**Current State:**
- 17.12 KB JS (4.96 KB gzipped)
- 28.21 KB CSS (5.67 KB gzipped)
- Already very competitive

**Opportunities:**

1. **CSS Minification** - Verify optimal minification
2. **Unused Code Elimination** - Tree-shaking validation
3. **Critical CSS Split** - Optional split for core vs. advanced

**Actions:**
```bash
# Analyze bundle
npx vite-bundle-visualizer

# Compare with competition
# shadcn/ui: ~varies by component (but larger per component)
# Radix UI: ~10-20KB per primitive
```

**Verification:**
- Size comparison table in README
- CI check for size regression

**Estimated Effort:** 2-4 hours

---

### 9. Testing Infrastructure

**Goal:** Comprehensive test coverage.

**Current State:**
- Single SSR smoke test exists
- Using Vitest

**Testing Additions Needed:**

1. **Component Unit Tests**
   ```ts
   // Example structure
   src/components/button/__tests__/button.test.tsx
   ```

2. **Integration Tests**
   - Form submission flows
   - Dialog open/close cycles
   
3. **Visual Regression Tests**
   - Playwright or Storybook
   
4. **Accessibility Tests**
   - axe-core integration

**Recommended Coverage:**
- All components have at least one render test
- Interactive components have behavior tests
- SSR compatibility verified

**Estimated Effort:** 8-16 hours

---

### 10. CI/CD Pipeline Enhancement

**Goal:** Automated quality gates.

**Current State:**
- `deploy.yml` - Demo deployment
- `size.yml` - Bundle size tracking

**Additions Needed:**

1. **Test Workflow**
   ```yaml
   name: Test
   on: [push, pull_request]
   jobs:
     test:
       - run: pnpm test
       - run: pnpm lint
   ```

2. **NPM Publish Workflow**
   ```yaml
   name: Publish
   on:
     release:
       types: [published]
   jobs:
     publish:
       - run: npm publish
   ```

3. **Accessibility Check**
   ```yaml
   - run: pnpm test:a11y
   ```

**Estimated Effort:** 2-4 hours

---

## Medium Priority Tasks

### 11. Theming System Enhancement

**Goal:** Make customization easier.

**Actions:**
- Create theme generator utility
- Add more design token presets
- Document CSS variable overrides thoroughly

**Estimated Effort:** 4-6 hours

---

### 12. Animation System

**Goal:** Consistent, performant animations.

**Current State:**
- Uses CSS transitions and keyframes
- Custom easing functions defined

**Enhancement:**
- Document animation customization
- Add `prefers-reduced-motion` support
- Consider CSS motion paths for complex animations

**Estimated Effort:** 3-5 hours

---

### 13. Server Component Support

**Goal:** Compatible with RSC/Next.js App Router.

**Actions:**
- Mark components as client/server compatible
- Add `"use client"` directives where needed
- Test in Next.js 14+ environment

**Estimated Effort:** 4-6 hours

---

### 14. Example Projects

**Goal:** Show PUI in real applications.

**Examples to Create:**
- `examples/with-tailwind/` - Tailwind integration
- `examples/with-nextjs/` - Next.js setup
- `examples/with-vite/` - Vanilla Vite
- `examples/dashboard/` - Admin dashboard
- `examples/marketing/` - Landing page

**Estimated Effort:** 2-4 hours per example

---

## Low Priority Tasks (Post-Launch)

### 15. CLI Tool (like shadcn/ui add)

**Goal:** Component scaffolding tool.

```bash
npx pui add button dialog input
```

This would copy component source into user's project, similar to shadcn/ui's approach but optional.

**Estimated Effort:** 12-20 hours

---

### 16. Figma Design Kit

**Goal:** Designer-developer workflow.

- Figma components matching PUI
- Design tokens sync

**Estimated Effort:** 20-40 hours

---

### 17. VS Code Extension

**Goal:** IntelliSense for PUI attributes.

- Autocomplete for `variant`, `size`, etc.
- CSS variable suggestions

**Estimated Effort:** 8-12 hours

---

## Task Priority Matrix

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 🔴 Critical | NPM Publishing Prep | High | Low |
| 🔴 Critical | TypeScript Definitions | High | Medium |
| 🔴 Critical | Tailwind Compatibility | High | Medium |
| 🟠 High | a11y Audit | High | Medium |
| 🟠 High | Component Completeness | Medium | High |
| 🟠 High | Documentation | High | High |
| 🟡 Medium | Testing | Medium | Medium |
| 🟡 Medium | React Compat | Medium | High |
| 🟢 Low | CLI Tool | Low | High |
| 🟢 Low | Figma Kit | Low | Very High |

---

## Implementation Roadmap

### Phase 1: Publishing Ready (1-2 weeks)
1. NPM publishing preparation
2. TypeScript definitions
3. Basic Tailwind documentation
4. README polish

### Phase 2: Feature Complete (2-4 weeks)
5. Component enhancements
6. Accessibility audit
7. Testing infrastructure
8. Documentation website

### Phase 3: Ecosystem (4-8 weeks)
9. React compatibility
10. Example projects
11. CLI tool
12. Community building

---

## Competitive Differentiators vs shadcn/ui

| Feature | PUI | shadcn/ui |
|---------|-----|-----------|
| Bundle Size | ~5KB JS gzipped | Varies, often larger |
| Architecture | Single package | Copy-paste source |
| Platform Native | Uses dialog, details | Custom implementations |
| Runtime Overhead | Near-zero | Radix primitives overhead |
| CSS Logic | Attribute selectors | Class-based |
| Framework | Preact-first | React-first |
| Customization | CSS variables | Tailwind classes |
| Dependencies | Zero runtime deps | Radix UI required |

**Marketing Angles:**
1. "The world's smallest full-featured UI kit"
2. "Platform-native components for Preact"
3. "Zero runtime dependencies"
4. "CSS-first logic - no JavaScript branching"

---

## Appendix: File Structure for Tasks

```
pui/
├── LICENSE                    # Task 1
├── CHANGELOG.md               # Task 1
├── CONTRIBUTING.md            # Task 1
├── tailwind-preset.js         # Task 3
├── examples/                  # Task 14
│   ├── with-tailwind/
│   ├── with-nextjs/
│   └── with-vite/
├── docs/
│   └── pages/
│       ├── installation.md    # Task 7
│       ├── tailwind.md        # Task 3
│       └── react.md           # Task 4
└── src/
    └── components/
        └── */__tests__/       # Task 9
```
