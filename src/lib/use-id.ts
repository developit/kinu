import {useRef} from 'preact/hooks';

let counter = 0;

/** Reset the ID counter (used during SSR to ensure deterministic IDs). */
export function resetId() {
	counter = 0;
}

/**
 * Generate a unique, stable ID for a component instance.
 *
 * Unlike Preact's built-in `useId()`, which derives IDs from the
 * component's position in the virtual DOM tree, this implementation
 * uses a simple global counter. This avoids collisions that can occur
 * when tree-position-based IDs diverge between SSR and hydration
 * (e.g. due to lazy-loaded routes or Suspense boundaries).
 */
export function useId(): string {
	const ref = useRef('');
	if (!ref.current) ref.current = ':k' + (counter++).toString(36) + ':';
	return ref.current;
}
