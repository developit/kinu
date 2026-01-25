import {signal, computed, batch, type Signal} from '@preact/signals';
import type {JSX} from 'preact/jsx-runtime';
import {
  Table,
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

// Mock data for demo
const MOCK_USERS: User[] = [
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
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2024-01-22',
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'viewer',
    status: 'pending',
    createdAt: '2024-03-15',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-01',
  },
  {
    id: '7',
    name: 'Grace Wilson',
    email: 'grace@example.com',
    role: 'editor',
    status: 'inactive',
    createdAt: '2024-01-08',
  },
  {
    id: '8',
    name: 'Henry Moore',
    email: 'henry@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-03-20',
  },
  {
    id: '9',
    name: 'Ivy Taylor',
    email: 'ivy@example.com',
    role: 'editor',
    status: 'pending',
    createdAt: '2024-02-14',
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-01-30',
  },
  {
    id: '11',
    name: 'Kate Thomas',
    email: 'kate@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-03-05',
  },
  {
    id: '12',
    name: 'Leo Jackson',
    email: 'leo@example.com',
    role: 'editor',
    status: 'inactive',
    createdAt: '2024-02-28',
  },
  {
    id: '13',
    name: 'Mia Martin',
    email: 'mia@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-01-12',
  },
  {
    id: '14',
    name: 'Noah Lee',
    email: 'noah@example.com',
    role: 'editor',
    status: 'pending',
    createdAt: '2024-03-18',
  },
  {
    id: '15',
    name: 'Olivia Harris',
    email: 'olivia@example.com',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-02-10',
  },
];

// State signals
const users = signal<User[]>(MOCK_USERS);
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

  // Demo: Just remove from local state
  batch(() => {
    users.value = users.value.filter(u => !selectedRows.value.has(u.id));
    selectedRows.value = new Set();
  });
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

export function Demo() {
  return <DataTable />;
}

function DataTable() {
  return (
    <div class="space-y-6">
      {/* Filters and actions */}
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
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
      <div class="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <thead>
            <tr>
              <th class="w-12 text-center">
                <Checkbox
                  checked={allSelected.value}
                  indeterminate={someSelected.value}
                  onInput={handleSelectAll}
                  aria-label="Select all users"
                />
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('name')}
                  aria-label="Sort by name"
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('email')}
                  aria-label="Sort by email"
                >
                  Email
                  <SortIcon column="email" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('role')}
                  aria-label="Sort by role"
                >
                  Role
                  <SortIcon column="role" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('status')}
                  aria-label="Sort by status"
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('createdAt')}
                  aria-label="Sort by created date"
                >
                  Created
                  <SortIcon column="createdAt" />
                </button>
              </th>
              <th class="w-12 text-center">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading.value ? (
              Array.from({length: pageSize.value}).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton class="h-4 w-4" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-32" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-48" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-16" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-16" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-24" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-8" />
                  </td>
                </tr>
              ))
            ) : paginatedUsers.value.length === 0 ? (
              <tr>
                <td colSpan={7} class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-muted-foreground">
                    <iconify-icon icon="mdi:database-off" class="text-4xl mb-2" />
                    <p class="font-medium">No users found</p>
                    <p class="text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.value.map(user => (
                <tr key={user.id}>
                  <td class="text-center">
                    <Checkbox
                      checked={selectedRows.value.has(user.id)}
                      onInput={() => handleSelectRow(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </td>
                  <td class="font-medium whitespace-nowrap">{user.name}</td>
                  <td class="text-muted-foreground">{user.email}</td>
                  <td>
                    <Badge variant="secondary" class="capitalize">
                      {user.role}
                    </Badge>
                  </td>
                  <td>
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
                  </td>
                  <td class="text-muted-foreground whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td class="text-center">
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${user.name}`}>
                      <iconify-icon icon="mdi:dots-vertical" class="text-lg" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
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

export const code = `import {signal, computed, batch, type Signal} from '@preact/signals';
import type {JSX} from 'preact/jsx-runtime';
import {
  Table,
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
  if (!confirm(\`Delete \${selectedRows.value.size} user(s)?\`)) return;

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
    ...selected.map(u => \`\${u.name},\${u.email},\${u.role},\${u.status},\${u.createdAt}\`),
  ].join('\\n');

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
    <div class="space-y-6">
      {/* Filters and actions */}
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
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
      <div class="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <thead>
            <tr>
              <th class="w-12 text-center">
                <Checkbox
                  checked={allSelected.value}
                  indeterminate={someSelected.value}
                  onInput={handleSelectAll}
                  aria-label="Select all users"
                />
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('name')}
                  aria-label="Sort by name"
                >
                  Name
                  <SortIcon column="name" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('email')}
                  aria-label="Sort by email"
                >
                  Email
                  <SortIcon column="email" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('role')}
                  aria-label="Sort by role"
                >
                  Role
                  <SortIcon column="role" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('status')}
                  aria-label="Sort by status"
                >
                  Status
                  <SortIcon column="status" />
                </button>
              </th>
              <th>
                <button
                  class="flex items-center gap-2 font-medium hover:text-foreground"
                  onClick={() => handleSort('createdAt')}
                  aria-label="Sort by created date"
                >
                  Created
                  <SortIcon column="createdAt" />
                </button>
              </th>
              <th class="w-12 text-center">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading.value ? (
              Array.from({length: pageSize.value}).map((_, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton class="h-4 w-4" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-32" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-48" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-16" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-16" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-24" />
                  </td>
                  <td>
                    <Skeleton class="h-4 w-8" />
                  </td>
                </tr>
              ))
            ) : paginatedUsers.value.length === 0 ? (
              <tr>
                <td colSpan={7} class="h-32 text-center">
                  <div class="flex flex-col items-center justify-center text-muted-foreground">
                    <iconify-icon icon="mdi:database-off" class="text-4xl mb-2" />
                    <p class="font-medium">No users found</p>
                    <p class="text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.value.map(user => (
                <tr key={user.id}>
                  <td class="text-center">
                    <Checkbox
                      checked={selectedRows.value.has(user.id)}
                      onInput={() => handleSelectRow(user.id)}
                      aria-label={\`Select \${user.name}\`}
                    />
                  </td>
                  <td class="font-medium whitespace-nowrap">{user.name}</td>
                  <td class="text-muted-foreground">{user.email}</td>
                  <td>
                    <Badge variant="secondary" class="capitalize">
                      {user.role}
                    </Badge>
                  </td>
                  <td>
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
                  </td>
                  <td class="text-muted-foreground whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td class="text-center">
                    <Button variant="ghost" size="icon" aria-label={\`Actions for \${user.name}\`}>
                      <iconify-icon icon="mdi:dots-vertical" class="text-lg" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
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
`;
