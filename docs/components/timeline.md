# Timeline

Vertical sequence of events with connecting line + dot markers.

## Usage

```tsx
import {Timeline} from 'kinu';

<Timeline>
  <Timeline.Entry>
    Jason pushed 3 commits
    <time>2h ago</time>
  </Timeline.Entry>
</Timeline>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Timeline | Timeline container | — |
| Timeline.Entry | Timeline event | `<li k="timeline-entry">` |

## Notes

- Renders as `<ol>` + `<li>` so activity feeds and audit logs stay semantic.
- Dot and connector line are both drawn on each entry from one `--k-timeline-x` variable (the dot radius), so they can't drift out of alignment.
- Drop a native `<time>` element inside an entry for the trailing timestamp — add `dateTime="..."` for machine-readable semantics.

---

_Source: `src/components/timeline/index.tsx`
