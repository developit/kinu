import type {AspectRatioProps} from './types';
import './style.css';

export function AspectRatio({ratio, style, ...props}: AspectRatioProps) {
  const mergedStyle = ratio
    ? {
        ...(typeof style === 'object' && style ? style : {}),
        '--ratio': ratio,
      }
    : style;
  return (
    <div
      k="aspect-ratio"
      {...(props as Omit<AspectRatioProps, 'ratio'>)}
      style={mergedStyle}
    />
  );
}
