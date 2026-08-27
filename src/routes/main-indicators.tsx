import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { ChevronDown, FileDown, Gavel, Hash, Scale } from "lucide-react";

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
  title: string;
  definition: string;
  measurement: string;
  unit: string;
  coverage: string;
  detail: string;
  source: string;
};

type EffortBand = {
  id: string;
  label: string;
  title: string;
  rows: IndicatorRow[];
};

const DETAIL_FIELDS: {
  key: Exclude<keyof IndicatorRow, "num" | "title" | "definition">;
  label: string;
}[] = [
  { key: "measurement", label: "طريقة القياس" },
  { key: "unit", label: "وحدة القياس" },
  { key: "coverage", label: "التغطية الجغرافية" },
  { key: "detail", label: "مستوى التفصيل" },
  { key: "source", label: "مصدر البيانات والدورية" },
];

const EFFORT_BANDS: EffortBand[] = [
  {
    id: "band-1",
    label: "البند 1",
    title:
      "وجود قوانين وأنظمة وتعليمات معززة للبيئة الطاردة للفساد ومكافحته واضحة الأحكام ومحددة الصلاحيات",
    rows: [
      {
        num: "1",
        title:
          "عدد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها المصنفة على أنها معززة للوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون",
        definition:
          "مؤشر يقيس عدد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها والمصنفة على أنها معززة للوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون.",
        measurement:
          "مجموع أعداد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها سنوياً والتي من شأنها إحداث تحسن في بيئة الوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "التصنيف",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "2",
        title: "جودة وفاعلية التشريعات ذات العلاقة بمكافحة الفساد",
        definition:
          "مؤشر يقيس مستوى جودة التشريعات ذات العلاقة بمكافحة الفساد من خلال القضاة وأعضاء النيابة العامة والعاملين في إنفاذ القانون في الهيئة والمحامين المخضرمين ممن عملوا في هذا المجال وعلى أساتذة القانون في الجامعات وأصحاب الرأي والمهتمين.",
        measurement:
          "سيتم تحديدها بالتعاون مع الجهاز المركزي للإحصاء الفلسطيني مع إمكانية المقارنة مع المعايير الدولية",
        unit: "عدد",
        coverage: "المستوى الوطني، المنطقة",
        detail: "سيتم تحديدها بالتعاون مع الجهاز المركزي للإحصاء الفلسطيني",
        source: "استطلاع رأي · مجموعات بؤرية · سنوي",
      },
    ],
  },
  {
    id: "band-2",
    label: "البند 2",
    title: "تطبيق القانون بفاعلية وعدالة ومساواة على الجميع",
    rows: [
      {
        num: "3",
        title: "عدد الشكاوى/البلاغات الواردة لهيئة مكافحة الفساد",
        definition: "مؤشر يقيس عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد.",
        measurement: "مجموع الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد سنوياً",
        unit: "عدد",
        coverage: "المستوى الوطني، المحافظة",
        detail:
          "طبيعة الإجراء/ جنس مقدمي الشكوى/البلاغ، العمر، الدرجة الوظيفية للمشتكي، مصدر تقديم الشكوى/البلاغ، التكييف الأولي لشبهات الفساد، طريقة استلام الشكوى/البلاغ، القطاع، الجهة المشتكى عليها، جنس المشتكى عليهم.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "4",
        title: "عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد",
        definition: "مؤشر يقيس عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد",
        measurement: "مجموع عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail:
          "جنس المشتبه به/ العمر/ الوظيفة/ مكان السكن على مستوى المحافظة/ مستوى التعليم/ مستوى الدخل",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "5",
        title: "عدد الملفات التحقيقية لدى الهيئة",
        definition: "مؤشر يقيس عدد الملفات التحقيقية لدى الهيئة",
        measurement: "عدد الملفات التحقيقية لدى الهيئة سنوياً",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail:
          "طبيعة الإجراء، التكييف القانوني بعد التحقيق، عدد الشكاوى والبلاغات لكل ملف تحقيقي.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "6",
        title: "عدد الملفات التحقيقية المنجزة لدى الهيئة",
        definition: "مؤشر يقيس عدد الملفات التحقيقية المنجزة لدى الهيئة",
        measurement: "عدد الملفات التحقيقية المنجزة من إجمالي المسجل في سجلات الهيئة سنوياً",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني",
        detail: "التكييف القانوني بعد التحقيق، عدد الشكاوى والبلاغات لكل ملف تحقيقي.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "7",
        title: "عدد ملفات التحقيق الجزائي الواردة لنيابة جرائم الفساد",
        definition: "مؤشر يقيس عدد القضايا التحقيقية الواردة لنيابة جرائم الفساد سنوياً",
        measurement: "مجموع عدد القضايا التحقيقية الواردة لنيابة جرائم الفساد سنوياً",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail:
          "مصدر ورودها، جنس المشتبه بهم المحالين، طبيعة الإجراء، التكييف القانوني بقرار الاتهام",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "8",
        title: "عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد",
        definition: "مؤشر يقيس عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد",
        measurement: "مجموع عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس/ العمر/ الوظيفة/ مكان السكن على مستوى المحافظة/ مستوى التعليم/ مستوى الدخل",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "9",
        title: "عدد القضايا المفصولة بحكم في محكمة جرائم الفساد",
        definition: "مؤشر يقيس عدد القضايا المفصولة بحكم في محكمة جرائم الفساد",
        measurement: "مجموع عدد القضايا المفصولة بحكم في محكمة جرائم الفساد",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "نتيجة الحكم",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "10",
        title: "عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد",
        definition: "مؤشر يقيس عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد",
        measurement: "مجموع عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس/ العمر/ الوظيفة/ مكان السكن على مستوى المحافظة/ مستوى التعليم/ مستوى الدخل",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "11",
        title: "قيمة الأموال والعائدات الجرمية المحكوم بها",
        definition: "مؤشر يقيس قيمة العائدات والأموال الجرمية المحكوم بها",
        measurement: "مجموع قيم الأموال والعائدات الجرمية المحكوم بها",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "نوع العملة، الصنف",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "12",
        title:
          "مدة إدارة ونظر الشكوى والتصرف فيها بجميع مراحلها من لحظة استلامها وحتى الحسم بها بقرار من جهة الاختصاص أو النطق بالحكم النهائي فيها من محكمة جرائم الفساد.",
        definition:
          "مؤشر يقيس المدة الزمنية التي يستغرقها نظر الشكوى من لحظة استلامها لغاية الحسم بها بقرار من جهة الاختصاص أو بحكم نهائي من محكمة جرائم الفساد",
        measurement:
          "الفترة الزمنية المستغرقة لمعالجة الشكوى من تاريخ استلامها إلى تاريخ البت بها من جهات الاختصاص.",
        unit: "فترة زمنية",
        coverage: "المستوى الوطني",
        detail: "حسب جهة الاختصاص (هيئة، نيابة، قضاء)",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "13",
        title: "عدد المكلفين بإقرارات الذمة المالية",
        definition: "مؤشر يقيس عدد المكلفين بإقرارات الذمة المالية",
        measurement: "عدد المكلفين بإقرارات الذمة المالية بموجب إشعار خلال الفترة الزمنية المحددة.",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس، القطاع، فئة المكلف، جهة العمل، حالة التكليف، الدرجة الوظيفية",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "14",
        title: "إقرارات الذمة المالية الموزعة على المكلفين في الجهات الخاضعة.",
        definition: "مؤشر يقيس عدد الإقرارات الموزعة على المكلفين في الجهات الخاضعة.",
        measurement:
          "عدد الإقرارات التي قامت الهيئة بتوزيعها على المكلفين في الجهات الخاضعة خلال فترة زمنية محددة.",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "القطاع، جهة العمل",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "15",
        title: "نسبة إقرارات الذمة المالية المستوفاة",
        definition: "مؤشر يقيس نسبة الإقرارات المستوفاة من إجمالي مجموع الإقرارات التي تم طلبها.",
        measurement:
          "عدد الإقرارات التي طلبتها الهيئة مقسوماً على عدد الإقرارات التي استلمتها الهيئة فعلياً مضروباً بـ 100%.",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس، القطاع، جهة العمل، فئة المكلف، نوع الإقرار، الدرجة الوظيفية.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "16",
        title:
          "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص بسبب شكوى أو بلاغ ورد للهيئة أو اطلاع.",
        definition:
          "مؤشر يقيس عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص بسبب ورود شكوى أو بلاغ بحقهم أو اطلاع.",
        measurement: "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "السبب، الجنس، القطاع، جهة العمل، فئة المكلف، نوع الإقرار.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "17",
        title: "نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري",
        definition:
          "مؤشر يقيس نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص من إجمالي مجموع الإقرارات المستلمة لسنة ما ومن إجمالي مجموع الإقرارات بالهيئة",
        measurement: "مجموع عدد إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "السبب",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "18",
        title: "عدد طلبات الحماية الواردة للهيئة",
        definition:
          "مؤشر يقيس عدد طلبات الحماية الواردة للهيئة لمبلغين/مشتكين وللأشخاص وثيقي الصلة بهم",
        measurement: "مجموع عدد طلبات الحماية الواردة للهيئة",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس، نوع الحماية المطلوبة، نتيجة الطلب، الجهة المطلوب الحماية منها.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "19",
        title: "عدد طلبات التظلم على طلبات الحماية الواردة للهيئة",
        definition: "مؤشر يقيس عدد طلبات التظلم على طلبات الحماية الواردة للهيئة",
        measurement: "مجموع عدد طلبات التظلم على طلبات الحماية الواردة للهيئة",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "نتيجة الطلب",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "20",
        title: "عدد طلبات الحماية التي تم المتابعة عليها",
        definition: "مؤشر يقيس عدد طلبات الحماية التي تم المتابعة عليها",
        measurement: "مجموع عدد طلبات الحماية التي تم المتابعة عليها",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس، نوع الحماية، الجهة المطلوب الحماية منها.",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "21",
        title: "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج",
        definition:
          "مؤشر يقيس عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج",
        measurement: "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "—",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "22",
        title: "قيمة العائدات والأموال الجرمية المهربة للخارج المستردة",
        definition: "مؤشر يقيس قيمة العائدات والأموال الجرمية المهربة للخارج المستردة",
        measurement: "مجموع قيمة الأموال والعائدات الجرمية المهربة للخارج المستردة",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "نوع العملة، الصنف",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "23",
        title: "عدد المجرمين الفارين من العدالة المتهمين بجرائم فساد",
        definition: "مؤشر يقيس عدد المجرمين المتهمين بجرائم الفساد والفارين من العدالة",
        measurement: "مجموع المجرمين المتهمين بجرائم الفساد والفارين من العدالة",
        unit: "عدد",
        coverage: "المستوى الوطني",
        detail: "الجنس، الملاحقة (تم التسليم، لم يتم التسليم)، الدولة",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "24",
        title: "نسبة المحكوم عليهم بالسجن الفعلي في قضايا فساد",
        definition: "مؤشر يقيس نسبة المحكوم عليهم في قضايا فساد بالسجن الفعلي",
        measurement:
          "مجموع عدد الأشخاص الذين يتم الحكم عليهم بالسجن الفعلي خلال الاثني عشر شهراً الماضية في قضايا فساد نسبةً إلى المجموع الكلي لأعداد المحكومين بالسجن الفعلي في قضايا أخرى",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة",
        detail: "الفعل الإجرامي، مدة الحكم، الجنس، العمر",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "25",
        title: "نسبة الموقوفين على ذمة التحقيق بقضايا فساد",
        definition: "مؤشر يقيس نسبة الموقوفين على ذمة التحقيق بقضايا فساد",
        measurement:
          "مجموع عدد الأشخاص الذين يتم توقيفهم على ذمة التحقيق بقضايا فساد خلال الاثني عشر شهراً الماضية نسبةً إلى المجموع الكلي لأعداد الموقوفين على ذمة التحقيق بقضايا أخرى",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة",
        detail: "التهمة، مدة التوقيف، الجنس، العمر",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "26",
        title:
          "نسبة الأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي ودفعوا رشوة لمسؤول حكومي أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهراً السابقة",
        definition:
          "مؤشر يقيس النسبة المئوية للأشخاص الذين دفعوا رشوة لمسؤول حكومي مرة واحدة على الأقل (أعطوا المال لمسؤول حكومي، أو هدية أو هدية مقابل خدمة)، أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهراً الماضية، كنسبة مئوية من الأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي في الفترة نفسها.",
        measurement:
          "يُحسب المؤشر على أنه مجموع عدد الأشخاص الذين دفعوا رشوة واحدة على الأقل إلى موظف عمومي خلال الاثني عشر شهراً الماضية، أو طُلب منهم رشوة في الفترة نفسها، على مجموع عدد الأشخاص الذين لديهم اتصال واحد على الأقل بمسؤول حكومي في الفترة نفسها، مضروباً بمائة",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة، المحافظة",
        detail: "العمر والجنس",
        source: "مسح إحصائي · كل خمس سنوات · SDGs",
      },
      {
        num: "27",
        title: "نسبة القضاة في قضايا فساد",
        definition: "مؤشر يقيس نسبة القضاة ممن ينظرون قضايا فساد بأي من مراحل التقاضي الثلاث",
        measurement:
          "مجموع عدد القضاة الذين ينظرون قضايا فساد بأي من مراحل التقاضي نسبةً إلى المجموع الكلي لأعداد القضاة العاملين في المحاكم النظامية بمستوى قاضي بداية فأعلى",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة",
        detail: "نوع المحكمة، الجنس، سنوات الخبرة بالقضاء، العمر",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "28",
        title: "نسبة المحامين في قضايا فساد",
        definition:
          "مؤشر يقيس نسبة المحامين المزاولين للمهنة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي",
        measurement:
          "مجموع عدد المحامين المزاولين للمهنة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي الثلاث نسبةً إلى المجموع الكلي لأعداد المحامين المزاولين وفق سجلات النقابة",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة",
        detail: "الجنس، العمر، سنوات الخبرة",
        source: "سجلات إدارية · سنوي",
      },
      {
        num: "29",
        title: "نسبة أعضاء النيابة في قضايا فساد",
        definition: "مؤشر يقيس نسبة أعضاء النيابة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي",
        measurement:
          "مجموع عدد أعضاء النيابة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي الثلاث نسبةً إلى المجموع الكلي لأعداد المدعين العامين أو النواب العامين المعينين في النيابة العامة",
        unit: "نسبة مئوية",
        coverage: "المستوى الوطني، المنطقة",
        detail: "الجنس، العمر، سنوات الخبرة",
        source: "سجلات إدارية · سنوي",
      },
    ],
  },
];

