import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { exportPrintDoc } from "@/lib/export-pdf";
import { FileDown } from "lucide-react";

export const Route = createFileRoute("/main-indicators")({
  component: MainIndicators,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.mainIndTitle"] },
        { name: "description", content: dict["meta.mainIndDesc"] },
      ],
    };
  },
});

type IndicatorRow = {
  num: string;
  titleAr: string;
  titleEn: string;
  unitAr: string;
  unitEn: string;
};

type IndicatorBand = {
  id: string;
  labelAr: string;
  labelEn: string;
  titleAr: string;
  titleEn: string;
  rows: IndicatorRow[];
};

const BANDS: IndicatorBand[] = [
  {
    id: "item-1",
    labelAr: "المجال الأول",
    labelEn: "Domain 1",
    titleAr:
      "البيئة التشريعية المتعلقة بمكافحة الفساد على مستوى التشريعات الاساسية والمعززة للوقاية من الفساد والنزاهة والشفافية على مستوى التشريعات في عمومها",
    titleEn:
      "The legislative environment for combating corruption, covering core legislation and provisions promoting corruption prevention, integrity, and transparency across legislation generally",
    rows: [
      {
        num: "1",
        titleAr:
          "عدد التشريعات التي تم إقرارها أو تعديلها ذات الصلة بالنزاهة والشفافية والوقاية من الفساد",
        titleEn:
          "Number of laws enacted or amended relating to integrity, transparency, and corruption prevention",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "2",
        titleAr: "جودة التشريعات الأساسية ذات الصلة المباشرة بمكافحة الفساد",
        titleEn: "Quality of core legislation directly related to combating corruption",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
    ],
  },
  {
    id: "item-2",
    labelAr: "المجال الثاني",
    labelEn: "Domain 2",
    titleAr: "أداء منظومة مكافحة الفساد وإنفاذ القانون ومخرجاتها",
    titleEn: "Performance and outputs of the anti-corruption and law-enforcement system",
    rows: [
      {
        num: "3",
        titleAr: "عدد الشكاوى والبلاغات الواردة إلى هيئة مكافحة الفساد",
        titleEn: "Number of complaints and reports received by the Anti-Corruption Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "4",
        titleAr: "عدد الملفات التحقيقية لدى هيئة مكافحة الفساد",
        titleEn: "Number of investigation files opened by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "5",
        titleAr: "عدد الشكاوى والبلاغات المنجزة لدى هيئة مكافحة الفساد",
        titleEn: "Number of complaints and reports finalized by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "6",
        titleAr: "الملفات التحقيقية المحالة من هيئة مكافحة الفساد الى نيابة مكافحة الفساد",
        titleEn:
          "Investigation files referred by the Anti-Corruption Commission to the Anti-Corruption Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "7",
        titleAr: "عدد المشتبه بهم المحالين من هيئة مكافحة الفساد الى نيابة مكافحة الفساد",
        titleEn:
          "Number of suspects referred by the Anti-Corruption Commission to the Anti-Corruption Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "8",
        titleAr: "عدد ملفات التحقيق الجزائي الواردة لنيابة مكافحة الفساد",
        titleEn:
          "Number of criminal investigation files received by the Anti-Corruption Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "9",
        titleAr: "ملفات التحقيق الجزائي المنجزة لدى نيابة مكافحة الفساد",
        titleEn: "Criminal investigation files finalized by the Anti-Corruption Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "10",
        titleAr: "عدد الموقوفين على ذمة التحقيق بقضايا الفساد لدى نيابة مكافحة الفساد",
        titleEn:
          "Number of persons detained pending investigation in corruption cases at the Anti-Corruption Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "11",
        titleAr: "المتهمين المحالين من نيابة مكافحة الفساد لمحكمة مكافحة الفساد",
        titleEn:
          "Defendants referred by the Anti-Corruption Prosecution to the Anti-Corruption Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "12",
        titleAr: "القضايا المفصولة بحكم في محكمة مكافحة الفساد",
        titleEn: "Cases adjudicated by a ruling in the Anti-Corruption Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "13",
        titleAr: "المدانين في القضايا المفصولة بحكم في محكمة مكافحة الفساد",
        titleEn: "Persons convicted in cases adjudicated by the Anti-Corruption Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "14",
        titleAr: "قيمة الأموال والعائدات الجرمية المحكوم بها",
        titleEn: "Value of funds and criminal proceeds subject to court-ordered recovery",
        unitAr: "قيمة مالية",
        unitEn: "Monetary value",
      },
      {
        num: "15",
        titleAr: "مدة معالجة الشكوى والقضية عبر مراحل إنفاذ القانون",
        titleEn: "Time taken to process complaints and cases across law-enforcement stages",
        unitAr: "مدة زمنية",
        unitEn: "Time period",
      },
      {
        num: "16",
        titleAr: "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج",
        titleEn:
          "Number of cases in which criminal proceeds and funds smuggled abroad were recovered",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "17",
        titleAr: "قيمة العائدات والأموال الجرمية المهربة للخارج المستردة",
        titleEn: "Value of recovered criminal proceeds and funds smuggled abroad",
        unitAr: "قيمة مالية",
        unitEn: "Monetary value",
      },
      {
        num: "18",
        titleAr: "عدد المتهمين بجرائم فساد الفارّين من العدالة",
        titleEn: "Number of fugitives from justice charged with corruption offenses",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "19",
        titleAr: "نسبة المحكوم عليهم بالسجن الفعلي في قضايا فساد",
        titleEn: "Percentage of persons sentenced to actual imprisonment in corruption cases",
        unitAr: "نسبة مئوية",
        unitEn: "Percentage",
      },
      {
        num: "20",
        titleAr: "طلبات الحماية الواردة لهيئة مكافحة الفساد",
        titleEn: "Protection requests received by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "21",
        titleAr: "عدد طلبات التظلم على طلبات الحماية الواردة لهيئة مكافحة الفساد",
        titleEn:
          "Number of grievances (appeals) filed against protection requests received by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "22",
        titleAr: "عدد طلبات الحماية التي تم قبولها حسب بنود محددة",
        titleEn: "Number of protection requests accepted under specified categories",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "23",
        titleAr: "عدد المكلفين بإقرارات الذمة المالية",
        titleEn: "Number of persons required to submit financial disclosure statements",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "24",
        titleAr: "إقرارات الذمة المالية الموزعة على المكلفين في الجهات الخاضعة.",
        titleEn:
          "Financial disclosure statements distributed to obligated persons in covered entities",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "25",
        titleAr: "نسبة اقرارات الذمة المالية المستوفاة",
        titleEn: "Percentage of completed financial disclosure statements",
        unitAr: "نسبة",
        unitEn: "Percentage",
      },
      {
        num: "26",
        titleAr: "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص.",
        titleEn:
          "Number of persons whose financial disclosure statements were unsealed for examination",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "27",
        titleAr: "نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري",
        titleEn:
          "Percentage of financial disclosure statements unsealed for periodic examination purposes",
        unitAr: "نسبة",
        unitEn: "Percentage",
      },
      {
        num: "28",
        titleAr:
          "نسبة الأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي ودفعوا رشوة لمسؤول حكومي أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهرا السابقة",
        titleEn:
          "Percentage of persons who, at least once, contacted a government official and paid a bribe, or were asked to pay a bribe, during the preceding twelve months (SDG 16.5.1)",
        unitAr: "نسبة مئوية",
        unitEn: "Percentage",
      },
      {
        num: "29",
        titleAr: "نسبة القضاة المكلّفين بالنظر في قضايا الفساد إلى إجمالي القضاة",
        titleEn: "Percentage of judges assigned to hear corruption cases out of all judges",
        unitAr: "نسبة",
        unitEn: "Percentage",
      },
      {
        num: "30",
        titleAr: "نسبة المحامين الذين تولّوا الترافع في قضايا الفساد إلى إجمالي المحامين",
        titleEn:
          "Percentage of lawyers who represented parties in corruption cases out of all lawyers",
        unitAr: "نسبة",
        unitEn: "Percentage",
      },
      {
        num: "31",
        titleAr:
          "نسبة أعضاء النيابة العامة العاملين في نيابة مكافحة الفساد إلى إجمالي أعضاء النيابة العامة",
        titleEn:
          "Percentage of Public Prosecution members working in the Anti-Corruption Prosecution out of all Public Prosecution members",
        unitAr: "نسبة",
        unitEn: "Percentage",
      },
    ],
  },
];

/** Single gold band for every indicator card — one colour, not a rainbow. */
const INDICATOR_COLORS = [
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
  "#c5a06c",
];

function IndicatorCard({
  indicator,
  locale,
  t,
  color,
}: {
  indicator: IndicatorRow;
  locale: "ar" | "en";
  t: ReturnType<typeof useLocale>["t"];
  color: string;
}) {
  const isArabic = locale === "ar";
  const title = isArabic ? indicator.titleAr : indicator.titleEn;
  const unit = isArabic ? indicator.unitAr : indicator.unitEn;
  const indicatorNumber = indicator.num.padStart(2, "0");

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="relative flex min-h-[170px] flex-col items-start justify-start overflow-hidden rounded-xl border border-card-border bg-card p-6 pt-7 shadow-soft transition-colors hover:border-gold"
    >
      <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: color }} />
      <span className="mb-3 text-sm font-semibold leading-5 text-accent">
        {t("mainInd.cardNumber", { num: indicatorNumber })}
      </span>

      <h3 className="text-[19px] font-semibold leading-[1.7] text-heading">{title}</h3>

      <div className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
        <span>{t("mainInd.colUnit")}: </span>
        <span className="font-semibold text-accent">{unit}</span>
      </div>
    </article>
  );
}

