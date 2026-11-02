import {Button, ViewStack} from 'kinu';
import {useId, useState} from 'preact/hooks';

export function Demo() {
  const id = useId();
  const v = (n: number) => `${id}-${n}`;
  const [forward, setForward] = useState(false);
  return (
    <div>
      <label style={{display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem'}}>
        <input type="checkbox" checked={forward} onChange={(event) => setForward(event.currentTarget.checked)} />
        Allow forward touch swipes
      </label>
      <ViewStack swipe={forward ? 'both' : 'back'} aria-label="Settings screens" style={{height: '22rem', border: '1px solid hsl(var(--k-border))', borderRadius: '0.75rem'}}>
        <ViewStack.View id={v(1)} aria-label="Settings">
          <div style={{padding: '2rem'}}>
            <small>VIEW STACK · 1 / 3</small>
            <h2>Settings</h2>
            <p>Use the buttons to drill in and swipe back to return. Enable forward touch swipes above to explore in both directions.</p>
            <Button command="--show" commandFor={v(2)}>Account →</Button>
          </div>
        </ViewStack.View>
        <ViewStack.View id={v(2)} aria-label="Account">
          {() => <div style={{padding: '2rem'}}>
            <Button variant="ghost" command="--show" commandFor={v(1)}>← Settings</Button>
            <h2>Account</h2>
            <p>This screen was rendered on your first visit. Your edits stay when you go back.</p>
            <label>Display name <input defaultValue="Alex" /></label>
            <p><Button command="--show" commandFor={v(3)}>Appearance →</Button></p>
          </div>}
        </ViewStack.View>
        <ViewStack.View id={v(3)} aria-label="Appearance">
          {() => <div style={{padding: '2rem'}}>
            <Button variant="ghost" command="--show" commandFor={v(2)}>← Account</Button>
            <h2>Appearance</h2>
            <p>Native scrolling. Lazy screens. No browser history changes.</p>
            <label><input type="checkbox" /> Use compact layout</label>
          </div>}
        </ViewStack.View>
      </ViewStack>
    </div>
  );
}

export const code = `<ViewStack style={{height: '22rem'}}>
  <ViewStack.View id="settings">
    <h2>Settings</h2>
    <Button command="--show" commandFor="account">Account →</Button>
  </ViewStack.View>
  <ViewStack.View id="account">
    {() => <>
      <Button command="--show" commandFor="settings">← Back</Button>
      <h2>Account</h2>
      <input aria-label="Display name" />
    </>}
  </ViewStack.View>
</ViewStack>`;

export default {Demo, code};
