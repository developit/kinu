# Login Form with Validation

A minimal login form using native HTML5 validation with PUI components.

## Overview

This recipe shows how to build a login form with:

- Native HTML5 form validation (no custom validation code)
- Loading states during submission
- Server error handling
- Password visibility toggle
- Remember me functionality

## Complete Example

```tsx
import {useSignal} from '@preact/signals';
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
  const isSubmitting = useSignal(false);
  const showPassword = useSignal(false);
  const error = useSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    isSubmitting.value = true;
    error.value = '';

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

      window.location.href = '/dashboard';
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isSubmitting.value = false;
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
          {error.value && (
            <Alert variant="destructive" role="alert">
              <strong>Error:</strong> {error.value}
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
              disabled={isSubmitting.value}
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                class="text-sm text-primary hover:underline"
                tabIndex={isSubmitting.value ? -1 : 0}
              >
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <Input
                id="password"
                name="password"
                type={showPassword.value ? 'text' : 'password'}
                autoComplete="current-password"
                minLength={8}
                required
                disabled={isSubmitting.value}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3"
                aria-label={showPassword.value ? 'Hide password' : 'Show password'}
                onClick={() => showPassword.value = !showPassword.value}
                disabled={isSubmitting.value}
              >
                {showPassword.value ? (
                  <iconify-icon icon="mdi:eye-off" />
                ) : (
                  <iconify-icon icon="mdi:eye" />
                )}
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
              disabled={isSubmitting.value}
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
            loading={isSubmitting.value}
            disabled={isSubmitting.value}
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

## Key Features

### Native HTML5 Validation

The browser handles validation automatically:

```tsx
<Input
  type="email"      // Validates email format
  required          // Checks if filled
  minLength={8}     // Checks minimum length
/>
```

The browser shows native error messages and prevents submission if invalid.

### FormData API

Extract form values without managing state:

```tsx
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  const email = formData.get('email');
  const password = formData.get('password');
  const rememberMe = formData.get('rememberMe') === 'on';
};
```

### Minimal State with Signals

Track only what you need using individual signals:

```tsx
const isSubmitting = useSignal(false); // Loading state
const showPassword = useSignal(false); // Toggle visibility
const error = useSignal('');           // Server errors only
```

Updates use immutable assignment:

```tsx
isSubmitting.value = true;
error.value = 'Login failed';
```

No field-level state, no validation state, no change handlers needed.

## Customization

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

Add checks beyond HTML5 validation:

```tsx
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  if (!form.checkValidity()) {
    return; // Let browser show errors
  }

  const formData = new FormData(form);
  const password = formData.get('password') as string;

  // Custom check
  if (password.toLowerCase() === formData.get('email')) {
    error.value = 'Password cannot be the same as email';
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
      <iconify-icon icon="mdi:google" class="mr-2" />
      Google
    </Button>
    <Button variant="outline" type="button">
      <iconify-icon icon="mdi:github" class="mr-2" />
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

If JavaScript fails to load, native HTML5 validation still works and the form submits normally.

## Testing

### Validation Testing

```tsx
test('form requires email and password', () => {
  const {container} = render(<LoginForm />);
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

## Security Considerations

1. **Always validate on the server** - Client validation is for UX, not security
2. **Use HTTPS** - Never send credentials unencrypted
3. **Implement rate limiting** - Prevent brute force attacks
4. **Use CSRF tokens** - Protect against CSRF attacks
5. **Consider 2FA** - Add multi-factor authentication

## Related Recipes

- [Multi-Step Wizard](./multi-step-wizard.md) - Multi-page forms
- [Settings Panel](./settings-panel.md) - Complex form management
