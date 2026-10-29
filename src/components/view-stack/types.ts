import type {ComponentChildren} from 'preact';
import type {SimpleComponentProps} from '../../types/component-props';

export interface ViewStackOwnProps {
  /** Allowed initial direction of native touch panning. Defaults to 'back' in CSS. */
  swipe?: 'back' | 'both';
  /** Direct ViewStack.View children, in drill-down order. */
  children?: ComponentChildren;
}
export type ViewStackProps = SimpleComponentProps<'div', ViewStackOwnProps>;

export interface ViewStackViewOwnProps {
  /** Mounted on first navigation, then retained until the view is removed. */
  children?: ComponentChildren | (() => ComponentChildren);
}
export type ViewStackViewProps = SimpleComponentProps<'div', ViewStackViewOwnProps>;
