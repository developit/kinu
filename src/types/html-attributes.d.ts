import 'preact';

declare module 'preact' {
  namespace JSX {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      command?: Signalish<string | null | undefined>;
      commandfor?: Signalish<string | null | undefined>;
      commandFor?: Signalish<string | null | undefined>;
      closedby?: Signalish<'any' | 'closerequest' | 'none' | null | undefined>;
      interestfor?: Signalish<string | null | undefined>;
      k?: Signalish<string | undefined>;
    }
  }
}
