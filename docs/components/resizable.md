# Resizable

Wrapper that exposes the browser’s native resize handles.

## Import

```tsx
import {Resizable} from 'pui';
```

## Usage

```tsx
<Resizable style={{width: '200px', height: '120px'}}>
  Drag from the bottom-right corner to resize me.
</Resizable>
```

## Props

- Accepts `<div>` attributes. Override `style.resize` if you need only horizontal or vertical resizing.

## CSS hooks

- `[p="resizable"]` — sets the border, padding, and `resize: both` behaviour. Adjust padding or minimum sizes as needed.
