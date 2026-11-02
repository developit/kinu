import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TagsInputOwnProps extends BaseProps {
  /**
   * Form field name. A hidden input submits the tags joined by `separator`.
   */
  name?: string | null;

  /**
   * Initial tags.
   */
  value?: string[] | null;

  /**
   * Character that joins the submitted value and also commits a typed tag.
   * @default ','
   */
  separator?: string | null;

  /**
   * Maximum number of tags.
   */
  max?: number | null;

  /**
   * Allow duplicate tags.
   * @default false
   */
  duplicates?: boolean | null;

  /**
   * Placeholder for the text input.
   */
  placeholder?: string | null;
}

export type TagsInputProps = TagsInputOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TagsInputOwnProps | 'k' | 'ref'>;
