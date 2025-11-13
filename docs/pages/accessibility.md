# Accessibility

PUI is built with accessibility as a core design principle. By leveraging native HTML elements and web platform standards, PUI provides robust accessibility features out of the box.

## Overview

PUI's accessibility approach follows three key principles:

1. **Platform-Native First**: Use native HTML elements (`<button>`, `<dialog>`, `<select>`, `<input>`, etc.) which have built-in accessibility features
2. **Progressive Enhancement**: Enhance native elements with CSS and minimal JavaScript while preserving their inherent accessibility
3. **Standards Compliance**: Follow WCAG 2.1 Level AA guidelines and WAI-ARIA authoring practices

## Why Platform-Native Matters

By building on native HTML elements instead of recreating them with divs and JavaScript, PUI automatically inherits:

- **Keyboard Navigation**: Native focus management, tab order, and keyboard interactions
- **Screen Reader Support**: Proper semantic roles, states, and properties announced by assistive technology
- **Browser Consistency**: Cross-browser accessibility APIs handled by the browser
- **Form Integration**: Native form validation, submission, and state management
- **Touch & Pointer Support**: Multi-input method support without custom implementation

## Component Accessibility Patterns

### Buttons & Interactive Elements

**Components**: Button, Toggle, ToggleGroup

PUI uses native `<button>` elements which provide:
- Keyboard activation with Space and Enter keys
- Focus management and visual focus indicators
- Screen reader announcement of button role and label
- Disabled state handling

```tsx
// Good: Native button with clear label
<Button>Save Changes</Button>

// Good: Button with loading state
<Button loading disabled>Saving...</Button>

// Good: Icon button with accessible label
<Button aria-label="Close dialog" size="icon">
  <XIcon />
</Button>
```

**Best Practices**:
- Always provide a text label or `aria-label` for icon-only buttons
- Use `disabled` attribute for unavailable actions
- Use `loading` attribute to communicate pending states
- Ensure focus indicators are visible (provided by default styles)

### Dialogs & Modals

**Components**: Dialog, AlertDialog, Sheet, Drawer

PUI uses the native `<dialog>` element which provides:
- Focus trapping within the modal when open
- Backdrop click handling to close
- ESC key to dismiss
- Proper ARIA roles and states
- Return focus to trigger element on close

```tsx
<Dialog>
  <Dialog.Trigger>
    <Button>Open Settings</Button>
  </Dialog.Trigger>
  <Dialog.Content aria-labelledby="dialog-title">
    <h2 id="dialog-title">User Settings</h2>
    <p>Configure your preferences below.</p>
    <Dialog.Close><Button>Close</Button></Dialog.Close>
  </Dialog.Content>
</Dialog>
```

**Best Practices**:
- Always provide an accessible name using `aria-labelledby` or `aria-label`
- Include a clear close button or dismiss mechanism
- Use AlertDialog for confirmations that require user response
- Test keyboard navigation and focus trapping
- Ensure dialog content is keyboard accessible

### Forms & Inputs

**Components**: Input, Textarea, Checkbox, RadioGroup, Select, Slider, Switch, Combobox, DatePicker

PUI uses native form elements which provide:
- Built-in form validation and error states
- Proper keyboard navigation and input methods
- Screen reader announcements of labels, values, and errors
- Native mobile input keyboards (email, tel, number, date, etc.)

```tsx
// Good: Input with proper label association
<Label htmlFor="email">Email Address</Label>
<Input
  id="email"
  type="email"
  required
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email.</span>

// Good: Checkbox with label
<div>
  <Checkbox id="terms" required />
  <Label htmlFor="terms">I agree to the terms and conditions</Label>
</div>

// Good: Radio group with fieldset
<fieldset>
  <legend>Notification Preferences</legend>
  <RadioGroup name="notifications">
    <div>
      <input type="radio" id="all" name="notifications" value="all" />
      <Label htmlFor="all">All notifications</Label>
    </div>
    <div>
      <input type="radio" id="important" name="notifications" value="important" />
      <Label htmlFor="important">Important only</Label>
    </div>
  </RadioGroup>
</fieldset>
```

**Best Practices**:
- Always associate labels with form controls using `htmlFor` or wrap pattern
- Use `required`, `aria-required`, or `aria-invalid` for validation states
- Provide helpful error messages with `aria-describedby`
- Use appropriate input types (`email`, `tel`, `url`, `number`, `date`)
- Group related inputs with `<fieldset>` and `<legend>`
- Test with keyboard-only navigation
- Ensure error messages are announced by screen readers

