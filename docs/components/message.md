# Message

Chat message bubble with author-driven color and alignment.

## Usage

```tsx
import {Message} from 'kinu';

<Message from="user">
  <Message.Avatar>JM</Message.Avatar>
  <Message.Bubble>Hello</Message.Bubble>
</Message>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Message | Component | — |
| Message.Bubble | Component | `<div k="message-bubble">` |
| Message.Avatar | Component | `<div k="message-avatar">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| from | `MessageFrom` | — | Author of the message. |

## Notes

- Pure CSS: `<div k="message" from="user|assistant|system">`. `from` flips alignment and colors the bubble (user = primary, assistant = muted, system = quiet italic).
- Compound parts: `Message.Avatar` (a small round badge) and `Message.Bubble` (the content). Drop a `<Prose>` inside the bubble to render markdown.

---

_Source: `src/components/message/index.tsx`
