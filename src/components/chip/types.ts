import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export type ChipVariant = 'primary' | 'destructive' | 'outline';

export interface ChipOwnProps extends BaseProps {
  /**
   * Visual variant for the chip.
   */
  variant?: ChipVariant;

  /**
   * Marks the chip as selected for styling.
   */
  selected?: boolean;
}

export type ChipProps = ChipOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof ChipOwnProps>;

export interface ChipButtonOwnProps extends BaseProps {}

export type ChipButtonProps = ChipButtonOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ChipButtonOwnProps>;
