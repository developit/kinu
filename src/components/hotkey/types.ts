import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface HotkeyOwnProps extends BaseProps {
  /**
   * Key chord to bind, e.g. `"mod+k"`, `"mod+shift+p"`, `"/"`. `mod` is ⌘ on
   * Apple platforms and Ctrl elsewhere.
   */
  keys: string;
}

export type HotkeyProps = HotkeyOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof HotkeyOwnProps | 'k' | 'ref'>;

export interface HotkeyButtonOwnProps extends BaseProps {}
