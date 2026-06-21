type TransitionCallback = () => void | Promise<void>;

/**
 * Run a DOM update inside a View Transition where supported, falling back to a
 * plain synchronous update otherwise. SSR-safe — outside a browser it just runs
 * the callback.
 *
 * @example
 * transition(() => setRoute(next));
 */
export function transition(callback: TransitionCallback): void {
  const doc = typeof document === 'undefined' ? undefined : document;
  const start = (
    doc as
      | (Document & {
          startViewTransition?: (cb: TransitionCallback) => unknown;
        })
      | undefined
  )?.startViewTransition;
  if (start) {
    start.call(doc, callback);
  } else {
    callback();
  }
}
