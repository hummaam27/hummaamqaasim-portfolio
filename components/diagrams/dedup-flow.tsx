/**
 * DedupFlow — vertical decision flowchart for the daily-quiz v3 dedup engine.
 *
 * Designed to be readable by both technical and non-technical hiring managers:
 *   - Each gate keeps its technical title (cosine, Jaccard, LRU) so engineers
 *     see the right vocabulary.
 *   - Each gate has a plain-English subtitle that explains what the gate
 *     actually catches in human terms.
 *   - "REJECT" chips on the right are visually paired with their decision
 *     boxes via a short labeled arrow.
 *   - The whole flow is shifted slightly left so the rejects don't drag the
 *     visual center off to one side.
 */

const W = 1100;
const H = 820;

interface StepDef {
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
}

const STEPS: Record<string, StepDef> = {
  start:   { y: 60,  w: 360, h: 56, label: "Candidate quiz generated",                 sub: "an LLM proposes today's question" },
  embed:   { y: 156, w: 460, h: 60, label: "Embed · text-embedding-3-small · 512 dims" },
  cosine:  { y: 250, w: 460, h: 84, label: "Cosine similarity ≥ 0.85 vs history?",     sub: "the candidate means the same thing as a past quiz" },
  jaccard: { y: 388, w: 460, h: 84, label: "Jaccard ≥ 0.35 vs history?",               sub: "the candidate uses the same words as a past quiz" },
  lru:     { y: 526, w: 460, h: 84, label: "Subtopic used in the last 60 days?",       sub: "this angle was just covered recently" },
  accept:  { y: 663, w: 360, h: 64, label: "ACCEPT",                                   sub: "publish at 12:01 AM ET" },
};

// Shift main column 90px left of viewBox center so rejects on the right
// balance the composition.
const CENTER_X = W / 2 - 90;
const CHIP_GAP = 36; // gap from box right edge to chip left edge
const CHIP_W = 144;
const CHIP_H = 38;

