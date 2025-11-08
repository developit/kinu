/// <reference types="vite/client" />

import type {JSX} from 'preact';

type BaseElement = JSX.IntrinsicElements['div'];

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': BaseElement & {
        icon: string;
        width?: string;
        height?: string;
        rotate?: string;
      };
    }
  }
}
