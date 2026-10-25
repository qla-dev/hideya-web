import { english } from "../copy";
import { useId } from "react";
import hideyaSymbol from "../../assets/hideya/symbol-web.png";

// One coordinate system for every placement. The symbol's visible artwork is
// cropped with an SVG viewport, without editing the source image or its alpha.
// Its top and baseline match Fredoka's i/d ascenders at this font size.
const letters = [
  { letter: "h", x: 0, pivot: 122 },
  { letter: "i", x: 230, pivot: 286 },
  { letter: "d", x: 325, pivot: 450 },
  { letter: "e", x: 556, pivot: 676 },
  { letter: "y", x: 778, pivot: 908 },
  { letter: "a", x: 1019, pivot: 1144 },
];

export function HideyaWordmark({ trails = false }: { trails?: boolean }) {
  const symbolId = useId();
  return (
    <>
      <span className="sr" data-i18n="index.hero.sr">{english["index.hero.sr"]}</span>
      {trails &&
        [11, 31, 53, 74, 94].map((top) => (
          <i
            key={top}
            className="speed"
            style={{ top: `${top}%` }}
            aria-hidden="true"
          />
        ))}
      {letters.map(({ letter, x, pivot }) => (
        <span
          key={letter}
          className={`logo-l l-${letter}`}
          style={{ transformOrigin: `${(pivot / 1260) * 100}% 100%` }}
          aria-hidden="true"
        >
          <svg className="brand-glyph" viewBox="0 0 1260 466" focusable="false">
            {letter === "h" ? (
              <svg x="0" y="20" width="243" height="337" viewBox="88 15 388 539">
                <defs>
                  <clipPath id={`${symbolId}-source`}>
                    <path d="M0 0H564V480H380V564H0Z" />
                  </clipPath>
                  <linearGradient id={`${symbolId}-foot`} x1="385" y1="480" x2="475" y2="554" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff6a13" />
                    <stop offset="1" stopColor="#ff6a13" />
                  </linearGradient>
                </defs>
                <image
                  href={hideyaSymbol}
                  width="564"
                  height="564"
                  clipPath={`url(#${symbolId}-source)`}
                />
                {/* Extend the web symbol's right stem to the shared baseline.
                    The soft lower corners match Fredoka's adjacent i. */}
                <path
                  data-brand-foot=""
                  d="M385 478H475V510C475 542 467 554 443 554H417C393 554 385 542 385 510Z"
                  fill={`url(#${symbolId}-foot)`}
                />
              </svg>
            ) : (
              <text className="brand-letter" x={x} y="350">{letter}</text>
            )}
          </svg>
        </span>
      ))}
    </>
  );
}
