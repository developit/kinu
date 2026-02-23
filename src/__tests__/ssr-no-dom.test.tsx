import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {
  Carousel,
  CarouselContent,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  Sidebar,
  SidebarTrigger,
} from '../index';

describe('SSR without DOM', () => {
  it('renders components that install global handlers without document access', () => {
    expect(() =>
      renderToString(
        <>
          <Dialog>
            <Dialog.Trigger>
              <button type="button">Open</button>
            </Dialog.Trigger>
            <Dialog.Content />
          </Dialog>

          <Popover>
            <PopoverTrigger>
              <button type="button">Open</button>
            </PopoverTrigger>
            <PopoverContent />
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button type="button">Open</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <button p="dropdown-menu-item">Item</button>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <Sheet.Trigger>
              <button type="button">Open</button>
            </Sheet.Trigger>
            <Sheet.Content />
          </Sheet>

          <Drawer>
            <Drawer.Trigger>
              <button type="button">Open</button>
            </Drawer.Trigger>
            <Drawer.Content />
          </Drawer>

          <Carousel>
            <CarouselContent>
              <div>item</div>
            </CarouselContent>
          </Carousel>

          <Combobox>
            <Combobox.Input />
            <Combobox.List>
              <Combobox.Option>Item</Combobox.Option>
            </Combobox.List>
          </Combobox>

          <ContextMenu>
            <ContextMenuTrigger>
              <button type="button">Open</button>
            </ContextMenuTrigger>
            <ContextMenuContent />
          </ContextMenu>

          <Sidebar />
          <SidebarTrigger />
        </>,
      ),
    ).not.toThrow();
  });
});