### Disclosure Widgets

**Components**: Accordion, Collapsible, Tabs

PUI uses native `<details>` for Accordion and proper ARIA patterns for tabs:

```tsx
// Accordion uses native <details> element
<Accordion>
  <summary>What is PUI?</summary>
  <p>PUI is a performance-focused UI toolkit for Preact.</p>
</Accordion>

// Tabs use ARIA tab pattern
<TabList role="tablist">
  <Tab role="tab" aria-selected="true" aria-controls="panel-1">
    Overview
  </Tab>
  <Tab role="tab" aria-selected="false" aria-controls="panel-2">
    Details
  </Tab>
</TabList>
<TabPanel role="tabpanel" id="panel-1">
  Overview content
</TabPanel>
```

**Keyboard Navigation**:
- Accordion: Space/Enter to toggle, native focus management
- Tabs: Arrow keys to navigate between tabs, Home/End for first/last tab, Tab key to move to panel

**Best Practices**:
- Provide clear summary/heading text for accordion items
- Ensure tab panels are properly associated with tabs using `aria-controls` and `id`
- Test arrow key navigation for tabs
- Ensure content within panels is keyboard accessible

### Dropdown Menus & Popovers

**Components**: DropdownMenu, ContextMenu, Popover, Tooltip, HoverCard, Combobox

These components use `<dialog>` with `show()` method for non-modal overlays:

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content role="menu">
    <DropdownMenu.Item role="menuitem">Edit</DropdownMenu.Item>
    <DropdownMenu.Item role="menuitem">Delete</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
```

**Keyboard Navigation**:
- Space/Enter to open menu
- Arrow keys to navigate items
- ESC to close
- Tab to close and move focus

**Best Practices**:
- Use appropriate ARIA roles (`menu`, `menuitem`, `menuitemcheckbox`, `menuitemradio`)
- Implement proper keyboard navigation with arrow keys
- Return focus to trigger on close
- Use Tooltip sparingly and never for critical information
- Ensure tooltips don't interfere with keyboard navigation

### Navigation Components

**Components**: Breadcrumb, NavigationMenu, Menubar, Pagination, Sidebar

Navigation components use semantic HTML with proper landmarks:

```tsx
// Breadcrumb with proper semantic structure
<nav aria-label="Breadcrumb">
  <Breadcrumb>
    <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><a href="/docs">Docs</a></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem aria-current="page">Accessibility</BreadcrumbItem>
  </Breadcrumb>
</nav>

// Navigation with landmarks
<nav aria-label="Main navigation">
  <NavigationMenu>
    {/* navigation items */}
  </NavigationMenu>
</nav>
```

**Best Practices**:
- Wrap navigation components in `<nav>` elements
- Provide descriptive `aria-label` to distinguish multiple navigation regions
- Use `aria-current="page"` for current location
- Ensure skip links are provided for keyboard users
- Test navigation with screen readers

### Data Display

**Components**: Table, Avatar, Badge, Progress, Skeleton

Data components use semantic HTML elements:

```tsx
// Table with proper structure
<Table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
  </tbody>
</Table>

// Avatar with alt text
<Avatar>
  <img src="avatar.jpg" alt="John Doe profile picture" />
</Avatar>

