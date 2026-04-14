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

// Spatial arrow-key navigation. Ray-cast from the focused element's edge in the
// arrow direction via elementFromPoint(); focus whatever focusable we hit.
// An adjacent open kinu dialog with a [selected] child flips on pseudo-focus
// (the virtual cursor moves [selected] instead of real focus — e.g. Combobox).
const DIRS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};
const FOCUSABLE = 'a[href],button,input,select,textarea,[tabindex]';
// Inputs where arrows have native meaning (caret/value)
const NATIVE_ARROWS =
  'input:not([type=button]):not([type=checkbox]):not([type=submit]):not([type=reset]),textarea,select';

function handleArrowKey(e: KeyboardEvent) {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
  const active = document.activeElement as HTMLElement | null;
  if (!active || active === document.body) return;

  let dialog = active.closest<HTMLElement>('dialog[k][open]');
  let pseudo: HTMLElement | null = null;
  if (!dialog) {
    dialog =
      active.parentElement?.querySelector<HTMLElement>('dialog[k][open]') ?? null;
    pseudo = dialog?.querySelector<HTMLElement>('[k][selected]') ?? null;
  }

  if (e.key === 'Enter' && pseudo) {
    e.preventDefault();
    pseudo.click();
    return;
  }

  const d = DIRS[e.key];
  if (!d) return;
  if (!pseudo) {
    if (!active.closest('[k]')) return;
    if (active.isContentEditable || active.matches(NATIVE_ARROWS)) return;
  }

  const ref = pseudo || active;
  const r = ref.getBoundingClientRect();
  const [dx, dy] = d;
  let x = r.left + r.width / 2 + dx * (r.width / 2 + 1);
  let y = r.top + r.height / 2 + dy * (r.height / 2 + 1);
  const {innerWidth: W, innerHeight: H} = window;

  while (x >= 0 && y >= 0 && x < W && y < H) {
    const target = (document.elementFromPoint(x, y) as Element | null)
      ?.closest<HTMLElement>(FOCUSABLE);
    if (target && target !== ref && !target.hasAttribute('disabled')) {
      if (pseudo && !dialog!.contains(target)) return;
      e.preventDefault();
      if (pseudo) {
        pseudo.removeAttribute('selected');
        target.setAttribute('selected', '');
        target.scrollIntoView({block: 'nearest'});
      } else {
        target.focus();
      }
      return;
    }
    x += dx * 8;
    y += dy * 8;
  }
}

if (typeof document !== 'undefined') {
  addEventListener('keydown', handleArrowKey);
}
