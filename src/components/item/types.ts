import type {JSX} from 'preact';
import type {BaseProps, SimpleComponentProps} from '../../types/component-props';

/** The element an {@link ItemProps | Item} renders — an `<a>` when it has an `href`. */
export type ItemElement = HTMLButtonElement | HTMLAnchorElement;

export interface ItemOwnProps extends BaseProps {
  /**
   * When provided, renders the item as an anchor element.
   */
  href?: string;

  /**
   * Marks the item as selected for styling.
   */
  selected?: boolean;

  /**
   * Optional shortcut hint rendered on the trailing edge.
   */
  shortcut?: string;

  /**
   * Applies destructive styling to the item.
   */
  destructive?: boolean;
}

export type ItemProps = SimpleComponentProps<'button' | 'a', ItemOwnProps>;

export interface ItemFieldOwnProps extends BaseProps {
  /**
   * Marks the row as selected for styling.
   */
  selected?: boolean;
}

export type ItemFieldProps = ItemFieldOwnProps &
  Omit<JSX.IntrinsicElements['label'], keyof ItemFieldOwnProps>;

// Context-specific interfaces: same runtime component, narrowed docs surface.

/** Item used inside a DropdownMenu. */
export interface DropdownMenuItemOwnProps extends ItemOwnProps {}
export type DropdownMenuItemProps = ItemProps;

/** Item used inside a ContextMenu. */
export interface ContextMenuItemOwnProps extends ItemOwnProps {}
export type ContextMenuItemProps = ItemProps;

/** Item used inside a Combobox. */
export interface ComboboxItemOwnProps extends BaseProps {
  /**
   * The value submitted or returned when this option is selected.
   * Falls back to textContent if not provided.
   */
  value?: string;

  /**
   * Marks the option as selected for styling.
   */
  selected?: boolean;

  /**
   * Applies destructive styling to the option.
   */
  destructive?: boolean;
}
export type ComboboxItemProps = ComboboxItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ComboboxItemOwnProps>;

/** Item used inside a Listbox. */
export interface ListboxItemOwnProps extends BaseProps {
  /**
   * The value submitted or returned when this option is selected.
   * Falls back to textContent if not provided.
   */
  value?: string;

  /**
   * Marks the option as selected for styling.
   */
  selected?: boolean;

  /**
   * Applies destructive styling to the option.
   */
  destructive?: boolean;
}
export type ListboxItemProps = ListboxItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ListboxItemOwnProps>;

/** Item used inside a List. */
export interface ListItemOwnProps extends ItemOwnProps {}
export type ListItemProps = ItemProps;
