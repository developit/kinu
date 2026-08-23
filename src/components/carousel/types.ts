import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface CarouselOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the carousel content. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type CarouselProps = CarouselOwnProps;

export interface CarouselContentOwnProps extends BaseProps {
  /**
   * Render native CSS pagination dots beneath the carousel. Progressive
   * enhancement — the prev/next buttons remain the baseline control, and dots
   * only appear where `::scroll-marker` is supported.
   */
  dots?: boolean;
}

export interface CarouselItemOwnProps extends BaseProps {}

export interface CarouselPreviousOwnProps extends BaseProps {}

export interface CarouselNextOwnProps extends BaseProps {}

export type CarouselContentProps = CarouselContentOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof CarouselContentOwnProps>;

export type CarouselItemProps = CarouselItemOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof CarouselItemOwnProps>;

export type CarouselPreviousProps = CarouselPreviousOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof CarouselPreviousOwnProps>;

export type CarouselNextProps = CarouselNextOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof CarouselNextOwnProps>;
