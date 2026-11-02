import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface FormOwnProps extends BaseProps {
  /**
   * Called with the submit event when the form passes native validation. When
   * the form is invalid, Form instead prevents submission and focuses the first
   * invalid control — so you never manage validation state yourself.
   */
  onValid?: JSX.GenericEventHandler<HTMLFormElement> | null;
}

export type FormProps = FormOwnProps &
  Omit<JSX.IntrinsicElements['form'], keyof FormOwnProps | 'k' | 'ref'>;
