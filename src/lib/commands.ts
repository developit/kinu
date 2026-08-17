let commandsInstalled: boolean;

export function installCommands() {
  if (commandsInstalled) return;
  if (typeof document === 'undefined') return;
  commandsInstalled = true;
  // Intentionally installed even where native Invoker Commands exist: kinu
  // supports command sources beyond <button> (e.g. a menu closing itself on
  // item click), and the preventDefault() in the handler suppresses native
  // double-invocation for button triggers.
  addEventListener('click', commandClickHandler);
}

let topLayerOverlays: boolean | undefined;
/**
 * Overlays run in top-layer popover mode only when the Popover API AND CSS
 * anchor positioning are both available — without anchors, a top-layer
 * popover's absolute-position fallback would resolve against the viewport
 * instead of near its trigger. Otherwise they fall back to `<dialog>.show()`.
 */
export function usePopoverOverlays() {
  if (topLayerOverlays === undefined) {
    topLayerOverlays =
      'popover' in HTMLElement.prototype &&
      typeof CSS !== 'undefined' &&
      // Both halves, matching popover/style.css's @supports exactly: an engine
      // with position-anchor but no position-try-fallbacks doesn't get the
      // anchored rules, so a top-layer popover there would fall back to
      // `position: absolute; top: 100%` and land at the bottom of the viewport.
      CSS.supports('position-anchor: --k-trigger') &&
      CSS.supports('position-try-fallbacks: --k-menu-right-top');
  }
  return topLayerOverlays;
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
    const event = Object.defineProperties(
      new Event('command', {bubbles: true, cancelable: true}),
      {
        source: {value: trigger},
        command: {value: command},
      },
    );
    target.dispatchEvent(event);
    return;
  }

  let method = command.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  // `close` closes the target however it is currently shown (modal or popover).
  if (
    method === 'close' &&
    'popover' in HTMLElement.prototype &&
    target.matches(':popover-open')
  ) {
    method = 'hidePopover';
  }
  // Popover commands fall back to the equivalent <dialog> methods when
  // top-layer popover mode is unavailable (kinu overlays are <dialog popover>).
  if (/Popover$/.test(method) && (!usePopoverOverlays() || !(method in target))) {
    const dialog = target as HTMLDialogElement;
    if (method === 'hidePopover' || (method === 'togglePopover' && dialog.open)) {
      dialog.close();
      return;
    }
    method = 'show';
  }
  if (method === 'show') {
    const event = Object.assign(
      new Event('beforetoggle', {cancelable: true, bubbles: true}),
      {newState: 'open'},
    );
    if (!target.dispatchEvent(event)) return;
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

let adaptiveInstalled: boolean;
export function installAdaptiveCommands() {
  if (adaptiveInstalled) return;
  if (typeof document === 'undefined') return;
  adaptiveInstalled = true;
  let allowToggle: boolean;
  // Capture phase: native popover/dialog beforetoggle events don't bubble,
  // but capture still visits the target from the window.
  addEventListener(
    'beforetoggle',
    (e: Event) => {
      const te = e as ToggleEvent;
      if (allowToggle || te.newState !== 'open') return;
      const el = e.target as HTMLDialogElement;
      if (!getComputedStyle(el).getPropertyValue('--modal')) return;
      e.preventDefault();
      allowToggle = true;
      el.showModal();
      allowToggle = false;
    },
    true,
  );
}

let dialogsDropdownsInstalled: boolean;
export function installDialogsDropdowns() {
  if (dialogsDropdownsInstalled) return;
  if (typeof document === 'undefined') return;
  dialogsDropdownsInstalled = true;
  addEventListener('click', dialogsDropdownsClickHandler, true);
}

function dialogsDropdownsClickHandler(e: MouseEvent) {
  const target = e.target as Element;

  if (target.localName === 'dialog' && target.getAttribute('k')) {
    const dialog = target as HTMLDialogElement;

    // Swipe overlays span the whole viewport, so backdrop clicks land on the
    // dialog itself. The rail occupies one full viewport-length of scroll; a
    // click whose scroll-relative coordinate falls within it is a dismiss tap.
    // Tested before the native-closedby bail below, because a click inside the
    // dialog's own box is never a native light dismiss.
    const swipe = getComputedStyle(dialog).getPropertyValue('--swipe').trim();
    if (swipe) {
      const inRail =
        swipe === 'x' ? dialog.scrollLeft + e.clientX < dialog.clientWidth
        : swipe === '-x' ? dialog.scrollLeft + e.clientX >= dialog.scrollWidth - dialog.clientWidth
        : dialog.scrollTop + e.clientY < dialog.clientHeight;
      if (inRail) {
        dialog.close();
        e.preventDefault();
      }
      return;
    }

    // close on backdrop click — fallback where native `closedby` light dismiss
    // is unsupported, honoring the same attribute semantics either way
    const closedby = dialog.getAttribute('closedby');
    if (
      !('closedBy' in HTMLDialogElement.prototype) &&
      closedby !== 'closerequest' &&
      closedby !== 'none'
    ) {
      const {clientX, clientY} = e;
      const {left, right, top, bottom} = dialog.getBoundingClientRect();
      if (
        clientX < left ||
        clientX > right ||
        clientY < top ||
        clientY > bottom
      ) {
        dialog.close();
        e.preventDefault();
        return;
      }
    }
  }

  // close other dropdowns — fallback where top-layer popover mode (with its
  // native light dismiss) is unavailable
  if (!usePopoverOverlays()) {
    for (const el of Array.from(
      document.querySelectorAll<HTMLDialogElement>(
        '[k="dropdown-content"],[k="popover-content"]',
      ),
    )) {
      if (!el.contains(target)) {
        el.close();
      }
    }
  }
}

let menuShortcutsInstalled: boolean;
export function installMenuShortcuts() {
  if (menuShortcutsInstalled) return;
  if (typeof document === 'undefined') return;
  menuShortcutsInstalled = true;
  addEventListener('keydown', handleMenuShortcutsKeydown);
}

function handleMenuShortcutsKeydown(e: KeyboardEvent) {
  const el = elementTarget(e.target!);
  let container = el.closest('dialog[k]') || el.closest('[k="list"]');
  let useFocus = true;
  if (!container) {
    container = el.parentNode!.querySelector(
      'popover' in HTMLElement.prototype
        ? 'dialog[k][open], dialog[k]:popover-open'
        : 'dialog[k][open]',
    )
      || el.closest('[k="listbox"]')?.querySelector('[k="listbox-list"]')
      || null;
    useFocus = false;
  }
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
  if (!selected) {
    const items = container.querySelectorAll<HTMLElement>('[k="item"]');
    const item = items[dir > 0 ? 0 : items.length - 1];
    if (useFocus) item?.focus();
    else item?.toggleAttribute('selected', true);
    return;
  }
  const type = selected.getAttribute('k');
  if (!selected) return;
  let next = selected;
  while (
    (next = next[
      dir > 0 ? 'nextElementSibling' : 'previousElementSibling'
    ] as HTMLElement)
  ) {
    if (next.getAttribute('k') !== type) continue;
    if (useFocus) next.focus();
    else {
      selected.toggleAttribute('selected', false);
      next!.toggleAttribute('selected', true);
    }
    e.preventDefault();
    break;
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
const SWIPE = '[k="drawer-content"],[k="popover-content"],[k="dropdown-content"],[k="context-menu"],[k="sheet-content"],[k="sidebar"]';

let swipeInstalled: boolean;
export function installSwipe() {
  if (swipeInstalled) return;
  if (typeof document === 'undefined') return;
  swipeInstalled = true;
  addEventListener('beforetoggle', swipeToggle as EventListener, true);
  addEventListener('scrollend', swipeSettle, true);
  // Safari only shipped scrollend in 26.2, so older WebKit would never dismiss.
  // Plain scroll is a sound substitute *here* because every dismiss position is
  // a scroll boundary (offset 0, or max) and scroll-snap-stop leaves only one
  // other resting position — the panel can't pass through the boundary en route
  // to somewhere else, so arriving there is already proof of a dismiss. The
  // difference is that a slow drag held at the boundary closes on arrival
  // rather than on release, which is why this stays off where scrollend exists.
  if (!('onscrollend' in document)) addEventListener('scroll', swipeSettle, true);
}

function swipeAxis(target: EventTarget | null) {
  const el = target as Element | null;
  if (!el?.matches?.(SWIPE)) return null;
  const v = getComputedStyle(el).getPropertyValue('--swipe').trim();
  return v ? {el: el as HTMLDialogElement, axis: v} : null;
}

function swipeToggle(e: ToggleEvent) {
  if (e.newState !== 'open') return;
  const s = swipeAxis(e.target);
  if (!s) return;
  s.el.style.transitionDuration = '';
  requestAnimationFrame(() => {
    const {el, axis} = s;
    if (axis === '-x') el.scrollLeft = 0;
    else if (axis === 'x') el.scrollLeft = el.scrollWidth - el.clientWidth;
    else el.scrollTop = el.scrollHeight - el.clientHeight;
  });
}

// Boundaries are compared with tolerance, not equality: Apple platforms keep
// firing scroll events through a rubber-band overscroll with offsets that go
// negative (or past max), and fractional device pixel ratios mean the resting
// offset isn't reliably a whole number either.
function swipeSettle(e: Event) {
  const s = swipeAxis(e.target);
  if (!s?.el.open) return;
  const {el, axis} = s;
  const dismissed =
    axis === '-x' ? el.scrollLeft >= el.scrollWidth - el.clientWidth - 1
    : axis === 'x' ? el.scrollLeft <= 0
    : el.scrollTop <= 0;
  if (dismissed) {
    el.style.transitionDuration = '0s';
    el.close();
  }
}
