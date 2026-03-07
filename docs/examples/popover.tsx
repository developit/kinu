import {Button, Popover, PopoverContent, PopoverTrigger} from 'kinu';

export function Demo() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{padding: '1rem'}}>
          <h3 style={{margin: '0 0 0.5rem 0'}}>Popover Content</h3>
          <p style={{margin: '0'}}>This is content inside a popover.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const code = `<Popover>...</Popover>`;

export default {Demo, code};
