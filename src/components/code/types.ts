import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface CodeOwnProps extends BaseProps {
  /**
   * Render inline (`<code>`) instead of a block (`<pre>`).
   */
  inline?: boolean | null;

  /**
   * Language hint. Advisory only — kinu ships no highlighter, but an opt-in
   * plugin can target `[k="code"][language]`, or you can pass pre-highlighted
   * markup as children.
   */
  language?: string | null;
}

export type CodeProps = CodeOwnProps &
  Omit<JSX.IntrinsicElements['pre'], keyof CodeOwnProps>;

export interface CodeCopyOwnProps extends BaseProps {}
export type CodeCopyProps = CodeCopyOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof CodeCopyOwnProps>;
