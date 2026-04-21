import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface MenubarOwnProps extends BaseProps {
}

export interface MenubarItemOwnProps extends BaseProps {
}

export type MenubarProps = MenubarOwnProps &
  Omit<JSX.IntrinsicElements['nav'], keyof MenubarOwnProps>;

export type MenubarItemProps = MenubarItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof MenubarItemOwnProps>;
