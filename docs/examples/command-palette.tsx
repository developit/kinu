import {useState, useEffect, useRef, useMemo, type JSX} from 'preact/hooks';
import {Input, Badge, Separator} from 'pui';

export function Demo() {
  return <CommandPalette />;
}

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

function CommandPalette() {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Define all available commands
  const allCommands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Home',
      icon: 'lucide:home',
      group: 'Navigation',
      action: () => (window.location.href = '/'),
    },
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: 'lucide:bar-chart',
      group: 'Navigation',
      keywords: ['dash', 'overview'],
      action: () => (window.location.href = '/dashboard'),
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      icon: 'lucide:settings',
      group: 'Navigation',
      keywords: ['preferences', 'config'],
      action: () => (window.location.href = '/settings'),
    },
    {
      id: 'nav-profile',
      label: 'Go to Profile',
      icon: 'lucide:user',
      group: 'Navigation',
      action: () => (window.location.href = '/profile'),
    },

    // Actions
    {
      id: 'action-new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      icon: 'lucide:plus',
      group: 'Actions',
      keywords: ['add', 'create'],
      shortcut: '⌘N',
      action: () => console.log('Create project'),
    },
    {
      id: 'action-search',
      label: 'Search Everything',
      description: 'Search across all content',
      icon: 'lucide:search',
      group: 'Actions',
      shortcut: '⌘/',
      action: () => console.log('Search'),
    },
    {
      id: 'action-quick-add',
      label: 'Quick Add',
      description: 'Add a new item quickly',
      icon: 'lucide:zap',
      group: 'Actions',
      shortcut: '⌘A',
      action: () => console.log('Quick add'),
    },

    // View
    {
      id: 'view-toggle-sidebar',
      label: 'Toggle Sidebar',
      icon: 'lucide:panel-left',
      group: 'View',
      shortcut: '⌘B',
      action: () => console.log('Toggle sidebar'),
    },
    {
      id: 'view-fullscreen',
      label: 'Toggle Fullscreen',
      icon: 'lucide:maximize',
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
      icon: 'lucide:moon',
      group: 'View',
      keywords: ['theme', 'appearance'],
      action: () => console.log('Toggle theme'),
    },

    // Help
    {
      id: 'help-docs',
      label: 'View Documentation',
      icon: 'lucide:book',
      group: 'Help',
      keywords: ['docs', 'guide'],
      action: () => window.open('/docs', '_blank'),
    },
    {
      id: 'help-shortcuts',
      label: 'Keyboard Shortcuts',
      icon: 'lucide:keyboard',
      group: 'Help',
      action: () => console.log('Show shortcuts'),
    },
    {
      id: 'help-support',
      label: 'Contact Support',
      icon: 'lucide:message-circle',
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

  // Open/close dialog functions
  const openDialog = () => {
    dialogRef.current?.showModal();
    setSearch('');
    setSelectedIndex(0);
    // Focus the input element after dialog opens
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (dialogRef.current?.open) {
          closeDialog();
        } else {
          openDialog();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        closeDialog();
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
    closeDialog();
  };

  // Handle backdrop click
  const handleDialogClick = (e: JSX.TargetedMouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (
      rect &&
      (e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom)
    ) {
      closeDialog();
    }
  };

  // Get keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openDialog}
        class="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors"
        aria-label="Open command palette"
      >
        <span class="text-muted-foreground">Search commands...</span>
        <kbd class="px-2 py-1 text-xs border rounded bg-muted">
          {isMac ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        class="rounded-lg shadow-lg border bg-popover text-popover-foreground backdrop:bg-black/50 max-w-2xl w-full p-0 overflow-hidden"
        aria-label="Command palette"
      >
        <div class="flex flex-col">
          {/* Search input */}
          <div class="flex items-center border-b px-3">
            <svg
              class="w-5 h-5 text-muted-foreground flex-shrink-0"
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
              class="border-0 focus-visible:ring-0 flex-1"
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
                    <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors
                            ${isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}
                          `}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <iconify-icon
                              icon={command.icon}
                              class="text-xl flex-shrink-0"
                              aria-hidden="true"
                            />
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
                            <Badge variant="secondary" class="text-xs flex-shrink-0">
                              {command.shortcut}
                            </Badge>
                          )}

                          {/* Recent indicator */}
                          {!search && recentCommands.includes(command.id) && (
                            <svg
                              class="w-4 h-4 text-muted-foreground flex-shrink-0"
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
          <div class="flex items-center justify-between px-3 py-2.5 border-t text-xs text-muted-foreground bg-muted/30">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">↑↓</kbd> Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">↵</kbd> Select
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">Esc</kbd> Close
              </span>
            </div>
            <div>
              {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export const code = `import {useState, useEffect, useRef, useMemo, type JSX} from 'preact/hooks';
import {Input, Badge, Separator} from 'pui';

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
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Define all available commands
  const allCommands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Home',
      icon: 'lucide:home',
      group: 'Navigation',
      action: () => (window.location.href = '/'),
    },
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: 'lucide:bar-chart',
      group: 'Navigation',
      keywords: ['dash', 'overview'],
      action: () => (window.location.href = '/dashboard'),
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      icon: 'lucide:settings',
      group: 'Navigation',
      keywords: ['preferences', 'config'],
      action: () => (window.location.href = '/settings'),
    },
    {
      id: 'nav-profile',
      label: 'Go to Profile',
      icon: 'lucide:user',
      group: 'Navigation',
      action: () => (window.location.href = '/profile'),
    },

    // Actions
    {
      id: 'action-new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      icon: 'lucide:plus',
      group: 'Actions',
      keywords: ['add', 'create'],
      shortcut: '⌘N',
      action: () => console.log('Create project'),
    },
    {
      id: 'action-search',
      label: 'Search Everything',
      description: 'Search across all content',
      icon: 'lucide:search',
      group: 'Actions',
      shortcut: '⌘/',
      action: () => console.log('Search'),
    },
    {
      id: 'action-quick-add',
      label: 'Quick Add',
      description: 'Add a new item quickly',
      icon: 'lucide:zap',
      group: 'Actions',
      shortcut: '⌘A',
      action: () => console.log('Quick add'),
    },

    // View
    {
      id: 'view-toggle-sidebar',
      label: 'Toggle Sidebar',
      icon: 'lucide:panel-left',
      group: 'View',
      shortcut: '⌘B',
      action: () => console.log('Toggle sidebar'),
    },
    {
      id: 'view-fullscreen',
      label: 'Toggle Fullscreen',
      icon: 'lucide:maximize',
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
      icon: 'lucide:moon',
      group: 'View',
      keywords: ['theme', 'appearance'],
      action: () => console.log('Toggle theme'),
    },

    // Help
    {
      id: 'help-docs',
      label: 'View Documentation',
      icon: 'lucide:book',
      group: 'Help',
      keywords: ['docs', 'guide'],
      action: () => window.open('/docs', '_blank'),
    },
    {
      id: 'help-shortcuts',
      label: 'Keyboard Shortcuts',
      icon: 'lucide:keyboard',
      group: 'Help',
      action: () => console.log('Show shortcuts'),
    },
    {
      id: 'help-support',
      label: 'Contact Support',
      icon: 'lucide:message-circle',
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

  // Open/close dialog functions
  const openDialog = () => {
    dialogRef.current?.showModal();
    setSearch('');
    setSelectedIndex(0);
    // Focus the input element after dialog opens
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (dialogRef.current?.open) {
          closeDialog();
        } else {
          openDialog();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.querySelector(
      \`[data-command-index="\${selectedIndex}"]\`
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
        closeDialog();
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
    closeDialog();
  };

  // Handle backdrop click
  const handleDialogClick = (e: JSX.TargetedMouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (
      rect &&
      (e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom)
    ) {
      closeDialog();
    }
  };

  // Get keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openDialog}
        class="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent transition-colors"
        aria-label="Open command palette"
      >
        <span class="text-muted-foreground">Search commands...</span>
        <kbd class="px-2 py-1 text-xs border rounded bg-muted">
          {isMac ? '⌘K' : 'Ctrl+K'}
        </kbd>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        class="rounded-lg shadow-lg border bg-popover text-popover-foreground backdrop:bg-black/50 max-w-2xl w-full p-0 overflow-hidden"
        aria-label="Command palette"
      >
        <div class="flex flex-col">
          {/* Search input */}
          <div class="flex items-center border-b px-3">
            <svg
              class="w-5 h-5 text-muted-foreground flex-shrink-0"
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
              class="border-0 focus-visible:ring-0 flex-1"
              aria-label="Search commands"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={
                flatCommands[selectedIndex]
                  ? \`command-\${flatCommands[selectedIndex].id}\`
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
                    <div class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {group}
                    </div>

                    {/* Commands in group */}
                    {commands.map((command, cmdIdx) => {
                      const index = startIndex + cmdIdx;
                      const isSelected = index === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          id={\`command-\${command.id}\`}
                          role="option"
                          aria-selected={isSelected}
                          data-command-index={index}
                          onClick={() => executeCommand(command)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          class={\`
                            w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors
                            \${isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'}
                          \`}
                        >
                          {/* Icon */}
                          {command.icon && (
                            <iconify-icon
                              icon={command.icon}
                              class="text-xl flex-shrink-0"
                              aria-hidden="true"
                            />
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
                            <Badge variant="secondary" class="text-xs flex-shrink-0">
                              {command.shortcut}
                            </Badge>
                          )}

                          {/* Recent indicator */}
                          {!search && recentCommands.includes(command.id) && (
                            <svg
                              class="w-4 h-4 text-muted-foreground flex-shrink-0"
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
          <div class="flex items-center justify-between px-3 py-2.5 border-t text-xs text-muted-foreground bg-muted/30">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">↑↓</kbd> Navigate
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">↵</kbd> Select
              </span>
              <span class="flex items-center gap-1">
                <kbd class="px-1.5 py-0.5 border rounded bg-background">Esc</kbd> Close
              </span>
            </div>
            <div>
              {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}`;
