import { createServerFn } from "@tanstack/react-start";
import { interactiveIndicators } from "@/data/indicators-catalog";

export interface DataStory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  headline: string;
  headline_label: string;
  series: { label: string; value: number }[];
  display_order: number;
}

const YEARS = ["2022", "2023", "2024", "2025"];

const findInd = (id: string) => interactiveIndicators.find((i) => i.id === id) ?? null;

function seriesOf(id: string, label?: string) {
  const item = findInd(id);
  if (!item) return [];
  const t = item.table;
  const row = label ? t.rows.find((r) => String(r[0]) === label) : t.rows[t.rows.length - 1];
  if (!row) return [];
  return YEARS.map((y, i) => ({
    label: y,
    value: typeof row[i + 1] === "number" ? (row[i + 1] as number) : 0,
  }));
}

const sum = (s: { value: number }[]) => s.reduce((a, b) => a + b.value, 0);

export const getStories = createServerFn({ method: "GET" }).handler(async () => {
  const totalIncoming = seriesOf("pacc-complaints-source");
  const abuse = seriesOf("pacc-complaints-crime", "إساءة استعمال السلطة");
  const filed = seriesOf("pacc-complaints-completed", "حفظ");
  const digital = seriesOf("pacc-complaints-method", "الوسائل والتطبيقات الإلكترونية");
  const suspects = seriesOf("pacc-suspects-referred");
  const guilty = seriesOf("court-verdicts", "إدانة");

  const totalIncomingSum = sum(totalIncoming);
  const abusePct = totalIncomingSum ? Math.round((sum(abuse) / totalIncomingSum) * 100) : 0;
  const decisionsSum =
    sum(filed) +
    sum(seriesOf("pacc-complaints-completed", "عدم الاختصاص")) +
    sum(seriesOf("pacc-complaints-completed", "إحالة إلى النائب العام"));
  const filedPct = decisionsSum ? Math.round((sum(filed) / decisionsSum) * 100) : 0;
  const digitalPct = totalIncomingSum ? Math.round((sum(digital) / totalIncomingSum) * 100) : 0;
  const maxIncoming = Math.max(...totalIncoming.map((s) => s.value));

  const stories: DataStory[] = [
    {
      id: "st-1",
      slug: "complaints-flow",
      title: "اتجاه الشكاوى الواردة لهيئة مكافحة الفساد",
      summary:
        "رصدت الهيئة 2,923 شكوى وبلاغاً خلال الفترة 2022 – 2025، وسجّل عام 2022 أعلى عدد، ثم انخفضت الأرقام في 2023 وعادت للارتفاع التدريجي في 2024 و2025.",
      headline: maxIncoming.toLocaleString("en-US"),
      headline_label: "شكوى وبلاغاً في عام 2022 (الأعلى خلال الفترة)",
      series: totalIncoming,
      display_order: 1,
    },
    {
      id: "st-2",
      slug: "abuse-of-power",
      title: "إساءة استعمال السلطة في صدارة تكييفات الفساد",
      summary:
        "يشكّل تكييف إساءة استعمال السلطة النسبة الأكبر من شبهات الفساد الواردة للهيئة خلال الفترة 2022 – 2025، متفوقاً على الرشوة والاختلاس والتزوير مجتمعة.",
      headline: `${abusePct}%`,
      headline_label: "من إجمالي الشكاوى والبلاغات الواردة خلال الفترة",
      series: abuse,
      display_order: 2,
    },
    {
      id: "st-3",
      slug: "filed-cases",
      title: "معظم الشكاوى المنجزة تُحفظ لدى الهيئة",
      summary:
        "من بين القرارات الصادرة عن الهيئة في الشكاوى والبلاغات المنجزة، يذهب الجزء الأكبر نحو الحفظ، بينما تُحال نسبة أقل إلى النائب العام للتحقيق.",
      headline: `${filedPct}%`,
      headline_label: "قرارات الحفظ من إجمالي القرارات الصادرة خلال الفترة",
      series: filed,
      display_order: 3,
    },
    {
      id: "st-4",
      slug: "digital-channels",
      title: "القنوات الإلكترونية تتصدر تقديم الشكاوى",
      summary:
        "أصبحت الوسائل والتطبيقات الإلكترونية القناة الأولى لتقديم الشكاوى والبلاغات للهيئة خلال الفترة 2022 – 2025، متجاوزة الحضور الشخصي والجهات الرسمية.",
      headline: `${digitalPct}%`,
      headline_label: "من إجمالي الشكاوى الواردة عبر الوسائل الإلكترونية",
      series: digital,
      display_order: 4,
    },
    {
      id: "st-5",
      slug: "referrals-to-prosecution",
      title: "المشتبه بهم المحالون من الهيئة إلى النيابة",
      summary:
        "بلغ إجمالي المشتبه بهم المحالين من الهيئة إلى نيابة جرائم الفساد خلال الفترة 2022 – 2025 نحو 294 مشتبهاً به، مع تذبذب الأرقام بين الأعوام.",
      headline: sum(suspects).toLocaleString("en-US"),
      headline_label: "مشتبهاً به محالاً خلال الفترة 2022 – 2025",
      series: suspects,
      display_order: 5,
    },
    {
      id: "st-6",
      slug: "court-convictions",
      title: "أحكام الإدانة في محكمة جرائم الفساد",
      summary:
        "فصلت محكمة جرائم الفساد 66 قضية بحكم خلال الفترة 2022 – 2025، ومثّلت أحكام الإدانة نحو 33 قضية، مع تسجيل عام 2025 أعلى عدد من الأحكام.",
      headline: sum(guilty).toLocaleString("en-US"),
      headline_label: "قضية إدانة من إجمالي القضايا المفصولة بحكم خلال الفترة",
      series: guilty,
      display_order: 6,
    },
  ];

  return stories.filter((s) => s.series.length > 0);
});
