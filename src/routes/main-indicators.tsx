import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
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
    labelAr: "البند 1",
    labelEn: "Item 1",
    titleAr:
      "وجود قوانين وأنظمة وتعليمات معززة للبيئة الطاردة للفساد ومكافحته واضحة الأحكام ومحددة الصلاحيات",
    titleEn:
      "Existence of laws, regulations, and instructions that strengthen an environment deterring and combating corruption, with clear provisions and defined authorities",
    rows: [
      {
        num: "1",
        titleAr:
          "عدد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها المصنفة على انها معززة للوقاية من الفساد لدى الجهات الخاضعة وجهات انفاذ القانون",
        titleEn:
          "Number of laws or legislative provisions enacted or amended that are classified as strengthening corruption prevention among covered entities and law-enforcement bodies",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "2",
        titleAr: "جودة وفاعلية التشريعات ذات العلاقة بمكافحة الفساد",
        titleEn: "Quality and effectiveness of anti-corruption-related legislation",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
    ],
  },
  {
    id: "item-2",
    labelAr: "البند 2",
    labelEn: "Item 2",
    titleAr: "تطبيق القانون بفاعلية وعدالة ومساواة على الجميع",
    titleEn: "Effective, fair, and equal application of the law to all",
    rows: [
      {
        num: "3",
        titleAr: "عدد الشكاوى/ البلاغات الواردة لهيئة مكافحة الفساد",
        titleEn: "Number of complaints/reports received by the Anti-Corruption Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "4",
        titleAr: "عدد الملفات التحقيقية لدى الهيئة",
        titleEn: "Number of investigation files opened by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "5",
        titleAr: "عدد الشكاوى المنجزة لدى الهيئة",
        titleEn: "Number of complaints finalized by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "6",
        titleAr: "الملفات التحقيقية المحالة من هيئة مكافحة الفساد الى نيابة جرائم الفساد",
        titleEn:
          "Investigation files referred by the Anti-Corruption Commission to the Corruption Crimes Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "7",
        titleAr: "عدد المشتبه بهم المحالين من هيئة مكافحة الفساد الى نيابة مكافحة الفساد",
        titleEn:
          "Number of suspects referred by the Anti-Corruption Commission to the Corruption Crimes Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "8",
        titleAr: "عدد ملفات التحقيق الجزائي الواردة لنيابة جرائم الفساد",
        titleEn:
          "Number of criminal investigation files received by the Corruption Crimes Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "9",
        titleAr: "عدد ملفات التحقيق الجزائي المنجزة لدى نيابة جرائم الفساد",
        titleEn:
          "Number of criminal investigation files finalized by the Corruption Crimes Prosecution",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "10",
        titleAr: "عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد",
        titleEn:
          "Number of defendants referred by the Corruption Crimes Prosecution to the Corruption Crimes Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "11",
        titleAr: "عدد القضايا المفصولة بحكم في محكمة جرائم الفساد",
        titleEn: "Number of cases adjudicated by final ruling in the Corruption Crimes Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "12",
        titleAr: "عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد",
        titleEn: "Number of persons convicted in cases adjudicated by the Corruption Crimes Court",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "13",
        titleAr:
          "مدة إدارة ونظر الشكوى والتصرف فيها بجميع مراحلها من لحظة استلامها وحتى الحسم بها بقرار من جهة الاختصاص او النطق بالحكم النهائي فيها من محكمة جرائم الفساد.",
        titleEn:
          "Time taken to process and dispose of a complaint through all stages, from receipt to final disposition by the competent authority or final judgment of the Corruption Crimes Court",
        unitAr: "مدة زمنية",
        unitEn: "Time period",
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
        titleAr: "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج",
        titleEn:
          "Number of cases in which criminal proceeds and funds smuggled abroad were recovered",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "16",
        titleAr: "قيمة العائدات والأموال الجرمية المهربة للخارج المستردة",
        titleEn: "Value of recovered criminal proceeds and funds smuggled abroad",
        unitAr: "قيمة مالية",
        unitEn: "Monetary value",
      },
      {
        num: "17",
        titleAr: "عدد المجرمين الفارِّين من العدالة المتهمين بجرائم فساد",
        titleEn: "Number of fugitives from justice charged with corruption offenses",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "18",
        titleAr: "نسبة المحكوم عليهم بالسجن الفعلي في قضايا فساد",
        titleEn: "Percentage of persons sentenced to actual imprisonment in corruption cases",
        unitAr: "نسبة مئوية",
        unitEn: "Percentage",
      },
      {
        num: "19",
        titleAr: "نسبة الموقوفين على ذمة التحقيق بقضايا فساد",
        titleEn: "Percentage of persons held in pretrial detention in corruption cases",
        unitAr: "نسبة مئوية",
        unitEn: "Percentage",
      },
      {
        num: "20",
        titleAr: "عدد طلبات الحماية الواردة للهيئة",
        titleEn: "Number of protection requests received by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "21",
        titleAr: "عدد طلبات التظلم على طلبات الحماية الواردة للهيئة",
        titleEn:
          "Number of grievances (appeals) filed against protection requests received by the Commission",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "22",
        titleAr: "عدد طلبات الحماية التي تم المتابعة عليها",
        titleEn: "Number of protection requests that were followed up",
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
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
      {
        num: "26",
        titleAr:
          "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص بسبب شكوى او بلاغ ورد للهيئة أو اطلاع.",
        titleEn:
          "Number of persons whose financial disclosure statements were unsealed for examination purposes following a complaint, a report received by the Commission, or its own review",
        unitAr: "عدد",
        unitEn: "Count",
      },
      {
        num: "27",
        titleAr: "نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري",
        titleEn:
          "Percentage of financial disclosure statements unsealed for periodic examination purposes",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
      {
        num: "28",
        titleAr:
          "نسبة لأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي ودفعوا رشوة لمسؤول حكومي أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهرا السابقة",
        titleEn:
          "Percentage of persons who, at least once, contacted a government official and paid a bribe, or were asked to pay a bribe, during the preceding twelve months (SDG 16.5.1)",
        unitAr: "نسبة مئوية",
        unitEn: "Percentage",
      },
      {
        num: "29",
        titleAr: "نسبة القضاة في قضايا فساد",
        titleEn: "Ratio of judges implicated in corruption cases",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
      {
        num: "30",
        titleAr: "نسبة المحامون في قضايا فساد",
        titleEn: "Ratio of lawyers implicated in corruption cases",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
      {
        num: "31",
        titleAr: "نسبة أعضاء النيابة في قضايا فساد",
        titleEn: "Ratio of Public Prosecution members implicated in corruption cases",
        unitAr: "غير متاح",
        unitEn: "Not available",
      },
    ],
  },
];

function IndicatorCard({
  indicator,
  locale,
  t,
}: {
  indicator: IndicatorRow;
  locale: "ar" | "en";
  t: ReturnType<typeof useLocale>["t"];
}) {
  const isArabic = locale === "ar";
  const title = isArabic ? indicator.titleAr : indicator.titleEn;
  const unit = isArabic ? indicator.unitAr : indicator.unitEn;
  const indicatorNumber = indicator.num.padStart(2, "0");

  return (
    <article
      dir={isArabic ? "rtl" : "ltr"}
      className="flex min-h-[170px] flex-col items-start justify-start rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/25"
    >
      <span className="mb-3 text-sm font-medium leading-5 text-muted-foreground">
        {t("mainInd.cardNumber", { num: indicatorNumber })}
      </span>

      <h3 className="text-[19px] font-semibold leading-[1.7] text-foreground">{title}</h3>

      <div className="mt-3 text-sm font-medium leading-6 text-muted-foreground">
        <span>{t("mainInd.colUnit")}: </span>
        <span>{unit}</span>
      </div>
    </article>
  );
}

function PrintDocument() {
  const { t, locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">{t("mainInd.printOrg")}</div>
        <h1>{t("mainInd.printTitle")}</h1>
        <p className="print-doc__intro">{t("mainInd.printIntro")}</p>
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
  const total = BANDS.reduce((acc, band) => acc + band.rows.length, 0);

  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          eyebrow={t("mainInd.eyebrow")}
          title={t("mainInd.title")}
          description={t("mainInd.desc", { total })}
        />

        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              {t("mainInd.intro")}
            </p>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg gradient-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90 print:hidden"
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
                    {band.rows.map((indicator) => (
                      <IndicatorCard
                        key={indicator.num}
                        indicator={indicator}
                        locale={locale}
                        t={t}
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
