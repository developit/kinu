import {createContext} from 'preact';
import {useContext} from 'preact/hooks';
import {forwardRef} from '../../lib/forwardref';
import {installMenuShortcuts} from '../../lib/commands';
import {commandChild, overlayRoot} from '../../lib/overlay';
import {Item} from '../item';
import type {
  DropdownMenuOwnProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export const DropdownMenu = /*#__PURE__*/ Object.assign(
  overlayRoot<DropdownMenuOwnProps>(IdCtx, 'dropdown'),
  {Item},
);

export const DropdownMenuTrigger = /*#__PURE__*/ commandChild<DropdownMenuTriggerProps>(IdCtx, 'toggle-popover');

/* The menu targets itself with `command="close"`, so an item click closes it
 * (overridable through `command` / `commandFor`). */
export const DropdownMenuContent = /*#__PURE__*/ forwardRef(function DropdownMenuContent({
  id,
  ...props
}: DropdownMenuContentProps) {
  installMenuShortcuts();
  const ctx = useContext(IdCtx);
  id = id || ctx;
  return (
    <dialog
      k="dropdown-content"
      id={id}
      command="close"
      commandfor={id}
      popover="auto"
      closedby="any"
      tabindex={-1}
      {...props}
    />
  );
});

/** @deprecated Use `Item` instead. */
export const DropdownMenuItem = Item;
