import {createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {
  installCommands,
  installDialogsDropdowns,
} from '../../lib/commands';
import type {
  DropdownMenuOwnProps,
  DropdownMenuTriggerOwnProps,
  DropdownMenuContentOwnProps,
  DropdownMenuItemOwnProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function DropdownMenu({id: idProp, children}: DropdownMenuOwnProps) {
  installCommands();
  installDialogsDropdowns();
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

export const DropdownMenuItem = createSimpleComponent<
  'button' | 'a',
  DropdownMenuItemOwnProps
>('dropdown-menu-item', (props) => (props.href ? 'a' : 'button'));
