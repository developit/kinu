# Command Palette (⌘K)

A production-ready command palette implementation with keyboard shortcuts, fuzzy search, command groups, and keyboard navigation.

## Overview

This recipe demonstrates how to build a command palette (like VS Code's Command Palette or Spotlight) using PUI components with:

- ⌘K / Ctrl+K keyboard shortcut to open
- Fuzzy search filtering
- Grouped commands
- Keyboard navigation (arrow keys, Enter, Escape)
- Recent commands history
- Icons and descriptions
- Accessibility features

## Complete Example

```tsx
import {useState, useEffect, useRef, useMemo, type JSX} from 'preact/hooks';
import {Dialog, DialogContent, Input, Badge, Separator} from 'pui';

// Command interface
interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  group: string;
  keywords?: string[];
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Define all available commands
  const allCommands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Home',
      icon: '🏠',
      group: 'Navigation',
      action: () => (window.location.href = '/'),
    },
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: '📊',
      group: 'Navigation',
      keywords: ['dash', 'overview'],
      action: () => (window.location.href = '/dashboard'),
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      icon: '⚙️',
      group: 'Navigation',
      keywords: ['preferences', 'config'],
      action: () => (window.location.href = '/settings'),
    },
    {
      id: 'nav-profile',
      label: 'Go to Profile',
      icon: '👤',
      group: 'Navigation',
      action: () => (window.location.href = '/profile'),
    },

    // Actions
    {
      id: 'action-new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      icon: '➕',
      group: 'Actions',
      keywords: ['add', 'create'],
      shortcut: '⌘N',
      action: () => console.log('Create project'),
    },
    {
      id: 'action-search',
      label: 'Search Everything',
      description: 'Search across all content',
      icon: '🔍',
      group: 'Actions',
      shortcut: '⌘/',
      action: () => console.log('Search'),
    },
    {
      id: 'action-quick-add',
      label: 'Quick Add',
      description: 'Add a new item quickly',
      icon: '⚡',
      group: 'Actions',
      shortcut: '⌘A',
      action: () => console.log('Quick add'),
    },

    // View
    {
      id: 'view-toggle-sidebar',
      label: 'Toggle Sidebar',
      icon: '◧',
      group: 'View',
      shortcut: '⌘B',
      action: () => console.log('Toggle sidebar'),
    },
    {
      id: 'view-fullscreen',
      label: 'Toggle Fullscreen',
      icon: '⛶',
      group: 'View',
      keywords: ['maximize'],
      shortcut: 'F11',
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      },
    },
    {
      id: 'view-theme',
      label: 'Toggle Dark Mode',
      icon: '🌙',
      group: 'View',
      keywords: ['theme', 'appearance'],
      action: () => console.log('Toggle theme'),
    },

    // Help
    {
      id: 'help-docs',
      label: 'View Documentation',
      icon: '📖',
      group: 'Help',
      keywords: ['docs', 'guide'],
      action: () => window.open('/docs', '_blank'),
    },
    {
      id: 'help-shortcuts',
      label: 'Keyboard Shortcuts',
      icon: '⌨️',
      group: 'Help',
      action: () => console.log('Show shortcuts'),
    },
    {
      id: 'help-support',
      label: 'Contact Support',
      icon: '💬',
      group: 'Help',
      action: () => console.log('Contact support'),
    },
  ];

  // Fuzzy search implementation
  const fuzzyMatch = (str: string, pattern: string): number => {
    const patternLower = pattern.toLowerCase();
    const strLower = str.toLowerCase();

    // Exact match gets highest score
    if (strLower.includes(patternLower)) {
      return 100;
    }

    // Fuzzy match
    let patternIdx = 0;
    let score = 0;
    let consecutiveMatches = 0;

    for (let i = 0; i < strLower.length; i++) {
      if (strLower[i] === patternLower[patternIdx]) {
        score += 1 + consecutiveMatches;
        consecutiveMatches++;
        patternIdx++;

        if (patternIdx === patternLower.length) {
          return score;
        }
      } else {
        consecutiveMatches = 0;
      }
    }

    return patternIdx === patternLower.length ? score : 0;
  };

  // Filter and sort commands
  const filteredCommands = useMemo(() => {
    if (!search) {
      // Show recent commands first when no search
      const recent = allCommands.filter(cmd => recentCommands.includes(cmd.id));
      const other = allCommands.filter(cmd => !recentCommands.includes(cmd.id));
      return [...recent, ...other];
    }

    // Search across label, description, and keywords
    const results = allCommands
      .map(cmd => {
        const labelScore = fuzzyMatch(cmd.label, search);
        const descScore = cmd.description ? fuzzyMatch(cmd.description, search) : 0;
        const keywordScore = cmd.keywords
          ? Math.max(...cmd.keywords.map(k => fuzzyMatch(k, search)))
          : 0;

        const score = Math.max(labelScore, descScore, keywordScore);

        return {cmd, score};
      })
      .filter(({score}) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({cmd}) => cmd);

    return results;
  }, [search, allCommands, recentCommands]);

  // Group commands
  const groupedCommands = useMemo(() => {
    const groups = new Map<string, Command[]>();

    // Add recent group if no search and has recent commands
    if (!search && recentCommands.length > 0) {
      const recent = filteredCommands.filter(cmd => recentCommands.includes(cmd.id));
      if (recent.length > 0) {
        groups.set('Recent', recent);
      }
    }

    // Group remaining commands
    filteredCommands.forEach(cmd => {
      if (search || !recentCommands.includes(cmd.id)) {
        const existing = groups.get(cmd.group) || [];
        groups.set(cmd.group, [...existing, cmd]);
      }
    });

    return Array.from(groups.entries());
  }, [filteredCommands, search, recentCommands]);

  // Flatten for keyboard navigation
  const flatCommands = useMemo(() => {
    return groupedCommands.flatMap(([_, commands]) => commands);
  }, [groupedCommands]);

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector(
      `[data-command-index="${selectedIndex}"]`
    );
    selectedElement?.scrollIntoView({block: 'nearest'});
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, flatCommands.length - 1));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (flatCommands[selectedIndex]) {
          executeCommand(flatCommands[selectedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'Home':
        e.preventDefault();
        setSelectedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setSelectedIndex(flatCommands.length - 1);
        break;
    }
  };

  // Execute command
  const executeCommand = (command: Command) => {
    // Add to recent commands
    setRecentCommands(prev => {
      const filtered = prev.filter(id => id !== command.id);
      return [command.id, ...filtered].slice(0, 5); // Keep last 5
    });

    // Execute action
    command.action();

    // Close palette
    setIsOpen(false);
  };

  // Get keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <>
      {/* Trigger button (optional) */}
      <button
        onClick={() => setIsOpen(true)}
        class="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent"
        aria-label="Open command palette"
      >
        <span class="text-muted-foreground">Search commands...</span>
        <kbd class="px-2 py-1 text-xs border rounded bg-muted">
          {isMac ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          class="max-w-2xl p-0 gap-0 overflow-hidden"
          aria-label="Command palette"
        >
          {/* Search input */}
          <div class="flex items-center border-b px-3">
            <svg
              class="w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={search}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                setSearch(e.currentTarget.value)
              }
              onKeyDown={handleKeyDown}
              class="border-0 focus:ring-0 flex-1"
              aria-label="Search commands"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={
                flatCommands[selectedIndex]
                  ? `command-${flatCommands[selectedIndex].id}`
                  : undefined
              }
            />
          </div>

          {/* Command list */}
          <div
            ref={listRef}
            id="command-list"
            role="listbox"
            class="max-h-96 overflow-y-auto p-2"
          >
            {groupedCommands.length === 0 ? (
              <div class="py-12 text-center text-sm text-muted-foreground">
                No commands found
              </div>
            ) : (
              groupedCommands.map(([group, commands], groupIdx) => {
                // Calculate starting index for this group
                const startIndex = groupedCommands
                  .slice(0, groupIdx)
                  .reduce((acc, [_, cmds]) => acc + cmds.length, 0);

                return (
                  <div key={group}>
                    {/* Group label */}
                    {groupIdx > 0 && <Separator class="my-2" />}
                    <div class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {group}
                    </div>

                    {/* Commands in group */}
                    {commands.map((command, cmdIdx) => {
                      const index = startIndex + cmdIdx;
                      const isSelected = index === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          id={`command-${command.id}`}
                          role="option"
                          aria-selected={isSelected}
                          data-command-index={index}
                          onClick={() => executeCommand(command)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          class={`
                            w-full flex items-center gap-3 px-2 py-2 rounded-md text-left
                            ${isSelected ? 'bg-accent' : 'hover:bg-accent/50'}
                          `}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <span class="text-xl flex-shrink-0" aria-hidden="true">
                              {command.icon}
                            </span>
                          )}

                          {/* Label and description */}
                          <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium">{command.label}</div>
                            {command.description && (
                              <div class="text-xs text-muted-foreground truncate">
                                {command.description}
                              </div>
                            )}
                          </div>

                          {/* Shortcut badge */}
                          {command.shortcut && (
                            <Badge variant="secondary" class="text-xs">
                              {command.shortcut}
                            </Badge>
                          )}

                          {/* Recent indicator */}
                          {!search && recentCommands.includes(command.id) && (
                            <svg
                              class="w-4 h-4 text-muted-foreground"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-label="Recent command"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer hints */}
          <div class="flex items-center justify-between px-3 py-2 border-t text-xs text-muted-foreground">
            <div class="flex items-center gap-4">
              <span>
                <kbd class="px-1.5 py-0.5 border rounded bg-muted">↑↓</kbd> Navigate
              </span>
              <span>
                <kbd class="px-1.5 py-0.5 border rounded bg-muted">↵</kbd> Select
              </span>
              <span>
                <kbd class="px-1.5 py-0.5 border rounded bg-muted">Esc</kbd> Close
              </span>
            </div>
            <div>
              {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

## Key Features Explained

### 1. Keyboard Shortcut

Global keyboard shortcut to open the palette:

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 2. Fuzzy Search

Search matches across label, description, and keywords:

```tsx
const fuzzyMatch = (str: string, pattern: string): number => {
  // Exact match gets highest score
  if (str.toLowerCase().includes(pattern.toLowerCase())) {
    return 100;
  }

  // Fuzzy matching with consecutive match bonus
  // ... implementation
};
```

### 3. Keyboard Navigation

Arrow keys, Enter, Escape, Home, End:

```tsx
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      setSelectedIndex(i => Math.min(i + 1, commands.length - 1));
      break;
    case 'Enter':
      executeCommand(commands[selectedIndex]);
      break;
    // ... more keys
  }
};
```

### 4. Command Groups

Commands organized into logical groups:

```tsx
const groupedCommands = useMemo(() => {
  const groups = new Map<string, Command[]>();

  filteredCommands.forEach(cmd => {
    const existing = groups.get(cmd.group) || [];
    groups.set(cmd.group, [...existing, cmd]);
  });

  return Array.from(groups.entries());
}, [filteredCommands]);
```

### 5. Recent Commands

Track and show recently used commands:

```tsx
const executeCommand = (command: Command) => {
  setRecentCommands(prev => {
    const filtered = prev.filter(id => id !== command.id);
    return [command.id, ...filtered].slice(0, 5); // Keep last 5
  });

  command.action();
  setIsOpen(false);
};
```

## Customization Options

### Nested Commands

Add sub-commands with breadcrumb navigation:

```tsx
interface Command {
  // ... existing fields
  children?: Command[];
}

