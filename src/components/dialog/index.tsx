import {createContext} from 'preact';
import {commandChild, overlayContent, overlayRoot} from '../../lib/overlay';
import type {
  DialogOwnProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogCloseProps,
} from './types';
import './style.css';

const DialogIdCtx = createContext<string | undefined>(undefined);

export const DialogTrigger = /*#__PURE__*/ commandChild<DialogTriggerProps>(DialogIdCtx, 'show-modal');
export const DialogContent = /*#__PURE__*/ overlayContent<DialogContentProps>(DialogIdCtx, 'dialog-content');
export const DialogClose = /*#__PURE__*/ commandChild<DialogCloseProps>(DialogIdCtx, 'close');

export const Dialog = /*#__PURE__*/ Object.assign(
  overlayRoot<DialogOwnProps>(DialogIdCtx),
  {Trigger: DialogTrigger, Content: DialogContent, Close: DialogClose},
);
