import {Dialog} from '../dialog';
import {Item} from '../item';
import {Listbox, ListboxInput, ListboxList} from '../listbox';
import type {CommandProps} from './types';
import './style.css';

// A command palette is just a modal Dialog hosting a Listbox: the Listbox
// provides substring filtering (ListboxInput) and keyboard navigation
// (installMenuShortcuts), the Dialog provides the modal + focus trap. No fuzzy
// engine, no new state — everything here already ships.
function CommandRoot({children, ...props}: CommandProps) {
  return (
    <Dialog.Content data-command="" {...props}>
      <Listbox>{children}</Listbox>
    </Dialog.Content>
  );
}

export const Command = Object.assign(CommandRoot, {
  Input: ListboxInput,
  List: ListboxList,
  Item,
});
