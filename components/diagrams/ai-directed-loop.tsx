/**
 * AIDirectedLoop — horizontal workflow diagram for the AI-directed engineering
 * loop. Seven steps, terracotta = human decision, gray = AI action, with a
 * dashed dev/prod boundary near the end of the sequence.
 */

const W = 1100;
const H = 360;

interface Step {
  n: number;
  label: string;
  actor: "human" | "ai";
  sub?: string[]; // up to two short lines that wrap under the label
}

const STEPS: Step[] = [
  { n: 1, label: "WRITTEN SPEC",   actor: "human", sub: ["what to build,", "what to test"] },
  { n: 2, label: "AI DRAFTS",      actor: "ai",    sub: ["feature branch,", "dev workspace"] },
  { n: 3, label: "REVIEW DIFF",    actor: "human", sub: ["vs architecture"] },
  { n: 4, label: "PUSH BACK",      actor: "human", sub: ["until correct"] },
  { n: 5, label: "RUN TESTS",      actor: "human", sub: ["behavior proof"] },
  { n: 6, label: "OPEN PR",        actor: "human", sub: ["git review"] },
  { n: 7, label: "MERGE → DEPLOY", actor: "human", sub: ["build to prod"] },
];

const PAD_X = 70;
const NODE_R = 32;
const NODE_Y = 165;

function nodeX(i: number, total: number) {
  const usable = W - 2 * PAD_X;
  return PAD_X + (i * usable) / (total - 1);
}

export function AIDirectedLoop() {
  return (
    <figure
      className="not-prose relative left-1/2 my-14 -translate-x-1/2"
      style={{ width: "min(96vw, 1180px)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="AI-directed engineering loop: seven steps, human-led with one AI implementation step."
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
          THE AI-DIRECTED LOOP
        </text>

        {/* Dev / Prod boundary band — vertical dashed line between step 6 and 7 */}
        {(() => {
          const boundaryX = (nodeX(5, STEPS.length) + nodeX(6, STEPS.length)) / 2;
          return (
            <g>
              <line
                x1={boundaryX}
                y1={88}
                x2={boundaryX}
                y2={H - 60}
                stroke="var(--color-ink-muted)"
                strokeWidth={1}
                strokeDasharray="4 5"
              />
              <text
                x={boundaryX - 8}
                y={92}
                fontSize={11}
                letterSpacing={2.5}
                fill="var(--color-ink-muted)"
                textAnchor="end"
                fontWeight={600}
              >
                DEV WORKSPACE
              </text>
              <text
                x={boundaryX + 8}
                y={92}
                fontSize={11}
                letterSpacing={2.5}
                fill="var(--color-ink-muted)"
                textAnchor="start"
                fontWeight={600}
              >
                PRODUCTION
              </text>
            </g>
          );
        })()}

        {/* Arrows between consecutive steps */}
        {STEPS.slice(0, -1).map((_, i) => {
          const x1 = nodeX(i, STEPS.length) + NODE_R + 4;
          const x2 = nodeX(i + 1, STEPS.length) - NODE_R - 4;
          return (
            <g key={`arrow-${i}`}>
              <line
                x1={x1}
                y1={NODE_Y}
                x2={x2}
                y2={NODE_Y}
                stroke="var(--color-ink)"
                strokeWidth={1}
              />
              <polygon
                points={`${x2 - 6},${NODE_Y - 4} ${x2 - 6},${NODE_Y + 4} ${x2 + 1},${NODE_Y}`}
                fill="var(--color-ink)"
              />
            </g>
          );
        })}

        {/* Loop-back arrow from step 4 → step 2 (push back, AI re-drafts) */}
        {(() => {
          const x4 = nodeX(3, STEPS.length);
          const x2 = nodeX(1, STEPS.length);
          const topY = NODE_Y - NODE_R - 18;
          const path = `M ${x4} ${NODE_Y - NODE_R} C ${x4} ${topY - 30}, ${x2} ${topY - 30}, ${x2} ${NODE_Y - NODE_R}`;
          return (
            <g>
              <path d={path} stroke="var(--color-terracotta)" strokeWidth={1.4} fill="none" strokeDasharray="2 3" />
              <polygon
                points={`${x2 - 4},${NODE_Y - NODE_R - 6} ${x2 + 4},${NODE_Y - NODE_R - 6} ${x2},${NODE_Y - NODE_R + 1}`}
                fill="var(--color-terracotta)"
              />
              <text
                x={(x4 + x2) / 2}
                y={topY - 36}
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
          const cx = nodeX(i, STEPS.length);
          const fill = step.actor === "ai" ? "var(--color-ink-muted)" : "var(--color-terracotta)";
          return (
            <g key={step.n}>
              <circle
                cx={cx}
                cy={NODE_Y}
                r={NODE_R}
                fill={fill}
                stroke={step.actor === "ai" ? "var(--color-ink)" : "var(--color-terracotta-deep)"}
                strokeWidth={1.2}
              />
              <text
                x={cx}
                y={NODE_Y + 5}
                fontSize={20}
                fontWeight={700}
                fill="var(--color-paper)"
                textAnchor="middle"
              >
                {step.n}
              </text>
              <text
                x={cx}
                y={NODE_Y + NODE_R + 22}
                fontSize={12}
                letterSpacing={1.4}
                fill="var(--color-ink)"
                textAnchor="middle"
                fontWeight={700}
              >
                {step.label}
              </text>
              {step.sub
                ? step.sub.map((line, lineIdx) => (
                    <text
                      key={`${step.n}-sub-${lineIdx}`}
                      x={cx}
                      y={NODE_Y + NODE_R + 40 + lineIdx * 15}
                      fontSize={11}
                      fill="var(--color-ink-muted)"
                      textAnchor="middle"
                      fontStyle="italic"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {line}
                    </text>
                  ))
                : null}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD_X}, ${H - 32})`}>
          <circle cx={8} cy={0} r={6} fill="var(--color-terracotta)" />
          <text x={20} y={4} fontSize={11} fill="var(--color-ink-muted)">human decision</text>
          <circle cx={158} cy={0} r={6} fill="var(--color-ink-muted)" />
          <text x={170} y={4} fontSize={11} fill="var(--color-ink-muted)">AI action</text>
        </g>

        {/* Right-side note */}
        <text
          x={W - PAD_X}
          y={H - 28}
          fontSize={12}
          fill="var(--color-ink-muted)"
          textAnchor="end"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          AI never runs against production.
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 1. Direction, review, and judgment are mine; implementation throughput is the AI&apos;s.
      </figcaption>
    </figure>
  );
}
