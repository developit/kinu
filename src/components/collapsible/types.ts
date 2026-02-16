import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface CollapsibleOwnProps extends BaseProps {
  /**
   * Controls the open state of the details element.
   */
  open?: boolean;

}

export type CollapsibleProps = CollapsibleOwnProps &
  Omit<JSX.IntrinsicElements['details'], keyof CollapsibleOwnProps>;
