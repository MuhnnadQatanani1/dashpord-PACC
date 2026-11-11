export function HeroVisual() {
  const linePoints = "0,46 26,34 52,38 78,22 104,26 130,10";
  const bars = [14, 26, 20, 34, 44];
  const BAR_COLORS = ["#132f56", "#c5a06c", "#a8875a", "#2a4d7d", "#d9bd93"];

  return (
    <div className="w-full max-w-[420px]">
      <svg
        viewBox="0 0 320 160"
        className="h-auto w-full"
        role="img"
        aria-label="رسم توضيحي لمؤشرات بيانية"
      >
        {/* soft network lines */}
        <g stroke="#e6d3ac" strokeOpacity="0.28" strokeWidth="0.75" fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={`h${i}`}
              d={`M8 ${40 + i * 48} C 110 ${20 + i * 48}, 210 ${70 + i * 48}, 312 ${34 + i * 48}`}
            />
          ))}
        </g>
        <g fill="#132f56" fillOpacity="0.22">
          {Array.from({ length: 22 }).map((_, i) => (
            <circle key={`d${i}`} cx={16 + ((i * 61) % 296)} cy={30 + ((i * 83) % 330)} r="1.6" />
          ))}
        </g>

        {/* line chart card */}
        <g transform="translate(14 45)">
          <rect
            x="0"
            y="0"
            width="160"
            height="70"
            rx="10"
            fill="#fbf8f1"
            fillOpacity="0.9"
            stroke="#eadfc4"
            strokeOpacity="1"
          />
          <g transform="translate(14 12)">
            <line x1="0" y1="46" x2="132" y2="46" stroke="#eadfc4" strokeOpacity="1" />
            <polyline
              className="chart-line-draw"
              points={linePoints}
              fill="none"
              stroke="#c5a06c"
              strokeOpacity="0.95"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* bar chart card */}
        <g transform="translate(186 45)">
          <rect
            x="0"
            y="0"
            width="120"
            height="70"
            rx="10"
            fill="#fbf8f1"
            fillOpacity="0.9"
            stroke="#eadfc4"
            strokeOpacity="1"
          />
          <g transform="translate(16 12)">
            <line x1="0" y1="46" x2="90" y2="46" stroke="#eadfc4" strokeOpacity="1" />
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
                style={{
                  transformOrigin: `${i * 18 + 4.5}px 46px`,
                  animationDelay: `${i * 110}ms`,
                }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
