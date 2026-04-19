import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ItemFieldOwnProps, ItemOwnProps} from './types';
import './style.css';

const ItemBase = createSimpleComponent<'button' | 'a', ItemOwnProps>(
  'item',
  (props) => (props.href ? 'a' : 'button'),
  {tabIndex: -1},
);

const ItemField = createSimpleComponent<'label', ItemFieldOwnProps>(
  'item',
  'label',
  {tabIndex: -1},
);

type ItemComponent = typeof ItemBase & {Field: typeof ItemField};

export const Item = ItemBase as ItemComponent;
Item.Field = ItemField;
