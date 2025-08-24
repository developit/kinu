// import {createContext, type ComponentChildren} from 'preact';
// import {useContext, useId} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import './style.css';

// const IdCtx = createContext<string | undefined>(undefined);
//
// export function Combobox({
//   id: idProp,
//   children,
// }: {id?: string; children: ComponentChildren}) {
//   installMenuShortcuts();
//   const gen = useId();
//   const id = idProp ?? gen;
//   return (
//     <IdCtx.Provider value={id}>
//       <span
//         p="combobox"
//         // commandfor={id}
//         // onInput={onInput}
//         // onFocusIn={onFocus}
//         // onFocusOut={onBlur}
//         // onKeyDown={onKeyDown}
//       >
//         {children}
//       </span>
//     </IdCtx.Provider>
//   );
// }

export const Combobox = createSimpleComponent('combobox', 'span', {}, () => {
  installMenuShortcuts();
});

/*

function onKeyDown(e: KeyboardEvent) {
  const el = e.currentTarget as HTMLElement;
  if (e.key === 'Enter') {
    const dropdown = document.getElementById(
      el.getAttribute('commandfor')!,
    ) as HTMLDialogElement;
    if (!dropdown) return;
    dropdown.querySelector('[p][selected]')?.click();
    dropdown.close();
    e.preventDefault();
  }
}

function onInput(e: InputEvent) {
  const el = e.currentTarget as HTMLElement;
  // if ('value' in e.target) return;
  const dropdown = document.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  // getList()?.show();
  dropdown.show();
  (e.target as HTMLInputElement).focus();
  // dropdown.setAttribute('open', '');
  filter(dropdown, (e.target as HTMLInputElement).value);
}

function onFocus(e: FocusEvent) {
  const el = e.currentTarget as HTMLElement;
  const dropdown = document.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  dropdown.show();
  filter(dropdown);
  el.querySelector<HTMLInputElement>('[p="combobox-input"]')!.focus();
}

function onBlur(e: FocusEvent) {
  if (e.currentTarget.contains(e.relatedTarget)) return;
  const el = e.currentTarget as HTMLElement;
  const rel = e.relatedTarget as Node | null;
  const list = document.getElementById(
    el.getAttribute('commandfor')!,
  ) as HTMLDialogElement;
  if (!list || (rel && list.contains(rel))) return;
  list.close();
}

function filter(dropdown: HTMLDialogElement, value?: string) {
  const items =
    dropdown?.querySelectorAll<HTMLElement>('[p="combobox-option"]') || [];
  let hit: boolean;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const show =
      value == null ||
      item.textContent!.toLowerCase().includes(value.toLowerCase());
    item.style.display = show ? '' : 'none';
    item.removeAttribute('selected');
    if (show) {
      if (!hit) item.toggleAttribute('selected', true);
      hit = true;
    }
  }
}
*/

export const ComboboxInput = createSimpleComponent(
  'combobox-input',
  'input',
  {},
  (el: HTMLInputElement) => {
    const getList = () =>
      el
        .closest('[p="combobox"]')
        ?.querySelector<HTMLDialogElement>('[p="combobox-list"]')!;

    function onInputFocusClick(e: Event) {
      filter(e.type !== 'input');
      getList().show();
      el.focus();
    }

    function onBlur(e: FocusEvent) {
      const rel = e.relatedTarget as Node | null;
      const list = getList();
      if (rel && list?.contains(rel)) return;
      list.close();
    }

    function filter(select?: boolean) {
      const value = el.value.toLowerCase();
      const items = getList().querySelectorAll<HTMLElement>(
        '[p="combobox-option"]',
      );
      let hit: boolean;
      for (const item of items) {
        const match = item.textContent!.toLowerCase().includes(value);
        item.removeAttribute('selected');
        const visible = select || match;
        item.style.display = visible ? '' : 'none';
        if ((select ? match : visible) && !hit) {
          item.toggleAttribute('selected', true);
          hit = true;
        }
      }
    }

    el.addEventListener('input', onInputFocusClick);
    el.addEventListener('click', onInputFocusClick);
    el.addEventListener('focus', onInputFocusClick);
    el.addEventListener('blur', onBlur);

    return () => {
      el.removeEventListener('input', onInputFocusClick);
      el.removeEventListener('click', onInputFocusClick);
      el.removeEventListener('focus', onInputFocusClick);
      el.removeEventListener('blur', onBlur);
    };
  },
);

// function handleListClick(e: MouseEvent) {
//   e.preventDefault();
//   const dialog = e.currentTarget as HTMLDialogElement;
//   let target = e.target as Element;
//   if (target.nodeType === 3) target = target.parentNode as Element;
//   const selected = target.closest('[p="combobox-option"]');
//   if (!selected) return;
//   const input = dialog.parentElement?.querySelector<HTMLInputElement>(
//     '[p="combobox-input"]',
//   )!;
//   input.value = selected.textContent || '';
//   input.dispatchEvent(new Event('input', {bubbles: true}));
//   input.focus();
//   dialog.close();
// }

export const ComboboxList = createSimpleComponent('combobox-list', 'dialog', {
  onMouseDown: (e) => e.preventDefault(),
  onClick: (e) => e.currentTarget.close(),
});

// export function ComboboxList({
//   id,
//   children,
//   ...props
// }: {
//   id?: string;
//   children: ComponentChildren;
// } & preact.JSX.HTMLAttributes<HTMLDialogElement>) {
//   const ctx = useContext(IdCtx);
//   return (
//     <dialog
//       p="combobox-list"
//       id={id ?? ctx}
//       // onClick={handleListClick}
//       onMouseDownCapture={(e) => e.preventDefault()}
//       {...props}
//     >
//       <ul>{children}</ul>
//     </dialog>
//   );
// }

export const ComboboxOption = createSimpleComponent(
  'combobox-option',
  'button',
  {
    tabIndex: -1,
  },
  (el: HTMLButtonElement) => {
    function select(e: MouseEvent) {
      e.preventDefault();
      // const dialog = el.closest<HTMLDialogElement>('[p="combobox-list"]');
      // const input = dialog!.parentNode!.querySelector<HTMLInputElement>(
      //   '[p="combobox-input"]',
      // )!;
      const input = document.activeElement as HTMLInputElement;
      input.value = el.textContent || '';
      input.dispatchEvent(new Event('input', {bubbles: true}));
      // dialog?.close();
      input.focus();
    }
    el.addEventListener('click', select);
    return () => el.removeEventListener('click', select);
  },
);

Combobox.Input = ComboboxInput;
Combobox.List = ComboboxList;
Combobox.Option = ComboboxOption;
