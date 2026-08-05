# Base Styles

`kinu/style.css` ships the entire styling surface for the toolkit. Import it once near your application root to get:

- A modern reset that normalises box-sizing, typography smoothing, and dialog/backdrop defaults.
- Design tokens for light and dark themes exposed as `--k-*` custom properties.
- Every component selector keyed off its `p` attribute so variants render immediately on first paint.

The file intentionally avoids opinionated typography or layout decisions. Layer your own fonts, spacing scale, and page chrome on top—kinu only ensures components start from a consistent baseline.

## Import Order

Load `kinu/style.css` before any custom overrides so the shared tokens cascade correctly:

```ts
import 'kinu/style.css';
```

If you already have a global reset, audit it against the defaults in `style.css`. Keep the root-level tokens and dialog/backdrop rules so overlay components remain functional.

## Virtualization-free long lists

You rarely need a virtualization library. Add the `virtual` attribute to a scroll container — a `List`, a `Listbox` list, a
`Tree`, or any `[k]` wrapper — and the browser applies `content-visibility: auto` to its rows, skipping the layout and paint
of everything off-screen. Thousands of rows stay smooth with zero JavaScript:

```tsx
<List virtual style={{maxHeight: '20rem', overflow: 'auto'}}>
  {items.map((item) => (
    <List.Item key={item.id}>{item.label}</List.Item>
  ))}
</List>
```

Each row's `contain-intrinsic-size` defaults to an estimated `2.25rem` tall so the scrollbar is sized correctly before rows
render; override it for taller rows:

```css
[virtual] {
  --k-virtual-row: 3rem;
}
```

Because it is pure CSS, it composes with everything and degrades to normal rendering where `content-visibility` is
unsupported.
