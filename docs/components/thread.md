# Thread

Message list that sticks to the bottom as new messages arrive.

## Usage

```tsx
import {Thread} from 'kinu';

<Thread scrollable style={{height: '20rem'}}>
  <Message from="user"><Message.Bubble>Hi</Message.Bubble></Message>
</Thread>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Thread | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| scrollable | `boolean` | — | Make the thread a scroll container that sticks to the bottom as new
messages arrive (via native scroll anchoring — no scroll loop). |

## Notes

- Pass `scrollable` to make it a scroll container. New messages pin the viewport to the bottom via native scroll anchoring (a 1px bottom anchor) — no `scrollTo` loop and no JavaScript.
- Progressive enhancement: where scroll anchoring is unsupported it degrades to a normal scroll container.
- Fill it with `Message` components; size it with a height (or let it fill a flex parent).

---

_Source: `src/components/thread/index.tsx`
