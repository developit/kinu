# Data Table with Sorting & Filtering

A production-ready data table with sorting, filtering, pagination, row selection, and bulk actions.

## Features

- Column sorting (ascending/descending)
- Multi-column filtering with search
- Pagination controls
- Row selection (single and multi-select)
- Bulk actions
- Loading and empty states

## Complete Example

```tsx
import {signal, computed, batch, type Signal} from '@preact/signals';
import type {JSX} from 'preact/jsx-runtime';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Input,
  Button,
  Checkbox,
  Badge,
  Select,
  Skeleton,
} from 'pui';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

type SortColumn = keyof User | null;
type SortDirection = 'asc' | 'desc';

// State signals
const users = signal<User[]>([
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2024-03-10',
  },
]);

const isLoading = signal(false);
const searchQuery = signal('');
const roleFilter = signal('all');
const statusFilter = signal('all');
const sortColumn = signal<SortColumn>('name');
const sortDirection = signal<SortDirection>('asc');
const currentPage = signal(1);
const pageSize = signal(10);
const selectedRows = signal<Set<string>>(new Set());

// Derived state using computed
const filteredAndSortedUsers = computed(() => {
  let result = [...users.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  // Apply role filter
  if (roleFilter.value !== 'all') {
    result = result.filter(user => user.role === roleFilter.value);
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(user => user.status === statusFilter.value);
  }

  // Apply sorting
  if (sortColumn.value) {
    result.sort((a, b) => {
      const aVal = a[sortColumn.value!];
      const bVal = b[sortColumn.value!];

      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      if (aVal > bVal) comparison = 1;

      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  }

  return result;
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredAndSortedUsers.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedUsers.value.length / pageSize.value)
);

const showingStart = computed(() =>
  filteredAndSortedUsers.value.length === 0
    ? 0
    : (currentPage.value - 1) * pageSize.value + 1
);

const showingEnd = computed(() =>
  Math.min(currentPage.value * pageSize.value, filteredAndSortedUsers.value.length)
);

const allSelected = computed(
  () =>
    paginatedUsers.value.length > 0 &&
    paginatedUsers.value.every(u => selectedRows.value.has(u.id))
);

const someSelected = computed(
  () =>
    paginatedUsers.value.some(u => selectedRows.value.has(u.id)) &&
    !allSelected.value
);

// Actions
const handleSort = (column: SortColumn) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    batch(() => {
      sortColumn.value = column;
      sortDirection.value = 'asc';
    });
  }
};

const handleSelectAll = (e: JSX.TargetedEvent<HTMLInputElement>) => {
  if (e.currentTarget.checked) {
    selectedRows.value = new Set(paginatedUsers.value.map(u => u.id));
  } else {
    selectedRows.value = new Set();
  }
};

const handleSelectRow = (id: string) => {
  const newSelected = new Set(selectedRows.value);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  selectedRows.value = newSelected;
};

const handleBulkDelete = async () => {
  if (!confirm(`Delete ${selectedRows.value.size} user(s)?`)) return;

  isLoading.value = true;
  try {
    await fetch('/api/users/bulk-delete', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ids: Array.from(selectedRows.value)}),
    });

    batch(() => {
      users.value = users.value.filter(u => !selectedRows.value.has(u.id));
      selectedRows.value = new Set();
    });
  } catch (error) {
    console.error('Failed to delete users:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleBulkExport = () => {
  const selected = users.value.filter(u => selectedRows.value.has(u.id));
  const csv = [
    'Name,Email,Role,Status,Created',
    ...selected.map(u => `${u.name},${u.email},${u.role},${u.status},${u.createdAt}`),
  ].join('\n');

  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'users.csv';
  a.click();
  URL.revokeObjectURL(url);
};

const handlePageSizeChange = (newSize: number) => {
  batch(() => {
    pageSize.value = newSize;
    currentPage.value = 1;
  });
};

// Sort icon component
const SortIcon = ({column}: {column: SortColumn}) => {
  if (sortColumn.value !== column) {
    return <iconify-icon icon="mdi:sort" class="w-4 h-4 text-muted-foreground" />;
  }

  return sortDirection.value === 'asc' ? (
    <iconify-icon icon="mdi:sort-ascending" class="w-4 h-4" />
  ) : (
    <iconify-icon icon="mdi:sort-descending" class="w-4 h-4" />
  );
};

export function UserTable() {
  return (
    <div class="space-y-4">
      {/* Filters and actions */}
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex flex-1 flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div class="relative w-full sm:w-64">
            <iconify-icon
              icon="mdi:magnify"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery.value}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
                (searchQuery.value = e.currentTarget.value)
              }
              class="pl-9"
              aria-label="Search users"
            />
          </div>

          <Select
            value={roleFilter.value}
            onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
              (roleFilter.value = e.currentTarget.value)
            }
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </Select>

          <Select
            value={statusFilter.value}
            onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
              (statusFilter.value = e.currentTarget.value)
            }
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </Select>
        </div>

        {selectedRows.value.size > 0 && (
          <div class="flex gap-2 items-center">
            <Badge variant="secondary">{selectedRows.value.size} selected</Badge>
            <Button variant="outline" size="sm" onClick={handleBulkExport}>
              <iconify-icon icon="mdi:download" class="mr-2" />
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isLoading.value}
            >
              <iconify-icon icon="mdi:delete" class="mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div class="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-12">
                <Checkbox
                  checked={allSelected.value}
                  indeterminate={someSelected.value}
                  onInput={handleSelectAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('name')}
                  aria-label="Sort by name"
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('email')}
                  aria-label="Sort by email"
                >
                  Email
                  <SortIcon column="email" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('role')}
                  aria-label="Sort by role"
                >
                  Role
                  <SortIcon column="role" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('status')}
                  aria-label="Sort by status"
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('createdAt')}
                  aria-label="Sort by created date"
                >
                  Created
                  <SortIcon column="createdAt" />
                </button>
              </TableHead>
              <TableHead class="w-12">
                <span class="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading.value ? (
              Array.from({length: pageSize.value}).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton class="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton class="h-4 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedUsers.value.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-muted-foreground">
                    <iconify-icon icon="mdi:database-off" class="text-4xl mb-2" />
                    <p class="font-medium">No users found</p>
                    <p class="text-sm">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.value.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.value.has(user.id)}
                      onInput={() => handleSelectRow(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell class="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" class="capitalize">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'active'
                          ? 'default'
                          : user.status === 'inactive'
                          ? 'secondary'
                          : 'outline'
                      }
                      class="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`}>
                      <iconify-icon icon="mdi:dots-vertical" class="text-lg" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-sm text-muted-foreground">
          Showing {showingStart.value} to {showingEnd.value} of{' '}
          {filteredAndSortedUsers.value.length} results
        </div>

        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (currentPage.value = 1)}
            disabled={currentPage.value === 1}
            aria-label="Go to first page"
          >
            <iconify-icon icon="mdi:chevron-double-left" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => (currentPage.value = Math.max(1, currentPage.value - 1))}
            disabled={currentPage.value === 1}
            aria-label="Go to previous page"
          >
            <iconify-icon icon="mdi:chevron-left" />
          </Button>

          <span class="text-sm">
            Page {currentPage.value} of {totalPages.value}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              (currentPage.value = Math.min(totalPages.value, currentPage.value + 1))
            }
            disabled={currentPage.value === totalPages.value}
            aria-label="Go to next page"
          >
            <iconify-icon icon="mdi:chevron-right" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => (currentPage.value = totalPages.value)}
            disabled={currentPage.value === totalPages.value}
            aria-label="Go to last page"
          >
            <iconify-icon icon="mdi:chevron-double-right" />
          </Button>
        </div>

        <Select
          value={pageSize.value.toString()}
          onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
            handlePageSizeChange(Number(e.currentTarget.value))
          }
          class="w-32"
          aria-label="Rows per page"
        >
          <option value="10">10 / page</option>
          <option value="25">25 / page</option>
          <option value="50">50 / page</option>
          <option value="100">100 / page</option>
        </Select>
      </div>
    </div>
  );
}
```

## Key Features

### Sorting

Click column headers to sort data. The sort direction toggles between ascending and descending. Visual indicators show the current sort state.

```tsx
const handleSort = (column: SortColumn) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    batch(() => {
      sortColumn.value = column;
      sortDirection.value = 'asc';
    });
  }
};
```

### Filtering

Multiple filters work together: text search (name and email), role dropdown, and status dropdown. All filtering logic is in a single `computed()` signal for optimal performance.

```tsx
const filteredAndSortedUsers = computed(() => {
  let result = [...users.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  if (roleFilter.value !== 'all') {
    result = result.filter(user => user.role === roleFilter.value);
  }

  // Apply sorting...
  return result;
});
```

### Pagination

Client-side pagination using computed signals. For server-side pagination, move filtering and sorting to your API and update the signals based on the response.

```tsx
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredAndSortedUsers.value.slice(start, end);
});
```

### Row Selection

Select individual rows or all rows on the current page. The selection state is stored in a `Set` for O(1) lookups.

```tsx
const handleSelectRow = (id: string) => {
  const newSelected = new Set(selectedRows.value);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  selectedRows.value = newSelected;
};
```

### Bulk Actions

Perform actions on multiple selected rows. Use `batch()` when updating multiple signals together to prevent unnecessary re-renders.

```tsx
const handleBulkDelete = async () => {
  // ... API call ...

  batch(() => {
    users.value = users.value.filter(u => !selectedRows.value.has(u.id));
    selectedRows.value = new Set();
  });
};
```

## Server-Side Data

For large datasets, move operations to the server:

```tsx
import {signal, computed, effect} from '@preact/signals';

