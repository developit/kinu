import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TabListOwnProps extends BaseProps {}

// Props on <Tab> forward to the underlying <input type="radio">. Use
// `defaultChecked` to pre-select; `disabled` to disable; `name` to override the
// auto-generated group name (rare).
export interface TabOwnProps extends BaseProps {}

export interface TabPanelOwnProps extends BaseProps {}

export type TabListProps = TabListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabListOwnProps>;

export type TabProps = TabOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof TabOwnProps>;

export type TabPanelProps = TabPanelOwnProps &
  Omit<JSX.IntrinsicElements['section'], keyof TabPanelOwnProps>;

/** @deprecated Renamed to `TabListOwnProps`. */
export type TabsOwnProps = TabListOwnProps;
/** @deprecated Renamed to `TabListProps`. */
export type TabsProps = TabListProps;
