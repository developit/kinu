# Typography

Global typographic reset that normalises headings, paragraphs, and lists.

## Import

```tsx
import 'pui/components/typography/style.css';
```

## Usage

Include the stylesheet once near your app root (the docs site already does this). It sets:

- Heading weights and line-height for `h1`–`h6`.
- Paragraph margins.
- List indentation.

## Notes

Because this is a CSS-only module there are no exports from TypeScript—importing the stylesheet is enough. Override rules in your own CSS if you need brand-specific typography.
