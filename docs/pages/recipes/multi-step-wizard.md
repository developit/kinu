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
  Select,
  Textarea,
  RadioGroup,
  Progress,
  Badge,
  Separator,
} from 'pui';

// Step definitions
interface Step {
  id: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    id: 'account',
    title: 'Account Info',
    description: 'Create your account',
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Tell us about yourself',
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Confirm your information',
  },
];

// Form data interface
interface WizardData {
  // Account step
  email: string;
  password: string;
  confirmPassword: string;

  // Profile step
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  bio: string;

  // Preferences step
  emailNotifications: string;
  theme: string;
  language: string;
}

// Validation errors
interface ValidationErrors {
  [key: string]: string | undefined;
}

export function MultiStepWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<WizardData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    bio: '',
    emailNotifications: 'all',
    theme: 'system',
    language: 'en',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Progress percentage
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  // Validation functions for each step
  const validateAccountStep = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const validateProfileStep = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.role) errors.role = 'Role is required';

    return errors;
  };

  const validatePreferencesStep = (): ValidationErrors => {
    // All fields are optional in preferences
    return {};
  };

  // Get validator for current step
  const getCurrentStepValidator = () => {
    switch (currentStep) {
      case 0: return validateAccountStep;
      case 1: return validateProfileStep;
      case 2: return validatePreferencesStep;
      default: return () => ({});
    }
  };

  // Handle input changes
  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.currentTarget;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Navigate to next step
  const handleNext = () => {
    const validator = getCurrentStepValidator();
    const stepErrors = validator();

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  // Navigate to previous step
  const handleBack = () => {
    setErrors({});
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Go to specific step (for review step editing)
  const goToStep = (stepIndex: number) => {
    setErrors({});
    setCurrentStep(stepIndex);
  };

  // Handle final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Success - redirect or show success message
      window.location.href = '/welcome';
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </span>
        </div>
        <Progress value={progress} max={100} aria-label="Wizard progress" />
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress steps">
        <ol className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <li key={step.id} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium
                      ${isComplete ? 'bg-primary text-primary-foreground border-primary' : ''}
                      ${isCurrent ? 'border-primary text-primary' : ''}
                      ${!isComplete && !isCurrent ? 'border-muted text-muted-foreground' : ''}
                    `}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isComplete ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${isComplete ? 'bg-primary' : 'bg-muted'}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className={`mt-2 text-xs text-center ${isCurrent ? 'font-medium' : ''}`}>
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
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>{STEPS[currentStep].description}</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Account Step */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onInput={handleChange}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onInput={handleChange}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                />
                {errors.password ? (
                  <p id="password-error" className="text-sm text-destructive">
                    {errors.password}
                  </p>
                ) : (
                  <p id="password-hint" className="text-sm text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onInput={handleChange}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                />
                {errors.confirmPassword && (
                  <p id="confirm-error" className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Profile Step */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onInput={handleChange}
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onInput={handleChange}
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onInput={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onInput={handleChange}
                  aria-invalid={errors.role ? 'true' : 'false'}
                >
                  <option value="">Select a role...</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="other">Other</option>
                </Select>
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Tell us a bit about yourself..."
                  value={formData.bio}
                  onInput={handleChange}
                />
                <p className="text-sm text-muted-foreground">
                  {formData.bio.length} / 500 characters
                </p>
              </div>
            </div>
          )}

          {/* Preferences Step */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Email Notifications</Label>
                <RadioGroup name="emailNotifications" value={formData.emailNotifications}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="notifications-all"
                      name="emailNotifications"
                      value="all"
                      checked={formData.emailNotifications === 'all'}
                      onInput={handleChange}
                    />
                    <Label htmlFor="notifications-all" className="font-normal">
                      All notifications
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="notifications-important"
                      name="emailNotifications"
                      value="important"
                      checked={formData.emailNotifications === 'important'}
                      onInput={handleChange}
                    />
                    <Label htmlFor="notifications-important" className="font-normal">
                      Important only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="notifications-none"
                      name="emailNotifications"
                      value="none"
                      checked={formData.emailNotifications === 'none'}
                      onInput={handleChange}
                    />
                    <Label htmlFor="notifications-none" className="font-normal">
                      None
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onInput={handleChange}
                >
                  <option value="system">System default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  id="language"
                  name="language"
                  value={formData.language}
                  onInput={handleChange}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </Select>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Account Information</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(0)}
                  >
                    Edit
                  </Button>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email:</dt>
                    <dd className="font-medium">{formData.email}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Password:</dt>
                    <dd className="font-medium">••••••••</dd>
                  </div>
                </dl>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Profile</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(1)}
                  >
                    Edit
                  </Button>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Name:</dt>
                    <dd className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </dd>
                  </div>
                  {formData.company && (
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Company:</dt>
                      <dd className="font-medium">{formData.company}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Role:</dt>
                    <dd className="font-medium capitalize">{formData.role}</dd>
                  </div>
                  {formData.bio && (
                    <div className="flex flex-col space-y-1">
                      <dt className="text-muted-foreground">Bio:</dt>
                      <dd className="font-medium">{formData.bio}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Preferences</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(2)}
                  >
                    Edit
                  </Button>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Email Notifications:</dt>
                    <dd className="font-medium capitalize">
                      {formData.emailNotifications}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Theme:</dt>
                    <dd className="font-medium capitalize">{formData.theme}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Language:</dt>
                    <dd className="font-medium">{formData.language}</dd>
                  </div>
                </dl>
              </div>

              {errors.form && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
                  <p className="text-sm text-destructive">{errors.form}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
          >
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext} disabled={isSubmitting}>
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
```

## Key Features Explained

### 1. Progress Tracking

Visual progress indicators show completion status:

```tsx
// Linear progress bar
<Progress value={progress} max={100} aria-label="Wizard progress" />

// Step indicators with checkmarks
{STEPS.map((step, index) => {
  const isComplete = index < currentStep;
  const isCurrent = index === currentStep;
  // ... render step indicator
})}
```

### 2. Per-Step Validation

Each step has its own validation logic:

```tsx
const validateAccountStep = (): ValidationErrors => {
  const errors: ValidationErrors = {};
  // Validate account fields
  return errors;
};

// Only validate when moving forward
const handleNext = () => {
  const validator = getCurrentStepValidator();
  const stepErrors = validator();

  if (Object.keys(stepErrors).length > 0) {
    setErrors(stepErrors);
    return;
  }

  setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
};
```

### 3. Data Persistence

Form data persists across steps:

```tsx
const [formData, setFormData] = useState<WizardData>({
  // All fields initialized
  email: '',
  password: '',
  // ... etc
});

// Update preserves all data
setFormData(prev => ({
  ...prev,
  [name]: value,
}));
```

For long-lived wizards, consider persisting to localStorage:

```tsx
// Save on every change
useEffect(() => {
  localStorage.setItem('wizardData', JSON.stringify(formData));
}, [formData]);

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('wizardData');
  if (saved) {
    setFormData(JSON.parse(saved));
  }
}, []);
```

### 4. Review & Edit

The final step allows editing any previous step:

```tsx
<Button
  variant="ghost"
  size="sm"
  onClick={() => goToStep(0)}
>
  Edit
</Button>
```

### 5. Accessibility Features

- **ARIA landmarks**: `<nav aria-label="Progress steps">`
- **Current step indicator**: `aria-current="step"`
- **Progress announcement**: `aria-label` on Progress component
- **Form validation**: `aria-invalid` and `aria-describedby` for errors
- **Keyboard navigation**: All buttons and inputs are keyboard accessible

## Customization Options

### Save Draft Functionality

Allow users to save progress and continue later:

```tsx
const handleSaveDraft = async () => {
  await fetch('/api/drafts', {
    method: 'POST',
    body: JSON.stringify({
      currentStep,
      formData,
    }),
  });

  // Show success message
  showToast({
    title: 'Draft saved',
    description: 'You can continue later from where you left off.',
  });
};

<Button variant="ghost" onClick={handleSaveDraft}>
  Save Draft
</Button>
```

### Conditional Steps

Show/hide steps based on previous answers:

```tsx
const getActiveSteps = () => {
  const steps = [...STEPS];

  // Skip profile step if user selected "skip profile"
  if (formData.skipProfile) {
    return steps.filter(s => s.id !== 'profile');
  }

  return steps;
};

const activeSteps = getActiveSteps();
```

### Async Validation

Validate fields against the server:

```tsx
const validateEmailAvailability = async (email: string) => {
  const response = await fetch(`/api/check-email?email=${email}`);
  const {available} = await response.json();

  if (!available) {
    return 'This email is already registered';
  }

  return undefined;
};
```

## Testing

### Step Navigation

```tsx
test('navigates between steps', () => {
  const {container} = render(<MultiStepWizard />);

  // Should start on first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();

  // Click next
  fireEvent.click(screen.getByText('Next'));

  // Should move to second step
  expect(screen.getByText('Profile')).toBeInTheDocument();

  // Click back
  fireEvent.click(screen.getByText('Back'));

  // Should return to first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();
});
```

### Validation Prevents Progress

```tsx
test('validates before allowing next step', () => {
  const {container} = render(<MultiStepWizard />);

  // Try to proceed without filling required fields
  fireEvent.click(screen.getByText('Next'));

  // Should show validation errors
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();

  // Should still be on first step
  expect(screen.getByText('Account Info')).toBeInTheDocument();
});
```

## Related Recipes

- [Login Form](./login-form.md) - Simple single-step form
- [Settings Panel](./settings-panel.md) - Complex form with tabs
- Survey builder patterns
- Checkout flow examples

## Best Practices

1. **Save progress automatically**: Don't lose user data on accidental navigation
2. **Validate on next, not on change**: Don't frustrate users with premature errors
3. **Show completion progress**: Users need to know how much is left
4. **Allow editing previous steps**: Users should be able to fix mistakes
5. **Keep steps focused**: 3-5 fields per step maximum
6. **Provide a summary**: Let users review before submitting
7. **Test on mobile**: Ensure forms work well on small screens
8. **Clear error messages**: Tell users exactly what's wrong and how to fix it

---

This multi-step wizard provides a solid foundation for complex registration flows, onboarding experiences, and multi-page forms while maintaining excellent UX and accessibility.
