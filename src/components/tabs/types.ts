import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TabsOwnProps extends BaseProps {}

export interface TabOwnProps extends BaseProps {
  /** Whether this tab is open. Native `<details open>` semantics. */
  open?: boolean;
  /** Group name. Tabs with the same `name` are mutually exclusive. */
  name?: string;
}

export interface TabLabelOwnProps extends BaseProps {}

export interface TabPanelOwnProps extends BaseProps {}

export type TabsProps = TabsOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabsOwnProps>;
export type TabProps = TabOwnProps &
  Omit<JSX.IntrinsicElements['details'], keyof TabOwnProps>;
export type TabLabelProps = TabLabelOwnProps &
  Omit<JSX.IntrinsicElements['summary'], keyof TabLabelOwnProps>;
export type TabPanelProps = TabPanelOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabPanelOwnProps>;

/** @deprecated Renamed to `Tabs`. */
export type TabListProps = TabsProps;
/** @deprecated Renamed to `TabsOwnProps`. */
export type TabListOwnProps = TabsOwnProps;
