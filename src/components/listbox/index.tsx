import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import {filterItems} from '../../lib/filter';
import type {
  ListboxOwnProps,
  ListboxInputOwnProps,
  ListboxListOwnProps,
  ListboxOptionOwnProps,
} from './types';
import './style.css';

const ListboxBase = createSimpleComponent<'div', ListboxOwnProps>(
  'listbox',
  'div',
  {},
  () => {
    installMenuShortcuts();
  },
);

export const ListboxInput = createSimpleComponent<'input', ListboxInputOwnProps>(
  'listbox-input',
  'input',
  {},
  (el: HTMLInputElement) => {
    function onInput() {
      const items = el
        .closest('[k="listbox"]')
        ?.querySelectorAll<HTMLElement>('[k="listbox-option"]');
      if (items) filterItems(el.value, items);
    }
    el.addEventListener('input', onInput);
    return () => el.removeEventListener('input', onInput);
  },
);

export const ListboxList = createSimpleComponent<'div', ListboxListOwnProps>(
  'listbox-list',
  'div',
);

export const ListboxOption = createSimpleComponent<
  'button',
  ListboxOptionOwnProps
>('listbox-option', 'button', {tabIndex: -1});

type ListboxComponent = typeof ListboxBase & {
  Input: typeof ListboxInput;
  List: typeof ListboxList;
  Option: typeof ListboxOption;
};

export const Listbox: ListboxComponent = Object.assign(ListboxBase, {
  Input: ListboxInput,
  List: ListboxList,
  Option: ListboxOption,
});
