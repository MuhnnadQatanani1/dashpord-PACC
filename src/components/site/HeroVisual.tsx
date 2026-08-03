/**
 * Calm, institutional hero illustration:
 * outline map of Palestine, soft network lines behind it,
 * plus a small animated line chart and bar chart.
 * No glow, no futuristic effects — thin strokes and generous space.
 */
const HISTORIC_PALESTINE =
  "M180,52 L284,20 L280,90 L274,126 L270,190 L266,250 L264,300 L260,316 L270,380 L254,450 L240,490 L200,590 L170,690 L156,760 L144,772 L10,426 L20,400 L56,360 L90,310 L110,260 L126,206 L144,160 L158,104 L172,80 Z";
const WEST_BANK =
  "M222,164 L270,194 L266,250 L264,300 L256,326 L244,370 L230,398 L180,400 L150,370 L150,326 L186,296 L154,270 L158,238 L170,200 L186,176 Z";
const GAZA_STRIP =
  "M10,426 L30,414 L72,360 L56,352 L18,404 Z";

export function HeroVisual() {
  const linePoints = "0,46 26,34 52,38 78,22 104,26 130,10";
  const bars = [14, 26, 20, 34, 44];
  const BAR_COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#f87171"];

  return (
    <div className="w-full max-w-[420px]">
      <svg
        viewBox="0 0 320 380"
        className="h-auto w-full"
        role="img"
        aria-label="رسم توضيحي: خريطة فلسطين ومؤشرات بيانية"
      >
        {/* soft network lines */}
        <g stroke="#e6f7ef" strokeOpacity="0.28" strokeWidth="0.75" fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`h${i}`} d={`M8 ${40 + i * 48} C 110 ${20 + i * 48}, 210 ${70 + i * 48}, 312 ${34 + i * 48}`} />
          ))}
        </g>
        <g fill="#ffffff" fillOpacity="0.35">
          {Array.from({ length: 22 }).map((_, i) => (
            <circle key={`d${i}`} cx={16 + ((i * 61) % 296)} cy={30 + ((i * 83) % 330)} r="1.6" />
          ))}
        </g>

        {/* Palestine full historic map with West Bank and Gaza highlighted */}
        <g transform="translate(90 20) scale(0.4)">
          <path d={HISTORIC_PALESTINE} fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="5" strokeLinejoin="round" />
          <path d={WEST_BANK} fill="#34d399" fillOpacity="0.4" stroke="#34d399" strokeOpacity="0.95" strokeWidth="6" strokeLinejoin="round" />
          <path d={GAZA_STRIP} fill="#f87171" fillOpacity="0.45" stroke="#f87171" strokeOpacity="0.95" strokeWidth="5" strokeLinejoin="round" />
        </g>
        <text x="175" y="137" fontSize="7" fontWeight="700" fill="#ffffff" fillOpacity="0.85" textAnchor="middle">الضفة الغربية</text>
        <text x="106" y="184" fontSize="6" fontWeight="700" fill="#ffffff" fillOpacity="0.85" textAnchor="middle">قطاع غزة</text>

        {/* line chart card */}
        <g transform="translate(14 232)">
          <rect
            x="0"
            y="0"
            width="160"
            height="70"
            rx="10"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke="#ffffff"
            strokeOpacity="0.25"
          />
          <g transform="translate(14 12)">
            <line x1="0" y1="46" x2="132" y2="46" stroke="#ffffff" strokeOpacity="0.25" />
            <polyline
              className="chart-line-draw"
              points={linePoints}
              fill="none"
              stroke="#34d399"
              strokeOpacity="0.95"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* bar chart card */}
        <g transform="translate(186 232)">
          <rect
            x="0"
            y="0"
            width="120"
            height="70"
            rx="10"
            fill="#ffffff"
            fillOpacity="0.08"
            stroke="#ffffff"
            strokeOpacity="0.25"
          />
          <g transform="translate(16 12)">
            <line x1="0" y1="46" x2="90" y2="46" stroke="#ffffff" strokeOpacity="0.25" />
            {bars.map((h, i) => (
              <rect
                key={i}
                className="chart-bar-grow"
                x={i * 18}
                y={46 - h}
                width="9"
                height={h}
                rx="2"
                fill={BAR_COLORS[i % BAR_COLORS.length]}
                fillOpacity="0.95"
                style={{ transformOrigin: `${i * 18 + 4.5}px 46px`, animationDelay: `${i * 110}ms` }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
