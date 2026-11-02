---
"kinu": minor
---

Add ViewStack and ViewStack.View: retained screens with CSS scroll-snap navigation, native swipes and progressive parallax effects. Navigation is focus — focusing a view (or any command targeting it) scrolls to it natively, with no browser-history integration. Function children render on a view's first visit; inactive views' content is inert.

Default touch swipes to back-only, with the forwarded `swipe="both"` prop enabling forward swipes through CSS.
