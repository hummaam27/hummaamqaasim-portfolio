/**
 * MetricDrift — visualizes the pre-lakehouse "this doesn't match that" problem:
 * 30+ Power BI reports, each with its own semantic model, each computing the
 * same metric ("gross margin") and arriving at a different number. Six sample
 * report cards on top; a shared scale below plots all 30 so the scatter — the
 * drift — is the whole point.
 */

const W = 1100;
const H = 470;

// Six sample reports — same metric label, six different answers.
const CARDS = [
  { value: "18.2%", num: 18.2, bars: [22, 30, 26, 34, 28] },
  { value: "19.7%", num: 19.7, bars: [18, 24, 31, 27, 35] },
  { value: "17.4%", num: 17.4, bars: [30, 26, 20, 28, 24] },
  { value: "20.3%", num: 20.3, bars: [24, 32, 28, 36, 30] },
  { value: "18.9%", num: 18.9, bars: [28, 22, 30, 25, 33] },
  { value: "16.8%", num: 16.8, bars: [26, 30, 24, 21, 27] },
];

// The remaining ~24 reports — plotted as faint dots only, to total 30+.
const EXTRA = [
  17.1, 17.6, 18.0, 18.4, 18.6, 18.8, 19.0, 19.2, 19.5, 19.9, 20.0, 20.6,
  16.5, 17.8, 18.1, 18.3, 18.7, 19.1, 19.4, 19.8, 20.1, 20.4, 17.3, 21.0,
];

// Scale: margin % → x pixel.
const AXIS_MIN = 15;
const AXIS_MAX = 22;
const AXIS_X0 = 110;
const AXIS_X1 = 990;
const AXIS_Y = 388;

function scaleX(v: number) {
  return (
    AXIS_X0 + ((v - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * (AXIS_X1 - AXIS_X0)
  );
}

export function MetricDrift() {
  const cardW = 130;
  const gap = (AXIS_X1 - AXIS_X0 - 6 * cardW) / 5;
  const cardY = 70;
  const cardH = 158;

  return (
    <figure className="not-prose figure-wide my-14">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="One metric, thirty reports: each Power BI report computes gross margin differently, producing thirty different answers."
        className="block h-auto w-full"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Title */}
        <text
          x={W / 2}
          y={32}
          fontSize={14}
          letterSpacing={4}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontWeight={700}
        >
          ONE METRIC · 30+ REPORTS · 30+ ANSWERS
        </text>

        {/* Sample report cards */}
        {CARDS.map((card, i) => {
          const x = AXIS_X0 + i * (cardW + gap);
          const cx = x + cardW / 2;
          return (
            <g key={i}>
              {/* Card body */}
              <rect
                x={x}
                y={cardY}
                width={cardW}
                height={cardH}
                rx={4}
                fill="var(--color-paper-2)"
                stroke="var(--color-ink)"
                strokeWidth={0.9}
              />
              {/* Header strip */}
              <rect
                x={x}
                y={cardY}
                width={cardW}
                height={26}
                rx={4}
                fill="var(--color-terracotta)"
                fillOpacity={0.12}
              />
              <rect
                x={x}
                y={cardY + 14}
                width={cardW}
                height={12}
                fill="var(--color-terracotta)"
                fillOpacity={0.12}
              />
              <text
                x={cx}
                y={cardY + 17}
                fontSize={9.5}
                letterSpacing={1.6}
                fill="var(--color-terracotta-deep)"
                textAnchor="middle"
                fontWeight={600}
              >
                GROSS MARGIN
              </text>
              {/* The KPI number — the part that disagrees */}
              <text
                x={cx}
                y={cardY + 72}
                fontSize={34}
                fontWeight={700}
                fill="var(--color-terracotta-deep)"
                textAnchor="middle"
              >
                {card.value}
              </text>
              {/* Mini bar chart so each card reads as a distinct report */}
              {card.bars.map((bh, bi) => {
                const bw = 14;
                const bgap = 6;
                const totalBW = card.bars.length * bw + (card.bars.length - 1) * bgap;
                const bx = cx - totalBW / 2 + bi * (bw + bgap);
                const baseY = cardY + cardH - 20;
                return (
                  <rect
                    key={bi}
                    x={bx}
                    y={baseY - bh}
                    width={bw}
                    height={bh}
                    fill="var(--color-ink-faint)"
                  />
                );
              })}
              {/* Connector from card down to its dot on the scale */}
              <line
                x1={cx}
                y1={cardY + cardH}
                x2={scaleX(card.num)}
                y2={AXIS_Y - 7}
                stroke="var(--color-terracotta)"
                strokeWidth={0.8}
                strokeDasharray="2 3"
                opacity={0.55}
              />
            </g>
          );
        })}

        {/* Shared scale */}
        <line
          x1={AXIS_X0}
          y1={AXIS_Y}
          x2={AXIS_X1}
          y2={AXIS_Y}
          stroke="var(--color-ink)"
          strokeWidth={1}
        />
        {[15, 16, 17, 18, 19, 20, 21, 22].map((tick) => (
          <g key={tick}>
            <line
              x1={scaleX(tick)}
              y1={AXIS_Y}
              x2={scaleX(tick)}
              y2={AXIS_Y + 6}
              stroke="var(--color-ink-muted)"
              strokeWidth={1}
            />
            <text
              x={scaleX(tick)}
              y={AXIS_Y + 20}
              fontSize={11}
              fill="var(--color-ink-muted)"
              textAnchor="middle"
            >
              {tick}%
            </text>
          </g>
        ))}

        {/* The other ~24 reports — faint dots */}
        {EXTRA.map((v, i) => (
          <circle
            key={i}
            cx={scaleX(v)}
            cy={AXIS_Y - 7}
            r={4}
            fill="var(--color-ink-faint)"
            opacity={0.7}
          />
        ))}

        {/* The six sample reports — terracotta dots, sitting on the axis */}
        {CARDS.map((card, i) => (
          <circle
            key={i}
            cx={scaleX(card.num)}
            cy={AXIS_Y - 7}
            r={5.5}
            fill="var(--color-terracotta)"
            stroke="var(--color-paper)"
            strokeWidth={1}
          />
        ))}

        {/* Drift caption under the axis */}
        <text
          x={W / 2}
          y={AXIS_Y + 46}
          fontSize={13}
          fill="var(--color-ink-muted)"
          textAnchor="middle"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Same KPI, computed thirty ways — a 4-point spread and no source of truth.
        </text>
      </svg>

      <figcaption
        className="mt-4 text-center text-[13px] italic text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Figure. Thirty semantic models, thirty definitions of one number — the
        structural root of every &ldquo;this doesn&rsquo;t match that.&rdquo;
      </figcaption>
    </figure>
  );
}
