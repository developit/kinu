import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {
  installCommands,
  installDialogsDropdowns,
  installMenuShortcuts,
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
  installMenuShortcuts();
  const gen = useId();
  const id = idProp ?? gen;
  return (
    <IdCtx.Provider value={id}>
      <span p="dropdown">{children}</span>
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
    commandfor: id,
    command: 'show',
  });
}

export function DropdownMenuContent({
  id,
  command = 'close',
  commandfor,
  ...props
}: DropdownMenuContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], 'command' | 'commandfor'>) {
  const ctx = useContext(IdCtx);
  const resolvedId = id ?? ctx;
  return (
    <dialog
      p="dropdown-content"
      id={resolvedId}
      command={command}
      commandfor={commandfor ?? resolvedId}
      {...props}
    />
  );
}

export const DropdownMenuItem = createSimpleComponent<
  'button' | 'a',
  DropdownMenuItemOwnProps
>('dropdown-menu-item', (props) => (props.href ? 'a' : 'button'));
