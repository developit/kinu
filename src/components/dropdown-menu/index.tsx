import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {applyPropsToChildren} from '../../lib/children';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installCommands, installDialogsDropdowns} from '../../lib/commands';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export function DropdownMenu({
  id: idProp,
  children,
}: {id?: string; children: ComponentChildren}) {
  installCommands();
  installDialogsDropdowns();
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
}: JSX.ElementChildrenAttribute & preact.JSX.HTMLAttributes<HTMLElement>) {
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
}: Omit<JSX.IntrinsicElements['dialog'], 'command' | 'commandfor'> & {
  command?: string;
  commandfor?: string;
}) {
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

export const DropdownMenuItem = createSimpleComponent(
  'dropdown-menu-item',
  (props: any) => (props.href ? 'a' : 'button'),
);
