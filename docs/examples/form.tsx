import {Button, Field, Form, Input, toast} from 'kinu';

export function Demo() {
  return (
    <Form
      onValid={(e) => {
        e.preventDefault();
        toast.show('Subscribed!', {title: 'Success'});
      }}
    >
      <Field>
        <Field.Label>
          Email
          <Input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </Field.Label>
        <Field.Error>Please enter a valid email address.</Field.Error>
      </Field>
      <Button type="submit">Subscribe</Button>
    </Form>
  );
}

export const code = `<Form onValid={handleSubmit}>
  <Field>
    <Field.Label>
      Email
      <Input type="email" name="email" required />
    </Field.Label>
    <Field.Error>Please enter a valid email.</Field.Error>
  </Field>
  <Button type="submit">Subscribe</Button>
</Form>`;

export default {Demo, code};
