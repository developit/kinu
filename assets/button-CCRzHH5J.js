const n=`# Button

Button component that forwards props to \`<button>\` or \`<a>\` when href is provided.

## Usage

\`\`\`tsx
import {Button} from 'pui';

<Button variant="outline">Action</Button>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Button | Interactive action control | \`p="button"\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | \`ButtonVariant\` | 'default' | Visual style variant. |
| size | \`ButtonSize\` | 'md' | Size preset for the button. |
| loading | \`boolean\` | — | Shows a pending state and disables interactions. |
| href | \`string\` | — | When provided, renders the Button as an anchor element. |
| target | \`string | undefined | null\` | — | Target for anchor elements. |
| rel | \`string | undefined | null\` | — | Relationship between the current page and the linked resource. |
| onClick | \`(event: MouseEvent) => void | null\` | — | Click handler for the button. |
| disabled | \`boolean\` | — | Disables interactions and applies disabled styling. |
| type | \`string | undefined | null\` | — | Button type attribute. |

## Notes

- Use the loading attribute to reflect pending state without extra handlers.
- Supports size attributes (sm, md, lg, icon) controlled purely with CSS.

---

_Source: \`src/components/button/index.tsx\`
`;export{n as default};
//# sourceMappingURL=button-CCRzHH5J.js.map
