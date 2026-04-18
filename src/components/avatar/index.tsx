import {createSimpleComponent} from '../../lib/create-simple-component';
import type {AvatarGroupOwnProps, AvatarProps} from './types';
import './style.css';

function AvatarBase({children, alt, ...props}: AvatarProps) {
  const fallback = children ?? alt ?? '';
  return <img k="avatar" alt={String(fallback)} {...props} />;
}

const AvatarGroup = createSimpleComponent<'div', AvatarGroupOwnProps>(
  'avatar-group',
  'div',
);

export const Avatar = Object.assign(AvatarBase, {Group: AvatarGroup});
