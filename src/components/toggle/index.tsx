import {h, type JSX} from 'preact';
import type {ToggleOwnProps} from './types';
import './style.css';

function togglePressedState(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
  const el = e.currentTarget;
  el
    .closest('[p="toggle-group"]')
    ?.querySelector('[aria-pressed]')
    ?.removeAttribute('aria-pressed');
  el.hasAttribute('aria-pressed')
    ? el.removeAttribute('aria-pressed')
    : el.setAttribute('aria-pressed', 'true');
}

export function Toggle({
  pressed,
  'aria-pressed': ariaPressed,
  onClickCapture,
  ...props
}: ToggleOwnProps & JSX.IntrinsicElements['button']) {
  const resolvedPressed = ariaPressed ?? (pressed == null ? undefined : pressed);

  function handleClickCapture(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    onClickCapture?.(e);
    if (e.defaultPrevented) return;
    togglePressedState(e);
  }

  return (
    <button
      p="toggle"
      aria-pressed={resolvedPressed}
      onClickCapture={handleClickCapture}
      {...props}
    />
  );
}
