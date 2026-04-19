# Timeline

Vertical sequence of events with connecting line + dot markers.

## Usage

```tsx
import {Timeline} from 'kinu';

<Timeline>
  <Timeline.Entry time="2h ago">Jason pushed 3 commits</Timeline.Entry>
  <Timeline.Entry time="yesterday">Merged #234</Timeline.Entry>
</Timeline>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Timeline | Timeline container | — |
| Timeline.Entry | Timeline event | `<li k="timeline-entry">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| time | `string` | — | Optional trailing timestamp / label rendered next to the entry. |

## Notes

- Renders as `<ol>` + `<li>` so activity feeds and audit logs stay semantic.
- The connecting line is drawn by a single `::before` on the list, so it scales with entry count without `:last-child` juggling.
- Set a `time` prop on an entry to render a trailing timestamp via `content: attr(time)`; pass any string — "2h ago", "Mar 14", "08:12", etc.

---

_Source: `src/components/timeline/index.tsx`
