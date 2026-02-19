const n=`# Popover

Lightweight popover using native dialog with trigger/content primitives.

## Usage

\`\`\`tsx
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from 'pui';

<Popover>
  <PopoverTrigger><Button>Open</Button></PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
\`\`\`

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Popover | Floating content | \`<span p="popover">\` |
| PopoverTrigger | Popover trigger | — |
| PopoverContent | Popover content | \`<dialog p="popover-content">\` |
| PopoverClose | Component | — |

## Props

### PopoverProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Optional ID for the popover content. If not provided, one will be auto-generated. |

### PopoverContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | \`string\` | — | Override the auto-generated dialog ID. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| PopoverContent | open | boolean | Reflects whether the element is expanded. |

## Notes

- Control placement with the placement attribute on PopoverContent.
- Stays declarative thanks to the commands polyfill.

---

_Source: \`src/components/popover/index.tsx\`
`;export{n as default};
//# sourceMappingURL=popover-CTVm9uWO.js.map
