const n=`# Switch

Accessible toggle switch built from a checkbox input.

## Usage

\`\`\`tsx
import {Switch} from 'kinu';

<Switch checked />
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Switch | Toggle control | \`<input k="switch">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | \`boolean\` | — | Controls the checked state. |
| onChange | \`(event: Event) => void\` | — | Change handler for the switch. |
| disabled | \`boolean\` | — | Disable the switch. |
| name | \`string\` | — | Input name used for form submissions. |
| value | \`string | number | readonly string[] | undefined\` | — | Input value used for form submissions. |

## Notes

- It is just a checkbox under the hood so forms stay in sync.
- Use aria-label or pair with \`<Label>\` for accessible naming.

---

_Source: \`src/components/switch/index.tsx\`
`;export{n as default};
//# sourceMappingURL=switch-B2sZGMUc.js.map
