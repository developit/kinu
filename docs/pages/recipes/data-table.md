# Data Table with Sorting & Filtering

A production-ready data table implementation with sorting, filtering, pagination, row selection, and bulk actions.

## Overview

This recipe demonstrates how to build a feature-rich data table using PUI components with:

- Column sorting (ascending/descending)
- Multi-column filtering with search
- Pagination controls
- Row selection (single and multi-select)
- Bulk actions on selected rows
- Loading states
- Empty states
- Responsive design
- Accessibility features

## Complete Example

```tsx
import {useState, useMemo, type JSX} from 'preact/hooks';
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Skeleton,
} from 'pui';

// Data types
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

export function UserTable() {
  // Sample data - replace with your API call
  const [users, setUsers] = useState<User[]>([
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
    // Add more sample data...
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Sorting
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Handle sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort data
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        let comparison = 0;
        if (aVal < bVal) comparison = -1;
        if (aVal > bVal) comparison = 1;

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [users, searchQuery, roleFilter, statusFilter, sortColumn, sortDirection]);

  // Paginate data
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredAndSortedUsers.slice(start, end);
  }, [filteredAndSortedUsers, currentPage, pageSize]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize);
  const showingStart = filteredAndSortedUsers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const showingEnd = Math.min(currentPage * pageSize, filteredAndSortedUsers.length);

  // Handle select all
  const handleSelectAll = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setSelectedRows(new Set(paginatedUsers.map(u => u.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // Handle select row
  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // Check if all visible rows are selected
  const allSelected = paginatedUsers.length > 0 &&
    paginatedUsers.every(u => selectedRows.has(u.id));
  const someSelected = paginatedUsers.some(u => selectedRows.has(u.id)) && !allSelected;

  // Bulk actions
  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedRows.size} user(s)?`)) return;

    setIsLoading(true);
    try {
      await fetch('/api/users/bulk-delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ids: Array.from(selectedRows)}),
      });

      // Remove deleted users from state
      setUsers(users.filter(u => !selectedRows.has(u.id)));
      setSelectedRows(new Set());
    } catch (error) {
      console.error('Failed to delete users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkExport = () => {
    const selectedUsers = users.filter(u => selectedRows.has(u.id));
    const csv = [
      'Name,Email,Role,Status,Created',
      ...selectedUsers.map(u =>
        `${u.name},${u.email},${u.role},${u.status},${u.createdAt}`
      ),
    ].join('\n');

    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render sort indicator
  const SortIcon = ({column}: {column: SortColumn}) => {
    if (sortColumn !== column) {
      return (
        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters and actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search */}
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement>) =>
              setSearchQuery(e.currentTarget.value)
            }
            className="w-full sm:w-64"
            aria-label="Search users"
          />

          {/* Role filter */}
          <Select
            value={roleFilter}
            onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
              setRoleFilter(e.currentTarget.value)
            }
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </Select>

          {/* Status filter */}
          <Select
            value={statusFilter}
            onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) =>
              setStatusFilter(e.currentTarget.value)
            }
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </Select>
        </div>

        {/* Bulk actions */}
        {selectedRows.size > 0 && (
          <div className="flex gap-2">
            <Badge variant="secondary">
              {selectedRows.size} selected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkExport}
            >
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onInput={handleSelectAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('name')}
                  aria-label="Sort by name"
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('email')}
                  aria-label="Sort by email"
                >
                  Email
                  <SortIcon column="email" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('role')}
                  aria-label="Sort by role"
                >
                  Role
                  <SortIcon column="role" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('status')}
                  aria-label="Sort by status"
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('createdAt')}
                  aria-label="Sort by created date"
                >
                  Created
                  <SortIcon column="createdAt" />
                </button>
              </TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading state
              Array.from({length: pageSize}).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                </TableRow>
              ))
            ) : paginatedUsers.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              paginatedUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(user.id)}
                      onInput={() => handleSelectRow(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
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
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {showingStart} to {showingEnd} of {filteredAndSortedUsers.length} results
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        <Select
          value={pageSize.toString()}
          onInput={(e: JSX.TargetedEvent<HTMLSelectElement>) => {
            setPageSize(Number(e.currentTarget.value));
            setCurrentPage(1);
          }}
          className="w-32"
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

## Key Features Explained

### 1. Sorting

Click column headers to sort:

```tsx
const handleSort = (column: SortColumn) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};
```

Visual indicators show current sort state.

### 2. Filtering

Multiple filter types:

- **Text search**: Searches name and email
- **Dropdown filters**: Role and status filters
- **Combined**: All filters work together

```tsx
const filteredAndSortedUsers = useMemo(() => {
  let result = [...users];

  if (searchQuery) {
    result = result.filter(/* search logic */);
  }

  if (roleFilter !== 'all') {
    result = result.filter(user => user.role === roleFilter);
  }

  // Apply sorting...
  return result;
}, [users, searchQuery, roleFilter, sortColumn, sortDirection]);
```

### 3. Pagination

Client-side pagination with page controls:

```tsx
const paginatedUsers = useMemo(() => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  return filteredAndSortedUsers.slice(start, end);
}, [filteredAndSortedUsers, currentPage, pageSize]);
```

For server-side pagination, move filtering and sorting to the API.

### 4. Row Selection

Select individual rows or all rows:

```tsx
const handleSelectRow = (id: string) => {
  const newSelected = new Set(selectedRows);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelectedRows(newSelected);
};
```

Indeterminate checkbox state when some rows are selected.

### 5. Bulk Actions

Perform actions on multiple rows:

```tsx
const handleBulkDelete = async () => {
  await fetch('/api/users/bulk-delete', {
    method: 'DELETE',
    body: JSON.stringify({ids: Array.from(selectedRows)}),
  });

  setUsers(users.filter(u => !selectedRows.has(u.id)));
  setSelectedRows(new Set());
};
```

## Performance Optimization

For large datasets (1000+ rows):

### 1. Server-Side Operations

Move filtering, sorting, and pagination to the server:

```tsx
const fetchUsers = async () => {
  const params = new URLSearchParams({
    page: currentPage.toString(),
    pageSize: pageSize.toString(),
    sortColumn: sortColumn || '',
    sortDirection,
    search: searchQuery,
    role: roleFilter,
    status: statusFilter,
  });

  const response = await fetch(`/api/users?${params}`);
  const data = await response.json();

  setUsers(data.users);
  setTotalCount(data.totalCount);
};

useEffect(() => {
  fetchUsers();
}, [currentPage, pageSize, sortColumn, sortDirection, searchQuery, roleFilter, statusFilter]);
```

### 2. Virtual Scrolling

For extremely large tables, use virtual scrolling to only render visible rows.

### 3. Debounced Search

Debounce search input to reduce filtering operations:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 300);

  return () => clearTimeout(timer);
}, [searchQuery]);

