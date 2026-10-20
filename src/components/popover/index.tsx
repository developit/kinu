import {createContext} from 'preact';
import {commandChild, overlayContent, overlayRoot} from '../../lib/overlay';
import type {
  PopoverOwnProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export const Popover = /*#__PURE__*/ overlayRoot<PopoverOwnProps>(IdCtx, 'popover');

export const PopoverTrigger = /*#__PURE__*/ commandChild<PopoverTriggerProps>(IdCtx, 'toggle-popover');

export const PopoverContent = /*#__PURE__*/ overlayContent<PopoverContentProps>(IdCtx, 'popover-content', {
  popover: 'auto',
  tabindex: -1,
});

export const PopoverClose = /*#__PURE__*/ commandChild<PopoverCloseProps>(IdCtx, 'close');
