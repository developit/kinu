import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  ComboboxOwnProps,
  ComboboxInputOwnProps,
  ComboboxListOwnProps,
  ComboboxOptionOwnProps,
} from './types';
import './style.css';

const ComboboxBase = createSimpleComponent<'span', ComboboxOwnProps>(
  'combobox',
  'span',
);

export const ComboboxInput = createSimpleComponent<'input', ComboboxInputOwnProps>(
  'combobox-input',
  'input',
  {},
  (el: HTMLInputElement) => {
    const getList = () =>
      el
        .closest('[k="combobox"]')
        ?.querySelector<HTMLDialogElement>('[k="combobox-list"]')!;

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
        '[k="combobox-option"]',
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

export const ComboboxList = createSimpleComponent<'dialog', ComboboxListOwnProps>(
  'combobox-list',
  'dialog',
  {
    onMouseDown: (e) => e.preventDefault(),
    onClick: (e) => e.currentTarget.close(),
  },
);

export const ComboboxOption = createSimpleComponent<
  'button',
  ComboboxOptionOwnProps
>(
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

type ComboboxComponent = typeof ComboboxBase & {
  Input: typeof ComboboxInput;
  List: typeof ComboboxList;
  Option: typeof ComboboxOption;
};

export const Combobox: ComboboxComponent = Object.assign(ComboboxBase, {
  Input: ComboboxInput,
  List: ComboboxList,
  Option: ComboboxOption,
});
