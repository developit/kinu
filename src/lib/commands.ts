/** Wraps an installer so it runs once, on the client only. */
function once(install: () => void) {
  let done: boolean;
  return () => {
    if (!done && typeof document !== 'undefined') {
      done = true;
      install();
    }
  };
}

/**
 * Every overlay family's document listeners, installed together: they are a
 * handful of capture listeners that each bail on the first check for anything
 * that isn't theirs, so one install is cheaper than tracking which family
 * needs which.
 *
 * The command polyfill is intentionally installed even where native Invoker
 * Commands exist: kinu supports command sources beyond <button> (e.g. a menu
 * closing itself on item click), and the preventDefault() in the handler
 * suppresses native double-invocation for button triggers.
 */
export const installOverlays = /*#__PURE__*/ once(() => {
  addEventListener('click', commandClickHandler);
  addEventListener('click', dialogsDropdownsClickHandler, true);
  // Capture phase: native popover/dialog beforetoggle events don't bubble,
  // but capture still visits the target from the window.
  addEventListener('beforetoggle', adaptiveToggle, true);
  addEventListener('beforetoggle', swipeToggle as EventListener, true);
  addEventListener('scrollend', swipeSettle, true);
  // Safari only shipped scrollend in 26.2, so older WebKit would never dismiss.
  // Plain scroll is a sound substitute *here* because every dismiss position is
  // a scroll boundary (offset 0, or max) and scroll-snap-stop stops the panel
  // at every resting position in between — it can't pass through the boundary
  // en route to somewhere else, so arriving there is already proof of a
  // dismiss. That holds however many detents sit in between. The difference is
  // that a slow drag held at the boundary closes on arrival rather than on
  // release, which is why this stays off where scrollend exists.
  if (!('onscrollend' in document)) addEventListener('scroll', swipeSettle, true);
});

let topLayerOverlays: boolean | undefined;
/**
 * Overlays run in top-layer popover mode only where CSS anchor positioning is
 * available — without anchors, a top-layer popover's absolute-position
 * fallback would resolve against the viewport instead of near its trigger.
 * Otherwise they fall back to `<dialog>.show()`. The condition is
 * popover/style.css's @supports verbatim, so JS and CSS always agree (every
 * engine that passes it has the Popover API too). Only ever called from event
 * handlers, so `CSS` is always there.
 */
export function usePopoverOverlays() {
  return (topLayerOverlays ??= CSS.supports(
    '(position-anchor: --k-trigger) and (position-try-fallbacks: --k-menu-right-top)',
  ));
}

function elementTarget(node: EventTarget) {
  return 'closest' in node
    ? (node as Element)
    : ((node as Node).parentNode as Element);
}

function commandClickHandler(e: MouseEvent) {
  const el = elementTarget(e.target!);
  const trigger = el.closest<Element>('[command]');
  if (!trigger || e.defaultPrevented) return;

  const commandFor = trigger.getAttribute('commandfor');
  const target = commandFor ? document.getElementById(commandFor) : el;
  if (!target) return;
  e.preventDefault();

  const command = trigger.getAttribute('command') || 'toggle-popover';
  if (command[0] === '-') {
    target.dispatchEvent(
      Object.assign(new Event('command', {bubbles: true, cancelable: true}), {source: trigger, command}),
    );
    return;
  }

  let method = command.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (usePopoverOverlays()) {
    // `close` closes the target however it is currently shown (modal or popover).
    if (method === 'close' && target.matches(':popover-open')) method = 'hidePopover';
  } else if (/Popover$/.test(method)) {
    // Popover commands fall back to the equivalent <dialog> methods when
    // top-layer popover mode is unavailable (kinu overlays are <dialog popover>).
    method =
      method === 'hidePopover' || (method === 'togglePopover' && (target as HTMLDialogElement).open)
        ? 'close'
        : 'show';
  }
  if (
    method === 'show' &&
    !target.dispatchEvent(
      Object.assign(new Event('beforetoggle', {cancelable: true, bubbles: true}), {newState: 'open'}),
    )
  ) {
    return;
  }
  (target as any)[method]?.();
  // showPopover leaves focus on the invoker; mirror dialog.show()'s focus
  // behavior so menu keyboard navigation lands inside the overlay.
  if (
    /Popover$/.test(method) &&
    target.matches(':popover-open') &&
    !target.contains(document.activeElement)
  ) {
    (target.querySelector<HTMLElement>('[autofocus]') || (target as HTMLElement)).focus();
  }
}

