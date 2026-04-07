import {
  Button,
  DropdownMenuItem,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Dimensions</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{padding: '1rem'}}>
            <p style={{margin: '0 0 0.75rem', fontWeight: 500}}>
              Set dimensions
            </p>
            <div
              style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}
            >
              <label style={{fontSize: '0.8125rem'}}>
                Width
                <input
                  k="input"
                  value="320"
                  style={{marginTop: '0.25rem', width: '100%'}}
                />
              </label>
              <label style={{fontSize: '0.8125rem'}}>
                Height
                <input
                  k="input"
                  value="240"
                  style={{marginTop: '0.25rem', width: '100%'}}
                />
              </label>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Adaptive ↕</Button>
        </PopoverTrigger>
        <PopoverContent mobile="drawer">
          <div style={{padding: '0.5rem'}}>
            <p style={{margin: '0.5rem 0.5rem 0.75rem', fontWeight: 500}}>
              Pick a color
            </p>
            <Separator />
            {['Red', 'Orange', 'Green', 'Blue', 'Purple'].map((color) => (
              <DropdownMenuItem key={color}>{color}</DropdownMenuItem>
            ))}
            <Separator />
            <div style={{padding: '0.25rem'}}>
              <PopoverClose>
                <Button variant="outline" size="sm" style={{width: '100%'}}>
                  Done
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const code = `{/* Standard popover */}
<Popover>
  <PopoverTrigger><Button>Dimensions</Button></PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>

{/* Adaptive: popover on desktop, drawer on mobile */}
<Popover>
  <PopoverTrigger><Button>Pick color</Button></PopoverTrigger>
  <PopoverContent mobile="drawer">...</PopoverContent>
</Popover>`;

export default {Demo, code};
