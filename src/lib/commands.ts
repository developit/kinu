let commandsInstalled: boolean;

export function installCommands() {
  if (commandsInstalled) return;
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
  dialogsDropdownsInstalled = true;
  addEventListener('click', dialogsDropdownsClickHandler, true);
  addEventListener('toggle', handleDialogToggle);
}

function handleDialogToggle(e: Event) {
  const dialog = e.target as HTMLDialogElement;
  if (!dialog.open) return;
  
  const type = dialog.getAttribute('p');
  if (!type || !['dropdown-content', 'popover-content'].includes(type)) return;
  
  // Apply viewport-aware positioning
  requestAnimationFrame(() => {
    const rect = dialog.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    let nudgeX = 0;
    let nudgeY = 0;
    
    // Check horizontal overflow
    if (rect.x + rect.width > vw) {
      nudgeX = vw - (rect.x + rect.width);
    }
    if (rect.x < 0) {
      nudgeX = -rect.x;
    }
    
    // Check vertical overflow  
    if (rect.y + rect.height > vh) {
      nudgeY = vh - (rect.y + rect.height);
    }
    if (rect.y < 0) {
      nudgeY = -rect.y;
    }
    
    if (nudgeX !== 0 || nudgeY !== 0) {
      dialog.style.setProperty('--nudge-x', `${nudgeX}px`);
      dialog.style.setProperty('--nudge-y', `${nudgeY}px`);
    }
  });
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
