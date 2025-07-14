import './style.css';

type ImgProps = JSX.IntrinsicElements['img'];
interface AvatarProps extends ImgProps {
  children?: string | number;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({children, ...props}: AvatarProps) {
  return <img p="avatar" alt={String(children || '')} {...props} />;
}