// Progress with label
<Label htmlFor="upload-progress">Upload Progress</Label>
<Progress id="upload-progress" value={75} max={100} />
```

**Best Practices**:
- Use `<th scope="col">` or `<th scope="row">` for table headers
- Provide `<caption>` for complex tables
- Use `alt` text for Avatar images
- Ensure Badge content is meaningful or use `aria-label`
- Label Progress bars with associated text
- Mark Skeleton loading areas with `aria-busy="true"` and `aria-live="polite"`

### Toast Notifications

**Component**: Toast (event-driven)

Toast notifications are announced to screen readers via `aria-live` regions:

```tsx
// Toast is triggered via events
showToast({
  title: 'Success',
  description: 'Your changes have been saved.',
  variant: 'success'
});
```

**Best Practices**:
- Keep toast messages concise and clear
- Use appropriate variants (success, error, warning, info)
- Ensure toasts are dismissible
- Don't rely on toasts for critical information
- Test with screen readers to ensure announcements work correctly

## Keyboard Navigation Reference

### Global Keyboard Shortcuts

| Key | Action |
| --- | --- |
| Tab | Move focus forward |
| Shift + Tab | Move focus backward |
| Enter | Activate focused element |
| Space | Activate buttons, toggle checkboxes |
| Escape | Close dialogs, menus, popovers |
| Arrow Keys | Navigate menus, tabs, sliders, dates |

### Component-Specific Shortcuts

| Component | Keys | Action |
| --- | --- | --- |
| Dialog | ESC | Close dialog |
| Tabs | Arrow Left/Right | Navigate between tabs |
| Tabs | Home / End | Jump to first/last tab |
| DropdownMenu | Arrow Up/Down | Navigate menu items |
| DropdownMenu | Home / End | Jump to first/last item |
| Slider | Arrow Left/Right | Decrease/increase value |
| Slider | Page Up/Down | Large decrease/increase |
| Slider | Home / End | Min/max value |
| Calendar | Arrow Keys | Navigate dates |
| Calendar | Page Up/Down | Previous/next month |
| Combobox | Arrow Up/Down | Navigate suggestions |
| Combobox | Enter | Select suggestion |

## Screen Reader Testing

### Recommended Screen Readers

- **Windows**: NVDA (free), JAWS (commercial)
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca (free)
- **iOS**: VoiceOver (built-in)
- **Android**: TalkBack (built-in)

### Testing Checklist

- [ ] All interactive elements are focusable and have clear focus indicators
- [ ] All images have appropriate alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced when validation fails
- [ ] Dialogs trap focus and announce their purpose
- [ ] Menu items and navigation are clearly announced
- [ ] Loading states and dynamic updates are announced
- [ ] Toast notifications are announced without stealing focus
- [ ] Tables have proper header associations
- [ ] Landmarks and regions are properly labeled

### Common Screen Reader Commands

| Screen Reader | Navigate Headings | Navigate Landmarks | Next Element |
| --- | --- | --- | --- |
| NVDA | H / Shift+H | D / Shift+D | Down Arrow |
| JAWS | H / Shift+H | R / Shift+R | Down Arrow |
| VoiceOver | VO + CMD + H | VO + U (then landmarks) | VO + Right Arrow |

## WCAG 2.1 Compliance

PUI components are designed to meet WCAG 2.1 Level AA standards when used properly:

### Perceivable

✅ **1.1 Text Alternatives**: Native HTML elements provide semantic meaning; add `alt` text for images, `aria-label` for icon buttons

✅ **1.3 Adaptable**: Semantic HTML structure, proper heading hierarchy, landmark regions

✅ **1.4 Distinguishable**: Sufficient color contrast in default theme (4.5:1 for text, 3:1 for UI components), text can be resized

### Operable

✅ **2.1 Keyboard Accessible**: All components are keyboard accessible via native elements and proper ARIA patterns

✅ **2.2 Enough Time**: Toast notifications can be dismissed; no time limits on interactions

✅ **2.3 Seizures**: No flashing content in default components

✅ **2.4 Navigable**: Focus indicators, skip links recommended, semantic HTML structure

✅ **2.5 Input Modalities**: Touch targets are minimum 44×44px (Button default size), gestures have keyboard alternatives

### Understandable

✅ **3.1 Readable**: Use appropriate `lang` attribute on root element

✅ **3.2 Predictable**: Consistent navigation patterns, no unexpected context changes

✅ **3.3 Input Assistance**: Native form validation, error messages, labels for all inputs

### Robust

✅ **4.1 Compatible**: Valid HTML, proper ARIA usage, tested with assistive technologies

## Color Contrast

PUI's default theme meets WCAG AA contrast requirements:

| Element | Foreground | Background | Ratio | Status |
| --- | --- | --- | --- | --- |
| Body Text | `--foreground` | `--background` | 12.6:1 | ✅ AAA |
| Button (primary) | `--primary-foreground` | `--primary` | 8.2:1 | ✅ AAA |
| Button (secondary) | `--secondary-foreground` | `--secondary` | 4.8:1 | ✅ AA |
| Muted Text | `--muted-foreground` | `--background` | 7.1:1 | ✅ AAA |
| Link | `--primary` | `--background` | 4.8:1 | ✅ AA |

When customizing the theme, ensure you maintain minimum contrast ratios:
- **Normal text** (< 18pt): 4.5:1 minimum (AA), 7:1 preferred (AAA)
- **Large text** (≥ 18pt or 14pt bold): 3:1 minimum (AA), 4.5:1 preferred (AAA)
- **UI components** (borders, icons, focus indicators): 3:1 minimum

### Checking Contrast

Use these tools to verify your custom theme:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- Browser DevTools (Chrome, Firefox) have built-in contrast checking

## Focus Management

PUI provides visible focus indicators for all interactive elements:

```css
/* Default focus styles in PUI */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### Focus Visible vs Focus

