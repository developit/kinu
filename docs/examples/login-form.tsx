import {useSignal} from '@preact/signals';
import {
  Card,
  Button,
  Input,
  Label,
  Checkbox,
  Alert,
} from 'pui';

export function Demo() {
  return <LoginForm />;
}

function LoginForm() {
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
      // Simulated API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Demo: Show error for invalid credentials
      if (email === 'demo@example.com' && password === 'password123') {
        alert('Login successful! (This is a demo)');
        form.reset();
      } else {
        throw new Error('Invalid credentials. Try demo@example.com / password123');
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      isSubmitting.value = false;
    }
  };

  return (
    <Card class="w-full max-w-md mx-auto p-6">
      <div class="mb-6">
        <h3 class="text-2xl font-bold mb-2">Sign In</h3>
        <p class="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="space-y-4">
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
                class="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
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
        </div>

        <div class="flex flex-col space-y-4 mt-6">
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
            <a href="/signup" class="text-primary hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </Card>
  );
}

export const code = `import {useSignal} from '@preact/signals';
import {
  Card,
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
    <Card class="w-full max-w-md mx-auto p-6">
      <div class="mb-6">
        <h3 class="text-2xl font-bold mb-2">Sign In</h3>
        <p class="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} class="space-y-6">
        <div class="space-y-4">
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
                class="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
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
        </div>

        <div class="flex flex-col space-y-4 mt-6">
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
            <a href="/signup" class="text-primary hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </Card>
  );
}
`;
