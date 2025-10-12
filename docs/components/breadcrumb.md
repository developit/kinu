# Breadcrumb

Composable breadcrumb navigation primitives.

## Import

```tsx
import {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink} from 'pui';
```

## Usage

```tsx
<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>Docs</BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Accessibility

Wrap the list in `<Breadcrumb aria-label="Breadcrumb">` (or use `aria-labelledby`) so screen readers recognise the navigation landmark. Mark the current page item without a link and avoid trailing separators.

## CSS hooks

- `[p="breadcrumb-list"]` — flex layout for the ordered list.
- `[p="breadcrumb-item"]::after` — separator glyph.
- `[p="breadcrumb-link"]` — link styling.
