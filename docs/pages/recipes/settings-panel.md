# Settings Panel

A production-ready settings panel implementation with tabbed navigation, form persistence, validation, and success feedback.

## Overview

This recipe demonstrates how to build a comprehensive settings panel using PUI components with:

- Tabbed navigation between setting categories
- Form state management
- Auto-save functionality
- Input validation
- Success/error feedback
- Keyboard navigation
- Accessibility features
- Reset to defaults

## Complete Example

```tsx
import {useState, useEffect, type JSX} from 'preact/hooks';
import {Card, CardHeader, CardContent, CardTitle, CardDescription} from 'pui/card';
import {Tabs, TabList, Tab, TabPanel} from 'pui/tabs';
import {Input} from 'pui/input';
import {Label} from 'pui/label';
import {Button} from 'pui/button';
import {Select} from 'pui/select';
import {Textarea} from 'pui/textarea';
import {Switch} from 'pui/switch';
import {RadioGroup} from 'pui/radio-group';
import {Separator} from 'pui/separator';
import {Avatar} from 'pui/avatar';
import {Badge} from 'pui/badge';
import {Alert} from 'pui/alert';
import {showToast} from 'pui/toast';

// Settings interface
interface Settings {
  // Profile
  displayName: string;
  email: string;
  bio: string;
  avatar: string;

  // Preferences
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;

  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  newsletterSubscribed: boolean;
  notificationSound: boolean;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';

  // Privacy
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showActivity: boolean;
  dataSharing: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  displayName: '',
  email: '',
  bio: '',
  avatar: '',
  theme: 'system',
  language: 'en',
  timezone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  emailNotifications: true,
  pushNotifications: true,
  newsletterSubscribed: false,
  notificationSound: true,
  notificationFrequency: 'realtime',
  profileVisibility: 'public',
  showEmail: false,
  showActivity: true,
  dataSharing: false,
};

export function SettingsPanel() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();

        setSettings(data);
        setOriginalSettings(data);
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Track unsaved changes
  useEffect(() => {
    const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasUnsavedChanges(changed);
  }, [settings, originalSettings]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle input changes
  const handleChange = (field: keyof Settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
  };

  // Validate settings
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!settings.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!settings.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (settings.bio.length > 500) {
      newErrors.bio = 'Bio must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save settings
  const handleSave = async () => {
    if (!validate()) {
      showToast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setOriginalSettings(settings);

      showToast({
        title: 'Settings Saved',
        description: 'Your changes have been saved successfully.',
        variant: 'success',
      });
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to original
  const handleReset = () => {
    setSettings(originalSettings);
    setErrors({});
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (confirm('Reset all settings to default values?')) {
      setSettings(DEFAULT_SETTINGS);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Unsaved changes banner */}
      {hasUnsavedChanges && (
        <Alert>
          <strong>Unsaved Changes</strong>
          <p className="text-sm">You have unsaved changes. Don't forget to save!</p>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="profile">
        <TabList>
          <Tab value="profile">Profile</Tab>
          <Tab value="preferences">Preferences</Tab>
          <Tab value="notifications">Notifications</Tab>
          <Tab value="privacy">Privacy</Tab>
        </TabList>

        {/* Profile Tab */}
        <TabPanel value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  {settings.avatar ? (
                    <img src={settings.avatar} alt="Profile picture" />
                  ) : (
                    <div className="bg-primary text-primary-foreground text-2xl">
                      {settings.displayName?.[0] || '?'}
                    </div>
                  )}
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  Display Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="displayName"
                  value={settings.displayName}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('displayName', e.currentTarget.value)
                  }
                  aria-invalid={errors.displayName ? 'true' : 'false'}
                  aria-describedby={errors.displayName ? 'displayName-error' : undefined}
                />
                {errors.displayName && (
                  <p id="displayName-error" className="text-sm text-destructive">
                    {errors.displayName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('email', e.currentTarget.value)
                  }
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={settings.bio}
                  onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement>) =>
                    handleChange('bio', e.currentTarget.value)
                  }
                  aria-invalid={errors.bio ? 'true' : 'false'}
                  aria-describedby="bio-hint"
                />
                <p id="bio-hint" className="text-sm text-muted-foreground">
                  {settings.bio.length} / 500 characters
                </p>
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Preferences Tab */}
        <TabPanel value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your application experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div className="space-y-3">
                <Label>Theme</Label>
                <RadioGroup
                  name="theme"
                  value={settings.theme}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="theme-light"
                      name="theme"
                      value="light"
                      checked={settings.theme === 'light'}
                      onInput={() => handleChange('theme', 'light')}
                    />
                    <Label htmlFor="theme-light" className="font-normal">
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="theme-dark"
                      name="theme"
                      value="dark"
                      checked={settings.theme === 'dark'}
                      onInput={() => handleChange('theme', 'dark')}
                    />
                    <Label htmlFor="theme-dark" className="font-normal">
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="theme-system"
                      name="theme"
                      value="system"
                      checked={settings.theme === 'system'}
                      onInput={() => handleChange('theme', 'system')}
                    />
                    <Label htmlFor="theme-system" className="font-normal">
                      System default
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Language */}
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  id="language"
                  value={settings.language}
                  onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                    handleChange('language', e.currentTarget.value)
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </Select>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  id="timezone"
                  value={settings.timezone}
                  onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                    handleChange('timezone', e.currentTarget.value)
                  }
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </Select>
              </div>

              {/* Date Format */}
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select
                  id="dateFormat"
                  value={settings.dateFormat}
                  onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                    handleChange('dateFormat', e.currentTarget.value)
                  }
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('emailNotifications', e.currentTarget.checked)
                  }
                />
              </div>

              <Separator />

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('pushNotifications', e.currentTarget.checked)
                  }
                />
              </div>

              <Separator />

              {/* Notification Sound */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificationSound">Notification Sound</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sound when receiving notifications
                  </p>
                </div>
                <Switch
                  id="notificationSound"
                  checked={settings.notificationSound}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('notificationSound', e.currentTarget.checked)
                  }
                />
              </div>

              <Separator />

              {/* Notification Frequency */}
              <div className="space-y-3">
                <Label>Notification Frequency</Label>
                <RadioGroup
                  name="notificationFrequency"
                  value={settings.notificationFrequency}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="freq-realtime"
                      name="notificationFrequency"
                      value="realtime"
                      checked={settings.notificationFrequency === 'realtime'}
                      onInput={() => handleChange('notificationFrequency', 'realtime')}
                    />
                    <Label htmlFor="freq-realtime" className="font-normal">
                      Real-time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="freq-hourly"
                      name="notificationFrequency"
                      value="hourly"
                      checked={settings.notificationFrequency === 'hourly'}
                      onInput={() => handleChange('notificationFrequency', 'hourly')}
                    />
                    <Label htmlFor="freq-hourly" className="font-normal">
                      Hourly digest
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="freq-daily"
                      name="notificationFrequency"
                      value="daily"
                      checked={settings.notificationFrequency === 'daily'}
                      onInput={() => handleChange('notificationFrequency', 'daily')}
                    />
                    <Label htmlFor="freq-daily" className="font-normal">
                      Daily digest
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Newsletter */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletterSubscribed">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive our weekly newsletter
                  </p>
                </div>
                <Switch
                  id="newsletterSubscribed"
                  checked={settings.newsletterSubscribed}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('newsletterSubscribed', e.currentTarget.checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Privacy Tab */}
        <TabPanel value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Control your privacy settings and data sharing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Visibility */}
              <div className="space-y-3">
                <Label>Profile Visibility</Label>
                <RadioGroup
                  name="profileVisibility"
                  value={settings.profileVisibility}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="visibility-public"
                      name="profileVisibility"
                      value="public"
                      checked={settings.profileVisibility === 'public'}
                      onInput={() => handleChange('profileVisibility', 'public')}
                    />
                    <Label htmlFor="visibility-public" className="font-normal">
                      Public
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="visibility-friends"
                      name="profileVisibility"
                      value="friends"
                      checked={settings.profileVisibility === 'friends'}
                      onInput={() => handleChange('profileVisibility', 'friends')}
                    />
                    <Label htmlFor="visibility-friends" className="font-normal">
                      Friends only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="visibility-private"
                      name="profileVisibility"
                      value="private"
                      checked={settings.profileVisibility === 'private'}
                      onInput={() => handleChange('profileVisibility', 'private')}
                    />
                    <Label htmlFor="visibility-private" className="font-normal">
                      Private
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Show Email */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showEmail">Show Email on Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your email address visible to others
                  </p>
                </div>
                <Switch
                  id="showEmail"
                  checked={settings.showEmail}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('showEmail', e.currentTarget.checked)
                  }
                />
              </div>

              <Separator />

              {/* Show Activity */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showActivity">Show Activity Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
                <Switch
                  id="showActivity"
                  checked={settings.showActivity}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('showActivity', e.currentTarget.checked)
                  }
                />
              </div>

              <Separator />

              {/* Data Sharing */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dataSharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymized usage data to help improve the product
                  </p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={settings.dataSharing}
                  onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                    handleChange('dataSharing', e.currentTarget.checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabPanel>
      </Tabs>

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          onClick={handleResetToDefaults}
        >
          Reset to Defaults
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasUnsavedChanges}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
            loading={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Key Features Explained

### 1. Tabbed Navigation

Organize settings into logical groups:

```tsx
<Tabs defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="preferences">Preferences</Tab>
    {/* ... more tabs */}
  </TabList>

  <TabPanel value="profile">
    {/* Profile settings */}
  </TabPanel>