const users = signal<User[]>([]);
const totalCount = signal(0);
const isLoading = signal(false);

// Fetch data whenever filters change
effect(() => {
  const params = new URLSearchParams({
    page: currentPage.value.toString(),
    pageSize: pageSize.value.toString(),
    sortColumn: sortColumn.value || '',
    sortDirection: sortDirection.value,
    search: searchQuery.value,
    role: roleFilter.value,
    status: statusFilter.value,
  });

  isLoading.value = true;
  fetch(`/api/users?${params}`)
    .then(res => res.json())
    .then(data => {
      users.value = data.users;
      totalCount.value = data.totalCount;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value));
```

## Debounced Search

Debounce search input to reduce API calls:

```tsx
import {signal, computed, effect} from '@preact/signals';

const searchInput = signal('');
const searchQuery = signal('');

// Debounce search input
effect(() => {
  const timer = setTimeout(() => {
    searchQuery.value = searchInput.value;
  }, 300);

  return () => clearTimeout(timer);
});

// Use searchQuery for filtering
const filteredUsers = computed(() => {
  // Uses searchQuery.value, not searchInput.value
});
```

## Testing

```tsx
import {render, screen, fireEvent} from '@testing-library/preact';
import {UserTable} from './UserTable';

test('sorts table by column', () => {
  const {container} = render(<UserTable />);

  const nameHeader = screen.getByLabelText('Sort by name');
  fireEvent.click(nameHeader);

  const rows = container.querySelectorAll('tbody tr');
  expect(rows[0]).toHaveTextContent('Alice');
});

test('filters by search query', () => {
  render(<UserTable />);

  const searchInput = screen.getByLabelText('Search users');
  fireEvent.input(searchInput, {target: {value: 'alice'}});

  expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
});

test('selects and deletes multiple rows', async () => {
  render(<UserTable />);

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[1]); // Select first user
  fireEvent.click(checkboxes[2]); // Select second user

  const deleteButton = screen.getByText('Delete');
  expect(deleteButton).toBeInTheDocument();
});
```
