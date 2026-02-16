import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface SelectOwnProps extends BaseProps {

  /**
   * Current selected value.
   */
  value?: JSX.IntrinsicElements['select']['value'];

  /**
   * Change handler for controlled selects.
   */
  onChange?: JSX.IntrinsicElements['select']['onChange'];

  /**
   * Disable the select input.
   */
  disabled?: boolean;

  /**
   * Native multiple selection toggle.
   */
  multiple?: boolean;

  /**
   * Number of visible options when using native size.
   */
  size?: number;
}

export type SelectProps = SelectOwnProps &
  Omit<JSX.IntrinsicElements['select'], keyof SelectOwnProps>;
