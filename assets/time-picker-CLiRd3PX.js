const n=`# Time Picker

Styled time input that shares the same foundation as Date Picker.

## Usage

\`\`\`tsx
import {TimePicker} from 'kinu';

<TimePicker />
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| TimePicker | Time input | \`<input k="time-picker">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | \`string \\| number \\| readonly string[] \\| undefined\` | — | Current time value in HH:MM or HH:MM:SS format. |
| onChange | \`(event: Event) => void\` | — | Change handler for time input. |
| disabled | \`boolean\` | — | Disable the input. |
| name | \`string\` | — | Input name used for form submissions. |
| step | \`number\` | — | Granularity in seconds. Common values: 60 (1 min), 900 (15 min), 1800 (30 min). |

## Notes

- Sets type="time" for you and forwards all native input props.
- Use \`step\` to constrain selectable intervals, e.g. \`step={1800}\` for 30-minute increments.

---

_Source: \`src/components/time-picker/index.tsx\`
`;export{n as default};
//# sourceMappingURL=time-picker-CLiRd3PX.js.map
