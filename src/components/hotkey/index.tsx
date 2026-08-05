import {installCommands} from '../../lib/commands';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {installHotkeys, normalizeChord} from '../../lib/hotkeys';
import type {HotkeyButtonOwnProps, HotkeyProps} from './types';
import './style.css';

// A Hotkey renders a hidden command button tagged with the chord. The global
// hotkey listener clicks it on match, which fires the command via the bus —
// reusing command/commandfor, with no bespoke per-app key handling.
const HotkeyButton = createSimpleComponent<'button', HotkeyButtonOwnProps>(
  'hotkey',
  'button',
  {type: 'button', hidden: true, tabIndex: -1, 'aria-hidden': 'true'},
);

export function Hotkey({keys, ...props}: HotkeyProps) {
  installCommands();
  installHotkeys();
  return <HotkeyButton data-hotkey={normalizeChord(keys)} {...props} />;
}
