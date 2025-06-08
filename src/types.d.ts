import type {JSX as PreactJSX} from 'preact';

declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      p?: string; // Custom attribute for styling or identification
    }
  }

  namespace JSX {
    export = PreactJSX;
  }
}

// export {};
