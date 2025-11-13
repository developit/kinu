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
import {signal, computed, effect} from '@preact/signals';
import {useMemo} from 'preact/hooks';
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

// Create the wizard model with all state and actions
function createWizardModel() {
  // State signals
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

  // Clear errors when values change
  effect(() => {
    email.value;
    emailError.value = '';
  });

  effect(() => {
    password.value;
    passwordError.value = '';
  });

  effect(() => {
    confirmPassword.value;
    confirmPasswordError.value = '';
  });

  effect(() => {
    firstName.value;
    firstNameError.value = '';
  });

  effect(() => {
    lastName.value;
    lastNameError.value = '';
  });

  effect(() => {
    role.value;
    roleError.value = '';
  });

  // Validation functions
  function validateAccountStep(): boolean {
    let valid = true;

    if (!email.value) {
      emailError.value = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = 'Invalid email address';
      valid = false;
    }

    if (!password.value) {
      passwordError.value = 'Password is required';
      valid = false;
    } else if (password.value.length < 8) {
      passwordError.value = 'Password must be at least 8 characters';
      valid = false;
    }

    if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = 'Passwords do not match';
      valid = false;
    }

    return valid;
  }

  function validateProfileStep(): boolean {
    let valid = true;

    if (!firstName.value) {
      firstNameError.value = 'First name is required';
      valid = false;
    }

    if (!lastName.value) {
      lastNameError.value = 'Last name is required';
      valid = false;
    }

    if (!role.value) {
      roleError.value = 'Role is required';
      valid = false;
    }

    return valid;
  }

  // Navigation actions
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

  // Return the complete model
  return {
    // State
    currentStep,
    isSubmitting,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    company,
    role,
    bio,
    emailNotifications,
    theme,
    language,
    progress,
    // Errors
    emailError,
    passwordError,
    confirmPasswordError,
    firstNameError,
    lastNameError,
    roleError,
    formError,
    // Actions
    handleNext,
    handleBack,
    goToStep,
    handleSubmit,
  };
}

