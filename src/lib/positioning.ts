export interface PositionOptions {
  placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' | 'left' | 'right';
  offset?: { x: number; y: number };
  fallbackPlacements?: string[];
  boundary?: Element | 'viewport';
}

export interface Position {
  x: number;
  y: number;
  placement: string;
  transformOrigin: string;
}

/**
 * Calculate optimal positioning for a floating element relative to a reference element
 * while keeping it within the viewport boundaries.
 */
export function calculateOptimalPosition(
  reference: Element,
  floating: Element,
  options: PositionOptions = {}
): Position {
  const {
    placement = 'bottom-start',
    offset = { x: 0, y: 4 },
    fallbackPlacements = ['bottom-end', 'top-start', 'top-end', 'top'],
  } = options;

  const refRect = reference.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight
  };

  // Try the preferred placement first, then fallbacks
  const placements = [placement, ...fallbackPlacements];
  
  for (const currentPlacement of placements) {
    const position = calculatePositionForPlacement(
      refRect,
      floatingRect,
      currentPlacement,
      offset
    );
    
    if (isPositionWithinBounds(position, floatingRect, viewport)) {
      return position;
    }
  }
  
  // If no placement fits perfectly, use the preferred one but constrain it
  const position = calculatePositionForPlacement(
    refRect,
    floatingRect,
    placement,
    offset
  );
  
  return constrainToViewport(position, floatingRect, viewport);
}

function calculatePositionForPlacement(
  refRect: DOMRect,
  floatingRect: DOMRect,
  placement: string,
  offset: { x: number; y: number }
): Position {
  let x = 0;
  let y = 0;
  let transformOrigin = 'top center';

  switch (placement) {
    case 'bottom-start':
      x = refRect.left + offset.x;
      y = refRect.bottom + offset.y;
      transformOrigin = 'top left';
      break;
    case 'bottom-end':
      x = refRect.right - floatingRect.width - offset.x;
      y = refRect.bottom + offset.y;
      transformOrigin = 'top right';
      break;
    case 'bottom':
      x = refRect.left + (refRect.width - floatingRect.width) / 2 + offset.x;
      y = refRect.bottom + offset.y;
      transformOrigin = 'top center';
      break;
    case 'top-start':
      x = refRect.left + offset.x;
      y = refRect.top - floatingRect.height - offset.y;
      transformOrigin = 'bottom left';
      break;
    case 'top-end':
      x = refRect.right - floatingRect.width - offset.x;
      y = refRect.top - floatingRect.height - offset.y;
      transformOrigin = 'bottom right';
      break;
    case 'top':
      x = refRect.left + (refRect.width - floatingRect.width) / 2 + offset.x;
      y = refRect.top - floatingRect.height - offset.y;
      transformOrigin = 'bottom center';
      break;
    case 'left':
      x = refRect.left - floatingRect.width - offset.x;
      y = refRect.top + (refRect.height - floatingRect.height) / 2 + offset.y;
      transformOrigin = 'center right';
      break;
    case 'right':
      x = refRect.right + offset.x;
      y = refRect.top + (refRect.height - floatingRect.height) / 2 + offset.y;
      transformOrigin = 'center left';
      break;
  }

  return { x, y, placement, transformOrigin };
}

function isPositionWithinBounds(
  position: Position,
  floatingRect: DOMRect,
  viewport: { width: number; height: number; top: number; left: number; right: number; bottom: number }
): boolean {
  return (
    position.x >= viewport.left &&
    position.y >= viewport.top &&
    position.x + floatingRect.width <= viewport.right &&
    position.y + floatingRect.height <= viewport.bottom
  );
}

function constrainToViewport(
  position: Position,
  floatingRect: DOMRect,
  viewport: { width: number; height: number; top: number; left: number; right: number; bottom: number }
): Position {
  let { x, y } = position;
  
  // Constrain horizontally
  if (x < viewport.left) {
    x = viewport.left;
  } else if (x + floatingRect.width > viewport.right) {
    x = viewport.right - floatingRect.width;
  }
  
  // Constrain vertically  
  if (y < viewport.top) {
    y = viewport.top;
  } else if (y + floatingRect.height > viewport.bottom) {
    y = viewport.bottom - floatingRect.height;
  }
  
  return { ...position, x, y };
}

/**
 * Apply calculated position to a dialog element using CSS custom properties
 */
export function applyPositioning(element: HTMLDialogElement, position: Position): void {
  element.style.setProperty('--p-floating-x', `${position.x}px`);
  element.style.setProperty('--p-floating-y', `${position.y}px`);
  element.style.setProperty('--p-transform-origin', position.transformOrigin);
  element.setAttribute('data-placement', position.placement);
}

/**
 * Get the trigger element for a dialog based on commandfor attribute
 */
export function getTriggerElement(dialog: HTMLDialogElement): Element | null {
  // Look for any element with commandfor pointing to this dialog
  const dialogId = dialog.id;
  if (!dialogId) return null;
  
  return document.querySelector(`[commandfor="${dialogId}"]`);
}