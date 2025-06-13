import './style.css';

export function Avatar({children, ...props}: JSX.IntrinsicElements['img']) {
  return <img p="avatar" alt={String(children || '')} {...props} />;
}
