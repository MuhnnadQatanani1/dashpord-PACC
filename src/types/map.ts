import type { GeoJSON } from "geojson";

export interface GovernorateProperties {
  name_ar: string;
  name_en: string;
  region: string;
}

export type GovernorateFeature = GeoJSON.Feature<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  GovernorateProperties
>;

export interface GovernorateStat {
  complaints: number;
}

export interface GovernorateStatsMap {
  [governorateNameAr: string]: GovernorateStat;
}

export interface PalestineMapProps {
  compact?: boolean;
  stats?: GovernorateStatsMap;
  onGovernorateClick?: (nameAr: string, nameEn: string, stats: GovernorateStat | undefined) => void;
}
