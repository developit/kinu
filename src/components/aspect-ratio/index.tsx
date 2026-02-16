import {createSimpleComponent} from '../../lib/create-simple-component';
import type {AspectRatioOwnProps, AspectRatioProps} from './types';
import './style.css';

const AspectRatioBase = createSimpleComponent<'div', AspectRatioOwnProps>(
  'aspect-ratio',
  'div',
);

export function AspectRatio({ratio, style, ...props}: AspectRatioProps) {
  const mergedStyle = ratio ? {...(style || {}), '--ratio': ratio} : style;
  return <AspectRatioBase {...props} style={mergedStyle} />;
}
