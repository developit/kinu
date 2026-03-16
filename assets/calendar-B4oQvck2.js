const n=`# Calendar

Styled wrapper around the native \`<input type="date">\` element.

## Usage

\`\`\`tsx
import {Calendar} from 'kinu';

<Calendar />
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Calendar | Date picker | \`<input k="calendar">\` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | \`string | number | readonly string[] | undefined\` | — | Current date value. |
| onChange | \`(event: Event) => void\` | — | Change handler for date input. |
| disabled | \`boolean\` | — | Disable the input. |
| name | \`string\` | — | Input name used for form submissions. |

## Notes

- Forwards every standard input attribute, defaulting type to "date".
- Uses the browser's native date picker UI for accessibility and localisation.

---

_Source: \`src/components/calendar/index.tsx\`
`;export{n as default};
//# sourceMappingURL=calendar-B4oQvck2.js.map
