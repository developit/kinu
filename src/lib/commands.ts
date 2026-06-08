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

// Swipe-to-dismiss for bottom-drawer overlays — Drawer plus the adaptive
// `mobile="drawer"` Popover / DropdownMenu / ContextMenu.
//
// The motion, gesture, momentum and snap-back all live in CSS (see the
// `--swipe` blocks): on touch the <dialog> itself becomes a vertical
// scroll-snap container with a full-height transparent "rail" pseudo above the
// content, so you fling the panel down into the rail to dismiss. No wrapper
// elements — the rail and the panel's surface are drawn entirely with
// pseudo-elements and a background. This handler is the whole JS control plane:
// it glides the panel up on open and closes the dialog once the panel is flung
// back to the top (scrollTop 0). CSS opts a dialog in by setting `--swipe: 1`,
// so desktop keeps its plain transform transition with zero branching here.
const SWIPE = '[k="drawer-content"],[k="popover-content"],[k="dropdown-content"],[k="context-menu"]';

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

// Entrance: once the overlay is in the top layer (and thus has real scroll
// geometry) glide the panel up from the rail into view.
function swipeToggle(e: ToggleEvent) {
  if (e.newState !== 'open') return;
  const el = swipeScroller(e.target);
  if (el) requestAnimationFrame(() => el.scrollTo({top: el.scrollHeight, behavior: 'smooth'}));
}

// Dismiss: a fling that settles back at the rail (scrollTop 0) closes for real.
// Closing is otherwise instant — there's no close path to intercept.
function swipeSettle(e: Event) {
  const el = swipeScroller(e.target);
  if (el?.open && el.scrollTop === 0) el.close();
}
