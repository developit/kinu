let commandsInstalled: boolean;

export function installCommands() {
  if (commandsInstalled) return;
  if (typeof document === 'undefined') return;
  commandsInstalled = true;
  if ('commandFor' in HTMLButtonElement.prototype) return;
  addEventListener('click', commandClickHandler);
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

  const method = command.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if (method === 'show') {
    const event = Object.assign(
      new Event('beforetoggle', {cancelable: true, bubbles: true}),
      {newState: 'open'},
    );
    if (!target.dispatchEvent(event)) return;
  }
  (target as any)[method]?.();
}

let adaptiveInstalled: boolean;
export function installAdaptiveCommands() {
  if (adaptiveInstalled) return;
  if (typeof document === 'undefined') return;
  adaptiveInstalled = true;
  let allowToggle: boolean;
  addEventListener('beforetoggle', (e: Event) => {
    const te = e as ToggleEvent;
    if (allowToggle || te.newState !== 'open') return;
    const el = e.target as HTMLDialogElement;
    if (!getComputedStyle(el).getPropertyValue('--modal')) return;
    e.preventDefault();
    allowToggle = true;
    el.showModal();
    allowToggle = false;
  });
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

  // close on swipe-dismiss rail tap (the dimmed area beside a swipeable panel)
  const rail = target.closest?.('[k$="-rail"]');
  if (rail) {
    (rail.closest('dialog') as HTMLDialogElement | null)?.close();
    e.preventDefault();
    return;
  }

  // close on backdrop click
  if (target.localName === 'dialog' && target.getAttribute('k')) {
    const {clientX, clientY} = e;
    const {left, right, top, bottom} = target.getBoundingClientRect();
    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      (target as HTMLDialogElement).close();
      e.preventDefault();
      return;
    }
  }

  // close other dropdowns
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
    container = el.parentNode!.querySelector('dialog[k][open]')
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

// Swipeable Drawer / Sheet / Sidebar.
//
// The motion, gesture, momentum and snap-back all live in CSS: each panel sits
// inside a scroll-snap container (the <dialog> itself) next to an empty "rail"
// that you scroll it away into. This handler is the entire JS control plane —
// it only nudges the native scroller at the open/close boundaries; the finger
// tracking in between is the browser's.
//
// CSS opts a dialog in by setting `--swipe: 1` (inside the relevant media
// query), so the same component renders a plain transform-animated overlay on
// desktop and a gesture-driven one on touch with zero branching here.
const SWIPE = '[k="drawer-content"],[k="sheet-content"],[k="sidebar"]';

let swipeInstalled: boolean;
export function installSwipe() {
  if (swipeInstalled) return;
  if (typeof document === 'undefined') return;
  swipeInstalled = true;
  addEventListener('beforetoggle', swipeToggle as EventListener, true);
  addEventListener('scrollend', swipeSettle, true);
}

/** A swipeable scroller that CSS has currently put into gesture mode, else null. */
function swipeScroller(target: EventTarget | null) {
  const el = target as Element | null;
  if (!el?.matches?.(SWIPE)) return null;
  return getComputedStyle(el).getPropertyValue('--swipe')
    ? (el as HTMLDialogElement)
    : null;
}

/** Is any part of `el` inside the viewport? (A panel snapped to the rail isn't.) */
function onScreen(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0;
}

// Dialogs whose entrance scroll is still in flight — their first `scrollend`
// is our own and must not be read as a dismiss.
const entering = new WeakSet<EventTarget>();

// Entrance: the moment the overlay enters the top layer, snap to the closed
// (rail) edge and glide the panel in. Same two lines slide a drawer up, a sheet
// in from the side, or a sidebar across — the axis is entirely the CSS's call.
function swipeToggle(e: ToggleEvent) {
  if (e.newState !== 'open') return;
  const el = swipeScroller(e.target);
  const rail = el?.querySelector(':scope > [k$="-rail"]');
  const panel = el?.querySelector(':scope > [k$="-panel"]');
  if (!el || !rail || !panel) return;
  entering.add(el);
  requestAnimationFrame(() => {
    rail.scrollIntoView({behavior: 'instant'} as ScrollIntoViewOptions);
    panel.scrollIntoView({behavior: 'smooth'});
  });
}

// Dismiss: when a gesture settles with the panel flung off screen, close for
// real. Closing is otherwise instant — there's no close path to intercept.
function swipeSettle(e: Event) {
  const el = swipeScroller(e.target);
  if (!el?.open) return;
  // Swallow the settle from our own entrance scroll.
  if (entering.delete(el)) return;
  const panel = el.querySelector(':scope > [k$="-panel"]');
  if (panel && !onScreen(panel)) el.close();
}
