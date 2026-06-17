import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  MessageOwnProps,
  MessageBubbleOwnProps,
  MessageAvatarOwnProps,
} from './types';
import './style.css';

const MessageRoot = createSimpleComponent<'div', MessageOwnProps>(
  'message',
  'div',
);

const MessageBubble = createSimpleComponent<'div', MessageBubbleOwnProps>(
  'message-bubble',
  'div',
);

const MessageAvatar = createSimpleComponent<'div', MessageAvatarOwnProps>(
  'message-avatar',
  'div',
);

export const Message = Object.assign(MessageRoot, {
  Bubble: MessageBubble,
  Avatar: MessageAvatar,
});
