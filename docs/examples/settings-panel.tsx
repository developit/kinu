import type {JSX} from 'preact';
import {useState} from 'preact/hooks';
import {signal, computed, effect, batch} from '@preact/signals';
import {
  Card,
  TabList,
  Tab,
  TabPanel,
  Input,
  Label,
  Button,
  Select,
  Textarea,
  Switch,
  RadioGroup,
  Separator,
  Avatar,
  Alert,
  toast,
} from 'pui';

interface Settings {
  displayName: string;
  email: string;
  bio: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  newsletterSubscribed: boolean;
  notificationSound: boolean;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showActivity: boolean;
  dataSharing: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  displayName: '',
  email: '',
  bio: '',
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

// Mock initial data for demo
const MOCK_INITIAL_SETTINGS: Settings = {
  displayName: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Software developer passionate about building great user experiences.',
  theme: 'system',
  language: 'en',
  timezone: 'America/New_York',
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

// Signals for state management
const settings = signal<Settings>(DEFAULT_SETTINGS);
const originalSettings = signal<Settings>(DEFAULT_SETTINGS);
const isSaving = signal(false);
const errors = signal<Record<string, string>>({});

// Computed signal for change detection
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(settings.value) !== JSON.stringify(originalSettings.value);
});

// Mock API for demo purposes
const mockFetch = async (url: string, options?: RequestInit): Promise<Response> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (url === '/api/settings') {
    if (options?.method === 'PUT') {
      // Mock save
      return new Response(JSON.stringify({success: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      });
    }
    // Mock load
    return new Response(JSON.stringify(MOCK_INITIAL_SETTINGS), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  }

  return new Response('Not found', {status: 404});
};

function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('profile');

  // Load settings on mount
  effect(() => {
    const loadSettings = async () => {
      try {
        const response = await mockFetch('/api/settings');
        const data = await response.json();

        batch(() => {
          settings.value = data;
          originalSettings.value = data;
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  });

  // Warn before leaving with unsaved changes
  effect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.value) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  // Update a setting field
  const updateField = (field: keyof Settings, value: any) => {
    settings.value = {
      ...settings.value,
      [field]: value,
    };

    // Clear error for this field
    if (errors.value[field]) {
      const newErrors = {...errors.value};
      delete newErrors[field];
      errors.value = newErrors;
    }
  };

  // Validate settings
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!settings.value.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!settings.value.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.value.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (settings.value.bio.length > 500) {
      newErrors.bio = 'Bio must be 500 characters or less';
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  // Save settings
  const handleSave = async () => {
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    isSaving.value = true;

    try {
      const response = await mockFetch('/api/settings', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(settings.value),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      originalSettings.value = settings.value;

      toast({
        title: 'Settings Saved',
        description: 'Your changes have been saved successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      isSaving.value = false;
    }
  };

  // Reset to last saved state
  const handleReset = () => {
    batch(() => {
      settings.value = originalSettings.value;
      errors.value = {};
    });
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (confirm('Reset all settings to default values?')) {
      settings.value = DEFAULT_SETTINGS;
    }
  };

  return (
    <div class="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Settings</h1>
        <p class="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {hasUnsavedChanges.value && (
        <Alert>
          <strong>Unsaved Changes</strong>
          <p class="text-sm">You have unsaved changes. Don't forget to save!</p>
        </Alert>
      )}

      <div class="space-y-4">
        <TabList class="border-b">
          <Tab
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:account" class="mr-2"></iconify-icon>
            Profile
          </Tab>
          <Tab
            active={activeTab === 'preferences'}
            onClick={() => setActiveTab('preferences')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:tune" class="mr-2"></iconify-icon>
            Preferences
          </Tab>
          <Tab
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:bell" class="mr-2"></iconify-icon>
            Notifications
          </Tab>
          <Tab
            active={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:shield-lock" class="mr-2"></iconify-icon>
            Privacy
          </Tab>
        </TabList>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Profile Information</h3>
                <p class="text-sm text-muted-foreground">
                  Update your personal information and profile details
                </p>
              </div>
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <Avatar class="w-20 h-20">
                    <div class="bg-primary text-primary-foreground text-2xl flex items-center justify-center w-full h-full rounded-full">
                      {settings.value.displayName?.[0] || '?'}
                    </div>
                  </Avatar>
                  <div class="space-y-2">
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <p class="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="space-y-2">
                  <Label htmlFor="displayName">
                    Display Name <span class="text-destructive">*</span>
                  </Label>
                  <Input
                    id="displayName"
                    value={settings.value.displayName}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('displayName', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.displayName ? 'true' : 'false'}
                    aria-describedby={errors.value.displayName ? 'displayName-error' : undefined}
                  />
                  {errors.value.displayName && (
                    <p id="displayName-error" class="text-sm text-destructive">
                      {errors.value.displayName}
                    </p>
                  )}
                </div>

                <div class="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span class="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.value.email}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('email', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.email ? 'true' : 'false'}
                    aria-describedby={errors.value.email ? 'email-error' : undefined}
                  />
                  {errors.value.email && (
                    <p id="email-error" class="text-sm text-destructive">
                      {errors.value.email}
                    </p>
                  )}
                </div>

                <div class="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={settings.value.bio}
                    onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement>) =>
                      updateField('bio', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.bio ? 'true' : 'false'}
                    aria-describedby="bio-hint"
                  />
                  <p id="bio-hint" class="text-sm text-muted-foreground">
                    {settings.value.bio.length} / 500 characters
                  </p>
                  {errors.value.bio && (
                    <p class="text-sm text-destructive">{errors.value.bio}</p>
                  )}
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Preferences</h3>
                <p class="text-sm text-muted-foreground">
                  Customize your application experience
                </p>
              </div>
              <div class="space-y-6">
                <div class="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup
                    name="theme"
                    value={settings.value.theme}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-light"
                        name="theme"
                        value="light"
                        checked={settings.value.theme === 'light'}
                        onInput={() => updateField('theme', 'light')}
                      />
                      <Label htmlFor="theme-light" class="font-normal">
                        Light
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-dark"
                        name="theme"
                        value="dark"
                        checked={settings.value.theme === 'dark'}
                        onInput={() => updateField('theme', 'dark')}
                      />
                      <Label htmlFor="theme-dark" class="font-normal">
                        Dark
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-system"
                        name="theme"
                        value="system"
                        checked={settings.value.theme === 'system'}
                        onInput={() => updateField('theme', 'system')}
                      />
                      <Label htmlFor="theme-system" class="font-normal">
                        System default
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    id="language"
                    value={settings.value.language}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('language', e.currentTarget.value)
                    }
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    id="timezone"
                    value={settings.value.timezone}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('timezone', e.currentTarget.value)
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

                <div class="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    id="dateFormat"
                    value={settings.value.dateFormat}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('dateFormat', e.currentTarget.value)
                    }
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </Select>
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Notification Settings</h3>
                <p class="text-sm text-muted-foreground">
                  Control how and when you receive notifications
                </p>
              </div>
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.value.emailNotifications}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('emailNotifications', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.value.pushNotifications}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('pushNotifications', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="notificationSound">Notification Sound</Label>
                    <p class="text-sm text-muted-foreground">
                      Play sound when receiving notifications
                    </p>
                  </div>
                  <Switch
                    id="notificationSound"
                    checked={settings.value.notificationSound}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('notificationSound', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="space-y-3">
                  <Label>Notification Frequency</Label>
                  <RadioGroup
                    name="notificationFrequency"
                    value={settings.value.notificationFrequency}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-realtime"
                        name="notificationFrequency"
                        value="realtime"
                        checked={settings.value.notificationFrequency === 'realtime'}
                        onInput={() => updateField('notificationFrequency', 'realtime')}
                      />
                      <Label htmlFor="freq-realtime" class="font-normal">
                        Real-time
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-hourly"
                        name="notificationFrequency"
                        value="hourly"
                        checked={settings.value.notificationFrequency === 'hourly'}
                        onInput={() => updateField('notificationFrequency', 'hourly')}
                      />
                      <Label htmlFor="freq-hourly" class="font-normal">
                        Hourly digest
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-daily"
                        name="notificationFrequency"
                        value="daily"
                        checked={settings.value.notificationFrequency === 'daily'}
                        onInput={() => updateField('notificationFrequency', 'daily')}
                      />
                      <Label htmlFor="freq-daily" class="font-normal">
                        Daily digest
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="newsletterSubscribed">Newsletter</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive our weekly newsletter
                    </p>
                  </div>
                  <Switch
                    id="newsletterSubscribed"
                    checked={settings.value.newsletterSubscribed}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('newsletterSubscribed', e.currentTarget.checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Privacy & Security</h3>
                <p class="text-sm text-muted-foreground">
                  Control your privacy settings and data sharing
                </p>
              </div>
              <div class="space-y-6">
                <div class="space-y-3">
                  <Label>Profile Visibility</Label>
                  <RadioGroup
                    name="profileVisibility"
                    value={settings.value.profileVisibility}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-public"
                        name="profileVisibility"
                        value="public"
                        checked={settings.value.profileVisibility === 'public'}
                        onInput={() => updateField('profileVisibility', 'public')}
                      />
                      <Label htmlFor="visibility-public" class="font-normal">
                        Public
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-friends"
                        name="profileVisibility"
                        value="friends"
                        checked={settings.value.profileVisibility === 'friends'}
                        onInput={() => updateField('profileVisibility', 'friends')}
                      />
                      <Label htmlFor="visibility-friends" class="font-normal">
                        Friends only
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-private"
                        name="profileVisibility"
                        value="private"
                        checked={settings.value.profileVisibility === 'private'}
                        onInput={() => updateField('profileVisibility', 'private')}
                      />
                      <Label htmlFor="visibility-private" class="font-normal">
                        Private
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="showEmail">Show Email on Profile</Label>
                    <p class="text-sm text-muted-foreground">
                      Make your email address visible to others
                    </p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={settings.value.showEmail}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('showEmail', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="showActivity">Show Activity Status</Label>
                    <p class="text-sm text-muted-foreground">
                      Let others see when you're online
                    </p>
                  </div>
                  <Switch
                    id="showActivity"
                    checked={settings.value.showActivity}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('showActivity', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p class="text-sm text-muted-foreground">
                      Share anonymized usage data to help improve the product
                    </p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={settings.value.dataSharing}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('dataSharing', e.currentTarget.checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabPanel>
        )}
      </div>

      {/* Action buttons */}
      <div class="flex items-center justify-between pt-6 border-t">
        <Button
          variant="ghost"
          onClick={handleResetToDefaults}
        >
          Reset to Defaults
        </Button>

        <div class="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasUnsavedChanges.value}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges.value || isSaving.value}
            loading={isSaving.value}
          >
            {isSaving.value ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Demo() {
  return <SettingsPanel />;
}

export const code = `import type {JSX} from 'preact';
import {useState} from 'preact/hooks';
import {signal, computed, effect, batch} from '@preact/signals';
import {
  Card,
  TabList,
  Tab,
  TabPanel,
  Input,
  Label,
  Button,
  Select,
  Textarea,
  Switch,
  RadioGroup,
  Separator,
  Avatar,
  Alert,
  toast,
} from 'pui';

interface Settings {
  displayName: string;
  email: string;
  bio: string;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  newsletterSubscribed: boolean;
  notificationSound: boolean;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showActivity: boolean;
  dataSharing: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  displayName: '',
  email: '',
  bio: '',
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

// Signals for state management
const settings = signal<Settings>(DEFAULT_SETTINGS);
const originalSettings = signal<Settings>(DEFAULT_SETTINGS);
const isSaving = signal(false);
const errors = signal<Record<string, string>>({});

// Computed signal for change detection
const hasUnsavedChanges = computed(() => {
  return JSON.stringify(settings.value) !== JSON.stringify(originalSettings.value);
});

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('profile');

  // Load settings on mount
  effect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();

        batch(() => {
          settings.value = data;
          originalSettings.value = data;
        });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    };

    loadSettings();
  });

  // Warn before leaving with unsaved changes
  effect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.value) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  // Update a setting field
  const updateField = (field: keyof Settings, value: any) => {
    settings.value = {
      ...settings.value,
      [field]: value,
    };

    // Clear error for this field
    if (errors.value[field]) {
      const newErrors = {...errors.value};
      delete newErrors[field];
      errors.value = newErrors;
    }
  };

  // Validate settings
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!settings.value.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!settings.value.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(settings.value.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (settings.value.bio.length > 500) {
      newErrors.bio = 'Bio must be 500 characters or less';
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  // Save settings
  const handleSave = async () => {
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    isSaving.value = true;

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(settings.value),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      originalSettings.value = settings.value;

      toast({
        title: 'Settings Saved',
        description: 'Your changes have been saved successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      isSaving.value = false;
    }
  };

  // Reset to last saved state
  const handleReset = () => {
    batch(() => {
      settings.value = originalSettings.value;
      errors.value = {};
    });
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (confirm('Reset all settings to default values?')) {
      settings.value = DEFAULT_SETTINGS;
    }
  };

  return (
    <div class="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 class="text-3xl font-bold">Settings</h1>
        <p class="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      {hasUnsavedChanges.value && (
        <Alert>
          <strong>Unsaved Changes</strong>
          <p class="text-sm">You have unsaved changes. Don't forget to save!</p>
        </Alert>
      )}

      <div class="space-y-4">
        <TabList class="border-b">
          <Tab
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:account" class="mr-2"></iconify-icon>
            Profile
          </Tab>
          <Tab
            active={activeTab === 'preferences'}
            onClick={() => setActiveTab('preferences')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:tune" class="mr-2"></iconify-icon>
            Preferences
          </Tab>
          <Tab
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:bell" class="mr-2"></iconify-icon>
            Notifications
          </Tab>
          <Tab
            active={activeTab === 'privacy'}
            onClick={() => setActiveTab('privacy')}
            class="inline-flex items-center"
          >
            <iconify-icon icon="mdi:shield-lock" class="mr-2"></iconify-icon>
            Privacy
          </Tab>
        </TabList>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Profile Information</h3>
                <p class="text-sm text-muted-foreground">
                  Update your personal information and profile details
                </p>
              </div>
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <Avatar class="w-20 h-20">
                    <div class="bg-primary text-primary-foreground text-2xl flex items-center justify-center w-full h-full rounded-full">
                      {settings.value.displayName?.[0] || '?'}
                    </div>
                  </Avatar>
                  <div class="space-y-2">
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <p class="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div class="space-y-2">
                  <Label htmlFor="displayName">
                    Display Name <span class="text-destructive">*</span>
                  </Label>
                  <Input
                    id="displayName"
                    value={settings.value.displayName}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('displayName', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.displayName ? 'true' : 'false'}
                    aria-describedby={errors.value.displayName ? 'displayName-error' : undefined}
                  />
                  {errors.value.displayName && (
                    <p id="displayName-error" class="text-sm text-destructive">
                      {errors.value.displayName}
                    </p>
                  )}
                </div>

                <div class="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span class="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.value.email}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('email', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.email ? 'true' : 'false'}
                    aria-describedby={errors.value.email ? 'email-error' : undefined}
                  />
                  {errors.value.email && (
                    <p id="email-error" class="text-sm text-destructive">
                      {errors.value.email}
                    </p>
                  )}
                </div>

                <div class="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={settings.value.bio}
                    onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement>) =>
                      updateField('bio', e.currentTarget.value)
                    }
                    aria-invalid={errors.value.bio ? 'true' : 'false'}
                    aria-describedby="bio-hint"
                  />
                  <p id="bio-hint" class="text-sm text-muted-foreground">
                    {settings.value.bio.length} / 500 characters
                  </p>
                  {errors.value.bio && (
                    <p class="text-sm text-destructive">{errors.value.bio}</p>
                  )}
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Preferences</h3>
                <p class="text-sm text-muted-foreground">
                  Customize your application experience
                </p>
              </div>
              <div class="space-y-6">
                <div class="space-y-3">
                  <Label>Theme</Label>
                  <RadioGroup
                    name="theme"
                    value={settings.value.theme}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-light"
                        name="theme"
                        value="light"
                        checked={settings.value.theme === 'light'}
                        onInput={() => updateField('theme', 'light')}
                      />
                      <Label htmlFor="theme-light" class="font-normal">
                        Light
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-dark"
                        name="theme"
                        value="dark"
                        checked={settings.value.theme === 'dark'}
                        onInput={() => updateField('theme', 'dark')}
                      />
                      <Label htmlFor="theme-dark" class="font-normal">
                        Dark
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="theme-system"
                        name="theme"
                        value="system"
                        checked={settings.value.theme === 'system'}
                        onInput={() => updateField('theme', 'system')}
                      />
                      <Label htmlFor="theme-system" class="font-normal">
                        System default
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    id="language"
                    value={settings.value.language}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('language', e.currentTarget.value)
                    }
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                  </Select>
                </div>

                <div class="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    id="timezone"
                    value={settings.value.timezone}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('timezone', e.currentTarget.value)
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

                <div class="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    id="dateFormat"
                    value={settings.value.dateFormat}
                    onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
                      updateField('dateFormat', e.currentTarget.value)
                    }
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </Select>
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Notification Settings</h3>
                <p class="text-sm text-muted-foreground">
                  Control how and when you receive notifications
                </p>
              </div>
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.value.emailNotifications}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('emailNotifications', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.value.pushNotifications}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('pushNotifications', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="notificationSound">Notification Sound</Label>
                    <p class="text-sm text-muted-foreground">
                      Play sound when receiving notifications
                    </p>
                  </div>
                  <Switch
                    id="notificationSound"
                    checked={settings.value.notificationSound}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('notificationSound', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="space-y-3">
                  <Label>Notification Frequency</Label>
                  <RadioGroup
                    name="notificationFrequency"
                    value={settings.value.notificationFrequency}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-realtime"
                        name="notificationFrequency"
                        value="realtime"
                        checked={settings.value.notificationFrequency === 'realtime'}
                        onInput={() => updateField('notificationFrequency', 'realtime')}
                      />
                      <Label htmlFor="freq-realtime" class="font-normal">
                        Real-time
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-hourly"
                        name="notificationFrequency"
                        value="hourly"
                        checked={settings.value.notificationFrequency === 'hourly'}
                        onInput={() => updateField('notificationFrequency', 'hourly')}
                      />
                      <Label htmlFor="freq-hourly" class="font-normal">
                        Hourly digest
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="freq-daily"
                        name="notificationFrequency"
                        value="daily"
                        checked={settings.value.notificationFrequency === 'daily'}
                        onInput={() => updateField('notificationFrequency', 'daily')}
                      />
                      <Label htmlFor="freq-daily" class="font-normal">
                        Daily digest
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="newsletterSubscribed">Newsletter</Label>
                    <p class="text-sm text-muted-foreground">
                      Receive our weekly newsletter
                    </p>
                  </div>
                  <Switch
                    id="newsletterSubscribed"
                    checked={settings.value.newsletterSubscribed}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('newsletterSubscribed', e.currentTarget.checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabPanel>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <TabPanel>
            <Card class="p-6">
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-1">Privacy & Security</h3>
                <p class="text-sm text-muted-foreground">
                  Control your privacy settings and data sharing
                </p>
              </div>
              <div class="space-y-6">
                <div class="space-y-3">
                  <Label>Profile Visibility</Label>
                  <RadioGroup
                    name="profileVisibility"
                    value={settings.value.profileVisibility}
                  >
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-public"
                        name="profileVisibility"
                        value="public"
                        checked={settings.value.profileVisibility === 'public'}
                        onInput={() => updateField('profileVisibility', 'public')}
                      />
                      <Label htmlFor="visibility-public" class="font-normal">
                        Public
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-friends"
                        name="profileVisibility"
                        value="friends"
                        checked={settings.value.profileVisibility === 'friends'}
                        onInput={() => updateField('profileVisibility', 'friends')}
                      />
                      <Label htmlFor="visibility-friends" class="font-normal">
                        Friends only
                      </Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="visibility-private"
                        name="profileVisibility"
                        value="private"
                        checked={settings.value.profileVisibility === 'private'}
                        onInput={() => updateField('profileVisibility', 'private')}
                      />
                      <Label htmlFor="visibility-private" class="font-normal">
                        Private
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="showEmail">Show Email on Profile</Label>
                    <p class="text-sm text-muted-foreground">
                      Make your email address visible to others
                    </p>
                  </div>
                  <Switch
                    id="showEmail"
                    checked={settings.value.showEmail}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('showEmail', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="showActivity">Show Activity Status</Label>
                    <p class="text-sm text-muted-foreground">
                      Let others see when you're online
                    </p>
                  </div>
                  <Switch
                    id="showActivity"
                    checked={settings.value.showActivity}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('showActivity', e.currentTarget.checked)
                    }
                  />
                </div>

                <Separator />

                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p class="text-sm text-muted-foreground">
                      Share anonymized usage data to help improve the product
                    </p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={settings.value.dataSharing}
                    onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                      updateField('dataSharing', e.currentTarget.checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabPanel>
        )}
      </div>

      {/* Action buttons */}
      <div class="flex items-center justify-between pt-6 border-t">
        <Button
          variant="ghost"
          onClick={handleResetToDefaults}
        >
          Reset to Defaults
        </Button>

        <div class="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasUnsavedChanges.value}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasUnsavedChanges.value || isSaving.value}
            loading={isSaving.value}
          >
            {isSaving.value ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}`;
