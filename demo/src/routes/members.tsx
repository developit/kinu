import {Avatar, Badge, Button, Tab, TabList, Table} from 'pui';

const accountLinks = [
  'My account',
  'Profile',
  'Preferences',
  'Secrets',
  'Git authentications',
  'Personal access tokens',
  'Integrations',
];

const orgLinks = [
  'General',
  'Members',
  'Runners',
  'Environments',
  'Secrets',
  'Agents',
  'Policies',
  'Login and security',
  'Billing',
];

export default function MembersDemo() {
  return (
    <div class="members-demo">
      <aside class="members-sidebar">
        <a class="members-back" href="#">
          <span aria-hidden="true">←</span>
          <span>Back to Ona</span>
        </a>

        <div class="members-sidebar-section">
          <p class="members-sidebar-title">My account</p>
          <ul class="members-sidebar-list">
            {accountLinks.map((item) => (
              <li key={item}>
                <a href="#" class="members-sidebar-link">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div class="members-sidebar-section">
          <p class="members-sidebar-title">Organization Settings</p>
          <ul class="members-sidebar-list">
            {orgLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  class={`members-sidebar-link${item === 'Members' ? ' is-active' : ''}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div class="members-sidebar-footer">
          <div class="members-sidebar-avatar">JM</div>
          <div>
            <p class="members-sidebar-workspace">Jason Miller's Workspace 169</p>
            <p class="members-sidebar-owner">Jason Miller</p>
          </div>
          <span class="members-sidebar-chevron">▾</span>
        </div>
      </aside>

      <main class="members-main">
        <header class="members-header">
          <div>
            <h1>Members</h1>
            <p class="members-subtitle">Manage who has access to your workspace.</p>
          </div>
          <Button class="members-invite" size="sm">
            <span class="members-invite-icon" aria-hidden="true">
              <iconify-icon icon="lucide:user-plus" />
            </span>
            Invite
          </Button>
        </header>

        <section class="members-card">
          <div class="members-tabs-row">
            <TabList class="members-tabs" role="tablist">
              <Tab aria-selected="true">
                <iconify-icon icon="lucide:user" />
                People
              </Tab>
              <Tab aria-selected="false">
                <iconify-icon icon="lucide:users" />
                Groups
              </Tab>
              <Tab aria-selected="false">
                <iconify-icon icon="lucide:server" />
                Service Accounts
              </Tab>
            </TabList>
          </div>

          <Table class="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date joined</th>
                <th>Role</th>
                <th>Authenticated with</th>
                <th class="members-table-actions" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="members-user">
                    <Avatar
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=128&h=128&q=80"
                      alt="Jason Miller"
                    />
                    <div>
                      <div class="members-user-name">
                        Jason Miller
                        <Badge class="members-badge">me</Badge>
                      </div>
                      <div class="members-user-email">jason@developit.ca</div>
                    </div>
                  </div>
                </td>
                <td>1/10/2026</td>
                <td>Admin</td>
                <td>GitHub</td>
                <td class="members-table-actions">⋯</td>
              </tr>
            </tbody>
          </Table>
        </section>

        <button class="members-chat" aria-label="Open chat">
          <iconify-icon icon="lucide:message-circle" />
        </button>
      </main>
    </div>
  );
}
