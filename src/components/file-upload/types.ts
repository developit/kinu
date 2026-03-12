import type {JSX} from 'preact';

export interface FileUploadOwnProps {
  /**
   * Change handler called when the user selects files.
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * Allowed file types as MIME types or extensions (e.g. "image/*" or ".pdf").
   */
  accept?: string;

  /**
   * Allow selecting multiple files.
   */
  multiple?: boolean;

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Input name used for form submissions.
   */
  name?: string;
}

export type FileUploadProps = FileUploadOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof FileUploadOwnProps>;
