import type { GeoJSON } from "geojson";
import geoData from "@/data/palestine-governorates.json";

export interface PalestineArea {
  nameAr: string;
  nameEn: string;
  region: string;
  d: string;
  centroidX: number;
  centroidY: number;
}

export interface PalestineSvgMap {
  viewBoxWidth: number;
  viewBoxHeight: number;
  areas: PalestineArea[];
}

type Ring = Array<[number, number]>;

interface GovernorateProps {
  name_ar: string;
  name_en: string;
  region: string;
}

type GovernorateZone = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, GovernorateProps>;

const PADDING = 44;
const BASE_WIDTH = 1000;

function ringsOf(feature: GovernorateZone): Ring[] {
  const geometry = feature.geometry;
  if (!geometry) return [];
  if (geometry.type === "Polygon") return geometry.coordinates as Ring[];
  return (geometry.coordinates as Ring[][]).flat();
}

export function buildPalestineSvg(): PalestineSvgMap {
  const collection = geoData as unknown as GeoJSON.FeatureCollection;
  const features = collection.features as unknown as GovernorateZone[];

  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  for (const feature of features) {
    for (const ring of ringsOf(feature)) {
      for (const [lon, lat] of ring) {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }
  }

  const scale = BASE_WIDTH / (maxLon - minLon);
  const contentHeight = (maxLat - minLat) * scale;
  const viewBoxWidth = Math.round(BASE_WIDTH + PADDING * 2);
  const viewBoxHeight = Math.round(contentHeight + PADDING * 2);

  const toX = (lon: number) => (lon - minLon) * scale + PADDING;
  const toY = (lat: number) => (maxLat - lat) * scale + PADDING;

  const areas: PalestineArea[] = features.map((feature) => {
    const rings = ringsOf(feature);
    const d = rings
      .map(
        (ring) =>
          ring
            .map(
              ([lon, lat], index) =>
                `${index ? "L" : "M"}${toX(lon).toFixed(2)} ${toY(lat).toFixed(2)}`,
            )
            .join(" ") + " Z",
      )
      .join(" ");

    const outer = rings[0] ?? [];
    let centroidX = 0;
    let centroidY = 0;
    if (outer.length > 0) {
      for (const [lon, lat] of outer) {
        centroidX += toX(lon);
        centroidY += toY(lat);
      }
      centroidX /= outer.length;
      centroidY /= outer.length;
    }

    return {
      nameAr: feature.properties.name_ar,
      nameEn: feature.properties.name_en,
      region: feature.properties.region,
      d,
      centroidX: Number(centroidX.toFixed(2)),
      centroidY: Number(centroidY.toFixed(2)),
    };
  });

  return { viewBoxWidth, viewBoxHeight, areas };
}
