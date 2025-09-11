let commandsInstalled: boolean;
const triggers = new WeakMap<Element, Element>();

export function installCommands() {
  if (commandsInstalled) return;
  commandsInstalled = true;
  if ('commandFor' in HTMLButtonElement.prototype) return;
  addEventListener('click', commandClickHandler);
  addEventListener('toggle', dialogToggleHandler, true);
  addEventListener('show', dialogToggleHandler, true);
}

function elementTarget(node: EventTarget) {
  return 'closest' in node
    ? (node as Element)
    : ((node as Node).parentNode as Element);
}

function positionDialog(target: HTMLDialogElement, trigger: Element) {
  const a = trigger.getBoundingClientRect();
  const t = target.style.transform;
  target.style.setProperty('transform', 'none');
  const d = target.getBoundingClientRect();
  if (t) target.style.setProperty('transform', t);
  else target.style.removeProperty('transform');
  target.style.setProperty('--p-anchor-left', `${a.left}px`);
  target.style.setProperty('--p-anchor-top', `${a.top}px`);
  target.style.setProperty('--p-anchor-width', `${a.width}px`);
  target.style.setProperty('--p-anchor-height', `${a.height}px`);
  target.style.setProperty('--p-content-width', `${d.width}px`);
  target.style.setProperty('--p-content-height', `${d.height}px`);
  const flipX = a.left + d.width > innerWidth && a.left + a.width > d.width;
  const flipY =
    a.top + a.height + d.height > innerHeight && a.top > d.height;
  let flip = '';
  if (flipX) flip += ' x';
  if (flipY) flip += ' y';
  target.setAttribute('data-flip', flip);
}

let resizeInstalled: boolean;
function ensureResize() {
  if (resizeInstalled) return;
  resizeInstalled = true;
  addEventListener(
    'resize',
    () => {
      document
        .querySelectorAll<HTMLDialogElement>('dialog[p][open]')
        .forEach((el) => {
          const trig = triggers.get(el);
          if (trig) positionDialog(el, trig);
        });
    },
    {passive: true},
  );
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
  if (target instanceof HTMLDialogElement) triggers.set(target, trigger);
  (target as any)[method]?.();
}

function dialogToggleHandler(e: Event) {
  const target = e.target as Element;
  if (target instanceof HTMLDialogElement && target.open) {
    const trig = triggers.get(target);
    if (trig) positionDialog(target, trig);
    ensureResize();
  }
}

let dialogsDropdownsInstalled: boolean;
export function installDialogsDropdowns() {
  if (dialogsDropdownsInstalled) return;
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
export function installMenuShortcuts() {
  if (menuShortcutsInstalled) return;
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
    const first = dialog.querySelector<HTMLElement>('button[p],[p][tabindex]');
    if (useFocus) first?.focus();
    else first?.toggleAttribute('selected', true);
    return;
  }
  const type = selected.getAttribute('p');
  if (!selected) return;
  let next = selected;
  while (
    (next = next[
      dir > 0 ? 'nextElementSibling' : 'previousElementSibling'
    ] as HTMLElement)
  ) {
    if (next.getAttribute('p') !== type) continue;
    if (useFocus) next.focus();
    else {
      selected.toggleAttribute('selected', false);
      next!.toggleAttribute('selected', true);
    }
    e.preventDefault();
    break;
  }
}
