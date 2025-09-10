import {type ComponentChildren, createContext} from 'preact';
import {useId, useContext, useLayoutEffect, useRef} from 'preact/hooks';
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
  ...props
}: preact.JSX.HTMLAttributes<HTMLDialogElement> & {id?: string}) {
  const ctx = useContext(IdCtx);
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const anchor = el.parentElement as HTMLElement;
    function update() {
      const rect = el.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const flipX = rect.right > innerWidth && a.right > rect.width;
      const flipY = rect.bottom > innerHeight && a.top > rect.height;
      el.toggleAttribute('data-flip-x', flipX);
      el.toggleAttribute('data-flip-y', flipY);
    }
    el.addEventListener('toggle', update);
    addEventListener('resize', update, {passive: true});
    update();
    return () => {
      el.removeEventListener('toggle', update);
      removeEventListener('resize', update);
    };
  }, []);
  return (
    <dialog
      ref={ref}
      p="dropdown-content"
      id={id ?? ctx}
      {...({command: 'close', commandFor: id ?? ctx} as any)}
      {...props}
    />
  );
}

export const DropdownMenuItem = createSimpleComponent(
  'dropdown-menu-item',
  'button',
);
