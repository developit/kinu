import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import {filterItems} from '../../lib/filter';
import {Item} from '../item';
import type {
  ListboxOwnProps,
  ListboxInputOwnProps,
  ListboxListOwnProps,
} from './types';
import './style.css';

const ListboxBase = createSimpleComponent<'div', ListboxOwnProps>(
  'listbox',
  'div',
  {},
  installMenuShortcuts,
);

export const ListboxInput = createSimpleComponent<'input', ListboxInputOwnProps>('listbox-input', 'input', {
  // Capture phase, so a consumer's own onInput doesn't replace it.
  onInputCapture(e) {
    const el = e.currentTarget;
    const items = el.closest('[k="listbox"]')?.querySelectorAll<HTMLElement>('[k="item"]');
    if (items) filterItems(el.value, items, false, false);
  },
});

export const ListboxList = createSimpleComponent<'div', ListboxListOwnProps>(
  'listbox-list',
  'div',
);

/** @deprecated Use `Item` instead. */
export const ListboxOption = Item;

type ListboxComponent = typeof ListboxBase & {
  Input: typeof ListboxInput;
  List: typeof ListboxList;
  Item: typeof Item;
  /** @deprecated Use `Item` or `Listbox.Item` instead. */
  Option: typeof Item;
};

export const Listbox: ListboxComponent = Object.assign(ListboxBase, {
  Input: ListboxInput,
  List: ListboxList,
  Item,
  Option: Item,
});
