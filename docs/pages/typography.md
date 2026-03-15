# Typography

Typography in Kinu is delivered as CSS utility classes rather than components. Import the stylesheet once and use native HTML
elements for headings, paragraphs, and muted text.

```ts
import 'kinu/components/typography/style.css';
```

The stylesheet defines attribute selectors and utility classes such as:

- `[k="lead"]` — larger paragraph text for intros.
- `[k="muted"]` — subdued foreground color for secondary text.
- `[k="small"]` — small print text.

Because the CSS targets attributes, you can opt in without extra JavaScript:

```html
<h1 p="h1">Page title</h1>
<p p="lead">Short blurb that introduces the section.</p>
<p p="muted">Secondary information.</p>
```

Use semantic HTML elements wherever possible. The typography CSS simply layers design tokens and spacing on top of the elements
you already write.
