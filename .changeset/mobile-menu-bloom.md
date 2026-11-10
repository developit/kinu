---
"kinu": patch
---

Mobile floating menus now bloom open: the panel grows from a rounded seed at its origin with a spring and a resolving blur, and rows cascade in. Reduced motion falls back to opacity only.

All modal backdrops (dialog, sheet, sidebar, drawer, and `mobile="drawer"` menus and popovers) now let the page recede instead of washing it out: a lighter theme tint over a blurred, desaturated, lower-contrast view. Tune it with the new `--k-scrim-alpha` and `--k-scrim-filter` tokens.
