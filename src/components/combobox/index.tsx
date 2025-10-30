import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import './style.css';

export const Combobox = createSimpleComponent('combobox', 'span', {}, () => {
  installMenuShortcuts();
});

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
      let hit = false;
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

export const ComboboxList = createSimpleComponent('combobox-list', 'dialog', {
  onMouseDown: (e) => e.preventDefault(),
  onClick: (e) => e.currentTarget.close(),
});

export const ComboboxOption = createSimpleComponent(
  'combobox-option',
  'button',
  {
    tabIndex: -1,
  },
  (el: HTMLButtonElement) => {
    function select(e: MouseEvent) {
      e.preventDefault();
      const input = document.activeElement as HTMLInputElement;
      input.value = el.textContent || '';
      input.dispatchEvent(new Event('input', {bubbles: true}));
      input.focus();
    }
    el.addEventListener('click', select);
    return () => el.removeEventListener('click', select);
  },
);

(Combobox as any).Input = ComboboxInput;
(Combobox as any).List = ComboboxList;
(Combobox as any).Option = ComboboxOption;
