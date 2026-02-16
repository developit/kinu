import type {ComponentChild} from 'preact';

/**
 * Options for showing a toast.
 */
export interface ToastOptions {
  /**
   * Title content rendered above the toast body.
   */
  title?: ComponentChild;

  /**
   * Icon element rendered alongside the toast.
   */
  icon?: ComponentChild;

  /**
   * Action element rendered with the toast.
   */
  action?: ComponentChild;

  /**
   * Duration in milliseconds before auto-dismiss.
   * @default 3000
   */
  duration?: number;
}

/**
 * Internal toast entry shape.
 */
export interface ToastInternal extends ToastOptions {
  /**
   * Unique identifier for the toast entry.
   */
  id: number;

  /**
   * Main toast content.
   */
  content: ComponentChild;

  /**
   * Whether the toast has mounted.
   */
  mounted?: boolean;

  /**
   * Whether the toast is closing.
   */
  closing?: boolean;
}

/**
 * Toast dispatch API.
 */
export interface ToastApi {
  /**
   * Show a toast with content and optional configuration.
   */
  show: (content: ComponentChild, opts?: ToastOptions) => void;
}
