import { useState, useEffect, useCallback, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";

import type { PalestineMapProps, GovernorateFeature } from "@/types/map";
import type { PathOptions, LeafletMouseEvent } from "leaflet";
import geoData from "@/data/palestine-governorates.json";
import { governorateStats } from "@/data/governorate-stats";
import { useLocale } from "@/i18n";

const PALESTINE_CENTER: [number, number] = [31.9, 35.2];
const GREEN_LO: [number, number, number] = [187, 247, 208];
const GREEN_HI: [number, number, number] = [6, 78, 59];

function greenRamp(intensity: number): string {
  const t = Math.max(0, Math.min(1, intensity));
  const c = GREEN_LO.map((lo, i) => Math.round(lo + (GREEN_HI[i] - lo) * t));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function getStyle(
  feature: GovernorateFeature | undefined,
  isHovered: boolean,
  maxComplaints: number,
): PathOptions {
  const stat = feature ? governorateStats[feature.properties.name_ar] : undefined;
  const hasData = Boolean(stat);
  const intensity = stat ? stat.complaints / maxComplaints : 0;
  return {
    fillColor: hasData ? greenRamp(intensity) : "#f3f4f6",
    fillOpacity: hasData ? (isHovered ? 0.95 : 0.85) : 0.45,
    weight: isHovered ? 2.5 : 0.8,
    color: "#ffffff",
    opacity: 1,
  };
}

function FitBounds({ features }: { features: GovernorateFeature[] }) {
  const map = useMap();
  useEffect(() => {
    const points: L.LatLngTuple[] = features.map((f) => {
      const geom = f.geometry;
      const coords = geom.type === "Polygon" ? geom.coordinates[0] : geom.coordinates[0][0];
      const mid = coords[Math.floor(coords.length / 2)];
      return [mid[1], mid[0]] as L.LatLngTuple;
    });
    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [20, 20] });
    }
  }, [map, features]);
  return null;
}

export function PalestineMapInner({ compact = false, onGovernorateClick }: PalestineMapProps) {
  const { locale, pick } = useLocale();
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const geoRef = useRef<L.GeoJSON | null>(null);
  const onClickRef = useRef(onGovernorateClick);
  useEffect(() => {
    onClickRef.current = onGovernorateClick;
  });

  const features = (geoData as GeoJSON.FeatureCollection)
    .features as unknown as GovernorateFeature[];
  const filteredGeoData = {
    ...(geoData as GeoJSON.FeatureCollection),
    features,
  } satisfies GeoJSON.FeatureCollection;
  const maxComplaints = Math.max(
    1,
    ...features.map((feature) => governorateStats[feature.properties.name_ar]?.complaints ?? 0),
  );

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.GeoJSON) => {
      const f = feature as unknown as GovernorateFeature;
      const name = f.properties.name_ar;
      const displayName = locale === "ar" ? name : f.properties.name_en;
      const stat = governorateStats[name];
      const unit = locale === "ar" ? "شكوى" : "complaints";
      const label = `
        <div class="gov-name is-hover">
          ${displayName}${stat ? `<span class="gov-count">${stat.complaints.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} ${unit}</span>` : ""}
        </div>`;

      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, true, maxComplaints));
          target
            .bindTooltip(label, { direction: "center", className: "gov-tooltip", sticky: false })
            .openTooltip();
          setHoveredName(name);
        },
        mouseout: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, false, maxComplaints));
          target.unbindTooltip();
          setHoveredName(null);
        },
        click: (e: LeafletMouseEvent) => {
          const target = e.target;
          if (!compact) target._map.fitBounds(target.getBounds(), { padding: [40, 40] });
          onClickRef.current?.(name, f.properties.name_en, stat);
        },
      });
    },
    [locale, compact, maxComplaints],
  );

  const geoStyle = useCallback(
    (feature: GeoJSON.Feature | undefined): PathOptions => {
      const f = feature as unknown as GovernorateFeature | undefined;
      return getStyle(f, f?.properties.name_ar === hoveredName, maxComplaints);
    },
    [hoveredName, maxComplaints],
  );

  const hoveredFeature = features.find((f) => f.properties.name_ar === hoveredName);

  return (
    <div className="relative isolate h-full w-full">
      <MapContainer
        center={PALESTINE_CENTER}
        zoom={compact ? 8 : 9}
        zoomControl={false}
        dragging={!compact}
        scrollWheelZoom={!compact}
        doubleClickZoom={!compact}
        touchZoom={!compact}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          maxZoom={19}
        />
        <GeoJSON
          key={locale}
          ref={geoRef}
          data={filteredGeoData}
          style={geoStyle}
          onEachFeature={onEachFeature}
        />

        {!compact && <FitBounds features={features} />}
      </MapContainer>

      {hoveredFeature && !compact && (
        <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-xl border border-border bg-popover px-4 py-3 shadow-lg">
          <div className="text-sm font-bold text-foreground">
            {locale === "ar"
              ? hoveredFeature.properties.name_ar
              : hoveredFeature.properties.name_en}
          </div>
          <div className="text-xs text-muted-foreground">
            {locale === "ar"
              ? hoveredFeature.properties.name_en
              : hoveredFeature.properties.name_ar}
          </div>
          <div className="mt-1 text-sm font-bold text-accent">
            {(() => {
              const s = governorateStats[hoveredFeature.properties.name_ar];
              return s
                ? `${s.complaints.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} ${locale === "ar" ? "شكوى" : "complaints"}`
                : pick("لا توجد بيانات", "No data available");
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
