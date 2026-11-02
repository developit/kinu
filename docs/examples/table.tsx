import {Table} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>User</td>
          </tr>
        </tbody>
      </Table>

      <div style={{maxHeight: '12rem', overflow: 'auto'}}>
        <Table sticky>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: 12}, (_, i) => i + 1).map((n) => (
              <tr key={n}>
                <td>User {n}</td>
                <td>user{n}@example.com</td>
                <td>{n % 3 === 1 ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export const code = `<Table>...</Table>

<div style={{maxHeight: '12rem', overflow: 'auto'}}>
  <Table sticky>
    <thead>...</thead>
    <tbody>...</tbody>
  </Table>
</div>`;

export default {Demo, code};
