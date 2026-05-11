/**
 * IdempotencyStack — three-layer Postgres-constraint diagram. A duplicate
 * event enters at the top; each layer is a constraint that rejects it
 * before it can write a phantom row.
 */

const W = 1100;
const H = 560;

interface Layer {
  table: string;
  constraint: string;
  caption: string;
}

const LAYERS: Layer[] = [
  {
    table: "activity_attempts",
    constraint: "UNIQUE (submission_id)",
    caption: "duplicate submission → Postgres 23505 → return original record",
  },
  {
    table: "user_points",
    constraint: "UNIQUE (user_id, source, reference_slug)",
    caption: "duplicate XP grant → rejected before insert",
  },
  {
    table: "idempotency_records",
    constraint: "UNIQUE (user_id, idempotency_key, operation_type)",
    caption: "catches operations with no natural composite key",
  },
];

const ARROW_X = 200;
const LAYER_X = 280;
const LAYER_W = 680;
const LAYER_H = 110;
const LAYER_GAP = 22;
const LAYER_START_Y = 70;

export function IdempotencyStack() {
  return (
    <figure
      className="not-prose relative left-1/2 my-14 -translate-x-1/2"
      style={{ width: "min(96vw, 1180px)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Three-layer Postgres idempotency stack with UNIQUE constraints that reject duplicate events."
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
          THREE LAYERS OF IDEMPOTENCY · ENFORCED IN POSTGRES
        </text>

        {/* Left rail: incoming event arrow */}
        <g>
          <text
            x={ARROW_X}
            y={62}
            fontSize={12}
            letterSpacing={1.4}
            fill="var(--color-ink)"
            textAnchor="middle"
            fontWeight={600}
          >
            DUPLICATE
          </text>
          <text
            x={ARROW_X}
            y={78}
            fontSize={12}
            letterSpacing={1.4}
            fill="var(--color-ink)"
            textAnchor="middle"
            fontWeight={600}
          >
            EVENT
          </text>

          {/* Long vertical arrow through the stack */}
          <line
            x1={ARROW_X}
            y1={92}
            x2={ARROW_X}
            y2={LAYER_START_Y + LAYERS.length * (LAYER_H + LAYER_GAP) + 16}
            stroke="var(--color-ink)"
            strokeWidth={1.4}
          />
          <polygon
            points={`${ARROW_X - 6},${LAYER_START_Y + LAYERS.length * (LAYER_H + LAYER_GAP) + 10} ${ARROW_X + 6},${LAYER_START_Y + LAYERS.length * (LAYER_H + LAYER_GAP) + 10} ${ARROW_X},${LAYER_START_Y + LAYERS.length * (LAYER_H + LAYER_GAP) + 22}`}
            fill="var(--color-ink)"
          />
        </g>

        {/* Stack layers */}
        {LAYERS.map((layer, i) => {
          const y = LAYER_START_Y + i * (LAYER_H + LAYER_GAP);
          const cy = y + LAYER_H / 2;
          return (
            <g key={layer.table}>
              {/* Layer rectangle */}
              <rect
                x={LAYER_X}
                y={y}
                width={LAYER_W}
                height={LAYER_H}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={1.1}
                rx={3}
              />
              <rect
                x={LAYER_X}
                y={y}
                width={6}
                height={LAYER_H}
                fill="var(--color-terracotta)"
              />

              {/* Layer number */}
              <text
                x={LAYER_X + 28}
                y={y + 38}
                fontSize={32}
                fontWeight={700}
                fill="var(--color-terracotta)"
                style={{ fontFamily: "var(--font-display, var(--font-serif))" }}
              >
                0{i + 1}
              </text>

              {/* Table name */}
              <text
                x={LAYER_X + 92}
                y={y + 30}
                fontSize={18}
                fontWeight={700}
                fill="var(--color-ink)"
              >
                {layer.table}
              </text>
              {/* Constraint */}
              <text
                x={LAYER_X + 92}
                y={y + 54}
                fontSize={13}
                fill="var(--color-ink-muted)"
                letterSpacing={0.5}
              >
                {layer.constraint}
              </text>
              {/* Caption */}
              <text
                x={LAYER_X + 92}
                y={y + 86}
                fontSize={13}
                fill="var(--color-ink-muted)"
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {layer.caption}
              </text>

              {/* Rejection X mark on the arrow at this layer */}
              <g transform={`translate(${ARROW_X}, ${cy})`}>
                <circle r={12} fill="var(--color-paper)" stroke="var(--color-terracotta)" strokeWidth={1.4} />
                <text
                  x={0}
                  y={5}
                  fontSize={16}
                  fontWeight={700}
                  fill="var(--color-terracotta-deep)"
                  textAnchor="middle"
                >
                  ✕
                </text>
              </g>

              {/* Short connector line from arrow X to layer box */}
              <line
                x1={ARROW_X + 14}
                y1={cy}
                x2={LAYER_X - 4}
                y2={cy}
                stroke="var(--color-terracotta)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
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
          if all three pass: write proceeds.
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 2. Replay-as-no-op is a property of the database schema, not application code.
      </figcaption>
    </figure>
  );
}
