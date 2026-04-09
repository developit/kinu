import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import {Item} from '../item';
import type {ListOwnProps} from './types';
import './style.css';

const ListBase = createSimpleComponent<'div', ListOwnProps>(
  'list',
  'div',
  {},
  () => {
    installMenuShortcuts();
  },
);

/** @deprecated Use `Item` instead. */
export const ListItem = Item;

type ListComponent = typeof ListBase & {
  Item: typeof Item;
};

export const List: ListComponent = Object.assign(ListBase, {
  Item,
});
