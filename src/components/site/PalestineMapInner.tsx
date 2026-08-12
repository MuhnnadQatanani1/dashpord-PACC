import { useState, useEffect, useCallback, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";

import type { PalestineMapProps, GovernorateFeature } from "@/types/map";
import type { PathOptions, LeafletMouseEvent } from "leaflet";
import geoData from "@/data/palestine-governorates.json";
import { governorateStats } from "@/data/governorate-stats";

const PALESTINE_CENTER: [number, number] = [31.9, 35.2];

function getStyle(_feature: GovernorateFeature | undefined, isHovered: boolean): PathOptions {
  if (isHovered) {
    return {
      fillColor: "#dc2626",
      fillOpacity: 0.28,
      weight: 3,
      color: "#dc2626",
      opacity: 1,
    };
  }
  return {
    fillColor: "#6b7280",
    fillOpacity: 0.02,
    weight: 1,
    color: "#9ca3af",
    opacity: 0.7,
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

function TilesReady({ onReady }: { onReady: () => void }) {
  const map = useMap();
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onReady();
    };
    const fallback = window.setTimeout(finish, 4000);
    map.on("load", () => window.setTimeout(finish, 350));
    return () => {
      window.clearTimeout(fallback);
      map.off("load");
    };
  }, [map, onReady]);
  return null;
}

export function PalestineMapInner({ compact = false }: PalestineMapProps) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const geoRef = useRef<L.GeoJSON | null>(null);

  const features = (geoData as GeoJSON.FeatureCollection).features as unknown as GovernorateFeature[];

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.GeoJSON) => {
      const f = feature as unknown as GovernorateFeature;
      const name = f.properties.name_ar;
      const stat = governorateStats[name];
      const label = `
        <div class="gov-name is-hover">
          ${name}${stat ? `<span class="gov-count">${stat.complaints.toLocaleString("ar-EG")} شكوى</span>` : ""}
        </div>`;

      layer.on({
        mouseover: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, true));
          target
            .bindTooltip(label, { direction: "center", className: "gov-tooltip", sticky: false })
            .openTooltip();
          setHoveredName(name);
        },
        mouseout: (e: LeafletMouseEvent) => {
          const target = e.target;
          target.setStyle(getStyle(f, false));
          target.unbindTooltip();
          setHoveredName(null);
        },
        click: (e: LeafletMouseEvent) => {
          const target = e.target;
          target._map.fitBounds(target.getBounds(), { padding: [40, 40] });
        },
      });
    },
    [],
  );

  const geoStyle = useCallback(
    (feature: GeoJSON.Feature | undefined): PathOptions => {
      const f = feature as unknown as GovernorateFeature | undefined;
      return getStyle(f, f?.properties.name_ar === hoveredName);
    },
    [hoveredName],
  );

  const hoveredFeature = features.find((f) => f.properties.name_ar === hoveredName);

  return (
    <div className={`relative isolate h-full w-full ${ready ? "map-pane-fade" : ""}`}>
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
          url="https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />

        <TilesReady onReady={handleReady} />

        <GeoJSON
          ref={geoRef}
          data={geoData as GeoJSON.FeatureCollection}
          style={geoStyle}
          onEachFeature={onEachFeature}
        />

        {!compact && <FitBounds features={features} />}
      </MapContainer>

      <div
        className={`absolute inset-0 z-[1000] flex items-center justify-center bg-background transition-opacity duration-700 ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          جارٍ تحميل الخريطة…
        </div>
      </div>

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
