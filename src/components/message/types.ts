import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

/**
 * Who the message is from — drives bubble color and alignment.
 */
export type MessageFrom = 'user' | 'assistant' | 'system';

export interface MessageOwnProps extends BaseProps {
  /**
   * Author of the message.
   */
  from?: MessageFrom | null;
}
export type MessageProps = MessageOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof MessageOwnProps>;

export interface MessageBubbleOwnProps extends BaseProps {}
export type MessageBubbleProps = MessageBubbleOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof MessageBubbleOwnProps>;

export interface MessageAvatarOwnProps extends BaseProps {}
export type MessageAvatarProps = MessageAvatarOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof MessageAvatarOwnProps>;
