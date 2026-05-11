/**
 * MedallionArchitecture — native SVG diagram of the bronze → silver → gold
 * lakehouse architecture. Uses the site palette (paper / ink / terracotta)
 * and the existing font stack. Breaks out of the prose column so it can be
 * rendered wide enough to read at normal viewing distances.
 */

const W = 1100;
const H = 600;

const BANDS = {
  bronze: { y: 0, h: 188, fill: "rgba(184, 115, 51, 0.10)", stroke: "rgba(184, 115, 51, 0.35)", label: "BRONZE" },
  silver: { y: 205, h: 218, fill: "rgba(154, 160, 166, 0.10)", stroke: "rgba(154, 160, 166, 0.35)", label: "SILVER" },
  gold:   { y: 440, h: 160, fill: "rgba(200, 154, 61, 0.12)", stroke: "rgba(200, 154, 61, 0.40)", label: "GOLD" },
} as const;

const VMS = ["vms_a", "vms_b", "vms_c", "vms_d"] as const;
const FACTS = ["orders", "submissions", "shifts", "timecards", "invoices"] as const;

const sourceLabels = [
  "REST",
  "REST + CUSTOM-REPORT",
  "SFTP CSV · DAILY",
  "FABRIC SHORTCUT",
];

// Approximate source-table counts per vendor — placeholders, easy to retune
// once the real numbers are confirmed.
const tableCounts = [22, 12, 7, 16];
const TOTAL_TABLES = tableCounts.reduce((a, b) => a + b, 0);

