/**
 * GoldStarSchema — Kimball star schema visualization showing 5 fact tables
 * surrounded by 5 conformed dimension tables, with lines linking each
 * dimension to every fact it conforms across (the "star" pattern).
 */

const W = 1100;
const H = 620;

// Center cluster of fact tables (compact row)
const FACTS = [
  { id: "orders",       label: "fact_orders",       cols: ["order_id", "facility_sk", "dt_sk", "vms_source"] },
  { id: "submissions",  label: "fact_submissions",  cols: ["sub_id", "order_sk", "status_sk", "worker_sk"] },
  { id: "shifts",       label: "fact_shifts",       cols: ["shift_id", "worker_sk", "dt_sk", "hours_billed"] },
  { id: "timecards",    label: "fact_timecards",    cols: ["tc_id", "shift_sk", "approval_status_sk"] },
  { id: "invoices",     label: "fact_invoices",     cols: ["inv_id", "facility_sk", "dt_sk", "amount"] },
] as const;

// Dimension tables — 4 conformed dims, one in each corner of the star.
// (Prose mentions 6 in total; this diagram shows a representative subset
// the way most published star schemas do.)
const DIMS = [
  { id: "date",      label: "dim_date",      x: 90,        y: 90,  rows: ["date_sk", "iso_week", "fiscal_qtr"] },
  { id: "facility",  label: "dim_facility",  x: W - 290,   y: 90,  rows: ["facility_sk", "client_name", "region"] },
  { id: "worker",    label: "dim_worker",    x: W - 290,   y: 460, rows: ["worker_sk", "specialty", "tier"] },
  { id: "order",     label: "dim_order",     x: 90,        y: 460, rows: ["order_sk", "order_type", "lifecycle"] },
] as const;

// Which facts each dim connects to (visualizes "conformed dimensions")
const LINKS: Record<string, string[]> = {
  date:     ["orders", "shifts", "invoices"],
  facility: ["orders", "invoices"],
  worker:   ["submissions", "shifts"],
  order:    ["orders", "submissions"],
};

const FACT_BOX_W = 175;
const FACT_BOX_H = 96;
const FACT_GAP = 12;
const FACT_TOTAL_W = FACTS.length * FACT_BOX_W + (FACTS.length - 1) * FACT_GAP;
const FACT_START_X = (W - FACT_TOTAL_W) / 2;
const FACT_Y = 275;

const DIM_BOX_W = 200;
const DIM_BOX_H = 96;

function factCenter(idx: number) {
  return {
    cx: FACT_START_X + idx * (FACT_BOX_W + FACT_GAP) + FACT_BOX_W / 2,
    cy: FACT_Y + FACT_BOX_H / 2,
  };
}

function dimCenter(dim: typeof DIMS[number]) {
  return { cx: dim.x + DIM_BOX_W / 2, cy: dim.y + DIM_BOX_H / 2 };
}

export function GoldStarSchema() {
  return (
    <figure className="not-prose figure-wide my-14">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Gold layer Kimball star schema with five fact tables and five conformed dimensions."
        className="block w-full h-auto"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Title */}
        <text
          x={W / 2}
          y={28}
          fontSize={13}
          letterSpacing={4}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontWeight={600}
        >
          GOLD — KIMBALL STAR · CONFORMED DIMENSIONS
        </text>

        {/* Conformance lines (drawn first so they sit behind boxes) */}
        {DIMS.map((dim) => {
          const { cx: dcx, cy: dcy } = dimCenter(dim);
          return LINKS[dim.id].map((factId) => {
            const idx = FACTS.findIndex((f) => f.id === factId);
            const { cx, cy } = factCenter(idx);
            return (
              <line
                key={`${dim.id}-${factId}`}
                x1={dcx}
                y1={dcy}
                x2={cx}
                y2={cy}
                stroke="var(--color-terracotta)"
                strokeOpacity={0.45}
                strokeWidth={1}
              />
            );
          });
        })}

        {/* Dimension boxes */}
        {DIMS.map((dim) => (
          <g key={dim.id}>
            <rect
              x={dim.x}
              y={dim.y}
              width={DIM_BOX_W}
              height={DIM_BOX_H}
              fill="var(--color-paper-2)"
              stroke="var(--color-ink)"
              strokeWidth={0.9}
              rx={2}
            />
            <rect
              x={dim.x}
              y={dim.y}
              width={DIM_BOX_W}
              height={4}
              fill="var(--color-ink)"
            />
            <text
              x={dim.x + 14}
              y={dim.y + 30}
              fontSize={16}
              fontWeight={600}
              fill="var(--color-ink)"
            >
              {dim.label}
            </text>
            {dim.rows.map((r, i) => (
              <text
                key={`${dim.id}-row-${i}`}
                x={dim.x + 14}
                y={dim.y + 52 + i * 16}
                fontSize={12}
                fill="var(--color-ink-muted)"
              >
                {r}
              </text>
            ))}
          </g>
        ))}

        {/* Fact boxes — center cluster */}
        {FACTS.map((fact, i) => {
          const x = FACT_START_X + i * (FACT_BOX_W + FACT_GAP);
          return (
            <g key={fact.id}>
              <rect
                x={x}
                y={FACT_Y}
                width={FACT_BOX_W}
                height={FACT_BOX_H}
                fill="var(--color-paper-2)"
                stroke="var(--color-terracotta)"
                strokeWidth={1.4}
                rx={2}
              />
              <rect
                x={x}
                y={FACT_Y}
                width={FACT_BOX_W}
                height={4}
                fill="var(--color-terracotta)"
              />
              <text
                x={x + FACT_BOX_W / 2}
                y={FACT_Y + 26}
                fontSize={14}
                fontWeight={700}
                fill="var(--color-terracotta-deep)"
                textAnchor="middle"
              >
                {fact.label}
              </text>
              {fact.cols.map((c, j) => (
                <text
                  key={`${fact.id}-col-${j}`}
                  x={x + FACT_BOX_W / 2}
                  y={FACT_Y + 48 + j * 14}
                  fontSize={11}
                  fill="var(--color-ink-muted)"
                  textAnchor="middle"
                >
                  {c}
                </text>
              ))}
            </g>
          );
        })}

        {/* Bottom note */}
        <text
          x={W / 2}
          y={H - 16}
          fontSize={13}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          one semantic model · row-level security · 30+ reports point here
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 2. Conformed dimensions tie every fact to a single business vocabulary.
      </figcaption>
    </figure>
  );
}
