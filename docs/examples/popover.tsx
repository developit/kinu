import {
  Button,
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
        <PopoverContent style={{width: '16rem'}}>
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
        <PopoverContent mobile="drawer" style={{width: '18rem'}}>
          <div style={{padding: '1rem'}}>
            <p style={{margin: '0 0 0.5rem', fontWeight: 500}}>
              Pick a color
            </p>
            <p style={{margin: '0 0 0.75rem', fontSize: '0.8125rem', opacity: 0.7}}>
              Popover on desktop, drawer on mobile.
            </p>
            <Separator />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '0.5rem 0',
              }}
            >
              {['Red', 'Orange', 'Green', 'Blue', 'Purple'].map((color) => (
                <button
                  k="dropdown-item"
                  key={color}
                  style={{
                    all: 'unset',
                    padding: '0.5rem',
                    borderRadius: 'var(--k-radius)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
            <Separator />
            <div style={{paddingTop: '0.5rem'}}>
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
