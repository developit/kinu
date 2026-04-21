# [kinu](https://kinu.sh) - Preact UI toolkit, 10x smaller than you think.

A hyper-minimal UI toolkit that feels like a Preact UI toolkit, but is actually progressively enhanced HTML. Where other UI toolkits implement logic and mappings in JS, Kinu does it all in CSS for maximal efficiency. Built for developers who value performance, simplicity, and the web platform.

## Why kinu?

- **🚀 Tiny Bundle**: ~5KB JS + ~6KB CSS for all components
- **⚡ Zero Re-renders**: No state, direct DOM reactions via native `commandFor` (polyfill included!)
- **🌐 Platform-Native**: Uses `<dialog>`, anchor positioning, form validation, etc
- **📦 Tree-Shakeable**: Import only what you use (though at 5kb who cares)
- **🎨 Beautiful and themeable**: Override styles for components or define your own

## Screenshots

_Default unbranded style:_

<img src="https://raw.githubusercontent.com/developit/kinu/refs/heads/main/demo/public/kinu-light.png" width="790">

_Purple-tinted rounded style in dark mode:_

<img src="https://raw.githubusercontent.com/developit/kinu/refs/heads/main/demo/public/kinu-dark.png" width="772">

## Quick Start

```bash
pnpm add kinu
```

```tsx
import { Button, Dialog, Input } from 'kinu';

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

Check out the [live demo](https://kinu.sh) to see all components in action.

## Documentation

- [Architecture Overview](./ARCHITECTURE.md) - Technical details and design decisions
- [Component Reference](./docs/components.md) - Complete component API documentation

## Development

```bash
# Run the demo app locally
cd demo
pnpm install
pnpm run dev
```

## License

MIT
