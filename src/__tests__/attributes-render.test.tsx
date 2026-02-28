import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Button, Dialog, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../index';

describe('rendered attributes', () => {
  it('renders p/command/commandfor for factory and wrapper components', () => {
    const html = renderToString(
      <>
        <Button>Factory</Button>
        <Dialog id="dialog-id">
          <Dialog.Trigger>
            <button type="button">Open dialog</button>
          </Dialog.Trigger>
          <Dialog.Content />
          <Dialog.Close>
            <button type="button">Close dialog</button>
          </Dialog.Close>
        </Dialog>
        <DropdownMenu id="dropdown-id">
          <DropdownMenuTrigger>
            <button type="button">Open menu</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>,
    );

    expect(html).toContain('p="button"');
    expect(html).toContain('command="show-modal"');
    expect(html).toContain('command="close"');
    expect(html).toContain('command="show"');
    expect(html).toContain('commandfor="dialog-id"');
    expect(html).toContain('commandfor="dropdown-id"');
  });
});
