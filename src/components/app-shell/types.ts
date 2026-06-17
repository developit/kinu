import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface AppShellOwnProps extends BaseProps {}
export type AppShellProps = AppShellOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof AppShellOwnProps>;

export interface AppShellHeaderOwnProps extends BaseProps {}
export type AppShellHeaderProps = AppShellHeaderOwnProps &
  Omit<JSX.IntrinsicElements['header'], keyof AppShellHeaderOwnProps>;

export interface AppShellSidebarOwnProps extends BaseProps {}
export type AppShellSidebarProps = AppShellSidebarOwnProps &
  Omit<JSX.IntrinsicElements['aside'], keyof AppShellSidebarOwnProps>;

export interface AppShellMainOwnProps extends BaseProps {}
export type AppShellMainProps = AppShellMainOwnProps &
  Omit<JSX.IntrinsicElements['main'], keyof AppShellMainOwnProps>;

export interface AppShellFooterOwnProps extends BaseProps {}
export type AppShellFooterProps = AppShellFooterOwnProps &
  Omit<JSX.IntrinsicElements['footer'], keyof AppShellFooterOwnProps>;
