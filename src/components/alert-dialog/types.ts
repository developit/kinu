import type {JSX} from 'preact';
import type {RequiredChildrenProps} from '../../types/component-props';

export interface AlertDialogOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the dialog. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type AlertDialogProps = AlertDialogOwnProps;

/**
 * Props for AlertDialog.Content.
 */
export type AlertDialogContentProps = JSX.IntrinsicElements['dialog'];

/**
 * Props for AlertDialog.Trigger and AlertDialog.Close.
 */
export type AlertDialogTriggerProps =
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;