// Use debouncedQuery for filtering
```

## Accessibility Features

- **ARIA labels**: All interactive elements have descriptive labels
- **Keyboard navigation**: Tab through controls, use keyboard for sorting
- **Screen reader support**: Table structure with proper headers
- **Focus management**: Clear focus indicators
- **Semantic HTML**: Uses `<table>`, `<th>`, `<td>` elements

## Testing

```tsx
test('sorts table by column', () => {
  const {container} = render(<UserTable />);

  const nameHeader = screen.getByLabelText('Sort by name');
  fireEvent.click(nameHeader);

  const rows = container.querySelectorAll('tbody tr');
  expect(rows[0]).toHaveTextContent('Alice'); // Alphabetically first
});

test('filters by search query', () => {
  render(<UserTable />);

  const searchInput = screen.getByLabelText('Search users');
  fireEvent.input(searchInput, {target: {value: 'alice'}});

  expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
});
```

## Related Recipes

- [Settings Panel](./settings-panel.md) - Complex forms with data
- [Command Palette](./command-palette.md) - Quick search interface
- Server-side pagination examples
- Virtual scrolling patterns

## Best Practices

1. **Use server-side operations for large datasets**: Don't load 10,000 rows to the client
2. **Debounce search input**: Avoid excessive filtering
3. **Show loading states**: Use Skeleton components while fetching
4. **Provide empty states**: Clear messaging when no results
5. **Make actions accessible**: All controls keyboard-navigable
6. **Test performance**: Profile with realistic data volumes
7. **Responsive design**: Tables should work on mobile (consider card view)
8. **Preserve state**: Remember filters/sorting in URL params

---

This data table provides a comprehensive foundation for displaying and managing tabular data in production applications.
