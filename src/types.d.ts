import type {JSX as PreactJSX} from 'preact';

declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      p?: string; // Custom attribute for styling or identification
      pi?: string; // Component instance identifier
      pa?: string; // Action identifier for delegated events
      command?: string; // Command attribute for invoker buttons
      commandfor?: string; // Target element ID for command
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
