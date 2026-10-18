import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import type {ComponentProps, JSX} from 'preact';
import type {ColorPickerOwnProps} from './types';
import './style.css';

const ColorPickerInput = createSimpleComponent<'input', ColorPickerOwnProps>(
  'color-picker',
  'input',
  {type: 'color'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);

/* Screen sampling is Chromium-only and has no CSS feature query, so the button
 * is rendered by capability rather than hidden with CSS. Read once at module
 * scope: it can't change over a page's lifetime, and it is false during SSR,
 * which makes the button a client-side enhancement. */
declare const EyeDropper: new () => {open(): Promise<{sRGBHex: string}>};
const HAS_EYEDROPPER = typeof EyeDropper !== 'undefined';

async function pick(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
  // The input is this button's previous sibling — both come from the fragment
  // below, so their order is fixed without needing a ref.
  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
  try {
    input.value = (await new EyeDropper().open()).sRGBHex;
    for (const type of ['input', 'change']) input.dispatchEvent(new Event(type, {bubbles: true}));
  } catch {
    // the user dismissed the eyedropper
  }
}

/* Opt-in `eyedropper` renders a sampling button beside the swatch. It is a
 * fragment sibling rather than an imperatively inserted node: Preact positions
 * its own children, so a node injected into a managed parent drifts as soon as
 * a later sibling renders. No wrapper element either way. The icon is a CSS
 * mask (see style.css), so it costs no markup here. */
export const ColorPicker = /*#__PURE__*/ forwardRef(function ColorPicker({
  eyedropper,
  ...props
}: ComponentProps<typeof ColorPickerInput>) {
  const input = <ColorPickerInput {...props} />;
  return eyedropper && HAS_EYEDROPPER ? (
    <>
      {input}
      <button k="color-picker-eyedropper" type="button" title="Pick color from screen" onClick={pick} />
    </>
  ) : (
    input
  );
});
