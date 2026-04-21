import {type JSX, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {
  installCommands,
  installAdaptiveCommands,
  installDialogsDropdowns,
  installMenuShortcuts,
} from '../../lib/commands';
import {Item} from '../item';
import type {
  DropdownMenuOwnProps,
  DropdownMenuTriggerOwnProps,
  DropdownMenuContentOwnProps,
  DropdownMenuSubTriggerOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function DropdownMenu({id: idProp, children}: DropdownMenuOwnProps) {
  installCommands();
  installAdaptiveCommands();
  installDialogsDropdowns();
  installMenuShortcuts();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span k="dropdown">{children}</span>
    </IdCtx.Provider>
  );
}

export function DropdownMenuTrigger({
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
}

export function DropdownMenuContent({
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
      commandFor={commandFor ?? resolvedId}
      {...props}
    />
  );
}

/** @deprecated Use `Item` instead. */
export const DropdownMenuItem = Item;

export const DropdownMenuSubTrigger = createSimpleComponent<
  'button',
  DropdownMenuSubTriggerOwnProps
>('item', 'button', {submenu: ''} as any);

Object.assign(DropdownMenu, {Item});
