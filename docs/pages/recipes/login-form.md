# Login Form with Validation

A complete login form implementation with client-side validation, error handling, loading states, and accessibility features.

## Overview

This recipe demonstrates how to build a production-ready login form using PUI components with:

- Native HTML5 form validation
- Custom validation logic
- Loading states during submission
- Error handling and display
- Accessible form structure
- Keyboard navigation
- Password visibility toggle
- Remember me functionality

## Complete Example

```tsx
import {useState, type JSX} from 'preact/hooks';
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

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  form?: string;
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Validate individual field
  const validateField = (name: keyof LoginFormData, value: string): string | undefined => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    newErrors.email = validateField('email', formData.email);
    newErrors.password = validateField('password', formData.password);

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle input change
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.currentTarget;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle blur for inline validation
  const handleBlur = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    const error = validateField(name as keyof LoginFormData, value);

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();

      // Handle successful login
      console.log('Login successful:', data);
      window.location.href = '/dashboard';

    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-4">
          {/* Form-level error */}
          {errors.form && (
            <Alert variant="destructive" role="alert">
              <strong>Error:</strong> {errors.form}
            </Alert>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span aria-label="required">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              value={formData.email}
              onInput={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">
                Password <span aria-label="required">*</span>
              </Label>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
                tabIndex={isSubmitting ? -1 : 0}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                value={formData.password}
                onInput={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                tabIndex={isSubmitting ? -1 : 0}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </Button>
            </div>
            {errors.password ? (
              <p id="password-error" className="text-sm text-destructive" role="alert">
                {errors.password}
              </p>
            ) : (
              <p id="password-hint" className="text-sm text-muted-foreground">
                Must be at least 8 characters
              </p>
            )}
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onInput={handleChange}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-normal cursor-pointer"
            >
              Remember me for 30 days
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-primary hover:underline"
              tabIndex={isSubmitting ? -1 : 0}
            >
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

### 1. Form Validation

The form implements three levels of validation:

**Client-side validation**:
```tsx
const validateField = (name: keyof LoginFormData, value: string) => {
  // Validate individual fields
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Please enter a valid email address';
  }
  // ... more validation
};
```

**Native HTML5 validation** with `required`, `type="email"`, and `autoComplete` attributes.

**Inline validation** triggered on blur events to provide immediate feedback.

### 2. Loading States

The submit button shows a loading indicator during form submission:

```tsx
<Button
  type="submit"
  loading={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Signing in...' : 'Sign In'}
</Button>
```

All form inputs are disabled during submission to prevent changes.

### 3. Error Handling

**Field-level errors** are displayed below each input:

```tsx
{errors.email && (
  <p id="email-error" className="text-sm text-destructive" role="alert">
    {errors.email}
  </p>
)}
```

**Form-level errors** (like authentication failures) are shown at the top:

```tsx
{errors.form && (
  <Alert variant="destructive" role="alert">
    <strong>Error:</strong> {errors.form}
  </Alert>
)}
```

### 4. Accessibility Features

- **ARIA attributes**: `aria-required`, `aria-invalid`, `aria-describedby`, `aria-label`
- **Semantic HTML**: Proper `<form>`, `<label>`, and `<input>` elements
- **Focus management**: Logical tab order, disabled state during submission
- **Screen reader support**: Error messages announced with `role="alert"`
- **Required field indicators**: Visual and screen-reader accessible markers

### 5. Password Visibility Toggle

Allows users to show/hide their password:

```tsx
<Button
  type="button"
  variant="ghost"
  size="icon"
  aria-label={showPassword ? 'Hide password' : 'Show password'}
  onClick={() => setShowPassword(!showPassword)}
>
  {/* Eye icon */}
</Button>
```

### 6. Remember Me Functionality

Checkbox state is captured and sent to the API:

```tsx
<Checkbox
  id="rememberMe"
  name="rememberMe"
  checked={formData.rememberMe}
  onInput={handleChange}
/>
```

## Progressive Enhancement

This form works even without JavaScript:

1. Use `action="/api/login"` and `method="POST"` attributes on the form
2. Server-side validation handles all cases
3. Native HTML5 validation provides basic client-side checks
4. JavaScript enhances the experience with inline validation and loading states

## Customization Options

### Email + Password + 2FA

Add a one-time password field after initial submission:

```tsx
{showTwoFactor && (
  <div className="space-y-2">
    <Label htmlFor="otp">Verification Code</Label>
    <Input
      id="otp"
      name="otp"
      type="text"
      inputMode="numeric"
      pattern="[0-9]{6}"
      maxLength={6}
      placeholder="000000"
      required
    />
  </div>
)}
```

### Social Login Options

Add OAuth buttons before or after the form:

```tsx
<div className="space-y-2">
  <Button variant="outline" className="w-full" type="button">
    <GoogleIcon className="mr-2" />
    Continue with Google
  </Button>
  <Button variant="outline" className="w-full" type="button">
    <GitHubIcon className="mr-2" />
    Continue with GitHub
  </Button>
</div>

<div className="relative my-4">
  <div className="absolute inset-0 flex items-center">
    <span className="w-full border-t" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-background px-2 text-muted-foreground">
      Or continue with email
    </span>
  </div>
</div>
```

### Rate Limiting Feedback

Show a timeout after multiple failed attempts:

```tsx
{rateLimitSeconds > 0 && (
  <Alert>
    Too many attempts. Please try again in {rateLimitSeconds} seconds.
  </Alert>
)}

<Button
  type="submit"
  disabled={isSubmitting || rateLimitSeconds > 0}
>
  Sign In
</Button>
```

## Testing

### Validation Testing

```tsx
test('shows error for invalid email', async () => {
  const {container} = render(<LoginForm />);

  const emailInput = container.querySelector('#email');
  fireEvent.input(emailInput, {target: {value: 'invalid-email'}});
  fireEvent.blur(emailInput);

  await waitFor(() => {
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });
});
```

### Submission Testing

```tsx
test('submits form with valid data', async () => {
  const {container} = render(<LoginForm />);

  fireEvent.input(container.querySelector('#email'), {
    target: {value: 'user@example.com'}
  });
  fireEvent.input(container.querySelector('#password'), {
    target: {value: 'password123'}
  });

  fireEvent.submit(container.querySelector('form'));

  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123',
        rememberMe: false,
      }),
    });
  });
});
```

## Related Recipes

- [Multi-Step Wizard](./multi-step-wizard.md) - For multi-page registration flows
- [Settings Panel](./settings-panel.md) - For user profile management
- Form patterns with server validation
- Password strength meter

## Security Considerations

1. **Always validate on the server**: Client-side validation is for UX, not security
2. **Use HTTPS**: Never send credentials over unencrypted connections
3. **Implement rate limiting**: Prevent brute force attacks
4. **Hash passwords**: Never store plain text passwords
5. **Use secure session management**: HTTPOnly, Secure, SameSite cookies
6. **Consider 2FA**: Add multi-factor authentication for sensitive applications
7. **CSRF protection**: Use CSRF tokens for form submissions
8. **Content Security Policy**: Prevent XSS attacks

---

This login form provides a solid foundation for authentication in production applications. Customize it to fit your specific requirements while maintaining accessibility and security best practices.
