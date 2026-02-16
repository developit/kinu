import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface SheetOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the sheet dialog. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type SheetProps = SheetOwnProps;

export interface SheetTriggerOwnProps extends BaseProps {
}

export interface SheetContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;
}

export interface SheetCloseOwnProps extends BaseProps {
}

export type SheetTriggerProps = SheetTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type SheetContentProps = SheetContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof SheetContentOwnProps>;

export type SheetCloseProps = SheetCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;
