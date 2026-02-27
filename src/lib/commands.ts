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
  (target as any)[method]?.();
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
  if (target.localName === 'dialog' && target.getAttribute('p')) {
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
      '[p="dropdown-content"],[p="popover-content"]',
    ),
  )) {
    if (!el.contains(target)) {
      el.close();
    }
  }
}

let menuShortcutsInstalled: boolean;
const MENU_ITEM_ATTR = 'p';
const MENU_ITEM_SELECTOR =
  '[p="dropdown-menu-item"],[p="dropdown-submenu-trigger"],[p="context-menu-item"],[p="combobox-option"],[p][tabindex]';

function isMenuItem(el: Element | null): el is HTMLElement {
  if (!el) return false;
  if (el.hasAttribute('tabindex')) return true;
  switch (el.getAttribute(MENU_ITEM_ATTR)) {
    case 'dropdown-menu-item':
    case 'dropdown-submenu-trigger':
    case 'context-menu-item':
    case 'combobox-option':
      return true;
    default:
      return false;
  }
}

export function installMenuShortcuts() {
  if (menuShortcutsInstalled) return;
  if (typeof document === 'undefined') return;
  menuShortcutsInstalled = true;
  addEventListener('keydown', handleMenuShortcutsKeydown);
}

function handleMenuShortcutsKeydown(e: KeyboardEvent) {
  const el = elementTarget(e.target!);
  let dialog = el.closest('dialog[p]');
  let useFocus = true;
  if (!dialog) {
    dialog = el.parentNode!.querySelector('dialog[p][open]');
    useFocus = false;
  }
  if (!dialog) return;
  const selected = dialog.querySelector<HTMLElement>(
    useFocus ? '[p]:focus' : '[p][selected]',
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
    const items = dialog.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR);
    const item = items[dir > 0 ? 0 : items.length - 1];
    if (useFocus) item?.focus();
    else item?.toggleAttribute('selected', true);
    return;
  }
  let next = selected;
  const wrapper = selected.closest('[p="dropdown"]') as HTMLElement | null;
  if (wrapper?.parentElement === dialog) next = wrapper;
  while (
    (next = next[
      dir > 0 ? 'nextElementSibling' : 'previousElementSibling'
    ] as HTMLElement)
  ) {
    if (next.getAttribute('p') === 'dropdown') {
      next = next.firstElementChild as HTMLElement;
      if (!next) continue;
    }
    if (!isMenuItem(next)) continue;
    if (useFocus) next.focus();
    else {
      selected.toggleAttribute('selected', false);
      next!.toggleAttribute('selected', true);
    }
    e.preventDefault();
    break;
  }
}
