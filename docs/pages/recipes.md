# Recipes

Production-ready patterns and examples for building common UI features with PUI. Each recipe includes complete, working code that you can adapt for your application.

## What are Recipes?

Recipes are comprehensive, real-world examples that demonstrate how to combine multiple PUI components to build complete features. Unlike basic component examples, recipes show you:

- Complete implementations with full functionality
- Proper state management
- Form validation and error handling
- Accessibility best practices
- Testing strategies
- Customization options

## Available Recipes

### Forms & Input

#### [Login Form with Validation](./recipes/login-form.md)

Build a complete login form with client-side validation, loading states, error handling, and password visibility toggle.

**Features:**
- Native HTML5 form validation
- Custom validation logic
- Loading states during submission
- Error display (field-level and form-level)
- Password visibility toggle
- Remember me functionality
- Accessible form structure

**Components used:** Card, Button, Input, Label, Checkbox, Alert

---

#### [Multi-Step Wizard](./recipes/multi-step-wizard.md)

Create a multi-step form wizard with progress tracking, per-step validation, and data persistence across steps.

**Features:**
- Visual progress indicator
- Step-by-step navigation
- Per-step validation
- Data persistence
- Review/edit step
- Keyboard navigation
- Accessibility features

**Components used:** Card, Button, Input, Label, Select, Textarea, RadioGroup, Progress, Badge, Separator

---

#### [Settings Panel](./recipes/settings-panel.md)

Implement a comprehensive settings panel with tabbed navigation, form persistence, validation, and success feedback.

**Features:**
- Tabbed organization
- Unsaved changes detection
- Form validation
- Auto-save option
- Success/error feedback
- Reset functionality
- Keyboard navigation

**Components used:** Card, Tabs, Input, Label, Button, Select, Textarea, Switch, RadioGroup, Separator, Avatar, Badge, Alert, Toast

---

### Data Display & Management

#### [Data Table with Sorting & Filtering](./recipes/data-table.md)

Build a feature-rich data table with sorting, filtering, pagination, row selection, and bulk actions.

**Features:**
- Column sorting (ascending/descending)
- Multi-column filtering
- Search functionality
- Pagination controls
- Row selection (single and multi-select)
- Bulk actions
- Loading and empty states
- Responsive design

**Components used:** Table, Input, Button, Checkbox, Badge, Select, DropdownMenu, Skeleton

---

### Navigation & Search

#### [Command Palette (⌘K)](./recipes/command-palette.md)

Create a powerful command palette with keyboard shortcuts, fuzzy search, and keyboard navigation - like VS Code or Linear.

**Features:**
- ⌘K / Ctrl+K keyboard shortcut
- Fuzzy search filtering
- Grouped commands
- Keyboard navigation (arrows, Enter, Escape)
- Recent commands history
- Icons and descriptions
- Accessibility features

**Components used:** Dialog, Input, Badge, Separator

---

## Recipe Categories

### Authentication & User Management
- [Login Form](./recipes/login-form.md) - Complete authentication form
- [Settings Panel](./recipes/settings-panel.md) - User preferences and profile

### Data & Tables
- [Data Table](./recipes/data-table.md) - Advanced table with sorting and filtering

### Navigation & UI Patterns
- [Command Palette](./recipes/command-palette.md) - Keyboard-first navigation
- [Multi-Step Wizard](./recipes/multi-step-wizard.md) - Complex form flows

### Forms & Validation
- [Login Form](./recipes/login-form.md) - Form validation patterns
- [Settings Panel](./recipes/settings-panel.md) - Complex forms with persistence
- [Multi-Step Wizard](./recipes/multi-step-wizard.md) - Multi-page form validation

## Using Recipes

Each recipe is designed to be:

1. **Copy-paste ready**: Full working code you can use immediately
2. **Customizable**: Clear sections explaining how to adapt to your needs
3. **Accessible**: Following WCAG 2.1 guidelines
4. **Well-documented**: Detailed explanations of key features
5. **Testable**: Includes testing examples

### How to Use a Recipe

1. **Read the Overview**: Understand what the recipe does and what features it includes
2. **Copy the Code**: Start with the complete example
3. **Customize**: Adapt the code to your specific requirements using the customization section
4. **Test**: Use the testing examples to ensure everything works
5. **Iterate**: Refine based on your specific needs

## Common Patterns

### Form Validation

Most recipes include form validation patterns:

```tsx
// Field-level validation
const validateField = (name: string, value: string) => {
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};

// Form-level validation
const validateForm = (): boolean => {
  const errors = {};
  // ... collect all field errors
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

### State Management

All recipes use Preact hooks for state management:

```tsx
const [data, setData] = useState(initialData);
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({});
```

### API Integration

Recipes show how to integrate with APIs:

```tsx
const handleSubmit = async () => {
  setIsLoading(true);

  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setIsLoading(false);
  }
};
```

### Accessibility

Every recipe includes accessibility features:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Clear error messages

## Contributing Recipes

Have a great recipe to share? We'd love to include it! A good recipe should:

- Solve a real-world problem
- Use PUI components effectively
- Include complete, working code
- Follow accessibility best practices
- Include explanations and customization options
- Provide testing examples

## Need Help?

If you have questions about a recipe or need help adapting it to your use case:

1. Check the recipe's "Customization Options" section
2. Review the "Related Recipes" for similar patterns
3. Check the component documentation for individual components
4. Open an issue on GitHub with your question

## Coming Soon

We're working on more recipes! Future additions may include:

- File upload with drag & drop
- Infinite scroll data table
- Real-time chat interface
- Kanban board
- Calendar event scheduler
- Rich text editor integration
- Image gallery with lightbox
- Onboarding flow
- Notification center
- Dashboard layout

---

These recipes are designed to help you build production-ready features quickly while maintaining high standards for user experience and accessibility. Each recipe is a starting point - feel free to customize and adapt them to your specific needs!
