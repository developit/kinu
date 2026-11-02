import {createSimpleComponent} from '../../lib/create-simple-component';
import type {RatingProps, RatingInputOwnProps} from './types';
import './style.css';

// A star rating is a styled native <input type="range"> — one form-associated,
// keyboard-accessible element with ZERO JavaScript. The fill follows the live
// value entirely in CSS: a thumb box-shadow paints the stars up to the value on
// WebKit, ::-moz-range-progress does it on Firefox, both masked into a star row.
// The star count reads from the `max` attribute via typed attr() (like
// ProgressRing), so even the layout is script-free.
const RatingInput = createSimpleComponent<'input', RatingInputOwnProps>(
  'rating',
  'input',
  {type: 'range', min: '0', step: '1', 'aria-label': 'Rating'},
);

export function Rating({
  name,
  value,
  count = 5,
  readOnly,
  size,
  ...props
}: RatingProps) {
  return (
    <RatingInput
      name={name ?? undefined}
      max={count ?? 5}
      defaultValue={value ?? 0}
      data-size={size ?? undefined}
      {...(readOnly ? {readonly: true} : {})}
      {...props}
    />
  );
}
