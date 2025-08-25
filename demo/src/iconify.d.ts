declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': {
        icon?: string;
        width?: string | number;
        height?: string | number;
        style?: any;
        class?: string;
        className?: string;
        onclick?: (event: Event) => void;
        onMouseEnter?: (event: Event) => void;
        onMouseLeave?: (event: Event) => void;
      };
    }
  }
}

export {};