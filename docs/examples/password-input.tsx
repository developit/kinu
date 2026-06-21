import {PasswordInput} from 'kinu';

export function Demo() {
  return (
    <div style={{maxWidth: '20rem'}}>
      <PasswordInput
        name="password"
        placeholder="Enter password"
        defaultValue="hunter2"
      />
    </div>
  );
}

export const code = `<PasswordInput name="password" placeholder="Enter password" />`;

export default {Demo, code};
