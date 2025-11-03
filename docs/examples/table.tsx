import {Table} from 'pui';

export function Demo() {
  return (
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
  );
}

export const code = `<Table>...</Table>`;

export default {Demo, code};
