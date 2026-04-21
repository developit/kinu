import type {JSX as PreactJSX} from 'preact';

declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      k?: string; // Custom attribute for styling or identification
      ki?: string; // Component instance identifier
      ka?: string; // Action identifier for delegated events
    }
  }

  namespace JSX {
    export = PreactJSX;
  }
}

declare global {
  interface CSSStyleDeclaration {
    anchorName?: string;
  }
}

// export {};
