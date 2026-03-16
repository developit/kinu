const n=`# Radio Group

Container that styles a set of native radio inputs.

## Usage

\`\`\`tsx
import {Radio, RadioGroup} from 'kinu';

<RadioGroup>
  <Radio name="plan" value="basic" />
  <Radio name="plan" value="pro" />
</RadioGroup>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| RadioGroup | Radio group | \`<div k="radio-group">\` |
| Radio | Radio input | \`<input k="radio">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | \`boolean\` | — | Controls the checked state. |
| name | \`string\` | — | Radio group name. |
| value | \`string | number | readonly string[] | undefined\` | — | Radio value used for form submissions. |
| onChange | \`(event: Event) => void\` | — | Change handler for the radio. |
| disabled | \`boolean\` | — | Disable the radio input. |

## Notes

- Radio renders an \`<input type="radio">\` so browser form behavior stays intact.
- Use the native name/value model or controlled props to manage selection.

---

_Source: \`src/components/radio-group/index.tsx\`
`;export{n as default};
//# sourceMappingURL=radio-group-DT-S49tR.js.map
