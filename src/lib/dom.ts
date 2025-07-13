export function closestFromEvent<T extends Element>(
  event: Event,
  selector: string,
): T | null {
  const target = event.target as Element | null;
  return target ? (target.closest(selector) as T | null) : null;
}
