import type {ComponentChildren} from 'preact';

/**
 * Shared props for components that accept children.
 */
export interface BaseProps {
  /**
   * A command to invoke on `commandFor` target.
   * Custom commands begin with `--` and fire a "command" event on the target.
   */
  command?: 'show-modal' | 'close' | 'show-popover' | 'hide-popover' | 'toggle-popover' | `--${string}`;

  /**
   * ID of a DOM element or kinu component to invoke `command` on.
   */
  commandFor?: string;

  /**
   * Component contents.
   */
  children?: ComponentChildren;
}

/**
 * Shared props for components that require children.
 */
export interface RequiredChildrenProps extends BaseProps {
  /**
   * Component contents.
   */
  children: ComponentChildren;
}
