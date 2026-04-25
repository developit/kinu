import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import {filterItems} from '../../lib/filter';
import {Item} from '../item';
import type {
  ComboboxOwnProps,
  ComboboxInputOwnProps,
  ComboboxListOwnProps,
} from './types';
import './style.css';

const ComboboxBase = createSimpleComponent<'span', ComboboxOwnProps>(
  'combobox',
  'span',
  {},
  () => {
    installMenuShortcuts();
  },
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
      const items = getList().querySelectorAll<HTMLElement>(
        '[k="item"]',
      );
      filterItems(el.value, items, select);
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
    onClick: (e) => {
      const item = (e.target as Element).closest?.('[k="item"]');
      if (item) {
        e.preventDefault();
        const combobox = e.currentTarget.closest('[k="combobox"]');
        const input = combobox?.querySelector<HTMLInputElement>('[k="combobox-input"]');
        if (input) {
          input.value = (item as HTMLButtonElement).value || item.textContent || '';
          input.dispatchEvent(new Event('input', {bubbles: true}));
          input.focus();
        }
      }
      e.currentTarget.close();
    },
  },
);

/** @deprecated Use `Item` instead. */
export const ComboboxOption = Item;

type ComboboxComponent = typeof ComboboxBase & {
  Input: typeof ComboboxInput;
  List: typeof ComboboxList;
  Item: typeof Item;
  /** @deprecated Use `Item` or `Combobox.Item` instead. */
  Option: typeof Item;
};

export const Combobox: ComboboxComponent = Object.assign(ComboboxBase, {
  Input: ComboboxInput,
  List: ComboboxList,
  Item,
  Option: Item,
});
