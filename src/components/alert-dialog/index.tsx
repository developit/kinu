import type {JSX} from 'preact';
import {Dialog, DialogTrigger, DialogContent, DialogClose} from '../dialog';
import {forwardRef} from '../../lib/forwardref';
import type {DialogContentProps} from '../dialog/types';
import type {AlertDialogProps} from './types';

/* Alerts demand an explicit choice: closedby="closerequest" disables outside
 * -click light dismiss (natively where supported, and the JS fallback honors
 * the same attribute) while keeping Escape as a close request.
 *
 * forwardRef-tagged like every other content component: without it a ref on
 * AlertDialog.Content would attach to this wrapper rather than the <dialog>. */
const AlertDialogContent = /*#__PURE__*/ forwardRef(function AlertDialogContent(
  props: DialogContentProps,
) {
  return <DialogContent closedby="closerequest" {...props} />;
});

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
