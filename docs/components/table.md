# Table

Drop-in styles for semantic `<table>` markup.

## Import

```tsx
import {Table} from 'pui';
```

## Usage

```tsx
<Table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jane</td>
      <td>jane@example.com</td>
    </tr>
  </tbody>
</Table>
```

## Props

- Accepts all `<table>` attributes, including `role`, `aria-describedby`, and custom class names.

## Accessibility

Use proper table semantics: `<caption>` for the table title, `<thead>`/`<tbody>` for structure, and `<th scope="col">` for headers.

## CSS hooks

- `[p="table"]` — base layout.
- `[p="table"] th`, `[p="table"] td` — cell styling.
