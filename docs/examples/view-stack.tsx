import {Button, ViewStack} from 'kinu';
import {useId} from 'preact/hooks';

export function Demo() {
  const id = useId();
  return (
    <ViewStack id={id} aria-label="Settings screens" style={{height: '22rem', border: '1px solid hsl(var(--k-border))', borderRadius: '0.75rem'}}>
      <ViewStack.View aria-label="Settings">
        <div style={{padding: '2rem'}}>
          <small>VIEW STACK · 1 / 3</small>
          <h2>Settings</h2>
          <p>Explore your account and appearance. Swipe to navigate, or use the buttons.</p>
          <Button command="--next" commandFor={id}>Account →</Button>
        </div>
      </ViewStack.View>
      <ViewStack.View aria-label="Account">
        {() => <div style={{padding: '2rem'}}>
          <Button variant="ghost" command="--prev" commandFor={id}>← Settings</Button>
          <h2>Account</h2>
          <p>This screen was rendered on your first visit. Your edits stay when you go back.</p>
          <label>Display name <input defaultValue="Alex" /></label>
          <p><Button command="--next" commandFor={id}>Appearance →</Button></p>
        </div>}
      </ViewStack.View>
      <ViewStack.View aria-label="Appearance">
        {() => <div style={{padding: '2rem'}}>
          <Button variant="ghost" command="--prev" commandFor={id}>← Account</Button>
          <h2>Appearance</h2>
          <p>Native scrolling. Lazy screens. No browser history changes.</p>
          <label><input type="checkbox" /> Use compact layout</label>
        </div>}
      </ViewStack.View>
    </ViewStack>
  );
}

export const code = `<ViewStack id="settings" style={{height: '22rem'}}>
  <ViewStack.View>
    <h2>Settings</h2>
    <Button command="--next" commandFor="settings">Account →</Button>
  </ViewStack.View>
  <ViewStack.View>
    {() => <>
      <Button command="--prev" commandFor="settings">← Back</Button>
      <h2>Account</h2>
      <input aria-label="Display name" />
    </>}
  </ViewStack.View>
</ViewStack>`;

export default {Demo, code};
