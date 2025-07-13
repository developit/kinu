import type {JSX as PreactJSX} from 'preact';

declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      p?: string; // Custom attribute for styling or identification
      pi?: string; // Component instance identifier
    }
  }

  namespace JSX {
    export = PreactJSX;
  }
}

// export {};
