import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TooltipOwnProps extends BaseProps {
  /**
   * Tooltip text provided via the title attribute.
   */
  title?: string;
}

export type TooltipProps = TooltipOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof TooltipOwnProps>;
