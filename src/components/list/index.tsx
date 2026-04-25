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

type ListComponent = typeof ListBase & {
  Item: typeof Item;
};

export const List = ListBase as ListComponent;
List.Item = Item;