function IndicatorAccordionItem({
  bandId,
  indicator,
  isOpen,
  onToggle,
}: {
  bandId: string;
  indicator: IndicatorRow;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { t, d } = useLocale();
  const buttonId = `indicator-${bandId}-${indicator.num}-trigger`;
  const panelId = `indicator-${bandId}-${indicator.num}-panel`;

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-card shadow-soft transition-all duration-200 ${
        isOpen
          ? "border-primary/25 shadow-lg"
          : "border-border hover:border-primary/25 hover:shadow-md"
      }`}
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
          }
        }}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-start transition-colors hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/45 sm:p-5"
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            <Hash className="h-3.5 w-3.5" />
            {t("mainInd.cardNumber", { num: indicator.num })}
          </span>
          <span className="min-w-0 flex-1 text-base font-bold leading-7 text-foreground transition-colors group-hover:text-primary sm:text-lg sm:leading-8">
            {d(indicator.title)}
          </span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-border bg-surface/40 p-4 text-right sm:p-5">
            <div className="space-y-5">
              <section>
                <h3 className="mb-2 text-sm font-bold text-primary">المؤشر</h3>
                <p className="whitespace-pre-line text-base font-bold leading-8 text-foreground">
                  {d(indicator.title)}
                </p>
              </section>

              <section className="rounded-lg border border-primary/15 bg-primary/5 p-4">
                <h3 className="mb-2 text-sm font-bold text-primary">التعريف</h3>
                <p className="whitespace-pre-line text-base leading-8 text-foreground">
                  {d(indicator.definition)}
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-sm font-bold text-primary">طريقة القياس</h3>
                <p className="whitespace-pre-line text-sm leading-7 text-foreground/85">
                  {d(indicator.measurement)}
                </p>
              </section>

              <section className="grid gap-3 md:grid-cols-2">
                {DETAIL_FIELDS.filter((field) => field.key !== "measurement").map((field) => (
                  <div key={field.key} className="rounded-lg border border-border bg-card p-4">
                    <h3 className="mb-2 text-sm font-bold text-primary">{field.label}</h3>
                    <p className="whitespace-pre-line text-sm leading-7 text-foreground/85">
                      {d(indicator[field.key])}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
function PrintDocument() {
  const { t, d } = useLocale();
  return (
    <div className="print-doc hidden print:block">
      <header className="print-doc__header">
        <div className="print-doc__org">{t("mainInd.printOrg")}</div>
        <h1>{t("mainInd.printTitle")}</h1>
        <p className="print-doc__intro">{t("mainInd.printIntro")}</p>
      </header>

      {EFFORT_BANDS.map((band) => (
        <section key={band.id} className="print-doc__section">
          <h2>
            {d(band.label)}: {d(band.title)}
          </h2>
          <table className="print-doc__table">
            <thead>
              <tr>
                <th>{t("mainInd.colNum")}</th>
                <th>{t("mainInd.colIndicator")}</th>
                <th>{t("mainInd.colDefinition")}</th>
                <th>{t("mainInd.colMeasurement")}</th>
                <th>{t("mainInd.colUnit")}</th>
                <th>{t("mainInd.colCoverage")}</th>
                <th>{t("mainInd.colDetail")}</th>
                <th>{t("mainInd.colSource")}</th>
              </tr>
            </thead>
            <tbody>
              {band.rows.map((row) => (
                <tr key={row.num}>
                  <td className="print-doc__num">{row.num}</td>
                  <td className="print-doc__title">{d(row.title)}</td>
                  <td>{d(row.definition)}</td>
                  <td>{d(row.measurement)}</td>
                  <td>{d(row.unit)}</td>
                  <td>{d(row.coverage)}</td>
                  <td>{d(row.detail)}</td>
                  <td>{d(row.source)}</td>
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
  const { t, d } = useLocale();
  const [openIndicators, setOpenIndicators] = useState<Record<string, string | null>>({});
  const total = EFFORT_BANDS.reduce((acc, b) => acc + b.rows.length, 0);

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

          <div className="space-y-14">
            {EFFORT_BANDS.map((band, i) => {
              const Icon = i === 0 ? Gavel : Scale;
              return (
                <div key={band.id}>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="max-w-5xl">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                          {d(band.label)}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                          {t("mainInd.groupCount", { count: band.rows.length })}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold leading-8 text-primary md:text-2xl">
                        {d(band.title)}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {band.rows.map((indicator) => (
                      <IndicatorAccordionItem
                        key={indicator.num}
                        bandId={band.id}
                        indicator={indicator}
                        isOpen={openIndicators[band.id] === indicator.num}
                        onToggle={() =>
                          setOpenIndicators((current) => ({
                            ...current,
                            [band.id]: current[band.id] === indicator.num ? null : indicator.num,
                          }))
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <PrintDocument />
    </SiteLayout>
  );
}