// Step components receive the model
function AccountStep({model}) {
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
          value={model.email.value}
          onInput={(e) => model.email.value = e.currentTarget.value}
          aria-invalid={model.emailError.value ? 'true' : 'false'}
          aria-describedby={model.emailError.value ? 'email-error' : undefined}
        />
        {model.emailError.value && (
          <p id="email-error" class="text-sm text-destructive">
            {model.emailError.value}
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
          value={model.password.value}
          onInput={(e) => model.password.value = e.currentTarget.value}
          aria-invalid={model.passwordError.value ? 'true' : 'false'}
          aria-describedby={model.passwordError.value ? 'password-error' : 'password-hint'}
        />
        {model.passwordError.value ? (
          <p id="password-error" class="text-sm text-destructive">
            {model.passwordError.value}
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
          value={model.confirmPassword.value}
          onInput={(e) => model.confirmPassword.value = e.currentTarget.value}
          aria-invalid={model.confirmPasswordError.value ? 'true' : 'false'}
          aria-describedby={model.confirmPasswordError.value ? 'confirm-error' : undefined}
        />
        {model.confirmPasswordError.value && (
          <p id="confirm-error" class="text-sm text-destructive">
            {model.confirmPasswordError.value}
          </p>
        )}
      </div>
    </div>
  );
}

function ProfileStep({model}) {
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
            value={model.firstName.value}
            onInput={(e) => model.firstName.value = e.currentTarget.value}
            aria-invalid={model.firstNameError.value ? 'true' : 'false'}
          />
          {model.firstNameError.value && (
            <p class="text-sm text-destructive">{model.firstNameError.value}</p>
          )}
        </div>

        <div class="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            value={model.lastName.value}
            onInput={(e) => model.lastName.value = e.currentTarget.value}
            aria-invalid={model.lastNameError.value ? 'true' : 'false'}
          />
          {model.lastNameError.value && (
            <p class="text-sm text-destructive">{model.lastNameError.value}</p>
          )}
        </div>
      </div>

      <div class="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={model.company.value}
          onInput={(e) => model.company.value = e.currentTarget.value}
        />
      </div>

      <div class="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          id="role"
          name="role"
          required
          value={model.role.value}
          onInput={(e) => model.role.value = e.currentTarget.value}
          aria-invalid={model.roleError.value ? 'true' : 'false'}
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
        </Select>
        {model.roleError.value && (
          <p class="text-sm text-destructive">{model.roleError.value}</p>
        )}
      </div>

      <div class="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          placeholder="Tell us a bit about yourself..."
          value={model.bio.value}
          onInput={(e) => model.bio.value = e.currentTarget.value}
        />
        <p class="text-sm text-muted-foreground">
          {model.bio.value.length} / 500 characters
        </p>
      </div>
    </div>
  );
}

function PreferencesStep({model}) {
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
              checked={model.emailNotifications.value === 'all'}
              onInput={(e) => model.emailNotifications.value = e.currentTarget.value}
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
              checked={model.emailNotifications.value === 'important'}
              onInput={(e) => model.emailNotifications.value = e.currentTarget.value}
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
              checked={model.emailNotifications.value === 'none'}
              onInput={(e) => model.emailNotifications.value = e.currentTarget.value}
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
          value={model.theme.value}
          onInput={(e) => model.theme.value = e.currentTarget.value}
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
          value={model.language.value}
          onInput={(e) => model.language.value = e.currentTarget.value}
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

function ReviewStep({model}) {
  return (
    <div class="space-y-6">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Account Information</h3>
          <Button variant="ghost" size="sm" onClick={() => model.goToStep(0)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email:</dt>
            <dd class="font-medium">{model.email.value}</dd>
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
          <Button variant="ghost" size="sm" onClick={() => model.goToStep(1)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Name:</dt>
            <dd class="font-medium">
              {model.firstName.value} {model.lastName.value}
            </dd>
          </div>
          {model.company.value && (
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Company:</dt>
              <dd class="font-medium">{model.company.value}</dd>
            </div>
          )}
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Role:</dt>
            <dd class="font-medium capitalize">{model.role.value}</dd>
          </div>
          {model.bio.value && (
            <div class="flex flex-col space-y-1">
              <dt class="text-muted-foreground">Bio:</dt>
              <dd class="font-medium">{model.bio.value}</dd>
            </div>
          )}
        </dl>
      </div>

      <Separator />

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Preferences</h3>
          <Button variant="ghost" size="sm" onClick={() => model.goToStep(2)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email Notifications:</dt>
            <dd class="font-medium capitalize">{model.emailNotifications.value}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Theme:</dt>
            <dd class="font-medium capitalize">{model.theme.value}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Language:</dt>
            <dd class="font-medium">{model.language.value}</dd>
          </div>
        </dl>
      </div>

      {model.formError.value && (
        <div class="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p class="text-sm text-destructive">{model.formError.value}</p>
        </div>
      )}
    </div>
  );
}

// Main component
export function MultiStepWizard() {
  const model = useMemo(() => createWizardModel(), []);

  const stepComponents = [
    (props) => <AccountStep {...props} />,
    (props) => <ProfileStep {...props} />,
    (props) => <PreferencesStep {...props} />,
    (props) => <ReviewStep {...props} />,
  ];
  const CurrentStepComponent = stepComponents[model.currentStep.value];

  return (
    <div class="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">
            Step {model.currentStep.value + 1} of {STEPS.length}
          </span>
          <span class="text-sm text-muted-foreground">
            {Math.round(model.progress.value)}% complete
          </span>
        </div>
        <Progress value={model.progress.value} max={100} aria-label="Wizard progress" />
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress steps">
        <ol class="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isComplete = index < model.currentStep.value;
            const isCurrent = index === model.currentStep.value;

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
          <CardTitle>{STEPS[model.currentStep.value].title}</CardTitle>
          <CardDescription>{STEPS[model.currentStep.value].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <CurrentStepComponent model={model} />
        </CardContent>

        <CardFooter class="flex justify-between">
          <Button
            variant="outline"
            onClick={model.handleBack}
            disabled={model.currentStep.value === 0 || model.isSubmitting.value}
          >
            Back
          </Button>

          {model.currentStep.value < STEPS.length - 1 ? (
            <Button onClick={model.handleNext} disabled={model.isSubmitting.value}>
              Next
            </Button>
          ) : (
            <Button
              onClick={model.handleSubmit}
              loading={model.isSubmitting.value}
              disabled={model.isSubmitting.value}
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

### 1. Model-Based Architecture

This example uses a `createWizardModel()` function to encapsulate all state and logic:

```tsx
function createWizardModel() {
  // Create signals
  const email = signal('');
  const emailError = signal('');

  // Effects automatically clear errors when values change
  effect(() => {
    email.value;
    emailError.value = '';
  });

  // Actions
  function handleSubmit() { /* ... */ }

  // Return everything as a cohesive model
  return {
    email,
    emailError,
    handleSubmit,
  };
}

// Use in component
export function MultiStepWizard() {
  const model = useMemo(() => createWizardModel(), []);

  return <AccountStep model={model} />;
}
```

**Why This Architecture?**
- **Encapsulation**: All state and logic in one place
- **No module-level state**: Each component instance gets its own model
- **Easy to test**: Just call `createWizardModel()` and test the returned object
- **Clear data flow**: Model is passed down explicitly, not imported globally

### 2. Effect-Based Error Clearing

Errors automatically clear when fields change, using effects instead of callbacks:

```tsx
// Clear error whenever email changes
effect(() => {
  email.value; // Read the signal to subscribe
  emailError.value = ''; // Clear the error
});

// Now inputs don't need to manually clear errors
<Input
  value={model.email.value}
  onInput={(e) => model.email.value = e.currentTarget.value}
  // No need to clear emailError here!
/>
```

**Benefits:**
- **Separation of concerns**: Error clearing logic is separate from input handlers
- **Declarative**: Effect describes the relationship between state and errors
- **DRY**: No need to repeat error clearing in every input handler

### 3. Component Separation

Each step is its own component and receives the model as a prop:

```tsx
function AccountStep({model}) {
  return (
    <div class="space-y-4">
      <Label htmlFor="email">Email Address *</Label>
      <Input
        value={model.email.value}
        onInput={(e) => model.email.value = e.currentTarget.value}
      />
    </div>
  );
}

// Render the current step
const stepComponents = [
  (props) => <AccountStep {...props} />,
  (props) => <ProfileStep {...props} />,
  // ...
];
const CurrentStepComponent = stepComponents[model.currentStep.value];
<CurrentStepComponent model={model} />
```

### 4. Per-Step Validation

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

### 5. Data Persistence

Effects make localStorage persistence simple within the model:

```tsx
function createWizardModel() {
  const email = signal('');
  const firstName = signal('');

  // Save on every change
  effect(() => {
    localStorage.setItem('wizardData', JSON.stringify({
      email: email.value,
      firstName: firstName.value,
      // ... other fields
    }));
  });

  // Load on initialization
  const saved = localStorage.getItem('wizardData');
  if (saved) {
    const data = JSON.parse(saved);
    email.value = data.email;
    firstName.value = data.firstName;
  }

  return {email, firstName, /* ... */};
}
```

### 6. Progress Tracking

Computed signal automatically updates progress:

```tsx
const progress = computed(() => ((currentStep.value + 1) / STEPS.length) * 100);

<Progress value={model.progress.value} max={100} aria-label="Wizard progress" />
```

### 7. Accessibility Features

- **ARIA landmarks**: `<nav aria-label="Progress steps">`
- **Current step indicator**: `aria-current="step"`
- **Progress announcement**: `aria-label` on Progress component
- **Form validation**: `aria-invalid` and `aria-describedby` for errors
- **Keyboard navigation**: All buttons and inputs are keyboard accessible

## Customization Options

### Save Draft Functionality

Add a save draft action to the model:

```tsx
function createWizardModel() {
  // ... existing code

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

  return {
    // ... other returns
    handleSaveDraft,
  };
}

// Use in component
<Button variant="ghost" onClick={model.handleSaveDraft}>
  Save Draft
</Button>
```

### Conditional Steps

Use computed signals within the model to show/hide steps dynamically:

```tsx
function createWizardModel() {
  const skipProfile = signal(false);

  const activeSteps = computed(() => {
    if (skipProfile.value) {
      return STEPS.filter(s => s.id !== 'profile');
    }
    return STEPS;
  });

  return {
    skipProfile,
    activeSteps,
    // ...
  };
}

// Use in component
{model.activeSteps.value.map((step, index) => ...)}
```

### Async Validation

Add async validation to the model:

```tsx
function createWizardModel() {
  // ... existing code

  async function validateEmailAvailability() {
    const response = await fetch(`/api/check-email?email=${email.value}`);
    const {available} = await response.json();

    if (!available) {
      emailError.value = 'This email is already registered';
      return false;
    }

    return true;
  }

  async function validateAccountStep(): Promise<boolean> {
    let valid = true;

    // Standard validation
    if (!email.value) {
      emailError.value = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = 'Invalid email address';
      valid = false;
    } else {
      // Async validation
      valid = await validateEmailAvailability();
    }

    // ... rest of validation

    return valid;
  }

  return {/* ... */};
}
```

## Testing

### Testing the Model Directly

The model can be tested without mounting components:

```tsx
import {createWizardModel} from './wizard';

test('validates email correctly', () => {
  const model = createWizardModel();

  // Invalid email
  model.email.value = 'invalid';
  model.handleNext();
  expect(model.emailError.value).toBe('Invalid email address');
  expect(model.currentStep.value).toBe(0);

  // Valid email
  model.email.value = 'user@example.com';
  model.password.value = 'password123';
  model.confirmPassword.value = 'password123';
  model.handleNext();
  expect(model.emailError.value).toBe('');
  expect(model.currentStep.value).toBe(1);
});
```

### Testing Error Clearing Effects

```tsx
test('clears errors when value changes', () => {
  const model = createWizardModel();

  // Set an error
  model.emailError.value = 'Email is required';
  expect(model.emailError.value).toBe('Email is required');

  // Change the email value
  model.email.value = 'test@example.com';

  // Effect should clear the error
  expect(model.emailError.value).toBe('');
});
```

### Testing Component Integration

```tsx
test('navigates between steps in UI', () => {
  render(<MultiStepWizard />);

  // Should start on first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();

  // Fill required fields
  fireEvent.input(screen.getByLabelText(/email/i), {target: {value: 'test@example.com'}});
  fireEvent.input(screen.getByLabelText(/^password/i), {target: {value: 'password123'}});
  fireEvent.input(screen.getByLabelText(/confirm/i), {target: {value: 'password123'}});

  // Click next
  fireEvent.click(screen.getByText('Next'));

  // Should move to second step
  expect(screen.getByText('Profile')).toBeInTheDocument();
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

- **Model-based architecture**: State and logic encapsulated in `createWizardModel()`
- **No module-level state**: Each component instance gets its own fresh model via `useMemo()`
- **Effect-based logic**: Error clearing happens declaratively in effects, not in event handlers
- **Explicit data flow**: Model passed as a prop, not imported globally
- **Testability**: Just call `createWizardModel()` to test all logic without mounting components
- **Signals + computed**: Fine-grained reactivity and automatic derived values

**Before (useState + monolithic)**:
- One large component with all steps inline
- Huge `formData` object updated on every keystroke
- All fields re-render on any change
- Manual error clearing in every input handler
- Complex state management with `setFormData(prev => ({...prev, [name]: value}))`

**After (Model + Signals + effects)**:
- Separate component for each step
- Individual signals for each field
- Only changed field re-renders
- Effects automatically clear errors
- Simple updates: `model.email.value = newValue`
- Clear separation: state creation vs. rendering

---

This multi-step wizard provides a solid foundation for complex registration flows, onboarding experiences, and multi-page forms while maintaining excellent UX, accessibility, and performance.
