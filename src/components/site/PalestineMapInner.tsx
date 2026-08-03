import { useState, useEffect, useCallback, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";

import type { PalestineMapProps, GovernorateFeature } from "@/types/map";
import type { PathOptions, LeafletMouseEvent } from "leaflet";
import geoData from "@/data/palestine-governorates.json";
import { governorateStats } from "@/data/governorate-stats";

const PALESTINE_CENTER: [number, number] = [31.9, 35.2];

function useColorScale() {
  const all = Object.values(governorateStats).map((s) => s.complaints);
  const min = Math.min(...all);
  const max = Math.max(...all);

  return useCallback(
    (complaints: number | undefined): string => {
      if (complaints === undefined) return "#94a3b8";
      const normalized = max > min ? (complaints - min) / (max - min) : 0.5;
      const r = Math.round(255 * (normalized < 0.5 ? normalized * 2 : 1));
      const g = Math.round(255 * (normalized < 0.5 ? 1 : 2 - normalized * 2));
      return `rgb(${r}, ${g}, 60)`;
    },
    [min, max],
  );
}

function getStyle(
  feature: GovernorateFeature,
  colorScale: (c: number | undefined) => string,
  isHovered: boolean,
): PathOptions {
  const name = feature.properties.name_ar;
  const complaints = governorateStats[name]?.complaints;
  return {
    fillColor: colorScale(complaints),
    fillOpacity: isHovered ? 0.85 : 0.55,
    weight: isHovered ? 2.5 : 1.2,
    color: isHovered ? "#1e293b" : "#334155",
    opacity: isHovered ? 1 : 0.7,
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

export function PalestineMapInner({ compact = false }: PalestineMapProps) {
  const colorScale = useColorScale();
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const geoRef = useRef<L.GeoJSON | null>(null);

  const features = (geoData as GeoJSON.FeatureCollection).features as unknown as GovernorateFeature[];

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.GeoJSON) => {
      const f = feature as unknown as GovernorateFeature;
      const name = f.properties.name_ar;
      const stat = governorateStats[name];
      const content = `
        <div style="text-align:center;font-weight:700;font-size:13px">${name}</div>
        <div style="text-align:center;font-size:11px;color:#64748b">${f.properties.name_en}</div>
        <div style="text-align:center;font-weight:700;font-size:12px;color:#dc2626;margin-top:4px">
          ${stat ? stat.complaints.toLocaleString("ar-EG") : "—"} شكوى
        </div>`;

      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, colorScale, true));
          target.bindTooltip(content, {
            direction: "top",
            offset: [0, -10],
            className: "rounded-lg",
          }).openTooltip();
          setHoveredName(name);
        },
        mouseout: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, colorScale, false));
          target.unbindTooltip();
          setHoveredName(null);
        },
        click: (e: LeafletMouseEvent) => {
          const target = e.target;
          target._map.fitBounds(target.getBounds(), { padding: [40, 40] });
        },
      });
    },
    [colorScale],
  );

  const geoStyle = useCallback(
    (feature: GeoJSON.Feature | undefined): PathOptions => {
      const f = feature as unknown as GovernorateFeature | undefined;
      if (!f) return { fillColor: "#94a3b8", fillOpacity: 0.3, weight: 1, color: "#334155" };
      return getStyle(f, colorScale, f.properties.name_ar === hoveredName);
    },
    [colorScale, hoveredName],
  );

  const hoveredFeature = features.find((f) => f.properties.name_ar === hoveredName);

  return (
    <div className="relative h-full w-full">
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        <GeoJSON
          ref={geoRef}
          data={geoData as GeoJSON.FeatureCollection}
          style={geoStyle}
          onEachFeature={onEachFeature}
        />

        {!compact && <FitBounds features={features} />}
      </MapContainer>

      {hoveredFeature && !compact && (
        <div className="pointer-events-none absolute bottom-3 left-3 z-[1000] rounded-xl border border-border bg-popover px-4 py-3 shadow-lg">
          <div className="text-sm font-bold text-foreground">
            {hoveredFeature.properties.name_ar}
          </div>
          <div className="text-xs text-muted-foreground">
            {hoveredFeature.properties.name_en}
          </div>
          <div className="mt-1 text-sm font-bold text-accent">
            {(() => {
              const s = governorateStats[hoveredFeature.properties.name_ar];
              return s ? `${s.complaints.toLocaleString("ar-EG")} شكوى` : "لا توجد بيانات";
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
