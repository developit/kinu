# Code

Styled code block and inline code with an optional copy button.

## Usage

```tsx
import {Code} from 'kinu';

<Code language="tsx">
  {snippet}
  <Code.Copy />
</Code>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Code | Component | — |
| Code.Copy | Component | `<button k="code-copy">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| inline | `boolean` | — | Render inline (`<code>`) instead of a block (`<pre>`). |
| language | `string` | — | Language hint. Advisory only — kinu ships no highlighter, but an opt-in
plugin can target `[k="code"][language]`, or you can pass pre-highlighted
markup as children. |

## Notes

- Pure CSS chrome over `<pre>` (block) or `<code inline>` (inline) — mono font, surface, radius, horizontal scroll. Zero JavaScript for the base.
- `Code.Copy` is a corner button (revealed on hover) that copies the enclosing block. Its label renders via CSS so it adds nothing to the copied text.
- No highlighter in core. The seam is the advisory `language` attribute (an opt-in plugin can target `[k="code"][language]`) and/or passing pre-highlighted markup as children — `Prose` already styles nested `<pre><code>`.

---

_Source: `src/components/code/index.tsx`
