-- Reports library (dynamic + bilingual)
-- Replaces the hardcoded report data previously kept in src/data/fake-reports.ts

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('annual', 'quarterly', 'specialized', 'surveys', 'international')),
  title_ar text not null,
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  publish_date date not null,
  pages integer not null default 0,
  size_mb numeric(6, 2) not null default 0,
  file_url text,
  original_filename text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reports_category_idx on public.reports (category);
create index reports_publish_date_idx on public.reports (publish_date desc);

-- Storage bucket for report files (PDFs, XLSX, ...) - public read via public URL
insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

-- Row level security
alter table public.reports enable row level security;

create policy "Public can read published reports"
  on public.reports for select
  to anon, authenticated
  using (is_published = true);

create policy "Authenticated can read all reports"
  on public.reports for select
  to authenticated
  using (true);

create policy "Authenticated can insert reports"
  on public.reports for insert
  to authenticated
  with check (true);

create policy "Authenticated can update reports"
  on public.reports for update
  to authenticated
  using (true);

create policy "Authenticated can delete reports"
  on public.reports for delete
  to authenticated
  using (true);

grant select on public.reports to anon;
grant select, insert, update, delete on public.reports to authenticated;
grant all on public.reports to service_role;

-- Storage object policies
create policy "Public can read report files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'reports');

create policy "Authenticated can upload report files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'reports');

create policy "Authenticated can update report files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'reports');

create policy "Authenticated can delete report files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'reports');

-- Seed content migrated from src/data/fake-reports.ts
insert into public.reports (category, title_ar, title_en, description_ar, description_en, publish_date, pages, size_mb) values
('annual', 'التقرير السنوي 2025', 'Annual Report 2025', 'التقرير السنوي الشامل لمؤشرات النزاهة ومكافحة الفساد في فلسطين للعام 2025، يشمل تحليلاً كاملاً لجميع المؤشرات الوطنية.', 'The comprehensive annual report on integrity and anti-corruption indicators in Palestine for 2025, including a full analysis of all national indicators.', '2026-01-01', 124, 4.2),
('annual', 'التقرير السنوي 2024', 'Annual Report 2024', 'التقرير السنوي لمؤشرات الفساد لعام 2024 مع تحليل اتجاهات الشكاوى والملفات التحقيقية والأحكام القضائية.', 'The 2024 annual corruption indicators report with analysis of complaint trends, investigation files, and court verdicts.', '2025-01-01', 108, 3.8),
('annual', 'التقرير السنوي 2023', 'Annual Report 2023', 'التقرير السنوي المفصل لأداء هيئة مكافحة الفساد ومؤشرات النزاهة الوطنية للعام 2023.', 'The detailed annual report on the Anti-Corruption Commission performance and national integrity indicators for 2023.', '2024-02-01', 96, 3.5),
('annual', 'التقرير السنوي 2022', 'Annual Report 2022', 'التقرير السنوي الأول للمرصد الوطني لمؤشرات الفساد، يغطي بيانات العام التأسيسي 2022.', 'The first annual report of the National Observatory for Corruption Indicators, covering data from the founding year 2022.', '2023-03-01', 88, 3.1),
('annual', 'التقرير التأسيسي 2021', 'Founding Report 2021', 'التقرير التمهيدي للمرصد الوطني لمؤشرات الفساد مع بيانات الفترة التأسيسية والمؤشرات الأساسية.', 'The preliminary report of the National Observatory for Corruption Indicators with founding-period data and core indicators.', '2022-01-01', 72, 2.9),
('quarterly', 'التقرير الربع سنوي — الربع الأول 2025', 'Quarterly Report — Q1 2025', 'البيانات الفصلية للربع الأول من عام 2025 تشمل الشكاوى والملفات التحقيقية والاحالات.', 'Quarterly data for the first quarter of 2025 including complaints, investigation files, and referrals.', '2025-04-01', 32, 1.8),
('quarterly', 'التقرير الربع سنوي — الربع الرابع 2024', 'Quarterly Report — Q4 2024', 'البيانات الفصلية للربع الرابع من عام 2024 مع تحليل التغيرات الموسمية في مؤشرات الفساد.', 'Quarterly data for the fourth quarter of 2024 with an analysis of seasonal changes in corruption indicators.', '2025-01-01', 28, 1.5),
('quarterly', 'التقرير الربع سنوي — الربع الثالث 2024', 'Quarterly Report — Q3 2024', 'البيانات الفصلية للربع الثالث 2024 تشمل توزيع الشكوى حسب القطاع والمحافظة.', 'Quarterly data for the third quarter of 2024 including the distribution of complaints by sector and governorate.', '2024-10-01', 30, 1.6),
('quarterly', 'التقرير الربع سنوي — الربع الثاني 2024', 'Quarterly Report — Q2 2024', 'البيانات الفصلية للربع الثاني 2024 مع إحصاءات تفصيلية للملفات التحقيقية.', 'Quarterly data for the second quarter of 2024 with detailed statistics on investigation files.', '2024-07-01', 26, 1.4),
('quarterly', 'التقرير الربع سنوي — الربع الأول 2024', 'Quarterly Report — Q1 2024', 'البيانات الفصلية للربع الأول 2024 وتحليل مقارن مع الفترة ذاتها من العام السابق.', 'Quarterly data for the first quarter of 2024 and a comparative analysis with the same period of the previous year.', '2024-04-01', 24, 1.3),
('specialized', 'تقرير متخصص — تحليل تشريعات مكافحة الفساد', 'Specialized Report — Analysis of Anti-Corruption Legislation', 'دراسة تحليلية للتشريعات والقوانين المتعلقة بمكافحة الفساد في فلسطين مع توصيات للتطوير.', 'An analytical study of legislation and laws related to anti-corruption in Palestine with development recommendations.', '2025-12-01', 56, 2.4),
('specialized', 'تقرير متخصص — الفساد في القطاعات الحيوية', 'Specialized Report — Corruption in Vital Sectors', 'تحليل معمق لانتشار الفساد في القطاعات الحيوية كالصحة والتعليم والبنية التحتية.', 'An in-depth analysis of corruption spread in vital sectors such as health, education, and infrastructure.', '2025-09-01', 48, 2.1),
('specialized', 'تقرير متخصص — النوع الاجتماعي ومكافحة الفساد', 'Specialized Report — Gender and Anti-Corruption', 'دراسة حول تأثير النوع الاجتماعي في الإبلاغ عن الفساد والمشاركة في جهود مكافحته.', 'A study on the impact of gender on reporting corruption and participating in anti-corruption efforts.', '2025-06-01', 40, 1.9),
('specialized', 'تقرير متخصص — التحول الرقمي والشفافية', 'Specialized Report — Digital Transformation and Transparency', 'تقييم أثر التحول الرقمي والحوكمة الإلكترونية على الشفافية ومكافحة الفساد في المؤسسات.', 'An assessment of the impact of digital transformation and e-governance on transparency and anti-corruption in institutions.', '2025-03-01', 44, 2.0),
('specialized', 'تقرير متخصص — مؤشرات النزاهة الوطنية', 'Specialized Report — National Integrity Indicators', 'تقرير متخصص حول مؤشرات النزاهة الوطنية وقياس أداء مؤسسات مكافحة الفساد.', 'A specialized report on national integrity indicators and measuring the performance of anti-corruption institutions.', '2025-01-01', 52, 2.3);
