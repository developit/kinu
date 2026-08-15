import {forwardRef} from '../../lib/forwardref';
import type {AspectRatioProps} from './types';
import './style.css';

export const AspectRatio = /*#__PURE__*/ forwardRef(function AspectRatio({
  ratio,
  style,
  ...props
}: AspectRatioProps) {
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
});
