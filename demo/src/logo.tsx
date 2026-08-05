/**
 * kinu identity logo. Font properties live in style.css under
 * .kinu-logo-mark-k / .kinu-logo-wordmark so the theme customizer can
 * swap between the sans-forward default and the serif (Newsreader
 * italic) variant by toggling .theme-serif on :root.
 */
export function KinuLogo({
  size = 22,
  color = 'hsl(var(--k-foreground))',
}: {size?: number; color?: string}) {
  const box = size * 0.85;
  return (
    <span
      class="kinu-logo"
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: size * 0.22,
        lineHeight: 1,
      }}
    >
      <svg
        width={box}
        height={box}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        style={{
          display: 'inline-block',
          verticalAlign: 'baseline',
          transform: `translateY(${size * 0.105}px)`,
        }}
      >
        <rect x="6" y="6" width="52" height="52" fill={color} opacity="0.95" />
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          fill="none"
          stroke={color}
          stroke-width="0.8"
        />
        <text
          class="kinu-logo-mark-k"
          x="32"
          y="47"
          text-anchor="middle"
          fill="hsl(var(--k-background))"
        >
          k
        </text>
      </svg>
      <span class="kinu-logo-wordmark" style={{fontSize: size, color}}>
        kinu
      </span>
    </span>
  );
}