function PrintDocument() {
  const { t, locale } = useLocale();
  const isArabic = locale === "ar";
  const intro = t("mainInd.printIntro");

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__logos">
          <img src="/pacc-logo.png" alt="PACC" className="print-doc__logo" />
          <img src="/observatory-logo.png" alt={t("common.logoAlt")} className="print-doc__logo" />
        </div>
        <div className="print-doc__org">{t("mainInd.printOrg")}</div>
        <h1>{t("mainInd.printTitle")}</h1>
        {intro && <p className="print-doc__intro">{intro}</p>}
      </header>

      {BANDS.map((band) => (
        <section key={band.id} className="print-doc__section">
          <h2>
            {isArabic ? band.labelAr : band.labelEn}: {isArabic ? band.titleAr : band.titleEn}
          </h2>
          <table className="print-doc__table">
            <thead>
              <tr>
                <th>{t("mainInd.colNum")}</th>
                <th>{t("mainInd.colIndicator")}</th>
                <th>{t("mainInd.colUnit")}</th>
              </tr>
            </thead>
            <tbody>
              {band.rows.map((row) => (
                <tr key={row.num}>
                  <td className="print-doc__num">{row.num}</td>
                  <td className="print-doc__title">{isArabic ? row.titleAr : row.titleEn}</td>
                  <td>{isArabic ? row.unitAr : row.unitEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

function MainIndicators() {
  const { t, locale } = useLocale();
  const [exporting, setExporting] = useState(false);
  const onExportPdf = async () => {
    setExporting(true);
    try {
      await exportPrintDoc("main-indicators.pdf");
    } finally {
      setExporting(false);
    }
  };

  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader eyebrow={t("mainInd.eyebrow")} title={t("mainInd.title")} />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onExportPdf}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 disabled:opacity-60 print:hidden"
            >
              <FileDown className="h-4 w-4" /> {t("mainInd.downloadPdf")}
            </button>
          </div>

          <div className="space-y-16">
            {BANDS.map((band) => {
              return (
                <section key={band.id}>
                  <div className="mb-6 max-w-[900px]">
                    <div className="mb-3 text-sm font-semibold text-muted-foreground">
                      <span>{locale === "ar" ? band.labelAr : band.labelEn}</span>
                      <span className="px-2">·</span>
                      <span>{t("mainInd.groupCount", { count: band.rows.length })}</span>
                    </div>
                    <h2 className="text-[26px] font-semibold leading-[1.45] text-primary">
                      {locale === "ar" ? band.titleAr : band.titleEn}
                    </h2>
                  </div>

                  <div className="grid items-stretch gap-6 md:grid-cols-2">
                    {band.rows.map((indicator, indicatorIndex) => (
                      <IndicatorCard
                        key={indicator.num}
                        indicator={indicator}
                        locale={locale}
                        t={t}
                        color={INDICATOR_COLORS[indicatorIndex % INDICATOR_COLORS.length]}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>

      <PrintDocument />
    </SiteLayout>
  );
}
