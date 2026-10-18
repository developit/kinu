import {createSimpleComponent} from '../../lib/create-simple-component';
import {installMenuShortcuts, usePopoverOverlays} from '../../lib/commands';
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
  installMenuShortcuts,
);

const getList = (el: Element) =>
  el.closest('[k="combobox"]')!.querySelector<HTMLDialogElement>('[k="combobox-list"]')!;

/* The list opens in the top layer (popover="manual" — dismissal stays driven
 * by input blur) where supported, falling back to <dialog>.show(). */
function openList(e: Event) {
  const el = e.currentTarget as HTMLInputElement;
  const list = getList(el);
  filterItems(el.value, list.querySelectorAll<HTMLElement>('[k="item"]'), e.type !== 'input');
  if (usePopoverOverlays()) list.togglePopover(true);
  else list.show();
  el.focus();
}

function closeList(list: HTMLDialogElement) {
  if (usePopoverOverlays()) list.togglePopover(false);
  else list.close();
}

/* Capture-phase handlers, so a consumer's own onInput/onClick/onFocus/onBlur
 * don't replace them. */
export const ComboboxInput = createSimpleComponent<'input', ComboboxInputOwnProps>(
  'combobox-input',
  'input',
  {
    onInputCapture: openList,
    onClickCapture: openList,
    onFocusCapture: openList,
    onBlurCapture: (e) => {
      const list = getList(e.currentTarget);
      if (!list.contains(e.relatedTarget as Node | null)) closeList(list);
    },
  },
);

export const ComboboxList = createSimpleComponent<'dialog', ComboboxListOwnProps>(
  'combobox-list',
  'dialog',
  {
    popover: 'manual',
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
      closeList(e.currentTarget as HTMLDialogElement);
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
