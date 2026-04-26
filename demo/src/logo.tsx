/**
 * Modernist Block · Serif — kinu identity logo.
 *
 * Sage block with an italic serif "k" inside, paired with the "kinu"
 * wordmark in Newsreader italic. The block sits on the wordmark baseline
 * (the descender of the "u" dips below the box) via inline-flex
 * baseline alignment plus a small vertical offset to land on the alphabetic
 * baseline rather than the SVG's bottom edge.
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
          x="32"
          y="48"
          text-anchor="middle"
          fill="hsl(var(--k-background))"
          font-family="Newsreader, serif"
          font-style="italic"
          font-size="44"
          font-weight="500"
          letter-spacing="-0.02em"
        >
          k
        </text>
      </svg>
      <span
        style={{
          fontFamily: 'Newsreader, serif',
          fontSize: size,
          fontStyle: 'italic',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color,
        }}
      >
        kinu
      </span>
    </span>
  );
}
