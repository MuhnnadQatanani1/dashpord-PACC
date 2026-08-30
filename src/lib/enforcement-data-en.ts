/**
 * Arabic -> English translations for the law-enforcement indicator data
 * that lives inside charts and data tables (category names, row labels,
 * column headers). Chart code keeps Arabic strings as dataKeys so the data
 * binding is preserved, but translates what is *displayed* via this map.
 */

export const DATA_EN: Record<string, string> = {
  // ---- generic / axis labels ----
  المجموع: "Total",
  Total: "Total",
  السنة: "Year",
  الجرم: "Offence",
  الجريمة: "Crime",
  القطاع: "Sector",
  "طريقة الاستلام": "Receipt method",
  "التكييف القانوني": "Legal classification",
  "القطاع/الجهة": "Sector / entity",

  // ---- legislations ----
  "قرار بقانون": "Decree-law",
  "مرسوم أو قرار رئاسي": "Presidential decree or decision",
  "نظام أو لائحة أو قرار مجلس وزراء": "Regulation/bylaw/cabinet decision",
  "تعليمات أو قرارات تنظيمية": "Instructions or regulatory decisions",

  // ---- complaints by source ----
  "أفراد-ذكر": "Individuals – Male",
  "أفراد-أنثى": "Individuals – Female",
  "أفراد-ذكر وأنثى معاً": "Individuals – Male & Female",
  مؤسسات: "Institutions",
  "مجهول/غير معروف": "Unknown / unspecified",

  // ---- receipt method ----
  "الحضور الشخصي وتسليم باليد": "In-person attendance & hand delivery",
  "الحضور الشخصي وتسليم باليد*": "In-person attendance & hand delivery",
  "جهات ومؤسسات رسمية": "Official bodies & institutions",
  الرصد: "Monitoring",
  "الوسائل والتطبيقات الإلكترونية": "Electronic means & applications",

  // ---- sectors ----
  "مؤسسات عامة": "Public institutions",
  "هيئات محلية": "Local bodies",
  "مؤسسات المجتمع المدني": "Civil society organizations",
  "قطاع خاص": "Private sector",
  "مؤسسات تعليمية ومراكز بحثية": "Educational institutions & research centers",
  "مؤسسات دولية": "International institutions",
  "مكلفون بأداء خدمة عامة": "Private individuals entrusted with public duty",
  "مؤسسات منظمة التحرير": "PLO institutions",
  "غير خاضعين": "Not subject",
  أخرى: "Others",

  // ---- completed complaints / procedures ----
  حفظ: "Closed (no action)",
  "عدم الاختصاص": "Lack of jurisdiction",
  "إحالة الى النائب العام": "Referred to the Public Prosecutor",
  "إحالة لنيابات أخرى لعدم اختصاص": "Referred to other prosecutions, lack of jurisdiction",
  "إحالة لمحكمة جرائم الفساد": "Referred to the Corruption Crimes Court",
  "ضم لملفات أخرى": "Merged with other files",
  "عدد المدانين": "Number of convicted",

  // ---- referred by source ----
  "هيئة مكافحة الفساد": "Anti-Corruption Commission",
  "النائب العام": "Public Prosecutor",
  "منبثقة عن قضية أخرى": "Arising from another case",
  "واردة من جهات أخرى": "Received from other entities",
  "المجموع القضايا الواردة": "Total cases received",
  ذكر: "Male",
  أنثى: "Female",
  "المجموع المشتبه بهم": "Total suspects",
  "شخص معنوي": "Legal person",
  "المجموع أفراد": "Total individuals",

  // ---- court verdicts ----
  إدانة: "Conviction",
  براءة: "Acquittal",
  "انقضاء الدعوى الجزائية": "Limitation of the criminal action",

  // ---- offences / qualifications ----
  "اساءة استعمال السلطة": "Abuse of power",
  "إساءة استعمال السلطة": "Abuse of power",
  "التزوير/إعطاء مصدقات كاذبة/استعمال سند مزور":
    "Forgery / giving false certificates / using forged documents",
  "التزوير والتزييف": "Forgery and counterfeiting",
  "إساءة الائتمان": "Breach of trust",
  الاختلاس: "Embezzlement",
  "التهاون في القيام بالواجبات الوظيفية": "Negligence in performing official duties",
  "التهاون في أداء الواجبات الوظيفية": "Negligence in performing official duties",
  الرشوة: "Bribery",
  "الكسب غير المشروع": "Illicit gain",
  "قبول الواسطة والمحسوبية والمحاباة": "Accepting nepotism and favoritism",
  "استثمار الوظيفة": "Exploitation of office",
  "الاستثمار الوظيفي / الحصول على منفعة شخصية / الاتجار غير المشروع":
    "Exploitation of office / personal gain / unlawful trading",
  "عدم الإفصاح عن تضارب المصالح": "Failure to disclose conflict of interest",
  "غسل الأموال الناتجة عن جرائم فساد": "Money laundering from corruption crimes",
  "غسل الأموال": "Money laundering",
  "المتاجرة بالنفوذ": "Trading in influence",
  "إعاقة سير العدالة": "Obstructing justice",
  "عدم اختصاص قبل مرحلة التحري": "Lack of jurisdiction before the investigation stage",
  "عدم الاختصاص*": "Lack of jurisdiction",
  "جرائم لا تشكل فساد": "Crimes not constituting corruption",

  // ---- referred-to-prosecution by sector ----
  "قطاع عام": "Public sector",
  جمعيات: "Associations",
  "اتحادات ونقابات": "Unions and syndicates",
  "شركات مساهمة عامة": "Public joint-stock companies",
  "خبراء – مخمن عقاري": "Experts – property assessor",
  لجان: "Committees",
  "مكلف بخدمة عامة": "Entrusted with public service",
  "جمعيات خيرية": "Charitable associations",
  "حارس قضائي": "Judicial custodian",
  أندية: "Clubs",

  // ---- suspects ----
  "2024 (تفصيل الجنس)": "2024 (gender breakdown)",

  // ---- value names ----
  الشكاوى: "Complaints",
  الملفات: "Files",
  "التوزيع الكلي للفترة": "Total distribution for the period",
  "يعرض أكبر 4 أصناف قيمةً — استخدم زر «عرض البيانات» لرؤية البقية.":
    "Shows the 4 largest categories by value — use the “Show data” button to see the rest.",
};
