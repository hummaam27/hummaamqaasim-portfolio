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

const VMS = ["vms_a", "vms_b", "vms_c", "vms_d", "vms_e", "vms_f"] as const;
const GOLD_BLOCKS = [
  { label: "CONFORMED FACTS", desc: "orders · submissions · shifts · timecards · invoices" },
  { label: "SHARED DIMENSIONS", desc: "dates · locations · workers · statuses" },
  { label: "SEMANTIC MODEL", desc: "governed measures · RLS · one source of truth" },
] as const;

const sourceLabels = [
  "REST",
  "REST + CUSTOM-REPORT",
  "SFTP CSV · DAILY",
  "FABRIC SHORTCUT",
  "ONBOARDING",
  "ONBOARDING",
];

const isOnboarding = [false, false, false, false, true, true];

export function MedallionArchitecture() {
  // BRONZE/SILVER column layout
  const colW = 155;
  const gap = 10;
  const totalW = VMS.length * colW + (VMS.length - 1) * gap;
  const startX = (W - 80 - totalW) / 2 + 80;

  // GOLD column layout
  const goldColW = 300;
  const goldGap = 16;
  const goldTotalW = GOLD_BLOCKS.length * goldColW + (GOLD_BLOCKS.length - 1) * goldGap;
  const goldStartX = (W - 80 - goldTotalW) / 2 + 80;

  return (
    <figure className="not-prose figure-wide my-14">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Medallion architecture: six VMS sources land in Bronze, are canonicalized in Silver, and modeled as a governed star schema in Gold."
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
          const onboarding = isOnboarding[i];
          return (
            <g key={`bronze-${vms}`} opacity={onboarding ? 0.55 : 1}>
              <rect
                x={x}
                y={40}
                width={colW}
                height={104}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                strokeDasharray={onboarding ? "4 3" : "none"}
                rx={2}
              />
              <text
                x={x + colW / 2}
                y={64}
                fontSize={15}
                fontWeight={600}
                fill="var(--color-ink)"
                textAnchor="middle"
              >
                {vms}
              </text>
              <text
                x={x + colW / 2}
                y={84}
                fontSize={10}
                letterSpacing={1.5}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
              >
                {sourceLabels[i]}
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
          const onboarding = isOnboarding[i];
          return (
            <g key={`silver-split-${vms}`} opacity={onboarding ? 0.55 : 1}>
              <rect
                x={x}
                y={230}
                width={colW}
                height={58}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
                strokeDasharray={onboarding ? "4 3" : "none"}
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
          six vendor schemas → one canonical model
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
        {GOLD_BLOCKS.map((block, i) => {
          const x = goldStartX + i * (goldColW + goldGap);
          const isSemantic = i === GOLD_BLOCKS.length - 1;
          return (
            <g key={`gold-${i}`}>
              <rect
                x={x}
                y={486}
                width={goldColW}
                height={68}
                fill={isSemantic ? "rgba(200, 154, 61, 0.12)" : "var(--color-paper-2)"}
                stroke={isSemantic ? "rgba(200, 154, 61, 0.65)" : "var(--color-ink)"}
                strokeWidth={isSemantic ? 1.4 : 0.9}
                rx={2}
              />
              <rect
                x={x}
                y={486}
                width={goldColW}
                height={4}
                fill="var(--color-terracotta)"
              />
              <text
                x={x + goldColW / 2}
                y={510}
                fontSize={13}
                fontWeight={700}
                letterSpacing={2}
                fill="var(--color-ink)"
                textAnchor="middle"
              >
                {block.label}
              </text>
              <text
                x={x + goldColW / 2}
                y={538}
                fontSize={11}
                fill="var(--color-ink-muted)"
                textAnchor="middle"
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {block.desc}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 1. Six sources, three layers. Two more onboarding into the same architecture.
      </figcaption>
    </figure>
  );
}
