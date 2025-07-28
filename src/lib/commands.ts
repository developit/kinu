let commandsInstalled: boolean;

export function installCommands() {
  if (commandsInstalled) return;
  commandsInstalled = true;
  if ('commandFor' in HTMLButtonElement.prototype) return;
  addEventListener('click', commandClickHandler);
}

function commandClickHandler(e: MouseEvent) {
  const node = e.target as Node;
  const el = ('closest' in node ? node : node.parentNode) as Element;
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
