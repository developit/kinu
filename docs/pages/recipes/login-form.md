# Login Form with Validation

A minimal login form using native HTML5 validation - no custom validation code required.

## Overview

This recipe demonstrates how to build a login form using PUI components with:

- Native HTML5 form validation (browser handles it)
- Loading states during submission
- Server error handling
- Accessible form structure
- Password visibility toggle
- Remember me functionality

## Complete Example

```tsx
import {useState} from 'preact/hooks';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Label,
  Checkbox,
  Alert,
} from 'pui';

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          rememberMe: formData.get('rememberMe') === 'on',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      // Success - redirect
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card class="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent class="space-y-4">
          {error && (
            <Alert variant="destructive" role="alert">
              <strong>Error:</strong> {error}
            </Alert>
          )}

          <div class="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                class="text-sm text-primary hover:underline"
                tabIndex={isSubmitting ? -1 : 0}
              >
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                minLength={8}
                required
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </Button>
            </div>
            <p class="text-sm text-muted-foreground">
              Must be at least 8 characters
            </p>
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              disabled={isSubmitting}
            />
            <Label
              htmlFor="rememberMe"
              class="text-sm font-normal cursor-pointer"
            >
              Remember me for 30 days
            </Label>
          </div>
        </CardContent>

        <CardFooter class="flex flex-col space-y-4">
          <Button
            type="submit"
            class="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign In
          </Button>

          <p class="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" class="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
```

## Key Features Explained

### 1. Native HTML5 Validation

The browser handles all validation automatically:

```tsx
<Input
  type="email"      // Browser validates email format
  required          // Browser checks if filled
  minLength={8}     // Browser checks minimum length
/>
```

No custom validation code needed! The browser shows native error messages and prevents submission if invalid.

### 2. FormData API

Extract form values without managing state:

```tsx
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  // Get values by name attribute
  const email = formData.get('email');
  const password = formData.get('password');
  const rememberMe = formData.get('rememberMe') === 'on';
};
```

### 3. Minimal State Management

Only track what you actually need:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
const [showPassword, setShowPassword] = useState(false); // Toggle visibility
const [error, setError] = useState('');                 // Server errors only
```

No field-level state, no validation state, no change handlers.

### 4. Server Error Handling

Only show errors from the server:

```tsx
{error && (
  <Alert variant="destructive" role="alert">
    <strong>Error:</strong> {error}
  </Alert>
)}
```

### 5. Accessibility

Native form elements provide built-in accessibility:

- Browser-native validation messages
- Proper label associations with `htmlFor`
- ARIA attributes (`role="alert"`)
- Keyboard navigation works automatically
- Screen readers announce errors

## Customization Options

### Custom Validation Messages

Override browser defaults with `setCustomValidity`:

```tsx
<Input
  id="email"
  type="email"
  required
  onInput={(e) => {
    const input = e.currentTarget;
    if (input.validity.typeMismatch) {
      input.setCustomValidity('Please enter a valid email address');
    } else {
      input.setCustomValidity('');
    }
  }}
/>
```

### Additional Client-Side Checks

Add checks beyond HTML5 validation if needed:

```tsx
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  // Browser validation happens automatically
  if (!form.checkValidity()) {
    return; // Let browser show errors
  }

  const formData = new FormData(form);
  const password = formData.get('password') as string;

  // Additional custom check
  if (password.toLowerCase() === formData.get('email')) {
    setError('Password cannot be the same as email');
    return;
  }

  // Continue with submission...
};
```

### Social Login

Add OAuth buttons:

```tsx
<CardContent class="space-y-4">
  <div class="grid grid-cols-2 gap-2">
    <Button variant="outline" type="button">
      Google
    </Button>
    <Button variant="outline" type="button">
      GitHub
    </Button>
  </div>

  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t" />
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-background px-2 text-muted-foreground">
        Or continue with email
      </span>
    </div>
  </div>

  {/* Email/password fields... */}
</CardContent>
```

## Progressive Enhancement

This form works without JavaScript:

```tsx
<form
  method="POST"
  action="/api/login"
  onSubmit={handleSubmit}
>
```

If JavaScript fails to load:
- Native HTML5 validation still works
- Form submits to `/api/login` normally
- Server handles the submission

## Testing

### Browser Validation Testing

```tsx
test('form requires email and password', () => {
  const {container} = render(<LoginForm />);
  const form = container.querySelector('form');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');

  expect(emailInput.required).toBe(true);
  expect(passwordInput.required).toBe(true);
  expect(passwordInput.minLength).toBe(8);
});
```

### Submission Testing

```tsx
test('submits form with valid data', async () => {
  const {container} = render(<LoginForm />);

  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');

  fireEvent.input(emailInput, {target: {value: 'user@example.com'}});
  fireEvent.input(passwordInput, {target: {value: 'password123'}});

  fireEvent.submit(container.querySelector('form'));

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
  });
});
```

## Comparison: Before vs After

### Before (Custom Validation - ❌ Bloated)
- ~150 lines of validation code
- Multiple state variables
- Custom validation functions
- Change handlers for every field
- Blur handlers for inline validation
- Error state management

### After (Native Validation - ✅ Minimal)
- ~80 lines total
- 3 state variables (loading, password visibility, server error)
- No validation code
- No change handlers
- No blur handlers
- Browser does the work

## Related Recipes

- [Multi-Step Wizard](./multi-step-wizard.md) - Multi-page forms
- [Settings Panel](./settings-panel.md) - Complex form management

## Security Considerations

1. **Always validate on the server** - Client validation is UX, not security
2. **Use HTTPS** - Never send credentials unencrypted
3. **Implement rate limiting** - Prevent brute force attacks
4. **Use CSRF tokens** - Protect against CSRF attacks
5. **Consider 2FA** - Add multi-factor authentication

---

This login form demonstrates PUI's philosophy: leverage platform features instead of recreating them in JavaScript. The browser is incredibly capable - let it do the work!
