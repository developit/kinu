# Scroll Area

Simple overflow container that exposes thin scrollbars.

## Import

```tsx
import {ScrollArea} from 'pui';
```

## Usage

```tsx
<ScrollArea style={{maxHeight: '200px'}}>
  {items.map((item) => (
    <p key={item.id}>{item.label}</p>
  ))}
</ScrollArea>
```

## Props

- Accepts `<div>` attributes like `style`, `class`, and ARIA roles.

## CSS hooks

- `[p="scroll-area"]` — sets `overflow:auto` and thin scrollbars. Add padding/borders via inline styles or custom CSS.
