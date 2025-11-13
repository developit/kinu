# Multi-Step Wizard

A production-ready multi-step form wizard with progress tracking, validation, navigation controls, and data persistence.

## Overview

This recipe demonstrates how to build a multi-step wizard using PUI components with:

- Step progress indicator
- Per-step validation
- Back/forward navigation
- Data persistence across steps
- Summary/review step
- Loading states
- Keyboard navigation
- Accessibility features

## Complete Example

```tsx
import {signal, computed} from '@preact/signals';
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
  Select,
  Textarea,
  Progress,
  Separator,
} from 'pui';

// Step definitions
interface Step {
  id: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {id: 'account', title: 'Account Info', description: 'Create your account'},
  {id: 'profile', title: 'Profile', description: 'Tell us about yourself'},
  {id: 'preferences', title: 'Preferences', description: 'Customize your experience'},
  {id: 'review', title: 'Review', description: 'Confirm your information'},
];

// Form state using individual signals
const currentStep = signal(0);
const isSubmitting = signal(false);

// Account fields
const email = signal('');
const password = signal('');
const confirmPassword = signal('');

// Profile fields
const firstName = signal('');
const lastName = signal('');
const company = signal('');
const role = signal('');
const bio = signal('');

// Preference fields
const emailNotifications = signal('all');
const theme = signal('system');
const language = signal('en');

// Error signals
const emailError = signal('');
const passwordError = signal('');
const confirmPasswordError = signal('');
const firstNameError = signal('');
const lastNameError = signal('');
const roleError = signal('');
const formError = signal('');

// Computed progress
const progress = computed(() => ((currentStep.value + 1) / STEPS.length) * 100);

// Validation functions
function validateAccountStep(): boolean {
  let valid = true;

  if (!email.value) {
    emailError.value = 'Email is required';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Invalid email address';
    valid = false;
  } else {
    emailError.value = '';
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    valid = false;
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
    valid = false;
  } else {
    passwordError.value = '';
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match';
    valid = false;
  } else {
    confirmPasswordError.value = '';
  }

  return valid;
}

function validateProfileStep(): boolean {
  let valid = true;

  if (!firstName.value) {
    firstNameError.value = 'First name is required';
    valid = false;
  } else {
    firstNameError.value = '';
  }

  if (!lastName.value) {
    lastNameError.value = 'Last name is required';
    valid = false;
  } else {
    lastNameError.value = '';
  }

  if (!role.value) {
    roleError.value = 'Role is required';
    valid = false;
  } else {
    roleError.value = '';
  }

  return valid;
}

// Navigation
function handleNext() {
  const validators = [validateAccountStep, validateProfileStep, () => true, () => true];
  const validator = validators[currentStep.value];

  if (!validator()) return;

  currentStep.value = Math.min(currentStep.value + 1, STEPS.length - 1);
}

function handleBack() {
  currentStep.value = Math.max(currentStep.value - 1, 0);
}

function goToStep(stepIndex: number) {
  currentStep.value = stepIndex;
}

async function handleSubmit() {
  isSubmitting.value = true;
  formError.value = '';

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        company: company.value,
        role: role.value,
        bio: bio.value,
        emailNotifications: emailNotifications.value,
        theme: theme.value,
        language: language.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    window.location.href = '/welcome';
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'An error occurred';
  } finally {
    isSubmitting.value = false;
  }
}

// Step Components
function AccountStep() {
  return (
    <div class="space-y-4">
      <div class="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email.value}
          onInput={(e) => {
            email.value = e.currentTarget.value;
            emailError.value = '';
          }}
          aria-invalid={emailError.value ? 'true' : 'false'}
          aria-describedby={emailError.value ? 'email-error' : undefined}
        />
        {emailError.value && (
          <p id="email-error" class="text-sm text-destructive">
            {emailError.value}
          </p>
        )}
      </div>

      <div class="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password.value}
          onInput={(e) => {
            password.value = e.currentTarget.value;
            passwordError.value = '';
          }}
          aria-invalid={passwordError.value ? 'true' : 'false'}
          aria-describedby={passwordError.value ? 'password-error' : 'password-hint'}
        />
        {passwordError.value ? (
          <p id="password-error" class="text-sm text-destructive">
            {passwordError.value}
          </p>
        ) : (
          <p id="password-hint" class="text-sm text-muted-foreground">
            Must be at least 8 characters
          </p>
        )}
      </div>

      <div class="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword.value}
          onInput={(e) => {
            confirmPassword.value = e.currentTarget.value;
            confirmPasswordError.value = '';
          }}
          aria-invalid={confirmPasswordError.value ? 'true' : 'false'}
          aria-describedby={confirmPasswordError.value ? 'confirm-error' : undefined}
        />
        {confirmPasswordError.value && (
          <p id="confirm-error" class="text-sm text-destructive">
            {confirmPasswordError.value}
          </p>
        )}
      </div>
    </div>
  );
}

function ProfileStep() {
  return (
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            value={firstName.value}
            onInput={(e) => {
              firstName.value = e.currentTarget.value;
              firstNameError.value = '';
            }}
            aria-invalid={firstNameError.value ? 'true' : 'false'}
          />
          {firstNameError.value && (
            <p class="text-sm text-destructive">{firstNameError.value}</p>
          )}
        </div>

        <div class="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            value={lastName.value}
            onInput={(e) => {
              lastName.value = e.currentTarget.value;
              lastNameError.value = '';
            }}
            aria-invalid={lastNameError.value ? 'true' : 'false'}
          />
          {lastNameError.value && (
            <p class="text-sm text-destructive">{lastNameError.value}</p>
          )}
        </div>
      </div>

      <div class="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={company.value}
          onInput={(e) => company.value = e.currentTarget.value}
        />
      </div>

      <div class="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          id="role"
          name="role"
          required
          value={role.value}
          onInput={(e) => {
            role.value = e.currentTarget.value;
            roleError.value = '';
          }}
          aria-invalid={roleError.value ? 'true' : 'false'}
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
        </Select>
        {roleError.value && (
          <p class="text-sm text-destructive">{roleError.value}</p>
        )}
      </div>

      <div class="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder="Tell us a bit about yourself..."
          value={bio.value}
          onInput={(e) => bio.value = e.currentTarget.value}
        />
        <p class="text-sm text-muted-foreground">
          {bio.value.length} / 500 characters
        </p>
      </div>
    </div>
  );
}

function PreferencesStep() {
  return (
    <div class="space-y-6">
      <div class="space-y-3">
        <Label>Email Notifications</Label>
        <div class="space-y-2">
          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="notifications-all"
              name="emailNotifications"
              value="all"
              checked={emailNotifications.value === 'all'}
              onInput={(e) => emailNotifications.value = e.currentTarget.value}
            />
            <Label htmlFor="notifications-all" class="font-normal">
              All notifications
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="notifications-important"
              name="emailNotifications"
              value="important"
              checked={emailNotifications.value === 'important'}
              onInput={(e) => emailNotifications.value = e.currentTarget.value}
            />
            <Label htmlFor="notifications-important" class="font-normal">
              Important only
            </Label>
          </div>
          <div class="flex items-center space-x-2">
            <input
              type="radio"
              id="notifications-none"
              name="emailNotifications"
              value="none"
              checked={emailNotifications.value === 'none'}
              onInput={(e) => emailNotifications.value = e.currentTarget.value}
            />
            <Label htmlFor="notifications-none" class="font-normal">
              None
            </Label>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <Label htmlFor="theme">Theme</Label>
        <Select
          id="theme"
          name="theme"
          value={theme.value}
          onInput={(e) => theme.value = e.currentTarget.value}
        >
          <option value="system">System default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </div>

      <div class="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select
          id="language"
          name="language"
          value={language.value}
          onInput={(e) => language.value = e.currentTarget.value}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </Select>
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div class="space-y-6">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Account Information</h3>
          <Button variant="ghost" size="sm" onClick={() => goToStep(0)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email:</dt>
            <dd class="font-medium">{email.value}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Password:</dt>
            <dd class="font-medium">••••••••</dd>
          </div>
        </dl>
      </div>

      <Separator />

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Profile</h3>
          <Button variant="ghost" size="sm" onClick={() => goToStep(1)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Name:</dt>
            <dd class="font-medium">
              {firstName.value} {lastName.value}
            </dd>
          </div>
          {company.value && (
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Company:</dt>
              <dd class="font-medium">{company.value}</dd>
            </div>
          )}
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Role:</dt>
            <dd class="font-medium capitalize">{role.value}</dd>
          </div>
          {bio.value && (
            <div class="flex flex-col space-y-1">
              <dt class="text-muted-foreground">Bio:</dt>
              <dd class="font-medium">{bio.value}</dd>
            </div>
          )}
        </dl>
      </div>

      <Separator />

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Preferences</h3>
          <Button variant="ghost" size="sm" onClick={() => goToStep(2)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email Notifications:</dt>
            <dd class="font-medium capitalize">{emailNotifications.value}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Theme:</dt>
            <dd class="font-medium capitalize">{theme.value}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Language:</dt>
            <dd class="font-medium">{language.value}</dd>
          </div>
        </dl>
      </div>

      {formError.value && (
        <div class="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p class="text-sm text-destructive">{formError.value}</p>
        </div>
      )}
    </div>
  );
}

// Main component
export function MultiStepWizard() {
  const stepComponents = [AccountStep, ProfileStep, PreferencesStep, ReviewStep];
  const CurrentStepComponent = stepComponents[currentStep.value];

  return (
    <div class="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">
            Step {currentStep.value + 1} of {STEPS.length}
          </span>
          <span class="text-sm text-muted-foreground">
            {Math.round(progress.value)}% complete
          </span>
        </div>
        <Progress value={progress.value} max={100} aria-label="Wizard progress" />
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress steps">
        <ol class="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isComplete = index < currentStep.value;
            const isCurrent = index === currentStep.value;

            return (
              <li key={step.id} class="flex flex-col items-center flex-1">
                <div class="flex items-center w-full">
                  <div
                    class={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium
                      ${isComplete ? 'bg-primary text-primary-foreground border-primary' : ''}
                      ${isCurrent ? 'border-primary text-primary' : ''}
                      ${!isComplete && !isCurrent ? 'border-muted text-muted-foreground' : ''}
                    `}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isComplete ? (
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      class={`flex-1 h-1 ${isComplete ? 'bg-primary' : 'bg-muted'}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span class={`mt-2 text-xs text-center ${isCurrent ? 'font-medium' : ''}`}>
                  {step.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Main card */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep.value].title}</CardTitle>
          <CardDescription>{STEPS[currentStep.value].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <CurrentStepComponent />
        </CardContent>

        <CardFooter class="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep.value === 0 || isSubmitting.value}
          >
            Back
          </Button>

          {currentStep.value < STEPS.length - 1 ? (
            <Button onClick={handleNext} disabled={isSubmitting.value}>
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={isSubmitting.value}
              disabled={isSubmitting.value}
            >
              Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
```

## Key Features Explained

### 1. Signals for State Management

This example uses Preact Signals instead of `useState` for better performance:

```tsx
import {signal, computed} from '@preact/signals';

// Individual signals - not a big object
const email = signal('');
const password = signal('');
const firstName = signal('');

// Computed values automatically update
const progress = computed(() => ((currentStep.value + 1) / STEPS.length) * 100);
```

**Why Signals?**
- **Fine-grained reactivity**: Only components using specific signals re-render
- **No props drilling**: Signals can be imported and used anywhere
- **Computed values**: Automatically update when dependencies change
- **Better performance**: Avoids unnecessary re-renders

### 2. Component Separation

Each step is its own component for better organization:

```tsx
function AccountStep() {
  return (
    <div class="space-y-4">
      <Label htmlFor="email">Email Address *</Label>
      <Input
        value={email.value}
        onInput={(e) => {
          email.value = e.currentTarget.value;
          emailError.value = '';
        }}
      />
    </div>
  );
}

// Render the current step
const stepComponents = [AccountStep, ProfileStep, PreferencesStep, ReviewStep];
const CurrentStepComponent = stepComponents[currentStep.value];
<CurrentStepComponent />
```

### 3. Per-Step Validation

Each step validates only when moving forward:

```tsx
function validateAccountStep(): boolean {
  let valid = true;

  if (!email.value) {
    emailError.value = 'Email is required';
    valid = false;
  } else {
    emailError.value = '';
  }

  return valid;
}

function handleNext() {
  const validators = [validateAccountStep, validateProfileStep, () => true, () => true];
  if (!validators[currentStep.value]()) return;

  currentStep.value = Math.min(currentStep.value + 1, STEPS.length - 1);
}
```

### 4. Data Persistence

Signals make localStorage persistence simple:

```tsx
import {effect} from '@preact/signals';

// Save on every change
effect(() => {
  localStorage.setItem('wizardData', JSON.stringify({
    email: email.value,
    firstName: firstName.value,
    // ... other fields
  }));
});

// Load on mount
const saved = localStorage.getItem('wizardData');
if (saved) {
  const data = JSON.parse(saved);
  email.value = data.email;
  firstName.value = data.firstName;
}
```

### 5. Progress Tracking

Computed signal automatically updates progress:

```tsx
const progress = computed(() => ((currentStep.value + 1) / STEPS.length) * 100);

<Progress value={progress.value} max={100} aria-label="Wizard progress" />
```

### 6. Accessibility Features

- **ARIA landmarks**: `<nav aria-label="Progress steps">`
- **Current step indicator**: `aria-current="step"`
- **Progress announcement**: `aria-label` on Progress component
- **Form validation**: `aria-invalid` and `aria-describedby` for errors
- **Keyboard navigation**: All buttons and inputs are keyboard accessible

## Customization Options

### Save Draft Functionality

Allow users to save progress and continue later:

```tsx
async function handleSaveDraft() {
  await fetch('/api/drafts', {
    method: 'POST',
    body: JSON.stringify({
      currentStep: currentStep.value,
      email: email.value,
      firstName: firstName.value,
      // ... other fields
    }),
  });

  // Show success message
  showToast({
    title: 'Draft saved',
    description: 'You can continue later from where you left off.',
  });
}

<Button variant="ghost" onClick={handleSaveDraft}>
  Save Draft
</Button>
```

### Conditional Steps

Use computed signals to show/hide steps dynamically:

```tsx
const skipProfile = signal(false);

const activeSteps = computed(() => {
  if (skipProfile.value) {
    return STEPS.filter(s => s.id !== 'profile');
  }
  return STEPS;
});

// Use activeSteps.value in your render
{activeSteps.value.map((step, index) => ...)}
```

### Async Validation

Validate fields against the server:

```tsx
async function validateEmailAvailability() {
  const response = await fetch(`/api/check-email?email=${email.value}`);
  const {available} = await response.json();

  if (!available) {
    emailError.value = 'This email is already registered';
    return false;
  }

  emailError.value = '';
  return true;
}

// Call in validation function
async function validateAccountStep(): Promise<boolean> {
  // ... other validation

  if (email.value && !await validateEmailAvailability()) {
    return false;
  }

  return true;
}
```

## Testing

### Step Navigation

```tsx
import {currentStep} from './wizard-signals';

test('navigates between steps', () => {
  currentStep.value = 0; // Reset signal
  render(<MultiStepWizard />);

  // Should start on first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();
  expect(currentStep.value).toBe(0);

  // Fill required fields
  fireEvent.input(screen.getByLabelText(/email/i), {target: {value: 'test@example.com'}});
  fireEvent.input(screen.getByLabelText(/^password/i), {target: {value: 'password123'}});
  fireEvent.input(screen.getByLabelText(/confirm/i), {target: {value: 'password123'}});

  // Click next
  fireEvent.click(screen.getByText('Next'));

  // Should move to second step
  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(currentStep.value).toBe(1);

  // Click back
  fireEvent.click(screen.getByText('Back'));

  // Should return to first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();
  expect(currentStep.value).toBe(0);
});
```

### Validation Prevents Progress

```tsx
import {emailError, passwordError} from './wizard-signals';

test('validates before allowing next step', () => {
  currentStep.value = 0;
  emailError.value = '';
  passwordError.value = '';

  render(<MultiStepWizard />);

  // Try to proceed without filling required fields
  fireEvent.click(screen.getByText('Next'));

  // Should show validation errors
  expect(emailError.value).toBe('Email is required');
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();

  // Should still be on first step
  expect(currentStep.value).toBe(0);
});
```

### Signal Updates

```tsx
import {email, firstName} from './wizard-signals';

test('updates signals when typing', () => {
  email.value = '';
  render(<MultiStepWizard />);

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.input(emailInput, {target: {value: 'user@example.com'}});

  // Signal should update
  expect(email.value).toBe('user@example.com');
});
```

## Related Recipes

- [Login Form](./login-form.md) - Simple single-step form
- [Settings Panel](./settings-panel.md) - Complex form with tabs
- Survey builder patterns
- Checkout flow examples

## Best Practices

1. **Use Signals for state**: Better performance than `useState` for complex forms
2. **One value, one signal**: Don't store huge objects; create individual signals
3. **Split into components**: Separate each step into its own component
4. **Save progress automatically**: Don't lose user data on accidental navigation
5. **Validate on next, not on change**: Don't frustrate users with premature errors
6. **Show completion progress**: Users need to know how much is left
7. **Allow editing previous steps**: Users should be able to fix mistakes
8. **Keep steps focused**: 3-5 fields per step maximum
9. **Provide a summary**: Let users review before submitting
10. **Test on mobile**: Ensure forms work well on small screens
11. **Clear error messages**: Tell users exactly what's wrong and how to fix it

## Why This Approach?

This refactored wizard demonstrates PUI's philosophy of minimal, performant code:

- **Signals vs useState**: Fine-grained reactivity means only affected components re-render
- **Component separation**: Each step is isolated, making the code easier to maintain
- **Individual signals**: Each form field is its own signal, avoiding unnecessary object spreading
- **No prop drilling**: Signals can be accessed from any component
- **Computed values**: Progress calculation automatically updates when step changes
- **Cleaner code**: ~500 lines vs ~700 lines with the old approach

**Before (useState + monolithic)**:
- One large component with all steps inline
- Huge `formData` object updated on every keystroke
- All fields re-render on any change
- Complex state management with `setFormData(prev => ({...prev, [name]: value}))`

**After (Signals + components)**:
- Separate component for each step
- Individual signals for each field
- Only changed field re-renders
- Simple updates: `email.value = newValue`

---

This multi-step wizard provides a solid foundation for complex registration flows, onboarding experiences, and multi-page forms while maintaining excellent UX, accessibility, and performance.
