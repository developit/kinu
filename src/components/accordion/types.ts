import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface AccordionOwnProps extends BaseProps {
  /**
   * Controls the open state of the details element.
   */
  open?: boolean;
}

export type AccordionProps = AccordionOwnProps &
  Omit<JSX.IntrinsicElements['details'], keyof AccordionOwnProps>;
