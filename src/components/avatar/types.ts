import type {JSX} from 'preact';

/**
 * Size presets supported by Avatar.
 */
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarOwnProps {
  /**
   * Image source for the avatar.
   */
  src?: string;

  /**
   * Alt text used by the image and for fallback initials.
   */
  alt?: string;

  /**
   * Fallback initials or text rendered via the alt attribute.
   */
  children?: string | number;

  /**
   * Size preset for the avatar.
   */
  size?: AvatarSize;
}

export type AvatarProps = AvatarOwnProps &
  Omit<JSX.IntrinsicElements['img'], keyof AvatarOwnProps>;