const [commandStack, setCommandStack] = useState<Command[]>([]);

// Navigate into sub-commands
const navigateInto = (command: Command) => {
  if (command.children) {
    setCommandStack([...commandStack, command]);
  }
};

// Navigate back
const navigateBack = () => {
  setCommandStack(commandStack.slice(0, -1));
};
```

### Command Scores/Priority

Boost certain commands in search results:

```tsx
interface Command {
  // ... existing fields
  priority?: number; // 0-10, default 5
}

// In filtering logic
.sort((a, b) => {
  if (b.score === a.score) {
    return (b.cmd.priority || 5) - (a.cmd.priority || 5);
  }
  return b.score - a.score;
});
```

### Dynamic Commands

Load commands from API or context:

```tsx
const [dynamicCommands, setDynamicCommands] = useState<Command[]>([]);

useEffect(() => {
  fetch('/api/commands')
    .then(res => res.json())
    .then(setDynamicCommands);
}, []);

const allCommands = [...staticCommands, ...dynamicCommands];
```

## Accessibility Features

- **ARIA roles**: Dialog, listbox, option
- **aria-activedescendant**: Announces current selection to screen readers
- **Keyboard shortcuts**: Fully keyboard accessible
- **Focus management**: Auto-focus input on open
- **Clear labels**: All interactive elements labeled
- **Status updates**: Result count displayed

## Performance Tips

For large command lists (100+):

1. **Virtualize the list**: Only render visible commands
2. **Debounce search**: Wait 100-200ms after typing before filtering
3. **Web Workers**: Move fuzzy matching to a worker thread
4. **Lazy load groups**: Only render expanded groups

## Testing

```tsx
test('opens with keyboard shortcut', () => {
  render(<CommandPalette />);

  fireEvent.keyDown(document, {
    key: 'k',
    metaKey: true,
  });

  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
});

test('filters commands by search', () => {
  render(<CommandPalette />);

  const input = screen.getByLabelText('Search commands');
  fireEvent.input(input, {target: {value: 'dashboard'}});

  expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
  expect(screen.queryByText('Go to Home')).not.toBeInTheDocument();
});
```

## Related Recipes

- [Data Table](./data-table.md) - Filtering and search patterns
- [Settings Panel](./settings-panel.md) - Complex UI organization
- Autocomplete patterns
- Quick switcher implementations

## Best Practices

1. **Keep commands fast**: Actions should execute instantly
2. **Provide feedback**: Show loading states for async actions
3. **Remember recent**: Help users repeat common actions
4. **Group logically**: Organize by feature area or action type
5. **Add keywords**: Help users find commands with alternate terms
6. **Show shortcuts**: Display keyboard shortcuts for discoverability
7. **Test search quality**: Ensure fuzzy matching works well
8. **Support deep linking**: Allow opening palette to specific command

---

This command palette provides a powerful, keyboard-first interface for navigating and executing actions in your application, similar to VS Code, Linear, and other modern productivity tools.
