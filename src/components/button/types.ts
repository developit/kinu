import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

type ButtonElementProps = JSX.IntrinsicElements['button'];
type AnchorElementProps = JSX.IntrinsicElements['a'];

/**
 * Visual style variants supported by Button.
 */
export type ButtonVariant =
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

/**
 * Size presets supported by Button.
 */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonOwnProps extends BaseProps {
  /**
   * Visual style variant.
   * @default 'default'
   */
  variant?: ButtonVariant | null;

  /**
   * Size preset for the button.
   * @default 'md'
   */
  size?: ButtonSize | null;

  /**
   * Shows a pending state and disables interactions.
   */
  loading?: boolean | null;

  /**
   * When provided, renders the Button as an anchor element.
   */
  href?: string | null;

  /**
   * Target for anchor elements.
   */
  target?: AnchorElementProps['target'] | null;

  /**
   * Relationship between the current page and the linked resource.
   */
  rel?: AnchorElementProps['rel'] | null;


  /**
   * Click handler for the button.
   */
  onClick?: ButtonElementProps['onClick'] | null;

  /**
   * Disables interactions and applies disabled styling.
   */
  disabled?: boolean | null;

  /**
   * Button type attribute.
   */
  type?: ButtonElementProps['type'] | null;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonElementProps, keyof ButtonOwnProps> &
  Omit<AnchorElementProps, keyof ButtonOwnProps>;
