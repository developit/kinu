import type {AvatarProps} from './types';
import './style.css';

export function Avatar({children, alt, ...props}: AvatarProps) {
  const fallback = children ?? alt ?? '';
  return <img p="avatar" alt={String(fallback)} {...props} />;
}