let allowToggle: boolean;
/* Opens a popover modally instead when CSS says so (--modal), e.g. a
 * mobile="drawer" sheet. */
function adaptiveToggle(e: Event) {
  const el = e.target as HTMLDialogElement;
  if (allowToggle || (e as ToggleEvent).newState !== 'open') return;
  if (!cssVar(el, '--modal')) return;
  e.preventDefault();
  allowToggle = true;
  el.showModal();
  allowToggle = false;
}

function dialogsDropdownsClickHandler(e: MouseEvent) {
  const target = e.target as Element;

  if (target.matches('dialog[k]')) {
    const dialog = target as HTMLDialogElement;

    // Swipe overlays span the whole viewport, so backdrop clicks land on the
    // dialog itself. The rail occupies one full viewport-length of scroll; a
    // click whose scroll-relative coordinate falls within it is a dismiss tap.
    // Tested before the native-closedby bail, because a click inside the
    // dialog's own box is never a native light dismiss.
    //
    // Otherwise: close on backdrop click — a fallback where native `closedby`
    // light dismiss is unsupported, honoring the same attribute semantics.
    const swipe = swipeAxis(dialog);
    const closedby = dialog.getAttribute('closedby');
    const r = dialog.getBoundingClientRect();
    if (
      swipe
        ? swipe === 'x' ? dialog.scrollLeft + e.clientX < dialog.clientWidth
          : swipe === '-x' ? dialog.scrollLeft + e.clientX >= dialog.scrollWidth - dialog.clientWidth
          : dialog.scrollTop + e.clientY < dialog.clientHeight
        : !('closedBy' in HTMLDialogElement.prototype) &&
          closedby !== 'closerequest' &&
          closedby !== 'none' &&
          (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
    ) {
      dialog.close();
      e.preventDefault();
      return;
    }
    if (swipe) return;
  }

  // close other dropdowns — fallback where top-layer popover mode (with its
  // native light dismiss) is unavailable
  if (!usePopoverOverlays()) {
    for (const el of document.querySelectorAll<HTMLDialogElement>(
      '[k="dropdown-content"],[k="popover-content"]',
    )) {
      if (!el.contains(target)) {
        el.close();
      }
    }
  }
}

export const installMenuShortcuts = /*#__PURE__*/ once(() =>
  addEventListener('keydown', handleMenuShortcutsKeydown),
);

function handleMenuShortcutsKeydown(e: KeyboardEvent) {
  const el = elementTarget(e.target!);
  // Inside a menu or list, items take real focus; from outside (a combobox or
  // listbox input) the open list's [selected] item is a pseudo-focus.
  let container: Element | null | undefined = el.closest('dialog[k]') || el.closest('[k="list"]');
  const useFocus = !!container;
  container ||=
    el.parentNode!.querySelector(
      usePopoverOverlays() ? 'dialog[k][open], dialog[k]:popover-open' : 'dialog[k][open]',
    ) || el.closest('[k="listbox"]')?.querySelector('[k="listbox-list"]');
  if (!container) return;
  const selected = container.querySelector<HTMLElement>(
    useFocus ? '[k="item"]:focus' : '[k="item"][selected]',
  );
  // emulate button enter key behavior for pseudo-focused selection
  if (e.key === 'Enter' && !useFocus) {
    e.preventDefault();
    selected?.click();
    return;
  }
  const dir = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
  if (!dir) return;
  e.preventDefault();
  let next = selected;
  if (next) {
    do next = next[dir > 0 ? 'nextElementSibling' : 'previousElementSibling'] as HTMLElement | null;
    while (next && next.getAttribute('k') !== 'item');
  } else {
    const items = container.querySelectorAll<HTMLElement>('[k="item"]');
    next = items[dir > 0 ? 0 : items.length - 1];
  }
  if (!next) return;
  if (useFocus) next.focus();
  else {
    selected?.toggleAttribute('selected', false);
    next.toggleAttribute('selected', true);
  }
}

// Swipe-to-dismiss for overlay panels.
//
// CSS opts a dialog in by setting --swipe to a value encoding the axis and
// direction: "y" (drawer, dismiss at scrollTop 0), "x" (sheet, dismiss at
// scrollLeft 0), or "-x" (sidebar, dismiss at scrollLeft max). The JS here
// is the whole control plane: jump the scroller to its open position on open,
// close the dialog once a dismiss-fling settles. The gesture, momentum and
// snap-back are all the browser's.

const cssVar = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

/** The dialog's --swipe axis, or '' when it isn't a swipe overlay right now. */
function swipeAxis(el: Element) {
  return el.matches?.('dialog[k]') ? cssVar(el, '--swipe') : '';
}

/* A bottom sheet dragged past the top of the screen is the screen, so the
 * browser's own chrome should match it rather than the page it buried — the
 * bit of native polish a web sheet usually misses.
 *
 * CSS says what colour (--k-theme-color on the sheet, defaulting to its own
 * surface); this says when. `theme-color` lives in a <meta>, which CSS can't
 * write, so something has to copy it — but nothing new has to watch for it:
 * the swipe control plane is already awake at exactly the two moments that
 * matter, a settled scroll and a close.
 *
 * kinu brings its own <meta> and takes it away again rather than editing the
 * page's, so whatever the page declared is still there, untouched, underneath.
 * It goes in front because the first matching element in tree order is the one
 * the browser uses. */
let themeMeta: HTMLMetaElement | undefined;
function themeColor(color: string) {
  themeMeta?.remove();
  if (color) {
    document.head.prepend(
      (themeMeta = Object.assign(document.createElement('meta'), {name: 'theme-color', content: color})),
    );
  }
}

function swipeToggle(e: ToggleEvent) {
  const el = e.target as HTMLDialogElement;
  const axis = swipeAxis(el);
  if (!axis) return;
  // Hand the chrome back as the sheet starts leaving, not after it has gone.
  if (e.newState !== 'open') return themeColor('');
  el.style.transitionDuration = '';
  requestAnimationFrame(() => {
    if (axis === '-x') el.scrollLeft = 0;
    else if (axis === 'x') el.scrollLeft = el.scrollWidth - el.clientWidth;
    // Bottom sheets open to their detent when one is set, otherwise all the
    // way. --k-drawer-height is a registered <length>, so the computed value is
    // already resolved to pixels and 0 (no detent) falls through to fully open.
    else el.scrollTop = parseFloat(cssVar(el, '--k-drawer-height')) || el.scrollHeight - el.clientHeight;
  });
}

// Boundaries are compared with tolerance, not equality: Apple platforms keep
// firing scroll events through a rubber-band overscroll with offsets that go
// negative (or past max), and fractional device pixel ratios mean the resting
// offset isn't reliably a whole number either.
function swipeSettle(e: Event) {
  const el = e.target as HTMLDialogElement;
  const axis = el.open && swipeAxis(el);
  if (!axis) return;
  const dismissed =
    axis === '-x' ? el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
    : axis === 'x' ? el.scrollLeft <= 0
    : el.scrollTop <= 0;
  if (dismissed) {
    el.style.transitionDuration = '0s';
    el.close();
    return;
  }
  // The scroll offset *is* the exposed height of the sheet (see the rail in
  // drawer/style.css), so this reads as "the sheet is at least a viewport
  // tall" — i.e. it now covers the top of the screen. Sideways panels never
  // satisfy it, since their scrollTop stays 0.
  themeColor(el.scrollTop >= el.clientHeight ? cssVar(el, '--k-theme-color') : '');
}