PUI uses `:focus-visible` instead of `:focus` to show focus indicators only when keyboard navigation is used, avoiding distracting outlines when clicking with a mouse.

### Custom Focus Styles

To customize focus indicators, override the `--ring` CSS variable:

```css
:root {
  --ring: 200 100% 50%; /* Custom focus ring color */
}
```

**Best Practices**:
- Never remove focus indicators completely
- Ensure focus indicators have 3:1 contrast ratio against background
- Test focus visibility in both light and dark modes
- Maintain consistent focus styles across components

## Testing Tools

### Automated Testing

Use these tools to catch common accessibility issues:

1. **axe DevTools** (Browser Extension)
   - Chrome, Firefox, Edge extension
   - Automatically scans pages for WCAG violations
   - Free for open source projects

2. **Lighthouse** (Chrome DevTools)
   - Built into Chrome DevTools
   - Includes accessibility audit
   - Provides actionable recommendations

3. **WAVE** (Browser Extension)
   - Visual feedback about accessibility
   - Shows structure and errors inline
   - Free to use

4. **Pa11y** (Command Line)
   ```bash
   npm install -g pa11y
   pa11y https://your-site.com
   ```

### Manual Testing

Automated tools catch ~30-50% of accessibility issues. Manual testing is essential:

1. **Keyboard Navigation**
   - Unplug your mouse
   - Navigate the entire application with keyboard only
   - Ensure all functionality is accessible

2. **Screen Reader Testing**
   - Test with at least one screen reader
   - Navigate by headings, landmarks, and links
   - Verify form interactions and error messages

3. **Zoom Testing**
   - Test at 200% zoom (WCAG requirement)
   - Ensure no horizontal scrolling (unless necessary)
   - Verify all content remains accessible

4. **Color Blindness Simulation**
   - Use browser tools or extensions to simulate color blindness
   - Ensure information isn't conveyed by color alone
   - Test all variants (success, error, warning, info)

### Testing Libraries

For automated testing in CI/CD:

```tsx
// Example with Vitest + Testing Library
import {render, screen} from '@testing-library/preact';
import {axe, toHaveNoViolations} from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const {container} = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('Dialog has accessible name', () => {
  render(
    <Dialog>
      <Dialog.Content aria-label="Settings">
        Content
      </Dialog.Content>
    </Dialog>
  );

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAccessibleName('Settings');
});
```

## Best Practices Summary

### Do's ✅

- Use semantic HTML elements
- Provide text alternatives for non-text content
- Associate labels with form controls
- Ensure sufficient color contrast
- Provide keyboard navigation for all functionality
- Test with actual screen readers
- Include skip links for keyboard users
- Use ARIA attributes correctly (avoid ARIA soup)
- Maintain clear focus indicators
- Provide clear error messages

### Don'ts ❌

- Don't use `<div>` or `<span>` when a semantic element exists
- Don't remove focus indicators without providing an alternative
- Don't rely solely on color to convey information
- Don't create custom components without keyboard support
- Don't use `aria-label` on non-interactive elements
- Don't make disabled buttons look active
- Don't use placeholder text as labels
- Don't create keyboard traps
- Don't use overly complex ARIA patterns when native HTML works
- Don't skip manual accessibility testing

## Resources

### Official Specifications

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Accessibility API Mappings](https://www.w3.org/TR/html-aam-1.0/)

### Learning Resources

- [WebAIM](https://webaim.org/) - Accessibility training and resources
- [A11y Project](https://www.a11yproject.com/) - Community-driven accessibility checklist
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Comprehensive guides
- [Inclusive Components](https://inclusive-components.design/) - Accessible component patterns

### Tools & Extensions

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [Screen Reader Extensions](https://www.nvaccess.org/download/)

## Getting Help

Accessibility questions? Here's how to get support:

1. **Check Component Docs**: Each component page includes specific accessibility notes
2. **Review Examples**: The demo site includes accessible implementation examples
3. **Test with Tools**: Use automated tools to identify specific issues
4. **Ask the Community**: File an issue on GitHub with your accessibility question
5. **Hire Experts**: Consider accessibility audits for production applications

---

PUI's accessibility features are built on web platform standards. By using semantic HTML and following these guidelines, you can build applications that are accessible to all users.
