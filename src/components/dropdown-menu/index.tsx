import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {forwardRef} from '../../lib/forwardref';
import {
  installCommands,
  installAdaptiveCommands,
  installDialogsDropdowns,
  installMenuShortcuts,
  installSwipe,
} from '../../lib/commands';
import {Item} from '../item';
import type {
  DropdownMenuOwnProps,
  DropdownMenuTriggerOwnProps,
  DropdownMenuContentOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function DropdownMenu({id: idProp, children}: DropdownMenuOwnProps) {
  installCommands();
  installAdaptiveCommands();
  installDialogsDropdowns();
  installMenuShortcuts();
  installSwipe();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span k="dropdown">{children}</span>
    </IdCtx.Provider>
  );
}

export const DropdownMenuTrigger = /*#__PURE__*/ forwardRef(function DropdownMenuTrigger({
  children,
  ...props
}: DropdownMenuTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>) {
  const id = useContext(IdCtx);
  return applyPropsToChildren(children, {
    ...props,
    commandFor: id,
    command: 'show',
  });
});

export const DropdownMenuContent = /*#__PURE__*/ forwardRef(function DropdownMenuContent({
  id,
  command = 'close',
  commandFor,
  ...props
}: DropdownMenuContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], 'command' | 'commandfor' | 'commandFor'>) {
  const ctx = useContext(IdCtx);
  const resolvedId = id ?? ctx;
  return (
    <dialog
      k="dropdown-content"
      id={resolvedId}
      command={command}
      commandfor={commandFor ?? resolvedId}
      {...props}
    />
  );
});

/** @deprecated Use `Item` instead. */
export const DropdownMenuItem = Item;

Object.assign(DropdownMenu, {Item});
