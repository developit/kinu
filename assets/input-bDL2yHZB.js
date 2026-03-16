const n=`# Input

Text input with size, tone, and invalid states handled in CSS.

## Usage

\`\`\`tsx
import {Input} from 'kinu';

<Input placeholder="Email" type="email" />
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Input | Text input field | \`<input k="input">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| size | \`InputSize\` | 'md' | Size preset for the input field. |
| invalid | \`boolean\` | — | Marks the input as invalid for styling purposes. |
| value | \`string | number | readonly string[] | undefined\` | — | Input value. |
| type | \`string | undefined\` | — | Input type attribute. |
| placeholder | \`string\` | — | Placeholder text for the input. |
| onInput | \`(event: InputEvent) => void\` | — | Change handler for controlled inputs. |
| onBlur | \`(event: FocusEvent) => void\` | — | Blur handler. |
| onFocus | \`(event: FocusEvent) => void\` | — | Focus handler. |
| disabled | \`boolean\` | — | Disables interactions and applies disabled styling. |
| name | \`string\` | — | Input name attribute used for form submissions. |

## Notes

- Wraps the native \`<input>\` element so forms behave as expected.
- Supports size="sm" and size="lg" for compact or spacious layouts.

---

_Source: \`src/components/input/index.tsx\`
`;export{n as default};
//# sourceMappingURL=input-bDL2yHZB.js.map