export function DedupFlow() {
  return (
    <figure
      className="not-prose relative left-1/2 my-14 -translate-x-1/2"
      style={{ width: "min(96vw, 1180px)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Daily quiz v3 dedup decision flow with cosine, Jaccard, and subtopic LRU gates."
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
          DAILY QUIZ v3 · DEDUP DECISION FLOW
        </text>

        {/* Gates */}
        {(["start","embed","cosine","jaccard","lru","accept"] as const).map((key) => {
          const s = STEPS[key];
          const x = CENTER_X - s.w / 2;
          const isAccept = key === "accept";
          const isStart = key === "start";

          const stroke = isAccept ? "rgb(31, 122, 77)" : "var(--color-ink)";
          const strokeW = isAccept ? 1.6 : 1;
          const fill = isAccept ? "rgba(31, 122, 77, 0.10)" : "var(--color-paper-2)";

          return (
            <g key={key}>
              <rect
                x={x}
                y={s.y}
                width={s.w}
                height={s.h}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeW}
                rx={isStart || isAccept ? 30 : 4}
              />
              <text
                x={CENTER_X}
                y={s.sub ? s.y + s.h / 2 - 8 : s.y + s.h / 2 + 5}
                fontSize={isAccept ? 19 : 15}
                fontWeight={isAccept ? 700 : 600}
                fill={isAccept ? "rgb(20, 90, 56)" : "var(--color-ink)"}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {s.label}
              </text>
              {s.sub ? (
                <text
                  x={CENTER_X}
                  y={s.y + s.h / 2 + 15}
                  fontSize={13}
                  fill={isAccept ? "rgb(31, 122, 77)" : "var(--color-ink-muted)"}
                  textAnchor="middle"
                  fontStyle="italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.sub}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Vertical "no" connectors between consecutive gates */}
        {[
          { from: "start",   to: "embed" },
          { from: "embed",   to: "cosine" },
          { from: "cosine",  to: "jaccard", label: "no" },
          { from: "jaccard", to: "lru",     label: "no" },
          { from: "lru",     to: "accept",  label: "no" },
        ].map(({ from, to, label }) => {
          const f = STEPS[from];
          const t = STEPS[to];
          const y1 = f.y + f.h;
          const y2 = t.y;
          return (
            <g key={`${from}-${to}`}>
              <line x1={CENTER_X} y1={y1} x2={CENTER_X} y2={y2 - 6} stroke="var(--color-ink)" strokeWidth={1} />
              <polygon points={`${CENTER_X - 5},${y2 - 8} ${CENTER_X + 5},${y2 - 8} ${CENTER_X},${y2 + 1}`} fill="var(--color-ink)" />
              {label ? (
                <text
                  x={CENTER_X + 10}
                  y={(y1 + y2) / 2 + 4}
                  fontSize={12}
                  fill="var(--color-ink-muted)"
                  fontWeight={700}
                  letterSpacing={1.2}
                >
                  {label}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Reject chips — pair with each decision gate */}
        {(["cosine", "jaccard", "lru"] as const).map((key) => {
          const s = STEPS[key];
          const boxRight = CENTER_X + s.w / 2;
          const cy = s.y + s.h / 2;
          const chipX = boxRight + CHIP_GAP;
          const chipY = cy - CHIP_H / 2;
          const arrowStartX = boxRight;
          const arrowEndX = chipX - 4;
          return (
            <g key={`reject-${key}`}>
              {/* "yes" label above the arrow */}
              <text
                x={(arrowStartX + arrowEndX) / 2}
                y={cy - 8}
                fontSize={12}
                fill="var(--color-terracotta-deep)"
                fontWeight={700}
                letterSpacing={1.5}
                textAnchor="middle"
              >
                yes
              </text>
              {/* Branch arrow */}
              <line
                x1={arrowStartX}
                y1={cy}
                x2={arrowEndX - 4}
                y2={cy}
                stroke="var(--color-terracotta)"
                strokeWidth={1.4}
              />
              <polygon
                points={`${arrowEndX - 6},${cy - 5} ${arrowEndX - 6},${cy + 5} ${arrowEndX + 1},${cy}`}
                fill="var(--color-terracotta)"
              />
              {/* Reject chip — pill with terracotta tint */}
              <rect
                x={chipX}
                y={chipY}
                width={CHIP_W}
                height={CHIP_H}
                fill="rgba(185, 90, 58, 0.08)"
                stroke="var(--color-terracotta)"
                strokeWidth={1.3}
                rx={CHIP_H / 2}
              />
              <text
                x={chipX + CHIP_W / 2}
                y={chipY + CHIP_H / 2 + 5}
                fontSize={13}
                fontWeight={700}
                fill="var(--color-terracotta-deep)"
                textAnchor="middle"
                letterSpacing={2}
                dominantBaseline="middle"
              >
                REJECT
              </text>
            </g>
          );
        })}

        {/* Single curved "retry" arrow on the right showing that rejects
            loop back to a new candidate. Sweeps from the lowest reject
            chip up to the top, hugging the right margin. */}
        {(() => {
          const startCy = STEPS.lru.y + STEPS.lru.h / 2;
          const startCx = CENTER_X + STEPS.lru.w / 2 + CHIP_GAP + CHIP_W;
          const endCy = STEPS.start.y + STEPS.start.h / 2;
          const arcOutX = startCx + 32;
          const path = `M ${startCx} ${startCy}
                        C ${arcOutX} ${startCy}, ${arcOutX} ${endCy}, ${startCx} ${endCy}
                        L ${CENTER_X + STEPS.start.w / 2 + 6} ${endCy}`;
          return (
            <g>
              <path d={path} stroke="var(--color-terracotta)" strokeWidth={1.2} fill="none" strokeDasharray="3 4" />
              <polygon
                points={`${CENTER_X + STEPS.start.w / 2 + 8},${endCy - 5} ${CENTER_X + STEPS.start.w / 2 + 8},${endCy + 5} ${CENTER_X + STEPS.start.w / 2 + 1},${endCy}`}
                fill="var(--color-terracotta)"
              />
              <text
                x={arcOutX + 8}
                y={(startCy + endCy) / 2}
                fontSize={12}
                fill="var(--color-terracotta-deep)"
                fontWeight={600}
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                retry
              </text>
              <text
                x={arcOutX + 8}
                y={(startCy + endCy) / 2 + 16}
                fontSize={12}
                fill="var(--color-terracotta-deep)"
                fontWeight={600}
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                with new
              </text>
              <text
                x={arcOutX + 8}
                y={(startCy + endCy) / 2 + 32}
                fontSize={12}
                fill="var(--color-terracotta-deep)"
                fontWeight={600}
                fontStyle="italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                candidate
              </text>
            </g>
          );
        })()}

        {/* Footer */}
        <line
          x1={120}
          y1={H - 70}
          x2={W - 120}
          y2={H - 70}
          stroke="var(--color-rule-strong)"
          strokeWidth={0.7}
        />
        <text
          x={W / 2}
          y={H - 42}
          fontSize={14}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <tspan fontWeight={700} fontStyle="normal" fill="var(--color-terracotta-deep)" letterSpacing={1.5} style={{ fontFamily: "var(--font-mono)" }}>
            RESCUE
          </tspan>
          {"  on the final retry of the day, the Jaccard threshold relaxes from 0.35 to 0.60 so the cron never gets stuck."}
        </text>
        <text
          x={W / 2}
          y={H - 18}
          fontSize={12}
          fill="var(--color-ink-faint)"
          textAnchor="middle"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          strict by default · operational headroom on the bad day
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure 3. Three gates, one accept. A rejection sends the engine back to draft a new candidate.
      </figcaption>
    </figure>
  );
}
