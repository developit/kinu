// @vitest-environment jsdom
import {render, type ComponentChild} from 'preact';
import {act} from 'preact/test-utils';
import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  Tab,
  TabList,
  TabPanel,
  ToastContainer,
  toast,
} from '../index';

function setupDialogPolyfill() {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & {
    __polyfilled?: boolean;
    __restoreFocus?: HTMLElement | null;
  };
  if (proto.__polyfilled) return;

  proto.show = function show(this: HTMLDialogElement & {__restoreFocus?: HTMLElement | null}) {
    this.__restoreFocus = this.ownerDocument.activeElement as HTMLElement | null;
    this.setAttribute('open', '');
  };

  proto.showModal = function showModal(this: HTMLDialogElement & {__restoreFocus?: HTMLElement | null}) {
    this.show();
  };

  proto.close = function close(this: HTMLDialogElement & {__restoreFocus?: HTMLElement | null}) {
    this.removeAttribute('open');
    this.__restoreFocus?.focus();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
    dialog?.close();
  });

  proto.__polyfilled = true;
}

let root: HTMLDivElement;

beforeAll(() => {
  setupDialogPolyfill();
});

afterEach(() => {
  render(null, root);
  root.remove();
  vi.useRealTimers();
  document.body.innerHTML = '';
});

function mount(node: ComponentChild) {
  root = document.createElement('div');
  document.body.appendChild(root);
  act(() => {
    render(node, root);
  });
}

describe('interactive primitives', () => {
  it('opens and closes Dialog through trigger commands and backdrop clicks', () => {
    mount(
      <Dialog id="dlg">
        <Dialog.Trigger>
          <button type="button">Open dialog</button>
        </Dialog.Trigger>
        <Dialog.Content>Body</Dialog.Content>
      </Dialog>,
    );

    const trigger = root.querySelector('button')!;
    const dialog = root.querySelector('dialog')!;

    trigger.focus();
    act(() => {
      trigger.click();
    });
    expect(dialog.hasAttribute('open')).toBe(true);

    vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue({
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      top: 10,
      right: 20,
      bottom: 20,
      left: 10,
      toJSON: () => ({}),
    });

    act(() => {
      dialog.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: 0,
          clientY: 0,
        }),
      );
    });

    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('supports DropdownMenu keyboard navigation (arrow keys + enter + escape)', () => {
    const onFirst = vi.fn();
    const onSecond = vi.fn();

    mount(
      <DropdownMenu id="menu">
        <DropdownMenuTrigger>
          <button type="button">Open menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onFirst}>First</DropdownMenuItem>
          <DropdownMenuItem selected onClick={onSecond}>Second</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = root.querySelector('button')!;
    const dialog = root.querySelector('dialog')!;
    const [first, second] = Array.from(dialog.querySelectorAll<HTMLButtonElement>('button'));

    act(() => {
      trigger.click();
    });
    expect(dialog.hasAttribute('open')).toBe(true);

    first.focus();
    act(() => {
      first.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown', bubbles: true}));
    });
    expect(document.activeElement).toBe(second);

    act(() => {
      second.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowUp', bubbles: true}));
    });
    expect(document.activeElement).toBe(first);

    trigger.focus();
    act(() => {
      trigger.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
    });
    expect(onSecond).toHaveBeenCalledTimes(1);

    act(() => {
      second.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    });
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it('closes popover and dropdown overlays when clicking outside', () => {
    mount(
      <>
        <Popover id="pop">
          <PopoverTrigger>
            <button type="button">Open popover</button>
          </PopoverTrigger>
          <PopoverContent>Popover</PopoverContent>
        </Popover>
        <DropdownMenu id="drop">
          <DropdownMenuTrigger>
            <button type="button">Open dropdown</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <button p="dropdown-menu-item">Item</button>
          </DropdownMenuContent>
        </DropdownMenu>
      </>,
    );

    const [popTrigger, dropTrigger] = Array.from(root.querySelectorAll('button'));
    const [popover, dropdown] = Array.from(root.querySelectorAll('dialog'));

    act(() => {
      popTrigger.click();
    });
    expect(popover.hasAttribute('open')).toBe(true);
    act(() => {
      document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(popover.hasAttribute('open')).toBe(false);

    act(() => {
      dropTrigger.click();
    });
    expect(dropdown.hasAttribute('open')).toBe(true);
    act(() => {
      document.body.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(dropdown.hasAttribute('open')).toBe(false);
  });

  it('wires Sheet and Drawer trigger/close commands', () => {
    mount(
      <>
        <Sheet id="sheet">
          <Sheet.Trigger>
            <button type="button">Open sheet</button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Close>
              <button type="button">Close sheet</button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet>
        <Drawer id="drawer">
          <Drawer.Trigger>
            <button type="button">Open drawer</button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Close>
              <button type="button">Close drawer</button>
            </Drawer.Close>
          </Drawer.Content>
        </Drawer>
      </>,
    );

    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('button'));
    const [openSheet, closeSheet, openDrawer, closeDrawer] = buttons;
    const [sheetDialog, drawerDialog] = Array.from(root.querySelectorAll('dialog'));

    act(() => openSheet.click());
    expect(sheetDialog.hasAttribute('open')).toBe(true);
    act(() => closeSheet.click());
    expect(sheetDialog.hasAttribute('open')).toBe(false);

    act(() => openDrawer.click());
    expect(drawerDialog.hasAttribute('open')).toBe(true);
    act(() => closeDrawer.click());
    expect(drawerDialog.hasAttribute('open')).toBe(false);
  });

  it('renders Tabs primitive attributes and handles toasts dispatch', () => {
    vi.useFakeTimers();

    mount(
      <>
        <TabList>
          <Tab aria-selected>One</Tab>
        </TabList>
        <TabPanel>Panel</TabPanel>
        <ToastContainer />
      </>,
    );

    expect(root.querySelector('[p="tablist"]')).toBeTruthy();
    expect(root.querySelector('[p="tab"]')).toBeTruthy();
    expect(root.querySelector('[p="tab-panel"]')).toBeTruthy();

    act(() => {
      toast.show('Saved', {duration: 10});
    });
    expect(root.querySelector('[p="toast"]')).toBeTruthy();

    act(() => {
      vi.runAllTimers();
    });
    expect(root.querySelector('[p="toast"]')).toBeFalsy();
  });
});
