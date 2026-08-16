import type { Locale } from "./index";

/**
 * English counterparts for Arabic data-driven labels (indicator tables,
 * KPIs, journey milestones, sectors, crimes, governorates, stories…).
 * Kept separate from the UI dictionary so data files stay untouched;
 * consumers render data labels through `d()` / `dt()`.
 */
export const dataEn: Record<string, string> = {
  // KPIs
  "الشكاوى والبلاغات الواردة": "Received complaints & reports",
  "الملفات التحقيقية الواردة": "Received investigation files",
  "الملفات المحالة للنائب العام": "Files referred to the Attorney General",
  "القضايا المفصولة بحكم": "Cases concluded with a verdict",
  "المدانون في محكمة الفساد": "Convicted persons in the Anti-Corruption Court",

  // Journey milestones
  "اعتماد منهجية المؤشرات": "Adoption of the indicator methodology",
  "إطلاق المنصة الرقمية": "Launch of the digital platform",
  "إصدار التقرير العلني الأول": "Publication of the first public report",
  "التوسع في الشركاء": "Expanding partnerships",
  "تحديث المؤشرات": "Updating the indicators",
  "إطلاق لوحة البيانات التفاعلية": "Launch of the interactive dashboard",
  "التغطية الجغرافية الكاملة": "Full geographic coverage",
  "التقرير المفتوح والبيانات المفتوحة": "Open data and open reporting",
  "توحيد المؤشرات مع المعايير الدولية": "Aligning indicators with international standards",
  "أتمتة استخراج البيانات": "Automated data extraction",
  "الإبلاغ عن المخاطر الاستباقية": "Proactive risk reporting",
  "توسيع نطاق الحوكمة المحلية": "Expanding local governance scope",
  "أرشفة وإتاحة البيانات للباحثين": "Archiving and providing data to researchers",

  // Complaint sources (sheet 28)
  أفراد: "Individuals",
  مؤسسات: "Institutions",
  "مجهول / غير معروف": "Unknown / Anonymous",
  الإجمالي: "Total",
  المجموع: "Total",
  المصدر: "Source",
  "نوع التشريع": "Legislation type",
  "قرار بقانون": "Decree-law",
  "مرسوم أو قرار رئاسي": "Presidential decree or decision",
  "نظام أو لائحة أو قرار مجلس وزراء": "Regulation, bylaw, or cabinet decision",
  "تعليمات أو قرارات تنظيمية": "Instructions or regulatory decisions",

  // Crime classification (sheet 29)
  "التهاون في القيام بالواجبات الوظيفية": "Negligence in performing official duties",
  الرشوة: "Bribery",
  الاختلاس: "Embezzlement",
  "إساءة استعمال السلطة": "Abuse of power",
  "التزوير والتزييف": "Forgery and falsification",
  "قبول الواسطة والمحسوبية والمحاباة": "Accepting patronage, favoritism and nepotism",
  "استثمار الوظيفة": "Exploiting the position",
  "إساءة الائتمان": "Breach of trust",
  "الكسب غير المشروع": "Illicit enrichment",
  "عدم الإفصاح عن تضارب المصالح": "Failure to disclose conflict of interest",
  "غسل الأموال الناتجة عن جرائم فساد": "Money laundering from corruption crimes",
  "المتاجرة بالنفوذ": "Trading in influence",
  "إعاقة سير العدالة": "Obstructing the course of justice",
  "عدم اختصاص قبل مرحلة التحري": "Lack of jurisdiction before investigation",

  // Completed complaints by action (sheet 5)
  حفظ: "Archived",
  "عدم الاختصاص": "Lack of jurisdiction",
  "إحالة إلى النائب العام": "Referred to the Attorney General",

  // Complaint sectors (sheet 30)
  "مؤسسات عامة": "Public institutions",
  "هيئات محلية": "Local authorities",
  "مؤسسات المجتمع المدني": "Civil society organizations",
  "قطاع خاص": "Private sector",
  "مؤسسات تعليمية ومراكز بحثية": "Educational institutions and research centers",
  "مؤسسات دولية": "International organizations",
  "مكلفون بأداء خدمة عامة": "Persons assigned to public service",
  "مؤسسات منظمة التحرير": "PLO institutions",
  "غير خاضعين": "Not covered",
  أخرى: "Other",

  // Receipt method (sheet 31)
  "الحضور الشخصي والتسليم باليد": "In-person attendance and hand delivery",
  "جهات ومؤسسات رسمية": "Official bodies and institutions",
  الرصد: "Monitoring",
  "الوسائل والتطبيقات الإلكترونية": "Electronic means and applications",

  // Referred files by sector (sheet 3)
  "قطاع عام": "Public sector",
  جمعيات: "Associations",
  "اتحادات ونقابات": "Unions and syndicates",

  // Journey milestones
  "الفكرة والتأسيس": "Concept and founding",
  "نضوج فكرة الانتقال من قياس مدركات الفساد إلى قياس مؤشراته الفعلية بالاعتماد على البيانات الرسمية.":
    "Maturing the idea of moving from measuring corruption perceptions to measuring its actual indicators based on official data.",
  "الاستراتيجية الوطنية": "National strategy",
  "اعتماد الاستراتيجية الوطنية عبر القطاعية لتعزيز النزاهة ومكافحة الفساد التي حدّدت المرصد كأحد أعمدتها.":
    "Adoption of the cross-sectoral national strategy to promote integrity and combat corruption, which identified the Observatory as one of its pillars.",
  "إطلاق التقرير العلني الأول": "Launch of the first public report",
  "أطلقت هيئة مكافحة الفساد الفلسطينية التقرير العلني الأول للمرصد الوطني لمؤشرات الفساد بحضور رسمي واسع.":
    "The Palestinian Anti-Corruption Commission launched the first public report of the National Observatory for Corruption Indicators with wide official attendance.",
  "ترسيخ منظومة البيانات": "Consolidating the data system",
  "تسجيل 234 ملفاً تحقيقياً و879 شكوى وبلاغاً؛ اعتماد الجداول الإحصائية الموحّدة لأول مرة.":
    "Recording 234 investigation files and 879 complaints; unified statistical tables adopted for the first time.",
  "توسيع منظومة المؤشرات": "Expanding the indicator system",
  "إضافة مؤشرات جديدة تشمل جرائم الفساد حسب التكييف الأولي، والشكاوى حسب مصدر التقديم ودرجة المشتكى عليه.":
    "Adding new indicators covering corruption crimes by preliminary classification, and complaints by submission source and defendant rank.",
  "التدقيق ومعالجة الفجوات": "Auditing and addressing gaps",
  "توحيد قائمة المقياس وتوثيق التحفظات على أرقام محددة وتصحيحها ضمن نسخ محدَّثة، ورصد بيانات غزة الاستثنائية.":
    "Standardizing the measurement list, documenting reservations on specific figures and correcting them in updated versions, and monitoring exceptional Gaza data.",
  "قفزة الأحكام القضائية": "A leap in judicial verdicts",
  "بلوغ 26 قضية مفصولة بحكم (×2 مقارنة بـ 2024) و95.6% استيفاء لإقرارات الذمة المالية.":
    "Reaching 26 cases concluded with a verdict (×2 compared to 2024) and 95.6% completion of financial disclosure declarations.",
  "خارطة الطريق المستقبلية": "Future roadmap",
  "تطوير المرصد التفاعلي الرقمي، ربط البيانات مع الجهات الشريكة، ونشر بيانات مفتوحة بصيغ قابلة للتحليل الآلي.":
    "Developing the interactive digital observatory, linking data with partner entities, and publishing open data in machine-readable formats.",

  // Home KPI cards
  "الشكاوى والبلاغات الواردة": "Received complaints and reports",
  "الملفات التحقيقية الواردة": "Received investigation files",
  "الملفات المحالة للنائب العام": "Files referred to the Attorney General",
  "القضايا المفصولة بحكم": "Cases concluded with a verdict",
  "المدانون في محكمة الفساد": "Convicted persons in the Corruption Court",

  // Data quality
  "يناير 2026": "January 2026",

  // Indicator entities
  "هيئة مكافحة الفساد": "Anti-Corruption Commission",
  "نيابة جرائم الفساد": "Corruption Crimes Prosecution",
  "محكمة جرائم الفساد": "Corruption Crimes Court",

  // Data stories
  "اتجاه الشكاوى الواردة لهيئة مكافحة الفساد":
    "Trend of complaints received by the Anti-Corruption Commission",
  "رصدت الهيئة 2,923 شكوى وبلاغاً خلال الفترة 2022 – 2025، وسجّل عام 2022 أعلى عدد، ثم انخفضت الأرقام في 2023 وعادت للارتفاع التدريجي في 2024 و2025.":
    "The Commission recorded 2,923 complaints and reports during 2022–2025, with 2022 recording the highest number, followed by a decline in 2023 and a gradual rise again in 2024 and 2025.",
  "شكوى وبلاغاً في عام 2022 (الأعلى خلال الفترة)":
    "complaints and reports in 2022 (the highest in the period)",
  "إساءة استعمال السلطة في صدارة تكييفات الفساد": "Abuse of power leads corruption classifications",
  "يشكّل تكييف إساءة استعمال السلطة النسبة الأكبر من شبهات الفساد الواردة للهيئة خلال الفترة 2022 – 2025، متفوقاً على الرشوة والاختلاس والتزوير مجتمعة.":
    "Abuse of power accounts for the largest share of corruption suspicions received by the Commission during 2022–2025, surpassing bribery, embezzlement and forgery combined.",
  "من إجمالي الشكاوى والبلاغات الواردة خلال الفترة":
    "of all complaints and reports received during the period",
  "معظم الشكاوى المنجزة تُحفظ لدى الهيئة":
    "Most completed complaints are archived by the Commission",
  "من بين القرارات الصادرة عن الهيئة في الشكاوى والبلاغات المنجزة، يذهب الجزء الأكبر نحو الحفظ، بينما تُحال نسبة أقل إلى النائب العام للتحقيق.":
    "Among the decisions issued by the Commission on completed complaints, the largest share is archived, while a smaller share is referred to the Attorney General for investigation.",
  "قرارات الحفظ من إجمالي القرارات الصادرة خلال الفترة":
    "of the total decisions issued during the period were archiving decisions",
  "القنوات الإلكترونية تتصدر تقديم الشكاوى": "Electronic channels lead complaint submission",
  "أصبحت الوسائل والتطبيقات الإلكترونية القناة الأولى لتقديم الشكاوى والبلاغات للهيئة خلال الفترة 2022 – 2025، متجاوزة الحضور الشخصي والجهات الرسمية.":
    "Electronic means and applications became the leading channel for submitting complaints to the Commission during 2022–2025, surpassing in-person attendance and official channels.",
  "من إجمالي الشكاوى الواردة عبر الوسائل الإلكترونية":
    "of all complaints received through electronic means",
  "المشتبه بهم المحالون من الهيئة إلى النيابة":
    "Suspects referred by the Commission to the Prosecution",
  "بلغ إجمالي المشتبه بهم المحالين من الهيئة إلى نيابة جرائم الفساد خلال الفترة 2022 – 2025 نحو 294 مشتبهاً به، مع تذبذب الأرقام بين الأعوام.":
    "A total of about 294 suspects were referred by the Commission to the Corruption Crimes Prosecution during 2022–2025, with figures fluctuating between years.",
  "مشتبهاً به محالاً خلال الفترة 2022 – 2025": "suspects referred during 2022–2025",
  "أحكام الإدانة في محكمة جرائم الفساد": "Conviction verdicts in the Corruption Crimes Court",
  "فصلت محكمة جرائم الفساد 66 قضية بحكم خلال الفترة 2022 – 2025، ومثّلت أحكام الإدانة نحو 33 قضية، مع تسجيل عام 2025 أعلى عدد من الأحكام.":
    "The Corruption Crimes Court concluded 66 cases with verdicts during 2022–2025, with conviction verdicts covering about 33 cases and 2025 recording the highest number of verdicts.",
  "قضية إدانة من إجمالي القضايا المفصولة بحكم خلال الفترة":
    "conviction cases out of all cases concluded with a verdict during the period",

  // Spotlight indicators
  "نسبة الإناث الذين تقدمو بشكاوى لهيئة مكافحة الفساد":
    "Share of female complainants to the Anti-Corruption Commission",
  "نسبة الشكاوى التي كان تكييفها الاولي إساءة استعمال السلطة":
    "Share of complaints initially classified as abuse of power",
  "نسبة الشكاوى التي كان تكييفها الاولي الرشوة":
    "Share of complaints initially classified as bribery",
  "نسبة الشكاوى التي كان تكييفها الاولي الواسطة والمحسوبية والمحاباة":
    "Share of complaints initially classified as patronage, favoritism and nepotism",
  "نسبة الشكاوى الواردة من خلال الوسائل والقنوات الإلكترونية":
    "Share of complaints received via electronic means and channels",
  "نسبة الشكاوى والبلاغات المحفوظة لدى هيئة مكافحة الفساد":
    "Share of complaints archived by the Anti-Corruption Commission",
  "نسبة القضايا التحقيقية الواردة من الهيئة لنيابة جرائم الفساد":
    "Share of investigation cases received by the Corruption Crimes Prosecution from the Commission",
  "نسبة الذكور المحالين من النيابة لمحكمة جرائم الفساد":
    "Share of males referred by the Prosecution to the Corruption Crimes Court",
  "نسبة الملفات التحقيقية المحفوظة لدى النيابة":
    "Share of investigation files archived by the Prosecution",
  "نسبة الملفات التحقيقية المحالة للمحكمة حسب اعلى تكييف":
    "Share of investigation files referred to the Court by top classification",
  "نسبة الإدانة من الأحكام": "Conviction rate among verdicts",

  // Spotlight notes
  "من إجمالي الشكاوى ذات الجنس المحدد (شيت 28).":
    "of all complaints with a specified gender (Sheet 28).",
  "من إجمالي الملفات الواردة 2022-2025 (شيت 21).": "of all files received 2022–2025 (Sheet 21).",
  "من إجمالي الشكاوى الواردة 2022-2025 (شيت 31).":
    "of all complaints received 2022–2025 (Sheet 31).",
  "قرارات الحفظ من إجمالي القرارات الصادرة 2022-2025 (شيت 27).":
    "archiving decisions of all decisions issued 2022–2025 (Sheet 27).",
  "من إجمالي القضايا الواردة للنيايبة 2022-2025 (شيت 34).":
    "of all cases received by the Prosecution 2022–2025 (Sheet 34).",
  "من إجمالي المشتبه بهم المحالين 2022-2025 (شيت 34).":
    "of all suspects referred 2022–2025 (Sheet 34).",
  "قضايا الحفظ من إجمالي القضايا المنجزة 2022-2025 (شيت 34).":
    "archived cases of all completed cases 2022–2025 (Sheet 34).",
  "قضايا الإحالة للمحكمة من إجمالي القضايا المنجزة 2022-2025 (شيت 34).":
    "court referral cases of all completed cases 2022–2025 (Sheet 34).",
  "المدانون من إجمالي القضايا المفصولة بحكم 2022-2025 (شيتات 8-10).":
    "convicted persons of all cases concluded with a verdict 2022–2025 (Sheets 8–10).",

  // Framework criteria
  المساءلة: "Accountability",
  المشاركة: "Participation",
  الفاعلية: "Effectiveness",
  الشفافية: "Transparency",
  "العدالة وعدم التمييز": "Equity and non-discrimination",
  "إلزام المؤسسات العامة والمسؤولين ببيان أعمالهم وقراراتهم ومحاسبتهم على أدائهم، عبر وحدات الرقابة الداخلية، ونظر الشكاوى والتظلمات، ومتابعة تنفيذ التوصيات الصادرة عن التقارير والدراسات والأبحاث.":
    "Holding public institutions and officials accountable for their actions and decisions through internal control units, examining complaints and grievances, and following up on the implementation of recommendations from reports, studies and research.",
  "إشراك المجتمع المدني والقطاع الخاص والإعلام والمؤسسات التعليمية في مساءلة المسؤولين ومراقبة الأداء العام، ونشر ثقافة النزاهة ومكافحة الفساد ودعم جهود الوقاية منه.":
    "Engaging civil society, the private sector, media and educational institutions in holding officials accountable, monitoring public performance, spreading a culture of integrity and anti-corruption, and supporting prevention efforts.",
  "مدى نجاح أجهزة إنفاذ القانون في كشف الفساد وملاحقته، بما يشمل إنجاز الملفات التحقيقية والقضائية، ونسب الإدانة، واسترداد الأموال والعائدات الجرمية المحكوم بها.":
    "The success of law enforcement bodies in detecting and prosecuting corruption, including completing investigation and judicial files, conviction rates, and recovering adjudicated funds and criminal proceeds.",
  "إتاحة المعلومات والخطط والقرارات والإجراءات للجمهور عبر قنوات معلنة ومحددة، وتحديث أدلة الإجراءات وتسهيل الوصول إلى الخدمات والمعلومات، والمشاركة الفاعلة في المحافل الإقليمية والدولية.":
    "Making information, plans, decisions and procedures available to the public through announced and defined channels, updating procedure guides, facilitating access to services and information, and actively participating in regional and international forums.",
  "تكافؤ فرص المواطنين كافة في الوصول إلى العدالة والخدمة العامة، ومراعاة النوع الاجتماعي والفئات المهمشة في آليات الإبلاغ والمتابعة، واعتماد معايير واضحة وعادلة في الاختيار والتعيين والترقية.":
    "Equal opportunities for all citizens to access justice and public service, taking gender and marginalized groups into account in reporting and follow-up mechanisms, and adopting clear and fair criteria in selection, appointment and promotion.",

  // Law enforcement bands
  "البند الأول": "Item 1",
  "البند الثاني": "Item 2",
  "وجود قوانين وأنظمة وتعليمات معززة للبيئة الطاردة للفساد ومكافحته واضحة ومحددة الصلاحيات":
    "Existence of laws, regulations and instructions that promote a corruption-deterrent and anti-corruption environment, clear and with defined powers",
  "إصدار التشريعات والأنظمة والتعليمات ذات العلاقة بالنزاهة ومكافحة الفساد، مع وضوح الصلاحيات وآليات العمل بما يمنع الفساد ويكشفه ويعزز بيئة طاردة له.":
    "Issuing legislation, regulations and instructions related to integrity and anti-corruption, with clarity of powers and working mechanisms that prevent and expose corruption and foster a deterrent environment.",
  "تطبيق القانون بفعالية وعدالة ومساواة على الجميع":
    "Applying the law effectively, fairly and equally to everyone",
  "تطبيق أحكام القانون على الجميع دون تمييز أو محسوبية، وبفعالية وعدالة ومساواة، بما يعزز الثقة بسيادة القانون ويزيد من فاعلية إنفاذه.":
    "Applying the provisions of the law to everyone without discrimination or favoritism, effectively, fairly and equally, enhancing trust in the rule of law and increasing the effectiveness of its enforcement.",

  // Gaza 2024 exceptional data (sheet 45)
  "شكاوى وردت من/عن قطاع غزة نتيجة ظروف الحرب، وردت حصراً في التقرير السنوي 2024 ولا يوجد ما يقابلها في باقي الأعوام.":
    "Complaints received from/about the Gaza Strip due to war conditions, reported exclusively in the 2024 annual report with no counterpart in other years.",
  "استغلال محال الصرافة بعمولات مرتفعة بين 20% و45%.":
    "Exploiting money exchange shops with high commissions between 20% and 45%.",
  "ارتفاع رسوم السفر غير الرسمية من 350$ إلى 5,000–10,000$.":
    "Rising unofficial travel fees from $350 to $5,000–10,000.",
  "رفع أسعار السلع بشكل مبالغ فيه.": "Excessive price hikes on goods.",
  "تفاوت أسعار السلع بين الدفع النقدي والإلكتروني.":
    "Price discrepancies between cash and electronic payments.",
  "حرمان مواطنين من المساعدات لغياب معايير واضحة للتوزيع.":
    "Depriving citizens of aid due to the lack of clear distribution criteria.",

  // Governorate regions
  الشمال: "North",
  الوسط: "Central",
  الجنوب: "South",
  "قطاع غزة": "Gaza Strip",

  // Governorate names
  جنين: "Jenin",
  طوباس: "Tubas",
  طولكرم: "Tulkarm",
  نابلس: "Nablus",
  قلقيلية: "Qalqilya",
  سلفيت: "Salfit",
  "رام الله والبيرة": "Ramallah and Al-Bireh",
  أريحا: "Jericho",
  القدس: "Jerusalem",
  "بيت لحم": "Bethlehem",
  الخليل: "Hebron",
  "شمال غزة": "North Gaza",
  غزة: "Gaza",
  "دير البلح": "Deir al-Balah",
  "خان يونس": "Khan Younis",
  رفح: "Rafah",

  // Dashboard catalog columns
  "التكييف الأولي": "Initial classification",
  القطاع: "Sector",
  "طريقة الاستلام": "Receipt method",
  الإجراء: "Action",
  "القطاع/الجهة": "Sector/entity",
  "التكييف الجرمي": "Criminal classification",
  السنة: "Year",
  العدد: "Count",
  الجنس: "Gender",
  "عدد المتهمين": "Number of accused",
  "نتيجة الحكم": "Verdict outcome",
  العملة: "Currency",

  // Dashboard catalog rows — additional values
  ذكور: "Male",
  إناث: "Female",
  "النائب العام": "Attorney General",
  "منبثقة عن قضية أخرى": "Emerged from another case",
  "واردة من جهات أخرى": "Received from other entities",
  "شركات مساهمة عامة": "Public shareholding companies",
  "خبراء – مخمن عقاري": "Experts – real estate appraiser",
  لجان: "Committees",
  "مكلف بخدمة عامة": "Person assigned to public service",
  "جمعيات خيرية": "Charitable associations",
  "حارس قضائي": "Judicial custodian",
  أندية: "Clubs",
  "التزوير / إعطاء مصدقات كاذبة / استعمال سند مزور":
    "Forgery / issuing false certificates / using a forged document",
  "التهاون في أداء الواجبات الوظيفية": "Negligence in performing official duties",
  "غسل الأموال": "Money laundering",
  "الاستثمار الوظيفي / الحصول على منفعة شخصية / الاتجار غير المشروع":
    "Position exploitation / obtaining personal benefit / unlawful trading",
  "إحالة لمحكمة جرائم الفساد": "Referred to the Corruption Crimes Court",
  "ضم لملفات أخرى": "Merged into other files",
  "إحالة إلى نيابات أخرى لعدم الاختصاص":
    "Referred to other prosecutor offices for lack of jurisdiction",
  إدانة: "Conviction",
  براءة: "Acquittal",
  "انقضاء الدعوى الجزائية": "Expiry of the criminal case",
  الشيكل: "Shekel",
  الدينار: "Dinar",
  الدولار: "Dollar",

  // Dashboard indicator titles
  "عدد التشريعات/البنود المُقرّة أو المعدّلة المعزِّزة للوقاية من الفساد":
    "Number of legislations/items enacted or amended that strengthen corruption prevention",
  "عدد التشريعات أو البنود التشريعية التي تم إقرارها أو تعديلها خلال العام، والمصنّفة على أنها معزّزة للوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون.":
    "Number of legislations or legislative items enacted or amended during the year, classified as strengthening corruption prevention among covered entities and law enforcement bodies.",
  "الملف الإحصائي الرسمي — شيت 1 (التشريعات)": "Official statistical file — Sheet 1 (Legislation)",
  "عدد التشريعات/البنود المقرّة أو المعدّلة سنوياً والمصنّفة معزّزة للوقاية من الفساد، موزّعة حسب نوع التشريع.":
    "Number of legislations/items enacted or amended annually, classified as strengthening corruption prevention, distributed by legislation type.",
  "عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد حسب مصدر التقديم":
    "Number of complaints and reports received by the Anti-Corruption Commission by submission source",
  "توزيع الشكاوى والبلاغات الواردة إلى الهيئة وفق مصدر تقديم الشكوى (أفراد، مؤسسات، مجهول/غير معروف).":
    "Distribution of complaints and reports received by the Commission by complaint submission source (individuals, institutions, unknown/anonymous).",
  "الملف الإحصائي الرسمي — شيت 28": "Official statistical file — Sheet 28",
  "عدد الشكاوى والبلاغات الواردة مصنفة حسب مصدر التقديم لكل عام.":
    "Number of complaints and reports received, classified by submission source for each year.",
  "عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد حسب التكييف الأولي لشبهات الفساد":
    "Number of complaints and reports received by the Anti-Corruption Commission by initial classification of corruption suspicions",
  "توزيع الشكاوى والبلاغات الواردة حسب التكييف الأولي لشبهات الفساد (نوع الجرم المشتبه به).":
    "Distribution of received complaints and reports by the initial classification of corruption suspicions (type of suspected offense).",
  "الملف الإحصائي الرسمي — شيت 29": "Official statistical file — Sheet 29",
  "عدد الشكاوى والبلاغات الواردة مصنفة حسب التكييف الأولي للجرم لكل عام.":
    "Number of complaints and reports received, classified by initial offense classification for each year.",
  "عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد حسب القطاع":
    "Number of complaints and reports received by the Anti-Corruption Commission by sector",
  "توزيع الشكاوى والبلاغات الواردة حسب قطاع الجهة المشتكى منها.":
    "Distribution of received complaints and reports by the sector of the complained-against entity.",
  "الملف الإحصائي الرسمي — شيت 30": "Official statistical file — Sheet 30",
  "عدد الشكاوى والبلاغات الواردة مصنفة حسب القطاع لكل عام.":
    "Number of complaints and reports received, classified by sector for each year.",
  "عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد حسب طريقة الاستلام":
    "Number of complaints and reports received by the Anti-Corruption Commission by receipt method",
  "توزيع الشكاوى والبلاغات الواردة وفق الطريقة التي استُلمت بها (حضور شخصي، جهات رسمية، رصد، وسائل إلكترونية).":
    "Distribution of received complaints and reports by the method through which they were received (in-person, official entities, monitoring, electronic means).",
  "الملف الإحصائي الرسمي — شيت 31": "Official statistical file — Sheet 31",
  "عدد الشكاوى والبلاغات الواردة مصنفة حسب طريقة الاستلام لكل عام.":
    "Number of complaints and reports received, classified by receipt method for each year.",
  "عدد الشكاوى والبلاغات المنجزة لدى هيئة مكافحة الفساد حسب الإجراء":
    "Number of completed complaints and reports at the Anti-Corruption Commission by action",
  "توزيع الشكاوى والبلاغات المنجزة لدى الهيئة حسب الإجراء المتخذ بشأنها (حفظ، عدم اختصاص، إحالة إلى النائب العام).":
    "Distribution of completed complaints and reports at the Commission by the action taken on them (archiving, lack of jurisdiction, referral to the Attorney General).",
  "الملف الإحصائي الرسمي — شيت 5": "Official statistical file — Sheet 5",
  "عدد الشكاوى والبلاغات المنجزة مصنفة حسب الإجراء الصادر بشأنها لكل عام.":
    "Number of completed complaints and reports, classified by the action issued on them for each year.",
  "الملفات التحقيقية المحالة إلى النائب العام حسب القطاع":
    "Investigation files referred to the Attorney General by sector",
  "توزيع الملفات التحقيقية المحالة إلى النائب العام حسب القطاع/الجهة (قطاع عام، هيئات محلية، جمعيات، نقابات...).":
    "Distribution of investigation files referred to the Attorney General by sector/entity (public sector, local authorities, associations, unions...).",
  "الملف الإحصائي الرسمي — شيت 3": "Official statistical file — Sheet 3",
  "عدد الملفات المحالة مصنفة حسب القطاع لكل عام.":
    "Number of referred files, classified by sector for each year.",
  "الملفات التحقيقية المحالة إلى النائب العام حسب التكييف الجرمي":
    "Investigation files referred to the Attorney General by criminal classification",
  "توزيع الملفات التحقيقية المحالة إلى النائب العام حسب نوع التكييف الجرمي.":
    "Distribution of investigation files referred to the Attorney General by type of criminal classification.",
  "عدد الملفات المحالة مصنفة حسب نوع التكييف الجرمي لكل عام.":
    "Number of referred files, classified by type of criminal classification for each year.",
  "عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد":
    "Number of suspects referred by the Commission to the Corruption Prosecution",
  "عدد القضايا التحقيقية الواردة إلى نيابة جرائم الفساد من هيئة مكافحة الفساد (المشتبه بهم المحالين للنيابة).":
    "Number of investigation cases received by the Corruption Crimes Prosecution from the Anti-Corruption Commission (suspects referred to the Prosecution).",
  "الملف الإحصائي الرسمي — شيت 6": "Official statistical file — Sheet 6",
  "عدد المشتبه بهم المحالين إلى النيابة لكل عام.":
    "Number of suspects referred to the Prosecution for each year.",
  "عدد طلبات الحماية الواردة إلى الهيئة حسب الجنس":
    "Number of protection requests received by the Commission by gender",
  "عدد طلبات الحماية الواردة إلى هيئة مكافحة الفساد خلال كل عام، مصنفة حسب جنس مقدم الطلب.":
    "Number of protection requests received by the Anti-Corruption Commission each year, classified by the gender of the applicant.",
  "الملف الإحصائي الرسمي — شيت 15": "Official statistical file — Sheet 15",
  "عدد طلبات الحماية الواردة مصنفة حسب الجنس (ذكور، إناث) لكل عام.":
    "Number of protection requests received, classified by gender (male, female) for each year.",
  "عدد القضايا التحقيقية الواردة لنيابة جرائم الفساد حسب المصدر":
    "Number of investigation cases received by the Corruption Crimes Prosecution by source",
  "توزيع القضايا التحقيقية الواردة إلى نيابة جرائم الفساد وفق مصدر ورودها.":
    "Distribution of investigation cases received by the Corruption Crimes Prosecution by their source.",
  "عدد القضايا الواردة مصنفة حسب المصدر (هيئة مكافحة الفساد، النائب العام، قضايا أخرى، جهات أخرى) لكل عام.":
    "Number of received cases, classified by source (Anti-Corruption Commission, Attorney General, other cases, other entities) for each year.",
  "عدد المشتبه بهم المحالين لنيابة جرائم الفساد حسب الجنس":
    "Number of suspects referred to the Corruption Crimes Prosecution by gender",
  "توزيع المشتبه بهم المحالين إلى نيابة جرائم الفساد وفق الجنس (ذكور، إناث).":
    "Distribution of suspects referred to the Corruption Crimes Prosecution by gender (male, female).",
  "عدد المشتبه بهم المحالين مصنفاً حسب الجنس لكل عام.":
    "Number of suspects referred, classified by gender for each year.",
  "عدد القضايا المنجزة لدى نيابة جرائم الفساد حسب الإجراء":
    "Number of completed cases at the Corruption Crimes Prosecution by action",
  "توزيع القضايا التحقيقية المنجزة لدى النيابة حسب الإجراء (إحالة للمحكمة، حفظ، ضم لملفات أخرى، إحالة لنيابات أخرى).":
    "Distribution of completed investigation cases at the Prosecution by action (referral to the Court, archiving, merging into other files, referral to other prosecutor offices).",
  "الملف الإحصائي الرسمي — شيت 10": "Official statistical file — Sheet 10",
  "عدد القضايا المنجزة مصنفة حسب الإجراء لكل عام.":
    "Number of completed cases, classified by action for each year.",
  "عدد المتهمين المحالين من نيابة جرائم الفساد إلى محكمة جرائم الفساد":
    "Number of accused persons referred from the Corruption Crimes Prosecution to the Corruption Crimes Court",
  "عدد المتهمين المحالين من نيابة جرائم الفساد إلى محكمة جرائم الفساد خلال كل عام.":
    "Number of accused persons referred from the Corruption Crimes Prosecution to the Corruption Crimes Court each year.",
  "عدد المتهمين المحالين إلى المحكمة سنوياً.":
    "Number of accused persons referred to the Court annually.",
  "عدد القضايا المفصولة بحكم في محكمة جرائم الفساد حسب نتيجة الحكم":
    "Number of cases concluded with a verdict in the Corruption Crimes Court by verdict outcome",
  "توزيع القضايا المفصولة بحكم في محكمة جرائم الفساد وفق نتيجة الحكم (إدانة، براءة، عدم اختصاص، انقضاء الدعوى).":
    "Distribution of cases concluded with a verdict in the Corruption Crimes Court by verdict outcome (conviction, acquittal, lack of jurisdiction, expiry of the case).",
  "الملف الإحصائي الرسمي — شيت 9": "Official statistical file — Sheet 9",
  "عدد القضايا المفصولة بحكم مصنفة حسب نتيجة الحكم لكل عام.":
    "Number of cases concluded with a verdict, classified by verdict outcome for each year.",
  "قيمة الأموال والعائدات الجرمية المحكوم بها حسب نوع العملة":
    "Value of adjudicated illicit funds and proceeds by currency type",
  "قيمة الأموال والعائدات الجرمية المحكوم بها في أحكام محكمة جرائم الفساد، مصنفة حسب نوع العملة.":
    "Value of illicit funds and proceeds adjudicated in the verdicts of the Corruption Crimes Court, classified by currency type.",
  "أحكام محكمة جرائم الفساد — شيت 12": "Corruption Crimes Court verdicts — Sheet 12",
  "إجمالي القيم المحكوم بها نقداً ضمن الأحكام الصادرة، مصنفة حسب العملة.":
    "Total monetary values adjudicated within issued verdicts, classified by currency.",

  // Main law-enforcement indicators — band labels & titles
  "البند 1": "Item 1",
  "البند 2": "Item 2",
  "وجود قوانين وأنظمة وتعليمات معززة للبيئة الطاردة للفساد ومكافحته واضحة الأحكام ومحددة الصلاحيات":
    "Existence of laws, regulations and instructions that promote a corruption-deterrent and anti-corruption environment, with clear provisions and defined powers",
  "تطبيق القانون بفاعلية وعدالة ومساواة على الجميع":
    "Applying the law effectively, fairly and equally to everyone",

  // Units / coverage / sources
  عدد: "Count",
  "نسبة مئوية": "Percentage",
  "فترة زمنية": "Time period",
  "المستوى الوطني": "National level",
  "المستوى الوطني، المنطقة": "National level, region",
  "المستوى الوطني، المحافظة": "National level, governorate",
  "المستوى الوطني، المنطقة، المحافظة": "National level, region, governorate",
  "سجلات إدارية · سنوي": "Administrative records · Annual",
  "استطلاع رأي · مجموعات بؤرية · سنوي": "Opinion survey · Focus groups · Annual",
  "مسح إحصائي · كل خمس سنوات · SDGs": "Statistical survey · Every five years · SDGs",
  "—": "—",

  // Main indicators — indicator 1
  "عدد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها المصنفة على أنها معززة للوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون":
    "Number of legislations or items in legislation that were enacted or amended, classified as strengthening corruption prevention among covered entities and law enforcement bodies",
  "مؤشر يقيس عدد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها والمصنفة على أنها معززة للوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون.":
    "An indicator measuring the number of legislations or items in legislation that were enacted or amended and classified as strengthening corruption prevention among covered entities and law enforcement bodies.",
  "مجموع أعداد التشريعات أو البنود في التشريعات التي تم إقرارها أو تعديلها سنوياً والتي من شأنها إحداث تحسن في بيئة الوقاية من الفساد لدى الجهات الخاضعة وجهات إنفاذ القانون":
    "Total number of legislations or items in legislation enacted or amended annually that improve the corruption prevention environment among covered entities and law enforcement bodies",
  التصنيف: "Classification",

  // Main indicators — indicator 2
  "جودة وفاعلية التشريعات ذات العلاقة بمكافحة الفساد":
    "Quality and effectiveness of anti-corruption legislation",
  "مؤشر يقيس مستوى جودة التشريعات ذات العلاقة بمكافحة الفساد من خلال القضاة وأعضاء النيابة العامة والعاملين في إنفاذ القانون في الهيئة والمحامين المخضرمين ممن عملوا في هذا المجال وعلى أساتذة القانون في الجامعات وأصحاب الرأي والمهتمين.":
    "An indicator measuring the quality of anti-corruption legislation based on judges, public prosecution members, law enforcement staff in the Commission, experienced lawyers who worked in this field, university law professors, opinion leaders and interested parties.",
  "سيتم تحديدها بالتعاون مع الجهاز المركزي للإحصاء الفلسطيني مع إمكانية المقارنة مع المعايير الدولية":
    "To be determined in cooperation with the Palestinian Central Bureau of Statistics, with the possibility of comparison with international standards",
  "سيتم تحديدها بالتعاون مع الجهاز المركزي للإحصاء الفلسطيني":
    "To be determined in cooperation with the Palestinian Central Bureau of Statistics",

  // Main indicators — indicator 3
  "عدد الشكاوى/البلاغات الواردة لهيئة مكافحة الفساد":
    "Number of complaints/reports received by the Anti-Corruption Commission",
  "مؤشر يقيس عدد الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد.":
    "An indicator measuring the number of complaints and reports received by the Anti-Corruption Commission.",
  "مجموع الشكاوى والبلاغات الواردة لهيئة مكافحة الفساد سنوياً":
    "Total complaints and reports received by the Anti-Corruption Commission annually",
  "طبيعة الإجراء/ جنس مقدمي الشكوى/البلاغ، العمر، الدرجة الوظيفية للمشتكي، مصدر تقديم الشكوى/البلاغ، التكييف الأولي لشبهات الفساد، طريقة استلام الشكوى/البلاغ، القطاع، الجهة المشتكى عليها، جنس المشتكى عليهم.":
    "Nature of action / gender of complainants, age, complainant's job rank, complaint submission source, initial classification of corruption suspicions, complaint receipt method, sector, complained-against entity, gender of the complained-against.",

  // Main indicators — indicator 4
  "مؤشر يقيس عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد":
    "An indicator measuring the number of suspects referred by the Commission to the Corruption Prosecution",
  "مجموع عدد المشتبه بهم المحالين من الهيئة إلى نيابة مكافحة الفساد":
    "Total number of suspects referred by the Commission to the Corruption Prosecution",
  "جنس المشتبه به/ العمر/ الوظيفة/ مكان السكن على مستوى المحافظة/ مستوى التعليم/ مستوى الدخل":
    "Suspect's gender / age / occupation / place of residence at governorate level / education level / income level",

  // Main indicators — indicator 5
  "عدد الملفات التحقيقية لدى الهيئة": "Number of investigation files at the Commission",
  "مؤشر يقيس عدد الملفات التحقيقية لدى الهيئة":
    "An indicator measuring the number of investigation files at the Commission",
  "عدد الملفات التحقيقية لدى الهيئة سنوياً":
    "Number of investigation files at the Commission annually",
  "طبيعة الإجراء، التكييف القانوني بعد التحقيق، عدد الشكاوى والبلاغات لكل ملف تحقيقي.":
    "Nature of action, legal classification after investigation, number of complaints and reports per investigation file.",

  // Main indicators — indicator 6
  "عدد الملفات التحقيقية المنجزة لدى الهيئة":
    "Number of completed investigation files at the Commission",
  "مؤشر يقيس عدد الملفات التحقيقية المنجزة لدى الهيئة":
    "An indicator measuring the number of completed investigation files at the Commission",
  "عدد الملفات التحقيقية المنجزة من إجمالي المسجل في سجلات الهيئة سنوياً":
    "Number of investigation files completed out of the total registered in the Commission's records annually",
  "التكييف القانوني بعد التحقيق، عدد الشكاوى والبلاغات لكل ملف تحقيقي.":
    "Legal classification after investigation, number of complaints and reports per investigation file.",

  // Main indicators — indicator 7
  "عدد ملفات التحقيق الجزائي الواردة لنيابة جرائم الفساد":
    "Number of criminal investigation files received by the Corruption Crimes Prosecution",
  "مؤشر يقيس عدد القضايا التحقيقية الواردة لنيابة جرائم الفساد سنوياً":
    "An indicator measuring the number of investigation cases received by the Corruption Crimes Prosecution annually",
  "مجموع عدد القضايا التحقيقية الواردة لنيابة جرائم الفساد سنوياً":
    "Total number of investigation cases received by the Corruption Crimes Prosecution annually",
  "مصدر ورودها، جنس المشتبه بهم المحالين، طبيعة الإجراء، التكييف القانوني بقرار الاتهام":
    "Source of receipt, gender of referred suspects, nature of action, legal classification by indictment decision",

  // Main indicators — indicator 8
  "عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد":
    "Number of accused persons referred from the Corruption Crimes Prosecution to the Corruption Crimes Court",
  "مؤشر يقيس عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد":
    "An indicator measuring the number of accused persons referred from the Corruption Crimes Prosecution to the Corruption Crimes Court",
  "مجموع عدد المتهمين المحالين من نيابة جرائم الفساد لمحكمة جرائم الفساد":
    "Total number of accused persons referred from the Corruption Crimes Prosecution to the Corruption Crimes Court",
  "الجنس/ العمر/ الوظيفة/ مكان السكن على مستوى المحافظة/ مستوى التعليم/ مستوى الدخل":
    "Gender / age / occupation / place of residence at governorate level / education level / income level",

  // Main indicators — indicator 9
  "عدد القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "Number of cases concluded with a verdict in the Corruption Crimes Court",
  "مؤشر يقيس عدد القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "An indicator measuring the number of cases concluded with a verdict in the Corruption Crimes Court",
  "مجموع عدد القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "Total number of cases concluded with a verdict in the Corruption Crimes Court",
  "نتيجة الحكم": "Verdict outcome",

  // Main indicators — indicator 10
  "عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "Number of convicted persons in cases concluded with a verdict in the Corruption Crimes Court",
  "مؤشر يقيس عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "An indicator measuring the number of convicted persons in cases concluded with a verdict in the Corruption Crimes Court",
  "مجموع عدد المدانين في القضايا المفصولة بحكم في محكمة جرائم الفساد":
    "Total number of convicted persons in cases concluded with a verdict in the Corruption Crimes Court",

  // Main indicators — indicator 11
  "قيمة الأموال والعائدات الجرمية المحكوم بها": "Value of adjudicated illicit funds and proceeds",
  "مؤشر يقيس قيمة العائدات والأموال الجرمية المحكوم بها":
    "An indicator measuring the value of adjudicated illicit funds and proceeds",
  "مجموع قيم الأموال والعائدات الجرمية المحكوم بها":
    "Total value of adjudicated illicit funds and proceeds",
  "نوع العملة، الصنف": "Currency type, category",

  // Main indicators — indicator 12
  "مدة إدارة ونظر الشكوى والتصرف فيها بجميع مراحلها من لحظة استلامها وحتى الحسم بها بقرار من جهة الاختصاص أو النطق بالحكم النهائي فيها من محكمة جرائم الفساد.":
    "Duration of managing, examining and disposing of a complaint through all its stages, from receipt until final resolution by a decision of the competent authority or a final verdict by the Corruption Crimes Court.",
  "مؤشر يقيس المدة الزمنية التي يستغرقها نظر الشكوى من لحظة استلامها لغاية الحسم بها بقرار من جهة الاختصاص أو بحكم نهائي من محكمة جرائم الفساد":
    "An indicator measuring the time taken to examine a complaint from receipt until final resolution by a decision of the competent authority or a final verdict by the Corruption Crimes Court",
  "الفترة الزمنية المستغرقة لمعالجة الشكوى من تاريخ استلامها إلى تاريخ البت بها من جهات الاختصاص.":
    "The time period spent processing a complaint from its receipt date to its final resolution by the competent authorities.",
  "حسب جهة الاختصاص (هيئة، نيابة، قضاء)":
    "By competent authority (Commission, Prosecution, Judiciary)",

  // Main indicators — indicator 13
  "عدد المكلفين بإقرارات الذمة المالية":
    "Number of persons required to file financial disclosure declarations",
  "مؤشر يقيس عدد المكلفين بإقرارات الذمة المالية":
    "An indicator measuring the number of persons required to file financial disclosure declarations",
  "عدد المكلفين بإقرارات الذمة المالية بموجب إشعار خلال الفترة الزمنية المحددة.":
    "Number of persons required to file financial disclosure declarations by notice within the specified time period.",
  "الجنس، القطاع، فئة المكلف، جهة العمل، حالة التكليف، الدرجة الوظيفية":
    "Gender, sector, filer category, employer, filing status, job rank",

  // Main indicators — indicator 14
  "إقرارات الذمة المالية الموزعة على المكلفين في الجهات الخاضعة.":
    "Financial disclosure declarations distributed to filers in covered entities.",
  "مؤشر يقيس عدد الإقرارات الموزعة على المكلفين في الجهات الخاضعة.":
    "An indicator measuring the number of declarations distributed to filers in covered entities.",
  "عدد الإقرارات التي قامت الهيئة بتوزيعها على المكلفين في الجهات الخاضعة خلال فترة زمنية محددة.":
    "Number of declarations distributed by the Commission to filers in covered entities within a specific time period.",
  "القطاع، جهة العمل": "Sector, employer",

  // Main indicators — indicator 15
  "نسبة إقرارات الذمة المالية المستوفاة": "Share of completed financial disclosure declarations",
  "مؤشر يقيس نسبة الإقرارات المستوفاة من إجمالي مجموع الإقرارات التي تم طلبها.":
    "An indicator measuring the share of completed declarations out of the total requested declarations.",
  "عدد الإقرارات التي طلبتها الهيئة مقسوماً على عدد الإقرارات التي استلمتها الهيئة فعلياً مضروباً بـ 100%.":
    "Number of declarations requested by the Commission divided by the number actually received by the Commission, multiplied by 100%.",
  "الجنس، القطاع، جهة العمل، فئة المكلف، نوع الإقرار، الدرجة الوظيفية.":
    "Gender, sector, employer, filer category, declaration type, job rank.",

  // Main indicators — indicator 16
  "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص بسبب شكوى أو بلاغ ورد للهيئة أو اطلاع.":
    "Number of persons whose financial disclosure declaration was opened for examination purposes due to a complaint or report received by the Commission, or upon inspection.",
  "مؤشر يقيس عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص بسبب ورود شكوى أو بلاغ بحقهم أو اطلاع.":
    "An indicator measuring the number of persons whose financial disclosure declaration was opened for examination purposes due to a complaint or report filed against them, or upon inspection.",
  "عدد الأشخاص الذين تم فض إقرار الذمة المالية المرتبط بهم لأغراض الفحص":
    "Number of persons whose financial disclosure declaration was opened for examination purposes",
  "السبب، الجنس، القطاع، جهة العمل، فئة المكلف، نوع الإقرار.":
    "Reason, gender, sector, employer, filer category, declaration type.",

  // Main indicators — indicator 17
  "نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري":
    "Share of financial disclosure declarations opened for periodic examination purposes",
  "مؤشر يقيس نسبة إقرارات الذمة المالية التي تم فضها لأغراض الفحص من إجمالي مجموع الإقرارات المستلمة لسنة ما ومن إجمالي مجموع الإقرارات بالهيئة":
    "An indicator measuring the share of financial disclosure declarations opened for examination purposes out of the total declarations received for a given year and out of the total declarations at the Commission",
  "مجموع عدد إقرارات الذمة المالية التي تم فضها لأغراض الفحص الدوري":
    "Total number of financial disclosure declarations opened for periodic examination purposes",
  السبب: "Reason",

  // Main indicators — indicator 18
  "عدد طلبات الحماية الواردة للهيئة": "Number of protection requests received by the Commission",
  "مؤشر يقيس عدد طلبات الحماية الواردة للهيئة لمبلغين/مشتكين وللأشخاص وثيقي الصلة بهم":
    "An indicator measuring the number of protection requests received by the Commission for whistleblowers/complainants and persons closely related to them",
  "مجموع عدد طلبات الحماية الواردة للهيئة":
    "Total number of protection requests received by the Commission",
  "الجنس، نوع الحماية المطلوبة، نتيجة الطلب، الجهة المطلوب الحماية منها.":
    "Gender, type of protection requested, request outcome, entity from which protection is sought.",

  // Main indicators — indicator 19
  "عدد طلبات التظلم على طلبات الحماية الواردة للهيئة":
    "Number of appeal requests against protection decisions received by the Commission",
  "مؤشر يقيس عدد طلبات التظلم على طلبات الحماية الواردة للهيئة":
    "An indicator measuring the number of appeal requests against protection decisions received by the Commission",
  "مجموع عدد طلبات التظلم على طلبات الحماية الواردة للهيئة":
    "Total number of appeal requests against protection decisions received by the Commission",
  "نتيجة الطلب": "Request outcome",

  // Main indicators — indicator 20
  "عدد طلبات الحماية التي تم المتابعة عليها": "Number of protection requests followed up on",
  "مؤشر يقيس عدد طلبات الحماية التي تم المتابعة عليها":
    "An indicator measuring the number of protection requests followed up on",
  "مجموع عدد طلبات الحماية التي تم المتابعة عليها":
    "Total number of protection requests followed up on",
  "الجنس، نوع الحماية، الجهة المطلوب الحماية منها.":
    "Gender, type of protection, entity from which protection is sought.",

  // Main indicators — indicator 21
  "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج":
    "Number of cases in which smuggled illicit funds and proceeds abroad were recovered",
  "مؤشر يقيس عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج":
    "An indicator measuring the number of cases in which smuggled illicit funds and proceeds abroad were recovered",
  "عدد الحالات التي تم فيها استرداد العائدات والأموال الجرمية المهربة للخارج":
    "Number of cases in which smuggled illicit funds and proceeds abroad were recovered",

  // Main indicators — indicator 22
  "قيمة العائدات والأموال الجرمية المهربة للخارج المستردة":
    "Value of recovered smuggled illicit funds and proceeds abroad",
  "مؤشر يقيس قيمة العائدات والأموال الجرمية المهربة للخارج المستردة":
    "An indicator measuring the value of recovered smuggled illicit funds and proceeds abroad",
  "مجموع قيمة الأموال والعائدات الجرمية المهربة للخارج المستردة":
    "Total value of recovered smuggled illicit funds and proceeds abroad",

  // Main indicators — indicator 23
  "عدد المجرمين الفارين من العدالة المتهمين بجرائم فساد":
    "Number of fugitives from justice accused of corruption crimes",
  "مؤشر يقيس عدد المجرمين المتهمين بجرائم الفساد والفارين من العدالة":
    "An indicator measuring the number of persons accused of corruption crimes who are fugitives from justice",
  "مجموع المجرمين المتهمين بجرائم الفساد والفارين من العدالة":
    "Total number of persons accused of corruption crimes who are fugitives from justice",
  "الجنس، الملاحقة (تم التسليم، لم يتم التسليم)، الدولة":
    "Gender, prosecution (surrendered, not surrendered), country",

  // Main indicators — indicator 24
  "نسبة المحكوم عليهم بالسجن الفعلي في قضايا فساد":
    "Share of persons sentenced to actual imprisonment in corruption cases",
  "مؤشر يقيس نسبة المحكوم عليهم في قضايا فساد بالسجن الفعلي":
    "An indicator measuring the share of persons sentenced to actual imprisonment in corruption cases",
  "مجموع عدد الأشخاص الذين يتم الحكم عليهم بالسجن الفعلي خلال الاثني عشر شهراً الماضية في قضايا فساد نسبةً إلى المجموع الكلي لأعداد المحكومين بالسجن الفعلي في قضايا أخرى":
    "Total number of persons sentenced to actual imprisonment in corruption cases in the past twelve months, relative to the total number of persons sentenced to actual imprisonment in other cases",
  "الفعل الإجرامي، مدة الحكم، الجنس، العمر": "Criminal act, sentence duration, gender, age",

  // Main indicators — indicator 25
  "نسبة الموقوفين على ذمة التحقيق بقضايا فساد":
    "Share of persons detained pending investigation in corruption cases",
  "مؤشر يقيس نسبة الموقوفين على ذمة التحقيق بقضايا فساد":
    "An indicator measuring the share of persons detained pending investigation in corruption cases",
  "مجموع عدد الأشخاص الذين يتم توقيفهم على ذمة التحقيق بقضايا فساد خلال الاثني عشر شهراً الماضية نسبةً إلى المجموع الكلي لأعداد الموقوفين على ذمة التحقيق بقضايا أخرى":
    "Total number of persons detained pending investigation in corruption cases in the past twelve months, relative to the total number of persons detained pending investigation in other cases",
  "التهمة، مدة التوقيف، الجنس، العمر": "Charge, detention duration, gender, age",

  // Main indicators — indicator 26
  "نسبة الأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي ودفعوا رشوة لمسؤول حكومي أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهراً السابقة":
    "Share of people who contacted a government official at least once and paid a bribe to a government official, or were asked by those officials to pay a bribe, in the previous twelve months",
  "مؤشر يقيس النسبة المئوية للأشخاص الذين دفعوا رشوة لمسؤول حكومي مرة واحدة على الأقل (أعطوا المال لمسؤول حكومي، أو هدية أو هدية مقابل خدمة)، أو طلب منهم أولئك المسؤولون الحكوميون دفع رشوة، خلال الاثني عشر شهراً الماضية، كنسبة مئوية من الأشخاص الذين اتصلوا مرة واحدة على الأقل بمسؤول حكومي في الفترة نفسها.":
    "An indicator measuring the percentage of people who paid a bribe to a government official at least once (gave money to a government official, or a gift, or a gift for a service), or were asked by those officials to pay a bribe, in the past twelve months, as a percentage of people who contacted a government official at least once in the same period.",
  "يُحسب المؤشر على أنه مجموع عدد الأشخاص الذين دفعوا رشوة واحدة على الأقل إلى موظف عمومي خلال الاثني عشر شهراً الماضية، أو طُلب منهم رشوة في الفترة نفسها، على مجموع عدد الأشخاص الذين لديهم اتصال واحد على الأقل بمسؤول حكومي في الفترة نفسها، مضروباً بمائة":
    "The indicator is calculated as the total number of people who paid at least one bribe to a public official in the past twelve months, or were asked for a bribe in the same period, divided by the total number of people who had at least one contact with a government official in the same period, multiplied by one hundred",
  "العمر والجنس": "Age and gender",

  // Main indicators — indicator 27
  "نسبة القضاة في قضايا فساد": "Share of judges in corruption cases",
  "مؤشر يقيس نسبة القضاة ممن ينظرون قضايا فساد بأي من مراحل التقاضي الثلاث":
    "An indicator measuring the share of judges hearing corruption cases in any of the three litigation stages",
  "مجموع عدد القضاة الذين ينظرون قضايا فساد بأي من مراحل التقاضي نسبةً إلى المجموع الكلي لأعداد القضاة العاملين في المحاكم النظامية بمستوى قاضي بداية فأعلى":
    "Total number of judges hearing corruption cases in any litigation stage, relative to the total number of judges working in regular courts at the level of a first-instance judge or higher",
  "نوع المحكمة، الجنس، سنوات الخبرة بالقضاء، العمر":
    "Court type, gender, years of judicial experience, age",

  // Main indicators — indicator 28
  "نسبة المحامين في قضايا فساد": "Share of lawyers in corruption cases",
  "مؤشر يقيس نسبة المحامين المزاولين للمهنة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي":
    "An indicator measuring the share of practicing lawyers who litigate in corruption cases in any of the litigation stages",
  "مجموع عدد المحامين المزاولين للمهنة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي الثلاث نسبةً إلى المجموع الكلي لأعداد المحامين المزاولين وفق سجلات النقابة":
    "Total number of practicing lawyers who litigate in corruption cases in any of the three litigation stages, relative to the total number of practicing lawyers according to the union's records",
  "الجنس، العمر، سنوات الخبرة": "Gender, age, years of experience",

  // Main indicators — indicator 29
  "نسبة أعضاء النيابة في قضايا فساد": "Share of prosecution members in corruption cases",
  "مؤشر يقيس نسبة أعضاء النيابة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي":
    "An indicator measuring the share of prosecution members who litigate in corruption cases in any of the litigation stages",
  "مجموع عدد أعضاء النيابة ممن يترافعون في قضايا فساد بأي من مراحل التقاضي الثلاث نسبةً إلى المجموع الكلي لأعداد المدعين العامين أو النواب العامين المعينين في النيابة العامة":
    "Total number of prosecution members who litigate in corruption cases in any of the three litigation stages, relative to the total number of public prosecutors or attorney generals appointed in the Public Prosecution",
};

export function dt(locale: Locale, ar: string): string {
  if (locale === "ar") return ar;
  return dataEn[ar] ?? ar;
}
