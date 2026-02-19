import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface LabelOwnProps extends BaseProps {
  /**
   * ID of the form element this label describes.
   */
  htmlFor?: string;
}

export type LabelProps = LabelOwnProps &
  Omit<JSX.IntrinsicElements['label'], keyof LabelOwnProps>;
