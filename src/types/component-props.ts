import type {ComponentChildren} from 'preact';

/**
 * Shared props for components that accept children.
 */
export interface BaseProps {
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
