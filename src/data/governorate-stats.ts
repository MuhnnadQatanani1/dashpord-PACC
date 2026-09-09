import type { GovernorateStatsMap } from "@/types/map";

export const STAT_YEARS = [2022, 2023, 2024, 2025] as const;
export type StatsYear = (typeof STAT_YEARS)[number];

/**
 * البيانات التوزيعية للمحافظات حسب السنة (2022–2025).
 * كل محافظة مجموع قيمها عبر السنوات يساوي إجماليها في `governorateStats`.
 */
export const governorateStatsByYear: Record<StatsYear, GovernorateStatsMap> = {
  2022: {
    جنين: { complaints: 41 },
    طوباس: { complaints: 8 },
    طولكرم: { complaints: 19 },
    نابلس: { complaints: 75 },
    قلقيلية: { complaints: 11 },
    سلفيت: { complaints: 6 },
    "رام الله والبيرة": { complaints: 93 },
    أريحا: { complaints: 6 },
    القدس: { complaints: 46 },
    "بيت لحم": { complaints: 19 },
    الخليل: { complaints: 80 },
    "شمال غزة": { complaints: 28 },
    غزة: { complaints: 64 },
    "دير البلح": { complaints: 12 },
    "خان يونس": { complaints: 27 },
    رفح: { complaints: 9 },
  },
  2023: {
    جنين: { complaints: 30 },
    طوباس: { complaints: 9 },
    طولكرم: { complaints: 17 },
    نابلس: { complaints: 44 },
    قلقيلية: { complaints: 10 },
    سلفيت: { complaints: 7 },
    "رام الله والبيرة": { complaints: 59 },
    أريحا: { complaints: 5 },
    القدس: { complaints: 30 },
    "بيت لحم": { complaints: 13 },
    الخليل: { complaints: 43 },
    "شمال غزة": { complaints: 25 },
    غزة: { complaints: 60 },
    "دير البلح": { complaints: 14 },
    "خان يونس": { complaints: 27 },
    رفح: { complaints: 10 },
  },
  2024: {
    جنين: { complaints: 50 },
    طوباس: { complaints: 11 },
    طولكرم: { complaints: 27 },
    نابلس: { complaints: 106 },
    قلقيلية: { complaints: 17 },
    سلفيت: { complaints: 10 },
    "رام الله والبيرة": { complaints: 135 },
    أريحا: { complaints: 8 },
    القدس: { complaints: 43 },
    "بيت لحم": { complaints: 20 },
    الخليل: { complaints: 67 },
    "شمال غزة": { complaints: 66 },
    غزة: { complaints: 177 },
    "دير البلح": { complaints: 41 },
    "خان يونس": { complaints: 82 },
    رفح: { complaints: 35 },
  },
  2025: {
    جنين: { complaints: 66 },
    طوباس: { complaints: 14 },
    طولكرم: { complaints: 33 },
    نابلس: { complaints: 87 },
    قلقيلية: { complaints: 20 },
    سلفيت: { complaints: 14 },
    "رام الله والبيرة": { complaints: 136 },
    أريحا: { complaints: 10 },
    القدس: { complaints: 45 },
    "بيت لحم": { complaints: 21 },
    الخليل: { complaints: 77 },
    "شمال غزة": { complaints: 37 },
    غزة: { complaints: 101 },
    "دير البلح": { complaints: 22 },
    "خان يونس": { complaints: 42 },
    رفح: { complaints: 19 },
  },
};

/** كل السنوات (المستخدم كافتراضي: مجموعة فارغة تعني "الكل"). */
export const ALL_STAT_YEARS: ReadonlySet<number> = new Set<number>([...STAT_YEARS]);

/** مجموع الشكاوى لكل محافظة عبر السنوات المختارة (مجموعة فارغة = الكل). */
export function statsForYears(selected: ReadonlySet<number>): GovernorateStatsMap {
  const years =
    selected && selected.size > 0 ? STAT_YEARS.filter((y) => selected.has(y)) : [...STAT_YEARS];
  const names = new Set<string>();
  for (const y of years) {
    for (const name of Object.keys(governorateStatsByYear[y])) names.add(name);
  }
  const result: GovernorateStatsMap = {};
  for (const name of names) {
    let sum = 0;
    for (const y of years) sum += governorateStatsByYear[y][name]?.complaints ?? 0;
    result[name] = { complaints: sum };
  }
  return result;
}

/** إجمالي الشكاوى عبر المحافظات للسنوات المختارة (مجموعة فارغة = الكل). */
export function totalStatsForYears(selected: ReadonlySet<number>): number {
  const stats = statsForYears(selected);
  return Object.values(stats).reduce((sum, s) => sum + s.complaints, 0);
}

/** الإجمالي التجميعي (يساوي مجموع السنوات الأربع). */
export const governorateStats: GovernorateStatsMap = {
  جنين: { complaints: 187 },
  طوباس: { complaints: 42 },
  طولكرم: { complaints: 96 },
  نابلس: { complaints: 312 },
  قلقيلية: { complaints: 58 },
  سلفيت: { complaints: 37 },
  "رام الله والبيرة": { complaints: 423 },
  أريحا: { complaints: 29 },
  القدس: { complaints: 164 },
  "بيت لحم": { complaints: 73 },
  الخليل: { complaints: 267 },
  "شمال غزة": { complaints: 156 },
  غزة: { complaints: 402 },
  "دير البلح": { complaints: 89 },
  "خان يونس": { complaints: 178 },
  رفح: { complaints: 73 },
};
