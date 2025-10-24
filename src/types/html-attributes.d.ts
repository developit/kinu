import 'preact';

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      command?: Signalish<string | undefined>;
      commandfor?: Signalish<string | undefined>;
    }
  }
}
