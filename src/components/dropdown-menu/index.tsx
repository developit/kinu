import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {applyPropsToChildren} from '../../lib/children';
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

export const DropdownMenuContent = createSimpleComponent<
  'dialog',
  DropdownMenuContentOwnProps
>('dropdown-content', 'dialog', (p: any) => {
  const id = p.id ?? useContext(IdCtx);
  return {
    command: 'close',
    ...p,
    id,
    commandFor: p.commandFor ?? id,
  };
});

/** @deprecated Use `Item` instead. */
export const DropdownMenuItem = Item;

Object.assign(DropdownMenu, {Item});
