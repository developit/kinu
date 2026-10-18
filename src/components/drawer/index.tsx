import {createContext} from 'preact';
import {commandChild, overlayContent, overlayRoot} from '../../lib/overlay';
import type {
  DrawerOwnProps,
  DrawerTriggerProps,
  DrawerContentProps,
  DrawerCloseProps,
} from './types';
import './style.css';

const IdCtx = createContext<string | undefined>(undefined);

export const DrawerTrigger = /*#__PURE__*/ commandChild<DrawerTriggerProps>(IdCtx, 'show-modal');
export const DrawerContent = /*#__PURE__*/ overlayContent<DrawerContentProps>(IdCtx, 'drawer-content');
export const DrawerClose = /*#__PURE__*/ commandChild<DrawerCloseProps>(IdCtx, 'close');

export const Drawer = /*#__PURE__*/ Object.assign(
  /* The overlay listeners include swipe, which Drawer once forgot to install:
   * alone on a page it opened to a blank screen, because the touch layout puts
   * the panel one viewport down the scroller and it is the swipe control plane
   * that scrolls it into view. */
  overlayRoot<DrawerOwnProps>(IdCtx, 'drawer', 'div'),
  {Trigger: DrawerTrigger, Content: DrawerContent, Close: DrawerClose},
);
