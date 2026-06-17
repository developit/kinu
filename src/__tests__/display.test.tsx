import {describe, expect, it} from 'vitest';
import renderToString from 'preact-render-to-string';
import {Stat} from '../components/stat';
import {Stepper} from '../components/stepper';

describe('display components ssr', () => {
  it('renders Stat with compound parts without a DOM', () => {
    expect(() =>
      renderToString(
        <Stat>
          <Stat.Label>Revenue</Stat.Label>
          <Stat.Value>$48,200</Stat.Value>
          <Stat.Delta trend="up">+12.5%</Stat.Delta>
        </Stat>,
      ),
    ).not.toThrow();
  });

  it('renders Stepper with steps without a DOM', () => {
    expect(() =>
      renderToString(
        <Stepper>
          <Stepper.Step state="complete">Cart</Stepper.Step>
          <Stepper.Step state="current">Payment</Stepper.Step>
          <Stepper.Step>Review</Stepper.Step>
        </Stepper>,
      ),
    ).not.toThrow();
  });
});
