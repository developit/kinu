import {useId} from 'preact/hooks';
import type {RatingProps} from './types';
import './style.css';

export function Rating({
  name,
  value,
  count = 5,
  readOnly,
  size,
  ...props
}: RatingProps) {
  const baseId = useId();
  const stars = [];

  // Descending DOM order (count → 1) so the CSS sibling combinator can fill the
  // checked star and every lower one; `flex-direction: row-reverse` flips it back.
  for (let i = count ?? 5; i >= 1; i--) {
    const id = `${baseId}-${i}`;
    stars.push(
      <input
        key={id}
        type="radio"
        id={id}
        name={name}
        value={i}
        defaultChecked={value === i}
        disabled={readOnly ?? undefined}
        aria-label={`${i} star${i === 1 ? '' : 's'}`}
      />,
      // biome-ignore lint/a11y/noLabelWithoutControl: associated to its radio via htmlFor; the CSS star widget needs input and label to be siblings, so the control can't be nested inside the label.
      <label key={`${id}-label`} htmlFor={id} />,
    );
  }

  // `size` isn't part of <span>'s typed attributes; merge it in via a spread
  // (a literal `size=` triggers a JSX excess-property error) so it still lands
  // as the bare `[size]` attribute the stylesheet targets.
  const wrapperProps = {...props, ...(size ? {size} : null)};

  return (
    <span k="rating" {...wrapperProps}>
      {stars}
    </span>
  );
}
