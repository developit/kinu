import {Button, Card, Dialog, Drawer, Input, Label, Sheet, Skeleton, Spinner} from 'pui';
import {Nav} from '../nav';

export default function A11yModes() {
  return (
    <div class="a11y-page">
      <Nav />
      <main class="a11y-content">
        <section>
          <h1>Accessibility Mode Sanity Checks</h1>
          <p>
            Quick visual checks for <code>prefers-reduced-motion</code> and{' '}
            <code>forced-colors</code>. Toggle your OS/browser accessibility
            settings and verify these samples stay usable.
          </p>
        </section>

        <section class="a11y-grid">
          <Card class="a11y-panel">
            <h2>Reduced Motion</h2>
            <p>Animated components should become static or near-instant.</p>
            <div class="a11y-row">
              <Spinner aria-label="Loading" />
              <Spinner type="dots" aria-label="Loading dots" />
              <Spinner type="ripple" aria-label="Loading ripple" />
            </div>
            <div class="a11y-row">
              <Skeleton style="width: 7rem; height: 1rem;" />
              <Skeleton style="width: 4rem; height: 1rem;" />
            </div>
            <div class="a11y-row">
              <Dialog>
                <Dialog.Trigger>
                  <Button>Open Dialog</Button>
                </Dialog.Trigger>
                <Dialog.Content>
                  <h3>Dialog</h3>
                  <p>Open/close should not rely on animation.</p>
                  <Dialog.Close>
                    <Button variant="outline">Close</Button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog>

              <Drawer>
                <Drawer.Trigger>
                  <Button variant="outline">Open Drawer</Button>
                </Drawer.Trigger>
                <Drawer.Content>
                  <h3>Drawer</h3>
                  <p>Appears without slide animation in reduced motion.</p>
                  <Drawer.Close>
                    <Button variant="outline">Close</Button>
                  </Drawer.Close>
                </Drawer.Content>
              </Drawer>

              <Sheet>
                <Sheet.Trigger>
                  <Button variant="outline">Open Sheet</Button>
                </Sheet.Trigger>
                <Sheet.Content>
                  <h3>Sheet</h3>
                  <p>Appears without side transition in reduced motion.</p>
                  <Sheet.Close>
                    <Button variant="outline">Close</Button>
                  </Sheet.Close>
                </Sheet.Content>
              </Sheet>
            </div>
          </Card>

          <Card class="a11y-panel">
            <h2>Forced Colors</h2>
            <p>
              Focus rings, borders, disabled state, and selected state should be
              visible in high-contrast mode.
            </p>

            <div class="a11y-col">
              <Label htmlFor="a11y-focus-input">Focusable input</Label>
              <Input id="a11y-focus-input" placeholder="Tab to focus me" />
            </div>

            <div class="a11y-row">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button aria-selected="true" variant="outline">
                Selected
              </Button>
            </div>

            <div class="a11y-row">
              <Button variant="outline" class="a11y-active-sample" data-state="active">
                Active state sample
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
