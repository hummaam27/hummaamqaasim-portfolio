/**
 * Storyboard — a four-beat visual summary that sits at the top of a case study
 * as a full-width breakout. A reader skimming the page absorbs the whole arc
 * from four panels, each carrying one small diagram — no summary paragraph,
 * so it's a picture of the story, not a TL;DR of it.
 *
 * The generic <Storyboard> renders the layout; each case study supplies its
 * own four beats and its own per-beat visuals below.
 */

import type { ComponentType } from "react";

interface Beat {
  kicker: string;
  headline: string;
  detail: string;
  Visual: ComponentType;
}

function Storyboard({ kicker, beats }: { kicker: string; beats: Beat[] }) {
  return (
    <section aria-label={kicker} className="not-prose figure-wide my-12">
      <div className="mb-6 flex items-center gap-3">
        <span
          aria-hidden
          className="block h-[2px] w-10"
          style={{ backgroundColor: "var(--color-terracotta)" }}
        />
        <span className="mono text-[10.5px] tracking-[0.22em] uppercase text-(--color-terracotta)">
          {kicker}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-px sm:overflow-hidden sm:rounded-lg sm:bg-(--color-rule) sm:grid-cols-2 xl:grid-cols-4">
        {beats.map((beat, i) => (
          <div
            key={beat.kicker}
            className="flex flex-col rounded-lg border border-(--color-rule) bg-(--color-paper-2) p-5 sm:rounded-none sm:border-0"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="mono text-[11px] font-semibold tabular-nums text-(--color-terracotta)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="h-px flex-1"
                style={{ backgroundColor: "var(--color-rule)" }}
              />
            </div>

            <div className="mb-4 h-[88px] rounded-md bg-(--color-paper-3) p-2 sm:h-[112px]">
              <beat.Visual />
            </div>

            <p className="mono text-[10px] tracking-[0.2em] uppercase text-(--color-ink-muted)">
              {beat.kicker}
            </p>
            <h3 className="mt-1.5 font-display-mid text-[19px] leading-[1.15] tracking-[-0.01em] text-(--color-ink)">
              {beat.headline}
            </h3>
            <p className="mt-2 font-serif text-[13.5px] leading-[1.5] text-(--color-ink-muted)">
              {beat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===========================================================================
   MEDALLION LAKEHOUSE — mess, move, build, result
   =========================================================================== */

/** Beat 1 — six source documents, scattered and askew: the manual mess. */
function MessVisual() {
  const docs = [
    { x: 22, y: 36, r: -9, front: false },
    { x: 104, y: 24, r: 8, front: false },
    { x: 142, y: 60, r: 14, front: false },
    { x: 66, y: 64, r: -4, front: true },
  ];
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {docs.map((d, i) => (
        <g key={i} transform={`rotate(${d.r} ${d.x + 29} ${d.y + 20})`}>
          <rect
            x={d.x}
            y={d.y}
            width={58}
            height={42}
            rx={2}
            fill="var(--color-paper-2)"
            stroke={d.front ? "var(--color-terracotta)" : "var(--color-ink-faint)"}
            strokeWidth={d.front ? 1.8 : 1}
          />
          {[12, 20, 28].map((dy) => (
            <line
              key={dy}
              x1={d.x + 9}
              y1={d.y + dy}
              x2={d.x + 49}
              y2={d.y + dy}
              stroke={d.front ? "var(--color-terracotta)" : "var(--color-ink-faint)"}
              strokeWidth={1.4}
              opacity={d.front ? 0.6 : 0.5}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Beat 2 — four scattered inputs converging into one clean block. */
function ConvergeVisual() {
  const ins = [26, 62, 98];
  const target = { x: 156, y: 50, w: 56, h: 44 };
  const tx = target.x;
  const ty = target.y + target.h / 2;
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {ins.map((y, i) => (
        <g key={i}>
          <rect
            x={18}
            y={y - 13}
            width={42}
            height={26}
            rx={2}
            fill="var(--color-paper-2)"
            stroke="var(--color-ink-faint)"
            strokeWidth={1}
          />
          <line
            x1={62}
            y1={y}
            x2={tx - 8}
            y2={ty}
            stroke="var(--color-ink-muted)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        </g>
      ))}
      <polygon
        points={`${tx - 9},${ty - 5} ${tx - 9},${ty + 5} ${tx - 1},${ty}`}
        fill="var(--color-terracotta)"
      />
      <rect
        x={target.x}
        y={target.y}
        width={target.w}
        height={target.h}
        rx={3}
        fill="var(--color-terracotta)"
        fillOpacity={0.12}
        stroke="var(--color-terracotta)"
        strokeWidth={1.8}
      />
      <text
        x={target.x + target.w / 2}
        y={ty + 4}
        fontSize={12}
        fontWeight={700}
        letterSpacing={1.5}
        fill="var(--color-terracotta-deep)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ONE
      </text>
    </svg>
  );
}

/** Beat 3 — the bronze / silver / gold medallion stack. */
function StackVisual() {
  const bands = [
    { y: 16, label: "BRONZE", fill: "rgba(184,115,51,0.16)", stroke: "rgba(184,115,51,0.5)" },
    { y: 56, label: "SILVER", fill: "rgba(120,124,130,0.16)", stroke: "rgba(120,124,130,0.5)" },
    { y: 96, label: "GOLD", fill: "rgba(200,154,61,0.2)", stroke: "rgba(200,154,61,0.6)" },
  ];
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {bands.map((b, i) => (
        <g key={b.label}>
          <rect
            x={36}
            y={b.y}
            width={160}
            height={30}
            rx={3}
            fill={b.fill}
            stroke={b.stroke}
            strokeWidth={1.1}
          />
          <text
            x={116}
            y={b.y + 19}
            fontSize={11}
            fontWeight={700}
            letterSpacing={2.5}
            fill="var(--color-ink)"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {b.label}
          </text>
          {i < bands.length - 1 ? (
            <polygon
              points={`${116 - 6},${b.y + 33} ${116 + 6},${b.y + 33} ${116},${b.y + 41}`}
              fill="var(--color-terracotta)"
            />
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/** Beat 4 — checkmark badge with 99.5% reconciliation match. */
function GaugeVisual() {
  const cx = 116;
  const cy = 46;
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {/* Shield / badge shape */}
      <path
        d={`M${cx} 8 L${cx + 36} 26 L${cx + 36} 58 Q${cx + 36} 84 ${cx} 92 Q${cx - 36} 84 ${cx - 36} 58 L${cx - 36} 26 Z`}
        fill="var(--color-terracotta)"
        fillOpacity={0.10}
        stroke="var(--color-terracotta)"
        strokeWidth={1.4}
      />
      {/* Checkmark */}
      <polyline
        points={`${cx - 12},${cy + 2} ${cx - 3},${cy + 12} ${cx + 14},${cy - 8}`}
        fill="none"
        stroke="var(--color-terracotta-deep)"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 99.5% below the shield */}
      <text
        x={cx}
        y={118}
        fontSize={20}
        fontWeight={700}
        fill="var(--color-terracotta-deep)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        99.5%
      </text>
      <text
        x={cx}
        y={133}
        fontSize={9}
        letterSpacing={2.5}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        RECONCILED
      </text>
    </svg>
  );
}

const MEDALLION_BEATS: Beat[] = [
  {
    kicker: "The mess",
    headline: "Six systems, no shared language",
    detail:
      "Six VMS platforms, each with its own data shape and change semantics. Reporting ran on email and spreadsheets.",
    Visual: MessVisual,
  },
  {
    kicker: "The move",
    headline: "One architecture on Fabric",
    detail:
      "Build a Medallion architecture and a governed semantic model. One source of truth.",
    Visual: ConvergeVisual,
  },
  {
    kicker: "The build",
    headline: "Bronze → Silver → Gold",
    detail:
      "Six vendor schemas, canonicalized into one governed star schema. Each source ingested on its own terms.",
    Visual: StackVisual,
  },
  {
    kicker: "The result",
    headline: "99.5%+, and the ritual's gone",
    detail:
      "Reconciled across four years of history. 30+ reports on one governed model. Still scaling.",
    Visual: GaugeVisual,
  },
];

export function MedallionStoryboard() {
  return <Storyboard kicker="The story in four beats" beats={MEDALLION_BEATS} />;
}

/* ===========================================================================
   IMANIC — the bet, the method, the hard part, the result
   =========================================================================== */

/** Beat 1 — the architect directs, the AI writes. */
function DirectVisual() {
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {/* Architect node */}
      <circle
        cx={62}
        cy={56}
        r={30}
        fill="var(--color-terracotta)"
        stroke="var(--color-terracotta-deep)"
        strokeWidth={1.2}
      />
      <text
        x={62}
        y={61}
        fontSize={14}
        fontWeight={700}
        fill="var(--color-paper)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        YOU
      </text>
      <text
        x={62}
        y={104}
        fontSize={9.5}
        letterSpacing={1.6}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontWeight={600}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ARCHITECT
      </text>

      {/* AI node */}
      <circle
        cx={170}
        cy={56}
        r={26}
        fill="var(--color-ink-muted)"
        stroke="var(--color-ink)"
        strokeWidth={1.2}
      />
      <text
        x={170}
        y={61}
        fontSize={13}
        fontWeight={700}
        fill="var(--color-paper)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        AI
      </text>
      <text
        x={170}
        y={104}
        fontSize={9.5}
        letterSpacing={1.6}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontWeight={600}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        WRITES CODE
      </text>

      {/* directs → */}
      <line x1={94} y1={47} x2={140} y2={47} stroke="var(--color-ink)" strokeWidth={1.1} />
      <polygon points="140,43 140,51 147,47" fill="var(--color-ink)" />
      <text
        x={117}
        y={39}
        fontSize={10}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontStyle="italic"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        directs
      </text>

      {/* ← review */}
      <line
        x1={146}
        y1={68}
        x2={97}
        y2={68}
        stroke="var(--color-terracotta)"
        strokeWidth={1.1}
        strokeDasharray="2 3"
      />
      <polygon points="97,64 97,72 90,68" fill="var(--color-terracotta)" />
      <text
        x={119}
        y={84}
        fontSize={10}
        fill="var(--color-terracotta-deep)"
        textAnchor="middle"
        fontStyle="italic"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        review &amp; push back
      </text>
    </svg>
  );
}

/** Beat 2 — the four-step AI-directed loop with an iterate loop-back. */
function LoopVisual() {
  const steps = [
    { label: "SPEC", ai: false },
    { label: "DRAFT", ai: true },
    { label: "REVIEW", ai: false },
    { label: "SHIP", ai: false },
  ];
  const y = 64;
  const r = 17;
  // even spacing across the viewBox
  const X = (i: number) => 30 + i * 58;
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {/* arrows */}
      {steps.slice(0, -1).map((_, i) => (
        <g key={i}>
          <line
            x1={X(i) + r + 3}
            y1={y}
            x2={X(i + 1) - r - 3}
            y2={y}
            stroke="var(--color-ink)"
            strokeWidth={1.1}
          />
          <polygon
            points={`${X(i + 1) - r - 3},${y - 4} ${X(i + 1) - r - 3},${y + 4} ${X(i + 1) - r + 3},${y}`}
            fill="var(--color-ink)"
          />
        </g>
      ))}
      {/* iterate loop-back: REVIEW → DRAFT */}
      {(() => {
        const xF = X(2);
        const xT = X(1);
        const topY = y - r - 22;
        return (
          <g>
            <path
              d={`M ${xF} ${y - r} C ${xF} ${topY}, ${xT} ${topY}, ${xT} ${y - r}`}
              stroke="var(--color-terracotta)"
              strokeWidth={1.3}
              fill="none"
              strokeDasharray="2 3"
            />
            <polygon
              points={`${xT - 4},${y - r - 5} ${xT + 4},${y - r - 5} ${xT},${y - r + 1}`}
              fill="var(--color-terracotta)"
            />
            <text
              x={(xF + xT) / 2}
              y={topY + 1}
              fontSize={9.5}
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
      {/* nodes */}
      {steps.map((s, i) => (
        <g key={s.label}>
          <circle
            cx={X(i)}
            cy={y}
            r={r}
            fill={s.ai ? "var(--color-ink-muted)" : "var(--color-terracotta)"}
            stroke={s.ai ? "var(--color-ink)" : "var(--color-terracotta-deep)"}
            strokeWidth={1.1}
          />
          <text
            x={X(i)}
            y={y + 5}
            fontSize={12}
            fontWeight={700}
            fill="var(--color-paper)"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {i + 1}
          </text>
          <text
            x={X(i)}
            y={y + r + 16}
            fontSize={8.5}
            letterSpacing={1}
            fill="var(--color-ink)"
            textAnchor="middle"
            fontWeight={700}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Beat 3 — three production race conditions hardened into a DB constraint. */
function HardenVisual() {
  const warnY = [30, 66, 102];
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      {/* three warning triangles */}
      {warnY.map((cy, i) => (
        <g key={i}>
          <polygon
            points={`46,${cy - 13} 33,${cy + 10} 59,${cy + 10}`}
            fill="var(--color-terracotta)"
            fillOpacity={0.14}
            stroke="var(--color-terracotta)"
            strokeWidth={1.4}
          />
          <text
            x={46}
            y={cy + 7}
            fontSize={12}
            fontWeight={700}
            fill="var(--color-terracotta-deep)"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            !
          </text>
        </g>
      ))}
      {/* arrow */}
      <line x1={70} y1={66} x2={120} y2={66} stroke="var(--color-ink)" strokeWidth={1.1} />
      <polygon points="120,62 120,70 127,66" fill="var(--color-ink)" />

      {/* database cylinder — constraint enforced in Postgres */}
      <g>
        <ellipse cx={172} cy={38} rx={30} ry={9} fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth={1.1} />
        <path
          d="M 142 38 L 142 86 A 30 9 0 0 0 202 86 L 202 38"
          fill="var(--color-paper-2)"
          stroke="var(--color-ink)"
          strokeWidth={1.1}
        />
        <ellipse cx={172} cy={86} rx={30} ry={9} fill="none" stroke="var(--color-ink)" strokeWidth={1.1} />
        <text
          x={172}
          y={66}
          fontSize={9.5}
          fontWeight={700}
          letterSpacing={1}
          fill="var(--color-terracotta-deep)"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          UNIQUE
        </text>
      </g>
      <text
        x={172}
        y={112}
        fontSize={9}
        letterSpacing={1.6}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontWeight={600}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ENFORCED IN POSTGRES
      </text>
    </svg>
  );
}

/** Beat 4 — eleven months of evenings, ~900 source files, shipped. */
function ShippedVisual() {
  return (
    <svg viewBox="0 0 232 140" className="h-full w-full" aria-hidden="true">
      <text
        x={116}
        y={44}
        fontSize={32}
        fontWeight={700}
        fill="var(--color-terracotta-deep)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        ~900
      </text>
      <text
        x={116}
        y={60}
        fontSize={9}
        letterSpacing={2.5}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        SOURCE FILES
      </text>
      {/* eleven month bars — last one is the ship */}
      {Array.from({ length: 11 }).map((_, i) => {
        const bw = 11;
        const gap = 6;
        const total = 11 * bw + 10 * gap;
        const x = 116 - total / 2 + i * (bw + gap);
        const h = 14 + i * 2;
        const last = i === 10;
        return (
          <rect
            key={i}
            x={x}
            y={108 - h}
            width={bw}
            height={h}
            rx={1.5}
            fill={last ? "var(--color-terracotta)" : "var(--color-ink-faint)"}
          />
        );
      })}
      <text
        x={116}
        y={126}
        fontSize={9}
        letterSpacing={1.8}
        fill="var(--color-ink-muted)"
        textAnchor="middle"
        fontWeight={600}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        11 MONTHS · EVENINGS &amp; WEEKENDS
      </text>
    </svg>
  );
}

const IMANIC_BEATS: Beat[] = [
  {
    kicker: "The bet",
    headline: "Architect it, don't type it",
    detail:
      "Direct Claude Code to write the implementations — keep every architecture, schema, and trade-off decision human.",
    Visual: DirectVisual,
  },
  {
    kicker: "The method",
    headline: "Spec → draft → review → ship",
    detail:
      "Every feature through one loop, on a dev workspace walled off from production. The AI never touches prod.",
    Visual: LoopVisual,
  },
  {
    kicker: "The hard part",
    headline: "Production teaches what AI can't",
    detail:
      "Three Stripe race conditions in one morning. The senior's job: know which uncommon failures will burn you.",
    Visual: HardenVisual,
  },
  {
    kicker: "The result",
    headline: "11 months, ~900 files, shipped",
    detail:
      "A multi-tenant, production-grade SaaS to feature-complete — evenings and weekends, alongside a day job.",
    Visual: ShippedVisual,
  },
];

export function ImanicStoryboard() {
  return <Storyboard kicker="The story in four beats" beats={IMANIC_BEATS} />;
}
