import type {JSX} from 'preact';

export interface AspectRatioOwnProps {
  /**
   * Aspect ratio expressed as a CSS ratio string (e.g. "16 / 9").
   */
  ratio?: string;
}

export type AspectRatioProps = AspectRatioOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof AspectRatioOwnProps>;
