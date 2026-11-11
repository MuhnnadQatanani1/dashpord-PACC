import { useLocale } from "@/i18n";

/** Sources follow the report's institutional stages, rather than the chart type. */
export function IndicatorSource({
  dataKey,
  years,
}: {
  dataKey: string;
  years: ReadonlySet<number>;
}) {
  const { pick } = useLocale();
  const isCourt = dataKey.startsWith("courtVerdict");
  const isProsecution =
    isCourt === false &&
    /^(filesReferredToProsecution|prosecutionFiles|defendantsReferred)/.test(dataKey);
  const isLegislation = dataKey === "legislations";
  const institution = isCourt
    ? pick("محكمة مكافحة الفساد", "Anti-Corruption Court")
    : isProsecution
      ? pick("نيابة مكافحة الفساد", "Anti-Corruption Prosecution")
      : pick("هيئة مكافحة الفساد", "Anti-Corruption Commission");
  const period = (years.size ? [...years] : [2022, 2023, 2024, 2025])
    .sort((a, b) => a - b)
    .join("، ");

  return (
    <details className="mt-4 rounded-lg border border-border bg-surface px-3 py-2 text-xs leading-6">
      <summary className="focus-ring cursor-pointer font-semibold text-primary">
        {pick("مصدر البيانات: ", "Data source: ")}
        {institution}
        {" · "}
        <span className="ms-2 font-normal text-muted-foreground">{period}</span>
      </summary>
      <div className="mt-2 space-y-2 text-muted-foreground">
        <p>
          {isLegislation
            ? pick(
                "حصر التشريعات التي أُقرّت أو عُدّلت، كما ورد في تقرير المرصد الوطني لمؤشرات النزاهة ومكافحة الفساد للفترة 2022–2025. يقيس المؤشر حجم النشاط التشريعي، ولا يمثل تقييماً لجودة التشريعات أو فاعليتها.",
                "Legislation enacted or amended, as compiled in the National Observatory report for 2022–2025. This measures legislative activity, rather than the quality or effectiveness of legislation.",
              )
            : isCourt
              ? pick(
                  "بيانات القضايا والأحكام من التقارير السنوية والسجلات المتاحة على برنامج ميزان، كما جُمعت في تقرير المرصد للفترة 2022–2025. قد تشمل القضايا ملفات مدورة من سنوات سابقة؛ ولا يعني الحكم بالإدانة بالضرورة اكتسابه الدرجة القطعية.",
                  "Case and judgment data from annual reports and records available through Mizan, compiled in the Observatory report for 2022–2025. Cases may include carryovers from earlier years; a conviction does not necessarily mean the judgment is final.",
                )
              : isProsecution
                ? pick(
                    "السجلات الإدارية والتقارير السنوية لملفات التحقيق الجزائي والإحالات لدى نيابة مكافحة الفساد، كما جُمعت في تقرير المرصد للفترة 2022–2025. الأعداد تصف حركة الملفات ومخرجاتها، وقد تشمل ملفات مدورة من سنوات سابقة.",
                    "Administrative records and annual reports on criminal investigation files and referrals at the Anti-Corruption Prosecution, compiled in the Observatory report for 2022–2025. Counts describe file activity and outcomes and may include carryovers from earlier years.",
                  )
                : pick(
                    "السجلات الإدارية والتقارير السنوية لهيئة مكافحة الفساد، كما جُمعت في تقرير المرصد للفترة 2022–2025. تمثل البيانات الشكاوى والبلاغات أو الملفات المسجلة، بحسب تعريف كل مؤشر؛ ولا تقيس انتشار الفساد في المجتمع.",
                    "Administrative records and annual reports of the Anti-Corruption Commission, compiled in the Observatory report for 2022–2025. Data represent registered complaints and reports or files, according to each indicator’s definition; they do not measure corruption prevalence in society.",
                  )}
        </p>
        <p>
          {pick(
            "تتحكم السنوات المختارة في الرسم. قد تعرض الجداول كامل الفترة المرجعية. لا تُعد البيانات غير المتاحة صفراً، ولا تُفترض مطابقة ملفات المراحل المختلفة قضيةً بقضية.",
            "Selected years control the chart. Tables may show the full reference period. Unavailable data are not zero, and files at different institutional stages should not be assumed to match case by case.",
          )}
        </p>
      </div>
    </details>
  );
}
