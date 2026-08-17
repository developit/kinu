import {createSimpleComponent} from '../../lib/create-simple-component';
import {forwardRef} from '../../lib/forwardref';
import type {ComponentProps, JSX} from 'preact';
import type {ColorPickerOwnProps} from './types';
import './style.css';

const EYEDROPPER_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 22 1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.9.9a2.1 2.1 0 1 1-3 3l-.9-.9-9 9"/></svg>';

const ColorPickerInput = createSimpleComponent<'input', ColorPickerOwnProps>(
  'color-picker',
  'input',
  {type: 'color'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);

/* Screen sampling is Chromium-only and has no CSS feature query, so the button
 * is rendered by capability rather than hidden with CSS. Read once at module
 * scope: it can't change over a page's lifetime, and it is false during SSR,
 * which makes the button a client-side enhancement. */
const HAS_EYEDROPPER = typeof window !== 'undefined' && 'EyeDropper' in window;

async function pick(e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
  // The input is this button's previous sibling — both come from the fragment
  // below, so their order is fixed without needing a ref.
  const input = e.currentTarget.previousElementSibling as HTMLInputElement | null;
  if (!input) return;
  try {
    const {sRGBHex} = await new (window as unknown as {
      EyeDropper: new () => {open(): Promise<{sRGBHex: string}>};
    }).EyeDropper().open();
    input.value = sRGBHex;
    input.dispatchEvent(new Event('input', {bubbles: true}));
    input.dispatchEvent(new Event('change', {bubbles: true}));
  } catch {
    // the user dismissed the eyedropper
  }
}

/* Opt-in `eyedropper` renders a sampling button beside the swatch. It is a
 * fragment sibling rather than an imperatively inserted node: Preact positions
 * its own children, so a node injected into a managed parent drifts as soon as
 * a later sibling renders. No wrapper element either way. */
export const ColorPicker = /*#__PURE__*/ forwardRef(function ColorPicker({
  eyedropper,
  ...props
}: ComponentProps<typeof ColorPickerInput>) {
  if (!eyedropper || !HAS_EYEDROPPER) return <ColorPickerInput {...props} />;
  return (
    <>
      <ColorPickerInput {...props} />
      <button
        k="color-picker-eyedropper"
        type="button"
        title="Pick color from screen"
        onClick={pick}
        dangerouslySetInnerHTML={{__html: EYEDROPPER_ICON}}
      />
    </>
  );
});
