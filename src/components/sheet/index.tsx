import {createContext} from 'preact';
import {useContext} from 'preact/hooks';
import {forwardRef} from '../../lib/forwardref';
import {commandChild, overlayRoot} from '../../lib/overlay';
import type {
  SheetOwnProps,
  SheetTriggerProps,
  SheetContentProps,
  SheetCloseProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export const SheetTrigger = /*#__PURE__*/ commandChild<SheetTriggerProps>(IdCtx, 'show-modal');

export const SheetContent = /*#__PURE__*/ forwardRef(function SheetContent({
  id,
  children,
  ...props
}: SheetContentProps) {
  const ctx = useContext(IdCtx);
  // The dialog is the swipe scroll container; the panel wrapper holds user
  // content in normal block flow (so nothing has to be neutralized for grid).
  return (
    <dialog k="sheet-content" id={id || ctx} closedby="any" {...props}>
      <div k="sheet-panel">{children}</div>
    </dialog>
  );
});

export const SheetClose = /*#__PURE__*/ commandChild<SheetCloseProps>(IdCtx, 'close');

export const Sheet = /*#__PURE__*/ Object.assign(
  overlayRoot<SheetOwnProps>(IdCtx, 'sheet', 'div'),
  {Trigger: SheetTrigger, Content: SheetContent, Close: SheetClose},
);
