import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface AspectRatioOwnProps extends BaseProps {
  /**
   * Aspect ratio expressed as a CSS ratio string (e.g. "16 / 9").
   */
  ratio?: string;
}

export type AspectRatioProps = AspectRatioOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof AspectRatioOwnProps>;
