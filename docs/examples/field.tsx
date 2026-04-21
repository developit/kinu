import {Button, Field, Input} from 'kinu';

export function Demo() {
  return (
    <form
      style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '20rem'}}
      onSubmit={(e: Event) => e.preventDefault()}
    >
      <Field>
        <Field.Label>
          Email
          <Input type="email" required placeholder="you@example.com" />
        </Field.Label>
        <Field.Description>We'll never share your email.</Field.Description>
        <Field.Error>Please enter a valid email address.</Field.Error>
      </Field>
      <Field>
        <Field.Label>
          Username
          <Input type="text" required minLength={3} placeholder="at least 3 chars" />
        </Field.Label>
        <Field.Description>Visible to other users.</Field.Description>
      </Field>
      <Button type="submit">Save</Button>
    </form>
  );
}

export const code = `<Field>\n  <Field.Label>\n    Email\n    <Input type="email" required />\n  </Field.Label>\n  <Field.Description>We'll never share it</Field.Description>\n  <Field.Error>Please enter a valid email</Field.Error>\n</Field>`;

export default {Demo, code};
