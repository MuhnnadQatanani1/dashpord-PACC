import type { GovernorateData } from "@/lib/mock-data";

export interface GovernorateStatistic {
  name: string;
  complaints: number;
  region: string;
  share: number;
}

export interface RegionGroup {
  region: string;
  complaints: number;
  governorates: GovernorateStatistic[];
}

const REGION_ORDER = ["الشمال", "الوسط", "الجنوب", "قطاع غزة"] as const;

export function sumComplaints(governorates: GovernorateData[]): number {
  return governorates.reduce((sum, g) => sum + g.complaints, 0);
}

export function computeGovernorateStatistics(
  governorates: GovernorateData[],
): GovernorateStatistic[] {
  const total = sumComplaints(governorates);
  return governorates
    .map((g) => ({
      name: g.name,
      complaints: g.complaints,
      region: g.label,
      share: total > 0 ? g.complaints / total : 0,
    }))
    .sort((a, b) => b.complaints - a.complaints);
}

export function groupGovernoratesByRegion(stats: GovernorateStatistic[]): RegionGroup[] {
  const byRegion = new Map<string, GovernorateStatistic[]>();
  for (const s of stats) {
    const list = byRegion.get(s.region) ?? [];
    list.push(s);
    byRegion.set(s.region, list);
  }
  return REGION_ORDER.filter((region) => byRegion.has(region)).map((region) => {
    const governorates = byRegion.get(region) ?? [];
    return {
      region,
      complaints: governorates.reduce((sum, s) => sum + s.complaints, 0),
      governorates,
    };
  });
}

export function findTopGovernorate(
  stats: GovernorateStatistic[],
): GovernorateStatistic | undefined {
  return stats[0];
}

export function findGovernorateByName(
  stats: GovernorateStatistic[],
  name: string | null,
): GovernorateStatistic | undefined {
  if (!name) return undefined;
  return stats.find((s) => s.name === name);
}

export function formatCount(value: number, locale: string): string {
  return value.toLocaleString(locale === "ar" ? "ar-EG" : "en-US");
}

export function formatPercent(value: number, locale: string): string {
  const ratio = value * 100;
  return `${ratio.toLocaleString(locale === "ar" ? "ar-EG" : "en-US", {
    maximumFractionDigits: 1,
  })}%`;
}
