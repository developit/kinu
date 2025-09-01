import {type ComponentChildren, createContext} from 'preact';
import {useContext, useId, useRef, useEffect} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {installCommands, installMenuShortcuts} from '../../lib/commands';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function CommandPalette({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  installCommands();
  installMenuShortcuts();
  const id = idProp ?? useId();
  return <IdCtx.Provider value={id}>{children}</IdCtx.Provider>;
}

export function CommandPaletteTrigger({children, ...props}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandfor: id,
    command: 'show-modal',
  });
}

export function CommandPaletteContent({
  id,
  actions,
  ...props
}: {
  id?: string;
  actions: {label: string; command: string}[];
} & JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current!;
    const input = dialog.querySelector<HTMLInputElement>(
      '[p="command-palette-input"]',
    )!;
    const items = dialog.querySelectorAll<HTMLElement>(
      '[p="command-palette-item"]',
    );
    function filter() {
      const q = input.value.toLowerCase();
      let first: HTMLElement | undefined;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const text = item.textContent!.toLowerCase();
        let qi = 0;
        for (let j = 0; qi < q.length && j < text.length; j++) {
          if (text[j] === q[qi]) qi++;
        }
        const ok = qi === q.length;
        item.style.display = ok ? '' : 'none';
        item.removeAttribute('selected');
        if (ok && !first) first = item;
      }
      first?.toggleAttribute('selected', true);
    }
    input.addEventListener('input', filter);
    filter();
    return () => input.removeEventListener('input', filter);
  }, []);

  return (
    <dialog p="command-palette-content" id={id ?? ctx} ref={ref} {...props}>
      <input p="command-palette-input" autofocus />
      <div p="command-palette-list">
        {actions.map((a) => (
          <button p="command-palette-item" command={a.command} tabIndex={-1}>
            {a.label}
          </button>
        ))}
      </div>
    </dialog>
  );
}

CommandPalette.Trigger = CommandPaletteTrigger;
CommandPalette.Content = CommandPaletteContent;
