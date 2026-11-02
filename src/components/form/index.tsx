import type {JSX} from 'preact';
import {createSimpleComponent} from '../../lib/create-simple-component';
import type {FormOwnProps, FormProps} from './types';
import './style.css';

const FormRoot = createSimpleComponent<'form', FormOwnProps>('form', 'form');

// "Bring your own submit, the platform owns validity." On submit we run native
// constraint validation; if it fails we block submission and focus the first
// offender, otherwise we hand the event to onValid. No validation engine, no
// touched state — it pairs with the :user-invalid CSS layer and Field.Error.
export function Form({onValid, ...props}: FormProps) {
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      form.querySelector<HTMLElement>(':invalid')?.focus();
      return;
    }
    onValid?.(e);
  };

  return <FormRoot {...props} onSubmit={handleSubmit} />;
}
