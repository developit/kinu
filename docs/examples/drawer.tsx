import {Button, Drawer, DrawerClose, DrawerContent, DrawerTrigger} from 'kinu';

export function Demo() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <p style={{margin: '0 0 1rem 0'}}>Drawer Content</p>
        <DrawerClose>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

export const code = `<Drawer>...</Drawer>`;

export default {Demo, code};
