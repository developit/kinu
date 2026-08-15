import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import type {AvatarGroupOwnProps, AvatarProps} from './types';
import './style.css';

const AvatarBase = /*#__PURE__*/ forwardRef(function AvatarBase({
  children,
  alt,
  ...props
}: AvatarProps) {
  const fallback = children ?? alt ?? '';
  return <img k="avatar" alt={String(fallback)} {...props} />;
});

const AvatarGroup = createSimpleComponent<'div', AvatarGroupOwnProps>(
  'avatar-group',
  'div',
);

type AvatarComponent = typeof AvatarBase & {Group: typeof AvatarGroup};

export const Avatar = AvatarBase as AvatarComponent;
Avatar.Group = AvatarGroup;