</Tabs>
```

### 2. Unsaved Changes Detection

Warn users before navigating away:

```tsx
useEffect(() => {
  const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
  setHasUnsavedChanges(changed);
}, [settings, originalSettings]);

useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [hasUnsavedChanges]);
```

### 3. Form Validation

Validate before saving:

```tsx
const validate = (): boolean => {
  const newErrors: Record<string, string> = {};

  if (!settings.displayName.trim()) {
    newErrors.displayName = 'Display name is required';
  }

  // ... more validation

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### 4. Toast Notifications

Provide feedback on save success/failure:

```tsx
showToast({
  title: 'Settings Saved',
  description: 'Your changes have been saved successfully.',
  variant: 'success',
});
```

### 5. Reset Functionality

Allow users to reset changes:

```tsx
// Reset to last saved
const handleReset = () => {
  setSettings(originalSettings);
};

// Reset to defaults
const handleResetToDefaults = () => {
  if (confirm('Reset all settings to default values?')) {
    setSettings(DEFAULT_SETTINGS);
  }
};
```

## Customization Options

### Auto-Save

Save automatically after changes:

```tsx
useEffect(() => {
  if (!hasUnsavedChanges) return;

  const timer = setTimeout(() => {
    handleSave();
  }, 2000); // Auto-save after 2 seconds of no changes

  return () => clearTimeout(timer);
}, [settings, hasUnsavedChanges]);
```

### Section-Specific Save

Save individual sections instead of all at once:

```tsx
const handleSaveProfile = async () => {
  const profileSettings = {
    displayName: settings.displayName,
    email: settings.email,
    bio: settings.bio,
  };

  await fetch('/api/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(profileSettings),
  });
};
```

### Search/Filter Settings

Add search for large settings panels:

```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredSettings = useMemo(() => {
  if (!searchQuery) return allSettings;

  return allSettings.filter(setting =>
    setting.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    setting.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, allSettings]);
```

## Accessibility Features

- **Semantic HTML**: Proper form elements and labels
- **ARIA attributes**: `aria-invalid`, `aria-describedby` for errors
- **Keyboard navigation**: All controls keyboard accessible
- **Tab navigation**: Logical tab order between sections
- **Focus management**: Clear focus indicators
- **Screen reader support**: Error messages announced

## Testing

```tsx
test('saves settings successfully', async () => {
  render(<SettingsPanel />);

  const nameInput = screen.getByLabelText(/display name/i);
  fireEvent.input(nameInput, {target: {value: 'New Name'}});

  const saveButton = screen.getByText(/save changes/i);
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(screen.getByText(/settings saved/i)).toBeInTheDocument();
  });
});

test('warns before leaving with unsaved changes', () => {
  render(<SettingsPanel />);

  const nameInput = screen.getByLabelText(/display name/i);
  fireEvent.input(nameInput, {target: {value: 'Changed'}});

  const event = new Event('beforeunload');
  window.dispatchEvent(event);

  expect(event.defaultPrevented).toBe(true);
});
```

## Related Recipes

- [Login Form](./login-form.md) - Form validation patterns
- [Multi-Step Wizard](./multi-step-wizard.md) - Complex form flows
- Profile editing patterns
- User preferences management

## Best Practices

1. **Group related settings**: Use tabs or sections logically
2. **Validate before saving**: Prevent invalid data from being saved
3. **Warn about unsaved changes**: Don't lose user work
4. **Provide feedback**: Confirm saves with toasts or messages
5. **Allow reset**: Let users undo changes easily
6. **Show defaults**: Indicate default values clearly
7. **Test thoroughly**: Ensure all settings save correctly
8. **Consider auto-save**: For better UX in appropriate contexts
9. **Responsive design**: Settings should work on mobile
10. **Document changes**: Consider showing a settings history

---

This settings panel provides a comprehensive foundation for managing user preferences and configuration in production applications with excellent UX and accessibility.
