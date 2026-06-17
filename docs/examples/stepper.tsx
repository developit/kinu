import {Stepper} from 'kinu';

export function Demo() {
  return (
    <Stepper>
      <Stepper.Step state="complete">Cart</Stepper.Step>
      <Stepper.Step state="complete">Shipping</Stepper.Step>
      <Stepper.Step state="current">Payment</Stepper.Step>
      <Stepper.Step>Review</Stepper.Step>
    </Stepper>
  );
}

export const code = `<Stepper>
  <Stepper.Step state="complete">Cart</Stepper.Step>
  <Stepper.Step state="current">Payment</Stepper.Step>
  <Stepper.Step>Review</Stepper.Step>
</Stepper>`;

export default {Demo, code};
