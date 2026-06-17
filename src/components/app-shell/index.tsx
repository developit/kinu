import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  AppShellOwnProps,
  AppShellHeaderOwnProps,
  AppShellSidebarOwnProps,
  AppShellMainOwnProps,
  AppShellFooterOwnProps,
} from './types';
import './style.css';

const AppShellRoot = createSimpleComponent<'div', AppShellOwnProps>(
  'app-shell',
  'div',
);

const AppShellHeader = createSimpleComponent<'header', AppShellHeaderOwnProps>(
  'app-shell-header',
  'header',
);

const AppShellSidebar = createSimpleComponent<'aside', AppShellSidebarOwnProps>(
  'app-shell-sidebar',
  'aside',
);

const AppShellMain = createSimpleComponent<'main', AppShellMainOwnProps>(
  'app-shell-main',
  'main',
);

const AppShellFooter = createSimpleComponent<'footer', AppShellFooterOwnProps>(
  'app-shell-footer',
  'footer',
);

export const AppShell = Object.assign(AppShellRoot, {
  Header: AppShellHeader,
  Sidebar: AppShellSidebar,
  Main: AppShellMain,
  Footer: AppShellFooter,
});
