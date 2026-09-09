import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PalestineMapProps, GovernorateStat } from "@/types/map";
import { governorateStats } from "@/data/governorate-stats";
import { palestineMapPaths, type PalestineMapPath } from "@/data/palestine-svg-paths";
import { useLocale } from "@/i18n";

interface MapTip {
  nameAr: string;
  nameEn: string;
  stat: GovernorateStat | undefined;
  x: number;
  y: number;
}

type HoverEvent = React.MouseEvent<SVGPathElement>;

const VIEWBOX_WIDTH = 294.61548;
const VIEWBOX_HEIGHT = 792.60669;
const NO_DATA_FILL = "#e9efec";

const CENTROIDS: Record<string, [number, number]> = {
  "PS-JEN": [175, 211],
  "PS-TKM": [153, 223],
  "PS-TBS": [211, 231],
  "PS-QQA": [146, 255],
  "PS-NBS": [185, 257],
  "PS-SLT": [155, 271],
  "PS-JRH": [210, 293],
  "PS-RBH": [174, 301],
  "PS-JEM": [186, 332],
  "PS-BTH": [180, 366],
  "PS-HBN": [161, 385],
  "PS-NGZ": [46, 387],
  "PS-GZA": [37, 394],
  "PS-DEB": [24, 410],
  "PS-KYS": [15, 425],
  "PS-RFH": [10, 435],
};

const COLOR_STOPS: Array<[number, [number, number, number]]> = [
  [0, [191, 232, 210]],
  [0.5, [43, 170, 117]],
  [1, [22, 101, 52]],
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function colorFor(t: number): string {
  const x = Math.max(0, Math.min(1, t));
  const [s0, c0] = COLOR_STOPS[0];
  const [s1, c1] = COLOR_STOPS[1];
  const [s2, c2] = COLOR_STOPS[2];
  if (x <= s1) {
    const u = (x - s0) / (s1 - s0);
    return `rgb(${lerp(c0[0], c1[0], u)}, ${lerp(c0[1], c1[1], u)}, ${lerp(c0[2], c1[2], u)})`;
  }
  const u = (x - s1) / (s2 - s1);
  return `rgb(${lerp(c1[0], c2[0], u)}, ${lerp(c1[1], c2[1], u)}, ${lerp(c1[2], c2[2], u)})`;
}

export function PalestineMap({ stats, selectedAr, onGovernorateClick }: PalestineMapProps) {
  const { locale, pick } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<MapTip | null>(null);
  const [hoveredAr, setHoveredAr] = useState<string | null>(null);
  const [activeAr, setActiveAr] = useState<string | null>(selectedAr ?? null);
  const prevSelected = useRef<string | null | undefined>(selectedAr);

  const governorates = useMemo(() => palestineMapPaths.filter((p) => p.enabled), []);
  const backgrounds = useMemo(() => palestineMapPaths.filter((p) => !p.enabled), []);

  const areas = useMemo(() => {
    const base = stats ?? governorateStats;
    const max = Math.max(1, ...Object.values(base).map((s) => s.complaints));
    return governorates.map((p) => {
      const stat = base[p.nameAr];
      const t = stat ? Math.pow(stat.complaints / max, 0.8) : 0;
      return { ...p, stat, fill: stat ? colorFor(t) : NO_DATA_FILL };
    });
  }, [governorates, stats]);

  useEffect(() => {
    if (selectedAr !== prevSelected.current) {
      setActiveAr(selectedAr ?? null);
      prevSelected.current = selectedAr;
    }
  }, [selectedAr]);

  const effectiveActive = selectedAr ?? activeAr;

  const viewToClient = useCallback((viewX: number, viewY: number, rect: DOMRect) => {
    const scale = Math.min(rect.width / VIEWBOX_WIDTH, rect.height / VIEWBOX_HEIGHT);
    const offsetX = (rect.width - VIEWBOX_WIDTH * scale) / 2;
    const offsetY = (rect.height - VIEWBOX_HEIGHT * scale) / 2;
    return { x: offsetX + viewX * scale, y: offsetY + viewY * scale };
  }, []);

  const placeTip = useCallback(
    (x: number, y: number, area: PalestineMapPath, stat?: GovernorateStat) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        setTip(null);
        return;
      }
      const tipWidth = 190;
      const tipHeight = 64;
      const px = Math.max(8, Math.min(x + 14, rect.width - tipWidth - 8));
      const py = Math.max(8, Math.min(y - tipHeight - 10, rect.height - tipHeight - 8));
      setTip({ nameAr: area.nameAr, nameEn: area.nameEn, stat, x: px, y: py });
    },
    [],
  );

  const handleMove = useCallback(
    (event: HoverEvent, area: PalestineMapPath, stat: GovernorateStat | undefined) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      placeTip(event.clientX - rect.left, event.clientY - rect.top, area, stat);
    },
    [placeTip],
  );

  const handleClick = useCallback(
    (area: PalestineMapPath, stat: GovernorateStat | undefined) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const [cx, cy] = CENTROIDS[area.id] ?? [0, 0];
        const point = viewToClient(cx, cy, rect);
        placeTip(point.x, point.y, area, stat);
      }
      setActiveAr(area.nameAr);
      onGovernorateClick?.(area.nameAr, area.nameEn, stat);
    },
    [onGovernorateClick, placeTip, viewToClient],
  );

  const dismiss = useCallback(() => {
    setHoveredAr(null);
    setTip(null);
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-white" onMouseLeave={dismiss}>
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        className="h-full w-full"
        role="img"
        aria-label={pick("خريطة فلسطين حسب المحافظات", "Map of Palestine by governorate")}
      >
        {backgrounds.map((bg) => (
          <path key={bg.id} d={bg.d} className="static-map-bg" aria-hidden="true" />
        ))}
        {areas.map((area) => (
          <path
            key={area.id}
            d={area.d}
            fill={area.fill}
            className={`static-map-gov ${
              hoveredAr === area.nameAr || effectiveActive === area.nameAr ? "is-hover" : ""
            } ${effectiveActive === area.nameAr ? "is-active" : ""}`}
            onMouseEnter={() => setHoveredAr(area.nameAr)}
            onMouseMove={(event) => handleMove(event, area, area.stat)}
            onMouseLeave={() => setHoveredAr(null)}
            onClick={() => handleClick(area, area.stat)}
          >
            <title>
              {locale === "ar" ? area.nameAr : area.nameEn}
              {area.stat
                ? ` — ${area.stat.complaints.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} ${
                    locale === "ar" ? "شكوى" : "complaints"
                  }`
                : ` — ${pick("لا توجد بيانات", "No data available")}`}
            </title>
          </path>
        ))}
      </svg>

      {tip && (
        <div
          className="pointer-events-none absolute z-50 rounded-lg border border-border bg-popover px-3 py-2 shadow-lg"
          style={{ left: tip.x, top: tip.y }}
        >
          <div className="text-sm font-bold text-foreground">
            {locale === "ar" ? tip.nameAr : tip.nameEn}
          </div>
          <div className="text-xs text-muted-foreground">
            {tip.stat
              ? `${tip.stat.complaints.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} ${
                  locale === "ar" ? "شكوى" : "complaints"
                }`
              : pick("لا توجد بيانات", "No data available")}
          </div>
        </div>
      )}
    </div>
  );
}
