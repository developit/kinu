export function closestFromEvent<T extends Element>(
  event: Event,
  selector: string,
): T | null {
  const node = event.target as Node | null;
  const el =
    node instanceof Element ? node : node?.parentElement ?? null;
  return el ? (el.closest(selector) as T | null) : null;
}

export function delegate<T extends Element>(
  type: string,
  action: string,
  handler: (el: T, event: Event) => void,
  selector?: string,
  options?: AddEventListenerOptions,
) {
  addEventListener(
    type,
    (event) => {
      const match = closestFromEvent<T>(
        event,
        selector ?? `[pa="${action}"]`,
      );
      if (match) handler(match, event);
    },
    options,
  );
}
