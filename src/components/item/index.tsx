import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ItemFieldOwnProps, ItemOwnProps} from './types';
import './style.css';

const ItemBase = createSimpleComponent<'button' | 'a', ItemOwnProps>(
  'item',
  (props) => (props.href ? 'a' : 'button'),
  {tabIndex: -1},
);

function stop(e: MouseEvent) {
  e.stopPropagation();
}

const ItemField = createSimpleComponent<'label', ItemFieldOwnProps>(
  'item',
  'label',
  {tabIndex: -1},
  (el: HTMLLabelElement) => {
    // Prevent clicks from reaching document-level commandClickHandler,
    // which would otherwise close the surrounding DropdownMenu/ContextMenu
    // (the dialog has command="close" on itself). Native label→control
    // activation runs on the same click event and is unaffected.
    el.onclick = stop;
  },
);

type ItemComponent = typeof ItemBase & {Field: typeof ItemField};

export const Item = ItemBase as ItemComponent;
Item.Field = ItemField;
