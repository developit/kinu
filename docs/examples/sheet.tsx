import {Button, Sheet, SheetClose, SheetContent, SheetTrigger} from 'kinu';

export function Demo() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <p style={{margin: '0 0 1rem 0'}}>Sheet Content</p>
        <SheetClose>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export const code = `<Sheet>...</Sheet>`;

export default {Demo, code};
