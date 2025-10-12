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
  const id = (useContext(IdCtx) as any) || '';
  const anchor = `--p-${String(id).replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  return applyPropsToChildren(children, {
    ...(props as any),
    commandfor: id,
    command: 'show',
    style: {...(props.style as any), anchorName: anchor},
  });
}

export function DropdownMenuContent({
  id,
  ...props
}: JSX.IntrinsicElements['dialog']) {
  const ctx = useContext(IdCtx) as any;
  const anchorId = (id ?? ctx) || '';
  const anchor = `--p-${String(anchorId).replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  return (
    <dialog
      p="dropdown-content"
      id={id ?? ctx}
      command="close"
      commandFor={id ?? ctx}
      {...(props as any)}
      style={{...(props.style as any), positionAnchor: anchor}}
    />
  );
}

export const DropdownMenuItem = createSimpleComponent(
  'dropdown-menu-item',
  (props: any) => (props.href ? 'a' : 'button'),
);
