import {useState, useEffect, useId, useRef, useMemo, type JSX} from 'preact/hooks';
import {Badge, Button, Dialog, Input, ScrollArea, Separator} from 'pui';

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
  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const getDialog = () =>
    document.getElementById(dialogId) as HTMLDialogElement | null;

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
    getDialog()?.showModal();
    setSearch('');
    setSelectedIndex(0);
    // Focus the input element after dialog opens
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const closeDialog = () => {
    getDialog()?.close();
  };

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (getDialog()?.open) {
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
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeDialog();
    }
  };

  // Get keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <Dialog id={dialogId}>
      {/* Trigger button */}
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open command palette"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'space-between',
            width: '16rem',
          }}
        >
          <span style={{color: 'hsl(var(--p-muted-foreground))'}}>
            Search commands...
          </span>
          <Badge variant="outline">{isMac ? '⌘K' : 'Ctrl+K'}</Badge>
        </Button>
      </Dialog.Trigger>

      {/* Dialog */}
      <Dialog.Content
        onClick={handleDialogClick}
        aria-label="Command palette"
        style={{
          padding: 0,
          gap: 0,
          width: '100%',
          maxWidth: '40rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
          }}
        >
          <iconify-icon
            icon="lucide:search"
            style={{fontSize: '1.1rem', color: 'hsl(var(--p-muted-foreground))'}}
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setSearch(e.currentTarget.value)
            }
            onKeyDown={handleKeyDown}
            style={{flex: 1, minWidth: 0}}
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

        <Separator />

        <ScrollArea
          ref={listRef}
          id="command-list"
          role="listbox"
          style={{
            maxHeight: '20rem',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {groupedCommands.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              No commands found
            </div>
          ) : (
            groupedCommands.map(([group, commands], groupIdx) => {
              // Calculate starting index for this group
              const startIndex = groupedCommands
                .slice(0, groupIdx)
                .reduce((acc, [_, cmds]) => acc + cmds.length, 0);

              return (
                <div key={group} style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  {/* Group label */}
                  {groupIdx > 0 && <Separator style={{margin: '0.25rem 0'}} />}
                  <div
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'hsl(var(--p-muted-foreground))',
                    }}
                  >
                    {group}
                  </div>

                  {/* Commands in group */}
                  {commands.map((command, cmdIdx) => {
                    const index = startIndex + cmdIdx;
                    const isSelected = index === selectedIndex;
                    const descriptionColor = isSelected
                      ? 'hsl(var(--p-accent-foreground))'
                      : 'hsl(var(--p-muted-foreground))';

                    return (
                      <Button
                        key={command.id}
                        id={`command-${command.id}`}
                        variant="ghost"
                        size="sm"
                        role="option"
                        aria-selected={isSelected}
                        data-command-index={index}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        style={{
                          width: '100%',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          padding: '0.5rem 0.75rem',
                          height: 'auto',
                          gap: '0.75rem',
                          backgroundColor: isSelected
                            ? 'hsl(var(--p-accent))'
                            : 'transparent',
                          color: isSelected
                            ? 'hsl(var(--p-accent-foreground))'
                            : 'inherit',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {command.icon && (
                            <iconify-icon
                              icon={command.icon}
                              style={{fontSize: '1.25rem'}}
                              aria-hidden="true"
                            />
                          )}

                          <div style={{display: 'flex', flexDirection: 'column', minWidth: 0}}>
                            <span style={{fontSize: '0.875rem', fontWeight: 500}}>
                              {command.label}
                            </span>
                            {command.description && (
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: descriptionColor,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {command.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          {command.shortcut && (
                            <Badge variant="secondary">{command.shortcut}</Badge>
                          )}
                          {!search && recentCommands.includes(command.id) && (
                            <iconify-icon
                              icon="lucide:clock"
                              style={{fontSize: '1rem', color: 'hsl(var(--p-muted-foreground))'}}
                              aria-label="Recent command"
                            />
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              );
            })
          )}
        </ScrollArea>

        <Separator />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            color: 'hsl(var(--p-muted-foreground))',
            backgroundColor: 'hsl(var(--p-muted))',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">↑↓</Badge> Navigate
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">↵</Badge> Select
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">Esc</Badge> Close
            </div>
          </div>
          <div>
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

export const code = `import {useState, useEffect, useId, useRef, useMemo, type JSX} from 'preact/hooks';
import {Badge, Button, Dialog, Input, ScrollArea, Separator} from 'pui';

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
  const dialogId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const getDialog = () =>
    document.getElementById(dialogId) as HTMLDialogElement | null;

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
    getDialog()?.showModal();
    setSearch('');
    setSelectedIndex(0);
    // Focus the input element after dialog opens
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const closeDialog = () => {
    getDialog()?.close();
  };

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (getDialog()?.open) {
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
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeDialog();
    }
  };

  // Get keyboard shortcut display
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <Dialog id={dialogId}>
      {/* Trigger button */}
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="sm"
          aria-label="Open command palette"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'space-between',
            width: '16rem',
          }}
        >
          <span style={{color: 'hsl(var(--p-muted-foreground))'}}>
            Search commands...
          </span>
          <Badge variant="outline">{isMac ? '⌘K' : 'Ctrl+K'}</Badge>
        </Button>
      </Dialog.Trigger>

      {/* Dialog */}
      <Dialog.Content
        onClick={handleDialogClick}
        aria-label="Command palette"
        style={{
          padding: 0,
          gap: 0,
          width: '100%',
          maxWidth: '40rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
          }}
        >
          <iconify-icon
            icon="lucide:search"
            style={{fontSize: '1.1rem', color: 'hsl(var(--p-muted-foreground))'}}
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setSearch(e.currentTarget.value)
            }
            onKeyDown={handleKeyDown}
            style={{flex: 1, minWidth: 0}}
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

        <Separator />

        <ScrollArea
          ref={listRef}
          id="command-list"
          role="listbox"
          style={{
            maxHeight: '20rem',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {groupedCommands.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              No commands found
            </div>
          ) : (
            groupedCommands.map(([group, commands], groupIdx) => {
              // Calculate starting index for this group
              const startIndex = groupedCommands
                .slice(0, groupIdx)
                .reduce((acc, [_, cmds]) => acc + cmds.length, 0);

              return (
                <div key={group} style={{display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                  {/* Group label */}
                  {groupIdx > 0 && <Separator style={{margin: '0.25rem 0'}} />}
                  <div
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'hsl(var(--p-muted-foreground))',
                    }}
                  >
                    {group}
                  </div>

                  {/* Commands in group */}
                  {commands.map((command, cmdIdx) => {
                    const index = startIndex + cmdIdx;
                    const isSelected = index === selectedIndex;
                    const descriptionColor = isSelected
                      ? 'hsl(var(--p-accent-foreground))'
                      : 'hsl(var(--p-muted-foreground))';

                    return (
                      <Button
                        key={command.id}
                        id={\`command-\${command.id}\`}
                        variant="ghost"
                        size="sm"
                        role="option"
                        aria-selected={isSelected}
                        data-command-index={index}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        style={{
                          width: '100%',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          padding: '0.5rem 0.75rem',
                          height: 'auto',
                          gap: '0.75rem',
                          backgroundColor: isSelected
                            ? 'hsl(var(--p-accent))'
                            : 'transparent',
                          color: isSelected
                            ? 'hsl(var(--p-accent-foreground))'
                            : 'inherit',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {command.icon && (
                            <iconify-icon
                              icon={command.icon}
                              style={{fontSize: '1.25rem'}}
                              aria-hidden="true"
                            />
                          )}

                          <div style={{display: 'flex', flexDirection: 'column', minWidth: 0}}>
                            <span style={{fontSize: '0.875rem', fontWeight: 500}}>
                              {command.label}
                            </span>
                            {command.description && (
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: descriptionColor,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {command.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                          {command.shortcut && (
                            <Badge variant="secondary">{command.shortcut}</Badge>
                          )}
                          {!search && recentCommands.includes(command.id) && (
                            <iconify-icon
                              icon="lucide:clock"
                              style={{fontSize: '1rem', color: 'hsl(var(--p-muted-foreground))'}}
                              aria-label="Recent command"
                            />
                          )}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              );
            })
          )}
        </ScrollArea>

        <Separator />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            color: 'hsl(var(--p-muted-foreground))',
            backgroundColor: 'hsl(var(--p-muted))',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">↑↓</Badge> Navigate
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">↵</Badge> Select
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
              <Badge variant="outline">Esc</Badge> Close
            </div>
          </div>
          <div>
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
`;
