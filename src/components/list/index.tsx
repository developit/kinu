import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts} from '../../lib/commands';
import type {ListOwnProps, ListItemOwnProps} from './types';
import './style.css';

const ListBase = createSimpleComponent<'div', ListOwnProps>(
  'list',
  'div',
  {},
  () => {
    installMenuShortcuts();
  },
);

export const ListItem = createSimpleComponent<'button' | 'a', ListItemOwnProps>(
  'list-item',
  (props) => (props.href ? 'a' : 'button'),
);

type ListComponent = typeof ListBase & {
  Item: typeof ListItem;
};

export const List: ListComponent = Object.assign(ListBase, {
  Item: ListItem,
});
