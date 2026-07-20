import type {JSX} from 'preact';
import {Dialog, DialogTrigger, DialogContent, DialogClose} from '../dialog';
import type {DialogContentProps} from '../dialog/types';
import type {AlertDialogProps} from './types';

/* Alerts demand an explicit choice: closedby="closerequest" disables outside
 * -click light dismiss (natively where supported, and the JS fallback honors
 * the same attribute) while keeping Escape as a close request. */
function AlertDialogContent(props: DialogContentProps) {
  return <DialogContent closedby="closerequest" {...props} />;
}

export const AlertDialog = Object.assign(
  function AlertDialog(props: AlertDialogProps): JSX.Element {
    return <Dialog {...props} />;
  },
  {
    Trigger: DialogTrigger,
    Content: AlertDialogContent,
    Close: DialogClose,
  },
);
