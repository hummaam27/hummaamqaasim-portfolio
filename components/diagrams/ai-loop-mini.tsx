/**
 * AILoopMini — compact four-step banner diagram for the Imanic featured card.
 * Terracotta = human decision, gray = AI action, with an iterate loop-back.
 * The full seven-step loop lives in the case study body.
 */

const W = 480;
const H = 270;
const NODE_Y = 150;
const R = 27;
const PAD = 62;

const STEPS = [
  { label: "SPEC", actor: "human" as const },
  { label: "AI DRAFTS", actor: "ai" as const },
  { label: "REVIEW", actor: "human" as const },
  { label: "SHIP", actor: "human" as const },
];

function nodeX(i: number) {
  return PAD + (i * (W - 2 * PAD)) / (STEPS.length - 1);
}

export function AILoopMini() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="AI-directed loop: spec, AI drafts, review, ship — human-led with an iterate loop-back."
      className="block h-full w-full"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Title */}
      <text
        x={W / 2}
        y={34}
        fontSize={12}
        letterSpacing={3.5}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontWeight={700}
      >
        THE AI-DIRECTED LOOP
      </text>

      {/* Arrows between consecutive nodes */}
      {STEPS.slice(0, -1).map((_, i) => {
        const x1 = nodeX(i) + R + 4;
        const x2 = nodeX(i + 1) - R - 4;
        return (
          <g key={`arrow-${i}`}>
            <line
              x1={x1}
              y1={NODE_Y}
              x2={x2}
              y2={NODE_Y}
              stroke="var(--color-ink)"
              strokeWidth={1.1}
            />
            <polygon
              points={`${x2 - 6},${NODE_Y - 4} ${x2 - 6},${NODE_Y + 4} ${
                x2 + 1
              },${NODE_Y}`}
              fill="var(--color-ink)"
            />
          </g>
        );
      })}

      {/* Iterate loop-back: REVIEW → AI DRAFTS, arcing over the top */}
      {(() => {
        const xFrom = nodeX(2);
        const xTo = nodeX(1);
        const topY = NODE_Y - R - 30;
        const path = `M ${xFrom} ${NODE_Y - R} C ${xFrom} ${topY}, ${xTo} ${topY}, ${xTo} ${NODE_Y - R}`;
        return (
          <g>
            <path
              d={path}
              stroke="var(--color-terracotta)"
              strokeWidth={1.4}
              fill="none"
              strokeDasharray="2 3"
            />
            <polygon
              points={`${xTo - 4},${NODE_Y - R - 6} ${xTo + 4},${
                NODE_Y - R - 6
              } ${xTo},${NODE_Y - R + 1}`}
              fill="var(--color-terracotta)"
            />
            <text
              x={(xFrom + xTo) / 2}
              y={topY + 2}
              fontSize={12}
              fill="var(--color-terracotta-deep)"
              textAnchor="middle"
              fontStyle="italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              iterate
            </text>
          </g>
        );
      })()}

      {/* Step nodes */}
      {STEPS.map((step, i) => {
        const cx = nodeX(i);
        const isAI = step.actor === "ai";
        return (
          <g key={step.label}>
            <circle
              cx={cx}
              cy={NODE_Y}
              r={R}
              fill={isAI ? "var(--color-ink-muted)" : "var(--color-terracotta)"}
              stroke={
                isAI ? "var(--color-ink)" : "var(--color-terracotta-deep)"
              }
              strokeWidth={1.2}
            />
            <text
              x={cx}
              y={NODE_Y + 6}
              fontSize={17}
              fontWeight={700}
              fill="var(--color-paper)"
              textAnchor="middle"
            >
              {i + 1}
            </text>
            <text
              x={cx}
              y={NODE_Y + R + 22}
              fontSize={11}
              letterSpacing={1.2}
              fill="var(--color-ink)"
              textAnchor="middle"
              fontWeight={700}
            >
              {step.label}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform={`translate(${W / 2 - 92}, ${H - 22})`}>
        <circle cx={6} cy={0} r={5} fill="var(--color-terracotta)" />
        <text x={16} y={4} fontSize={10} fill="var(--color-ink-muted)">
          human
        </text>
        <circle cx={92} cy={0} r={5} fill="var(--color-ink-muted)" />
        <text x={102} y={4} fontSize={10} fill="var(--color-ink-muted)">
          AI
        </text>
      </g>
    </svg>
  );
}
