# PUI - Performance-Focused Preact UI Toolkit

A minimal, constraint-driven UI toolkit that enhances HTML instead of replacing it. Built for developers who value performance, simplicity, and the web platform.

## Why PUI?

- **🚀 Tiny Bundle**: ~5KB JS + ~6KB CSS for all components
- **⚡ Zero Re-renders**: No state, direct DOM reactions via native `commandFor` (with fallback)
- **🌐 Platform-Native**: Uses `<dialog>`, form validation, CSS custom properties
- **📦 Tree-Shakeable**: Import only what you use
- **🎨 Beautiful by Default**: Carefully crafted design system

## Screenshot

<img src="demo/public/pui-1.png" width="784">

## Quick Start

```bash
pnpm add pui
```

```tsx
import { Button, Dialog, Input } from 'pui';

function App() {
  return (
    <>
      <Button variant="outline" size="lg">
        Click me
      </Button>

      <Dialog>
        <Dialog.Trigger>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <h2>Hello World</h2>
          <Input placeholder="Type something..." />
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

## Live Demo

Check out the [live demo](https://pui-demo.netlify.app) to see all components in action.

## Documentation

- [Architecture Overview](./ARCHITECTURE.md) - Technical details and design decisions
- [Component Reference](./docs/components.md) - Complete component API documentation

## Releases (Changesets + npm Trusted Publishing)

This repo publishes from `main` using Changesets and GitHub Actions OIDC (trusted publishing).

### One-time setup required

1. In npm package settings for `pui`, add a **Trusted Publisher** pointing to this GitHub repository and the `.github/workflows/release.yml` workflow on branch `main`.
2. In GitHub repo settings, allow Actions to create and approve pull requests (needed for the Changesets release PR flow).
3. Do **not** add `NPM_TOKEN` secrets for publishing; the workflow uses OIDC (`id-token: write`) instead.

After setup, merge PRs with changesets. The release workflow will either:
- open/update a release PR, or
- publish to npm when the release PR is merged.

## Development

```bash
# Run the demo app locally
cd demo
pnpm install
pnpm run dev
```

## License

MIT