export function MedallionArchitecture() {
  // BRONZE/SILVER column layout
  const colW = 220;
  const gap = 18;
  const totalW = VMS.length * colW + (VMS.length - 1) * gap;
  const startX = (W - 80 - totalW) / 2 + 80;

  // GOLD column layout
  const factColW = 180;
  const factGap = 12;
  const factTotalW = FACTS.length * factColW + (FACTS.length - 1) * factGap;
  const factStartX = (W - 80 - factTotalW) / 2 + 80;

  return (
    <figure className="not-prose figure-wide my-14">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Medallion lakehouse architecture: four sources land in Bronze, are canonicalized in Silver, and modeled in Gold as a Kimball star schema."
        className="block w-full h-auto"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Layer bands */}
        {(Object.entries(BANDS) as [keyof typeof BANDS, typeof BANDS[keyof typeof BANDS]][]).map(([key, band]) => (
          <g key={key}>
            <rect
              x={80}
              y={band.y}
              width={W - 80}
              height={band.h}
              fill={band.fill}
              stroke={band.stroke}
              strokeWidth={1}
              rx={3}
            />
            <text
              x={40}
              y={band.y + band.h / 2}
              fontSize={16}
              letterSpacing={5}
              fill="var(--color-ink)"
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(-90, 40, ${band.y + band.h / 2})`}
            >
              {band.label}
            </text>
          </g>
        ))}

        {/* BRONZE row */}
        {VMS.map((vms, i) => {
          const x = startX + i * (colW + gap);
          return (
            <g key={`bronze-${vms}`}>
              <rect
                x={x}
                y={40}
                width={colW}
                height={104}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                rx={2}
              />
              <text
                x={x + colW / 2}
                y={64}
                fontSize={17}
                fontWeight={600}
                fill="var(--color-ink)"
                textAnchor="middle"
              >
                {vms}
              </text>
              <text
                x={x + colW / 2}
                y={84}
                fontSize={11}
                letterSpacing={1.8}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
              >
                {sourceLabels[i]}
              </text>
              {/* Thin divider above the count line */}
              <line
                x1={x + 28}
                y1={97}
                x2={x + colW - 28}
                y2={97}
                stroke="var(--color-rule-strong)"
                strokeWidth={0.7}
              />
              {/* The punchy count — terracotta, bold */}
              <text
                x={x + colW / 2}
                y={120}
                fontSize={22}
                fontWeight={700}
                fill="var(--color-terracotta)"
                textAnchor="middle"
              >
                {tableCounts[i]}
              </text>
              <text
                x={x + colW / 2}
                y={136}
                fontSize={10}
                letterSpacing={2}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
                fontWeight={600}
              >
                SOURCE TABLES
              </text>
            </g>
          );
        })}

        {/* BRONZE → SILVER connectors */}
        {VMS.map((_, i) => {
          const x = startX + i * (colW + gap) + colW / 2;
          return (
            <line
              key={`b2s-${i}`}
              x1={x}
              y1={144}
              x2={x}
              y2={230}
              stroke="var(--color-ink-muted)"
              strokeWidth={0.9}
              strokeDasharray="3 4"
            />
          );
        })}

        {/* SILVER row 1: split notebooks */}
        {VMS.map((vms, i) => {
          const x = startX + i * (colW + gap);
          return (
            <g key={`silver-split-${vms}`}>
              <rect
                x={x}
                y={230}
                width={colW}
                height={58}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                rx={2}
              />
              <text
                x={x + colW / 2}
                y={257}
                fontSize={16}
                fontWeight={500}
                fill="var(--color-ink)"
                textAnchor="middle"
              >
                split_{vms}
              </text>
              <text
                x={x + colW / 2}
                y={278}
                fontSize={12}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                map → canonical
              </text>
            </g>
          );
        })}

        {/* SPLIT → MASTER connectors */}
        {VMS.map((_, i) => {
          const x = startX + i * (colW + gap) + colW / 2;
          return (
            <line
              key={`s2m-${i}`}
              x1={x}
              y1={288}
              x2={x}
              y2={332}
              stroke="var(--color-ink-muted)"
              strokeWidth={0.9}
              strokeDasharray="3 4"
            />
          );
        })}

        {/* MASTER append row */}
        <rect
          x={startX}
          y={332}
          width={totalW}
          height={66}
          fill="var(--color-terracotta)"
          fillOpacity={0.10}
          stroke="var(--color-terracotta)"
          strokeWidth={1.2}
          rx={3}
        />
        <text
          x={startX + totalW / 2}
          y={361}
          fontSize={18}
          fontWeight={600}
          fill="var(--color-terracotta-deep)"
          textAnchor="middle"
        >
          master_append · UNION ALL · surrogate keys
        </text>
        <text
          x={startX + totalW / 2}
          y={384}
          fontSize={14}
          letterSpacing={1}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {`~${TOTAL_TABLES} source tables → 5 conformed facts + 6 dimensions`}
        </text>

        {/* MASTER → GOLD arrow */}
        <line
          x1={startX + totalW / 2}
          y1={398}
          x2={startX + totalW / 2}
          y2={472}
          stroke="var(--color-terracotta)"
          strokeWidth={1.6}
        />
        <polygon
          points={`${startX + totalW / 2 - 6},464 ${startX + totalW / 2 + 6},464 ${startX + totalW / 2},476`}
          fill="var(--color-terracotta)"
        />

        {/* GOLD row */}
        {FACTS.map((f, i) => {
          const x = factStartX + i * (factColW + factGap);
          return (
            <g key={`gold-${f}`}>
              <rect
                x={x}
                y={486}
                width={factColW}
                height={68}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                rx={2}
              />
              <rect
                x={x}
                y={486}
                width={factColW}
                height={4}
                fill="var(--color-terracotta)"
              />
              <text
                x={x + factColW / 2}
                y={516}
                fontSize={16}
                fontWeight={600}
                fill="var(--color-ink)"
                textAnchor="middle"
              >
                fact_{f}
              </text>
              <text
                x={x + factColW / 2}
                y={538}
                fontSize={12}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                conformed dims
              </text>
            </g>
          );
        })}

        {/* Bottom semantic-model note */}
        <text
          x={(W + 80) / 2}
          y={582}
          fontSize={12}
          letterSpacing={2}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontWeight={500}
        >
          → ONE GOVERNED POWER BI SEMANTIC MODEL · ROW-LEVEL SECURITY
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 1. Three Fabric items, three layers: bronze raw, silver canonical, gold star.
      </figcaption>
    </figure>
  );
}
