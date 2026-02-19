import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TabListOwnProps extends BaseProps {}

export interface TabOwnProps extends BaseProps {
  /**
   * Marks the tab as selected.
   */
  'aria-selected'?: 'true' | 'false' | boolean;

  /**
   * Disable tab interactions.
   */
  disabled?: boolean;
}

export interface TabPanelOwnProps extends BaseProps {
  /**
   * Hide the panel when inactive.
   */
  hidden?: boolean;
}

export type TabListProps = TabListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabListOwnProps>;

export type TabProps = TabOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof TabOwnProps>;

export type TabPanelProps = TabPanelOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TabPanelOwnProps>;
