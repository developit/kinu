import type {JSX} from 'preact';
import {Dialog} from '../dialog';
import type {AlertDialogProps} from './types';

export const AlertDialog = Dialog as unknown as (props: AlertDialogProps) => JSX.Element;
