import {createSimpleComponent} from '../../lib/create-simple-component';
import type {JSX} from 'preact';
import type {FileUploadOwnProps} from './types';
import './style.css';

export const FileUpload = createSimpleComponent<'input', FileUploadOwnProps>(
  'file-upload',
  'input',
  {type: 'file'} as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);
