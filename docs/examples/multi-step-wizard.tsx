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

export function Demo() {
  return <MultiStepWizard />;
}

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
      // Simulate API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;

      if (!success) {
        throw new Error('Registration failed. Please try again.');
      }

      // In a real app, this would redirect to a welcome page
      alert('Registration successful! Welcome aboard.');

      // Reset the form
      currentStep.value = 0;
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      firstName.value = '';
      lastName.value = '';
      company.value = '';
      role.value = '';
      bio.value = '';
      emailNotifications.value = 'all';
      theme.value = 'system';
      language.value = 'en';
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

// Step components receive the wizard
function AccountStep({wizard}) {
  return (
    <div class="space-y-4">
      <Label class="space-y-2 text-sm font-medium">
        Email Address *
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={wizard.email}
          onInput={(e) => wizard.email.value = e.currentTarget.value}
          aria-invalid={wizard.emailError.value ? 'true' : 'false'}
          aria-describedby="email-hint"
        />
        {wizard.emailError.value ? (
          <span id="email-hint" class="text-sm text-destructive">
            {wizard.emailError}
          </span>
        ) : (
          <span id="email-hint" class="text-sm text-muted-foreground">
            Enter your email address
          </span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Password *
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={wizard.password}
          onInput={(e) => wizard.password.value = e.currentTarget.value}
          aria-invalid={wizard.passwordError.value ? 'true' : 'false'}
          aria-describedby="password-hint"
        />
        {wizard.passwordError ? (
          <span id="password-hint" class="text-sm text-destructive">
            {wizard.passwordError}
          </span>
        ) : (
          <span id="password-hint" class="text-sm text-muted-foreground">
            Must be at least 8 characters
          </span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Confirm Password *
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={wizard.confirmPassword}
          onInput={(e) => wizard.confirmPassword.value = e.currentTarget.value}
          aria-invalid={wizard.confirmPasswordError.value ? 'true' : 'false'}
          aria-describedby="confirm-hint"
        />
        {wizard.confirmPasswordError && (
          <span id="confirm-hint" class="text-sm text-destructive">
            {wizard.confirmPasswordError}
          </span>
        )}
      </Label>
    </div>
  );
}

function ProfileStep({wizard}) {
  return (
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <Label class="space-y-2 text-sm font-medium">
          First Name *
          <Input
            name="firstName"
            autoComplete="given-name"
            required
            value={wizard.firstName}
            onInput={(e) => wizard.firstName.value = e.currentTarget.value}
            aria-invalid={wizard.firstNameError.value ? 'true' : 'false'}
          />
          {wizard.firstNameError && (
            <span class="text-sm text-destructive">{wizard.firstNameError}</span>
          )}
        </Label>

        <Label class="space-y-2 text-sm font-medium">
          Last Name *
          <Input
            name="lastName"
            autoComplete="family-name"
            required
            value={wizard.lastName}
            onInput={(e) => wizard.lastName.value = e.currentTarget.value}
            aria-invalid={wizard.lastNameError.value ? 'true' : 'false'}
          />
          {wizard.lastNameError && (
            <span class="text-sm text-destructive">{wizard.lastNameError}</span>
          )}
        </Label>
      </div>

      <Label class="space-y-2 text-sm font-medium">
        Company
        <Input
          name="company"
          autoComplete="organization"
          value={wizard.company}
          onInput={(e) => wizard.company.value = e.currentTarget.value}
        />
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Role *
        <Select
          name="role"
          required
          value={wizard.role}
          onInput={(e) => wizard.role.value = e.currentTarget.value}
          aria-invalid={wizard.roleError.value ? 'true' : 'false'}
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
        </Select>
        {wizard.roleError && (
          <span class="text-sm text-destructive">{wizard.roleError}</span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Bio
        <Textarea
          name="bio"
          rows={4}
          placeholder="Tell us a bit about yourself..."
          value={wizard.bio}
          onInput={(e) => wizard.bio.value = e.currentTarget.value}
        />
        <span class="text-sm text-muted-foreground">
          {wizard.bio.value.length} / 500 characters
        </span>
      </Label>
    </div>
  );
}

function PreferencesStep({wizard}) {
  return (
    <div class="space-y-6">
      <div class="space-y-3">
        <span class="text-sm font-medium">Email Notifications</span>
        <div class="space-y-2">
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="all"
              checked={wizard.emailNotifications.value === 'all'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">All notifications</span>
          </Label>
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="important"
              checked={wizard.emailNotifications.value === 'important'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">Important only</span>
          </Label>
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="none"
              checked={wizard.emailNotifications.value === 'none'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">None</span>
          </Label>
        </div>
      </div>

      <Label class="space-y-2 text-sm font-medium">
        Theme
        <Select
          name="theme"
          value={wizard.theme}
          onInput={(e) => wizard.theme.value = e.currentTarget.value}
        >
          <option value="system">System default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Language
        <Select
          name="language"
          value={wizard.language}
          onInput={(e) => wizard.language.value = e.currentTarget.value}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </Select>
      </Label>
    </div>
  );
}

function ReviewStep({wizard}) {
  return (
    <div class="space-y-6">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Account Information</h3>
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(0)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email:</dt>
            <dd class="font-medium">{wizard.email}</dd>
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
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(1)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Name:</dt>
            <dd class="font-medium">
              {wizard.firstName} {wizard.lastName}
            </dd>
          </div>
          {wizard.company.value && (
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Company:</dt>
              <dd class="font-medium">{wizard.company}</dd>
            </div>
          )}
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Role:</dt>
            <dd class="font-medium capitalize">{wizard.role}</dd>
          </div>
          {wizard.bio.value && (
            <div class="flex flex-col space-y-1">
              <dt class="text-muted-foreground">Bio:</dt>
              <dd class="font-medium">{wizard.bio}</dd>
            </div>
          )}
        </dl>
      </div>

      <Separator />

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Preferences</h3>
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(2)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email Notifications:</dt>
            <dd class="font-medium capitalize">{wizard.emailNotifications}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Theme:</dt>
            <dd class="font-medium capitalize">{wizard.theme}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Language:</dt>
            <dd class="font-medium">{wizard.language}</dd>
          </div>
        </dl>
      </div>

      {wizard.formError && (
        <div class="p-4 bg-destructive/10 border border-destructive rounded-md">
          <span class="text-sm text-destructive">{wizard.formError}</span>
        </div>
      )}
    </div>
  );
}

// Main component
function MultiStepWizard() {
  const wizard = useMemo(() => createWizardModel(), []);

  const stepComponents = [
    (props) => <AccountStep {...props} />,
    (props) => <ProfileStep {...props} />,
    (props) => <PreferencesStep {...props} />,
    (props) => <ReviewStep {...props} />,
  ];
  const CurrentStepComponent = stepComponents[wizard.currentStep.value];

  return (
    <div class="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">
            Step {wizard.currentStep.value + 1} of {STEPS.length}
          </span>
          <span class="text-sm text-muted-foreground">
            {Math.round(wizard.progress.value)}% complete
          </span>
        </div>
        <Progress value={wizard.progress} max={100} aria-label="Wizard progress" />
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress steps">
        <ol class="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isComplete = index < wizard.currentStep.value;
            const isCurrent = index === wizard.currentStep.value;

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
          <CardTitle>{STEPS[wizard.currentStep.value].title}</CardTitle>
          <CardDescription>{STEPS[wizard.currentStep.value].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <CurrentStepComponent wizard={wizard} />
        </CardContent>

        <CardFooter class="flex justify-between">
          <Button
            variant="outline"
            onClick={wizard.handleBack}
            disabled={wizard.currentStep.value === 0 || wizard.isSubmitting.value}
          >
            Back
          </Button>

          {wizard.currentStep.value < STEPS.length - 1 ? (
            <Button onClick={wizard.handleNext} disabled={wizard.isSubmitting.value}>
              Next
            </Button>
          ) : (
            <Button
              onClick={wizard.handleSubmit}
              loading={wizard.isSubmitting.value}
              disabled={wizard.isSubmitting.value}
            >
              Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export const code = `import {signal, computed, effect} from '@preact/signals';
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
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) {
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
        // Signals implement .toJSON(), so no need to unwrap
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          company,
          role,
          bio,
          emailNotifications,
          theme,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      location.href = '/welcome';
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

// Step components receive the wizard
function AccountStep({wizard}) {
  return (
    <div class="space-y-4">
      <Label class="space-y-2 text-sm font-medium">
        Email Address *
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={wizard.email}
          onInput={(e) => wizard.email.value = e.currentTarget.value}
          aria-invalid={wizard.emailError.value ? 'true' : 'false'}
          aria-describedby="email-hint"
        />
        {wizard.emailError.value ? (
          <span id="email-hint" class="text-sm text-destructive">
            {wizard.emailError}
          </span>
        ) : (
          <span id="email-hint" class="text-sm text-muted-foreground">
            Enter your email address
          </span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Password *
        <Input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={wizard.password}
          onInput={(e) => wizard.password.value = e.currentTarget.value}
          aria-invalid={wizard.passwordError.value ? 'true' : 'false'}
          aria-describedby="password-hint"
        />
        {wizard.passwordError ? (
          <span id="password-hint" class="text-sm text-destructive">
            {wizard.passwordError}
          </span>
        ) : (
          <span id="password-hint" class="text-sm text-muted-foreground">
            Must be at least 8 characters
          </span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Confirm Password *
        <Input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={wizard.confirmPassword}
          onInput={(e) => wizard.confirmPassword.value = e.currentTarget.value}
          aria-invalid={wizard.confirmPasswordError.value ? 'true' : 'false'}
          aria-describedby="confirm-hint"
        />
        {wizard.confirmPasswordError && (
          <span id="confirm-hint" class="text-sm text-destructive">
            {wizard.confirmPasswordError}
          </span>
        )}
      </Label>
    </div>
  );
}

function ProfileStep({wizard}) {
  return (
    <div class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <Label class="space-y-2 text-sm font-medium">
          First Name *
          <Input
            name="firstName"
            autoComplete="given-name"
            required
            value={wizard.firstName}
            onInput={(e) => wizard.firstName.value = e.currentTarget.value}
            aria-invalid={wizard.firstNameError.value ? 'true' : 'false'}
          />
          {wizard.firstNameError && (
            <span class="text-sm text-destructive">{wizard.firstNameError}</span>
          )}
        </Label>

        <Label class="space-y-2 text-sm font-medium">
          Last Name *
          <Input
            name="lastName"
            autoComplete="family-name"
            required
            value={wizard.lastName}
            onInput={(e) => wizard.lastName.value = e.currentTarget.value}
            aria-invalid={wizard.lastNameError.value ? 'true' : 'false'}
          />
          {wizard.lastNameError && (
            <span class="text-sm text-destructive">{wizard.lastNameError}</span>
          )}
        </Label>
      </div>

      <Label class="space-y-2 text-sm font-medium">
        Company
        <Input
          name="company"
          autoComplete="organization"
          value={wizard.company}
          onInput={(e) => wizard.company.value = e.currentTarget.value}
        />
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Role *
        <Select
          name="role"
          required
          value={wizard.role}
          onInput={(e) => wizard.role.value = e.currentTarget.value}
          aria-invalid={wizard.roleError.value ? 'true' : 'false'}
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
          <option value="other">Other</option>
        </Select>
        {wizard.roleError && (
          <span class="text-sm text-destructive">{wizard.roleError}</span>
        )}
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Bio
        <Textarea
          name="bio"
          rows={4}
          placeholder="Tell us a bit about yourself..."
          value={wizard.bio}
          onInput={(e) => wizard.bio.value = e.currentTarget.value}
        />
        <span class="text-sm text-muted-foreground">
          {wizard.bio.value.length} / 500 characters
        </span>
      </Label>
    </div>
  );
}

function PreferencesStep({wizard}) {
  return (
    <div class="space-y-6">
      <div class="space-y-3">
        <span class="text-sm font-medium">Email Notifications</span>
        <div class="space-y-2">
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="all"
              checked={wizard.emailNotifications.value === 'all'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">All notifications</span>
          </Label>
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="important"
              checked={wizard.emailNotifications.value === 'important'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">Important only</span>
          </Label>
          <Label class="flex items-center space-x-2">
            <input
              type="radio"
              name="emailNotifications"
              value="none"
              checked={wizard.emailNotifications.value === 'none'}
              onInput={(e) => wizard.emailNotifications.value = e.currentTarget.value}
            />
            <span class="text-sm">None</span>
          </Label>
        </div>
      </div>

      <Label class="space-y-2 text-sm font-medium">
        Theme
        <Select
          name="theme"
          value={wizard.theme}
          onInput={(e) => wizard.theme.value = e.currentTarget.value}
        >
          <option value="system">System default</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
      </Label>

      <Label class="space-y-2 text-sm font-medium">
        Language
        <Select
          name="language"
          value={wizard.language}
          onInput={(e) => wizard.language.value = e.currentTarget.value}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </Select>
      </Label>
    </div>
  );
}

function ReviewStep({wizard}) {
  return (
    <div class="space-y-6">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Account Information</h3>
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(0)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email:</dt>
            <dd class="font-medium">{wizard.email}</dd>
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
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(1)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Name:</dt>
            <dd class="font-medium">
              {wizard.firstName} {wizard.lastName}
            </dd>
          </div>
          {wizard.company.value && (
            <div class="flex justify-between">
              <dt class="text-muted-foreground">Company:</dt>
              <dd class="font-medium">{wizard.company}</dd>
            </div>
          )}
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Role:</dt>
            <dd class="font-medium capitalize">{wizard.role}</dd>
          </div>
          {wizard.bio.value && (
            <div class="flex flex-col space-y-1">
              <dt class="text-muted-foreground">Bio:</dt>
              <dd class="font-medium">{wizard.bio}</dd>
            </div>
          )}
        </dl>
      </div>

      <Separator />

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Preferences</h3>
          <Button variant="ghost" size="sm" onClick={() => wizard.goToStep(2)}>
            Edit
          </Button>
        </div>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Email Notifications:</dt>
            <dd class="font-medium capitalize">{wizard.emailNotifications}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Theme:</dt>
            <dd class="font-medium capitalize">{wizard.theme}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-muted-foreground">Language:</dt>
            <dd class="font-medium">{wizard.language}</dd>
          </div>
        </dl>
      </div>

      {wizard.formError && (
        <div class="p-4 bg-destructive/10 border border-destructive rounded-md">
          <span class="text-sm text-destructive">{wizard.formError}</span>
        </div>
      )}
    </div>
  );
}

// Main component
export function MultiStepWizard() {
  const wizard = useMemo(() => createWizardModel(), []);

  const stepComponents = [
    (props) => <AccountStep {...props} />,
    (props) => <ProfileStep {...props} />,
    (props) => <PreferencesStep {...props} />,
    (props) => <ReviewStep {...props} />,
  ];
  const CurrentStepComponent = stepComponents[wizard.currentStep.value];

  return (
    <div class="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">
            Step {wizard.currentStep.value + 1} of {STEPS.length}
          </span>
          <span class="text-sm text-muted-foreground">
            {Math.round(wizard.progress.value)}% complete
          </span>
        </div>
        <Progress value={wizard.progress} max={100} aria-label="Wizard progress" />
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress steps">
        <ol class="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isComplete = index < wizard.currentStep.value;
            const isCurrent = index === wizard.currentStep.value;

            return (
              <li key={step.id} class="flex flex-col items-center flex-1">
                <div class="flex items-center w-full">
                  <div
                    class={\`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium
                      \${isComplete ? 'bg-primary text-primary-foreground border-primary' : ''}
                      \${isCurrent ? 'border-primary text-primary' : ''}
                      \${!isComplete && !isCurrent ? 'border-muted text-muted-foreground' : ''}
                    \`}
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
                      class={\`flex-1 h-1 \${isComplete ? 'bg-primary' : 'bg-muted'}\`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span class={\`mt-2 text-xs text-center \${isCurrent ? 'font-medium' : ''}\`}>
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
          <CardTitle>{STEPS[wizard.currentStep.value].title}</CardTitle>
          <CardDescription>{STEPS[wizard.currentStep.value].description}</CardDescription>
        </CardHeader>

        <CardContent>
          <CurrentStepComponent wizard={wizard} />
        </CardContent>

        <CardFooter class="flex justify-between">
          <Button
            variant="outline"
            onClick={wizard.handleBack}
            disabled={wizard.currentStep.value === 0 || wizard.isSubmitting.value}
          >
            Back
          </Button>

          {wizard.currentStep.value < STEPS.length - 1 ? (
            <Button onClick={wizard.handleNext} disabled={wizard.isSubmitting.value}>
              Next
            </Button>
          ) : (
            <Button
              onClick={wizard.handleSubmit}
              loading={wizard.isSubmitting.value}
              disabled={wizard.isSubmitting.value}
            >
              Complete Registration
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
`;
