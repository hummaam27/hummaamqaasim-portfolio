/**
 * MedallionMini — compact bronze → silver → gold banner diagram for the
 * Medallion Lakehouse featured card. Tuned to read at card-banner size;
 * the full architecture diagram lives in the case study body.
 */

const W = 480;
const H = 270;
const BAND_H = 58;

const BANDS = [
  {
    y: 26,
    label: "BRONZE",
    desc: "4 raw VMS sources",
    fill: "rgba(184, 115, 51, 0.12)",
    stroke: "rgba(184, 115, 51, 0.45)",
  },
  {
    y: 106,
    label: "SILVER",
    desc: "canonical conform",
    fill: "rgba(120, 124, 130, 0.12)",
    stroke: "rgba(120, 124, 130, 0.45)",
  },
  {
    y: 186,
    label: "GOLD",
    desc: "5 facts · 6 dims",
    fill: "rgba(200, 154, 61, 0.14)",
    stroke: "rgba(200, 154, 61, 0.5)",
  },
];

export function MedallionMini() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Medallion lakehouse: bronze raw, silver canonical, gold star schema."
      className="block h-full w-full"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {BANDS.map((band, i) => (
        <g key={band.label}>
          <rect
            x={24}
            y={band.y}
            width={W - 48}
            height={BAND_H}
            fill={band.fill}
            stroke={band.stroke}
            strokeWidth={1}
            rx={4}
          />
          <text
            x={44}
            y={band.y + BAND_H / 2 + 4}
            fontSize={14}
            fontWeight={700}
            letterSpacing={2.5}
            fill="var(--color-ink)"
          >
            {band.label}
          </text>
          <text
            x={W - 44}
            y={band.y + BAND_H / 2 + 4}
            fontSize={13}
            fill="var(--color-ink-muted)"
            textAnchor="end"
            fontStyle="italic"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {band.desc}
          </text>
          {/* Downward connector chevron between bands */}
          {i < BANDS.length - 1 ? (
            <polygon
              points={`${W / 2 - 7},${band.y + BAND_H + 6} ${W / 2 + 7},${
                band.y + BAND_H + 6
              } ${W / 2},${band.y + BAND_H + 17}`}
              fill="var(--color-terracotta)"
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
