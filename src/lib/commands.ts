// Make kinu <button> elements feel like native app controls by suppressing
// the browser context menu. Components rendered as anchors (e.g. Button with
// href, BreadcrumbLink, NavigationMenuLink) keep their native right-click
// menu for link accessibility. Explicit ContextMenu triggers are unaffected:
// their own handler runs first and opens the context menu dialog as usual.
if (typeof document !== 'undefined') {
  addEventListener('contextmenu', (e: MouseEvent) => {
    const target = e.target as Element | null;
    if (target?.closest?.('button[k]')) e.preventDefault();
  });
}

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
  let dialog = el.closest('dialog[k]');
  let useFocus = true;
  if (!dialog) {
    dialog = el.parentNode!.querySelector('dialog[k][open]');
    useFocus = false;
  }
  if (!dialog) return;
  const selected = dialog.querySelector<HTMLElement>(
    useFocus ? '[k]:focus' : '[k][selected]',
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
    const items = dialog.querySelectorAll<HTMLElement>('button[k],[k][tabindex]');
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
