import {createContext, type ComponentChildren} from 'preact';
import {useContext, useId, useEffect, useRef, useState} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function Combobox({id: idProp, children}: {id?: string; children: ComponentChildren}) {
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span p="combobox">{children}</span>
    </IdCtx.Provider>
  );
}

export function ComboboxInput(
  props: preact.JSX.HTMLAttributes<HTMLInputElement>,
) {
  const id = useContext(IdCtx)!;
  const ref = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const input = ref.current!;
    const list = document.getElementById(id) as HTMLDialogElement | null;
    if (!list) return;
    function filter() {
      const val = input.value.toLowerCase();
      const items = list.querySelectorAll<HTMLElement>('[p="combobox-option"]');
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const show = item.textContent!.toLowerCase().includes(val);
        item.style.display = show ? '' : 'none';
      }
    }
    function onInput() {
      setOpen(true);
      filter();
    }
    function onFocus() {
      setOpen(true);
    }
    function onBlur(e: FocusEvent) {
      const rel = e.relatedTarget as Node | null;
      if (rel && list.contains(rel)) return;
      setOpen(false);
    }
    input.addEventListener('input', onInput);
    input.addEventListener('focus', onFocus);
    input.addEventListener('blur', onBlur);
    return () => {
      input.removeEventListener('input', onInput);
      input.removeEventListener('focus', onFocus);
      input.removeEventListener('blur', onBlur);
    };
  }, [id]);

  useEffect(() => {
    const list = document.getElementById(id) as HTMLDialogElement | null;
    if (!list) return;
    if (open) list.show();
    else list.close();
  }, [open, id]);

  return <input ref={ref} p="combobox-input" aria-controls={id} {...props} />;
}

export function ComboboxList({id, children, ...props}: {
  id?: string;
  children: ComponentChildren;
} & preact.JSX.HTMLAttributes<HTMLDialogElement>) {
  const ctx = useContext(IdCtx);
  return (
    <dialog p="combobox-list" id={id ?? ctx} {...props}>
      <ul>{children}</ul>
    </dialog>
  );
}

export const ComboboxOption = createSimpleComponent(
  'combobox-option',
  'button',
  {},
  (el: HTMLButtonElement) => {
    const dialog = el.closest<HTMLDialogElement>('[p="combobox-list"]');
    const input = dialog?.parentElement?.querySelector<HTMLInputElement>('[p="combobox-input"]');
    function select() {
      if (input) {
        input.value = el.textContent || '';
        const event = new Event('input', {bubbles: true});
        input.dispatchEvent(event);
        input.focus();
      }
      dialog?.close();
    }
    el.addEventListener('click', select);
    return () => el.removeEventListener('click', select);
  },
);

Combobox.Input = ComboboxInput;
Combobox.List = ComboboxList;
Combobox.Option = ComboboxOption;
