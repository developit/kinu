import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TabsOwnProps extends BaseProps {}

export interface TabOwnProps extends BaseProps {
  /** Whether this tab is initially selected. Sets `defaultChecked` on the underlying radio. */
  checked?: boolean;
}

export interface TabPanelOwnProps extends BaseProps {}

export type TabsProps = TabsOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabsOwnProps>;
export type TabProps = TabOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof TabOwnProps>;
export type TabPanelProps = TabPanelOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabPanelOwnProps>;

/** @deprecated Renamed to `Tabs`. */
export type TabListProps = TabsProps;
/** @deprecated Renamed to `TabsOwnProps`. */
export type TabListOwnProps = TabsOwnProps;
