import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Padding presets supported by Card.
 */
export type CardPadding = 'none' | 'sm' | 'lg';

export interface CardOwnProps extends BaseProps {
  /**
   * Padding preset for the card content.
   * @default 'md'
   */
  padding?: CardPadding;
}

export type CardProps = CardOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof CardOwnProps>;
