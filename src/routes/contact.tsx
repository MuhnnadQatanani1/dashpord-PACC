import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Phone, Mail, MapPin, Shield, AlertTriangle, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "بلاغ / تواصل | المرصد الوطني" },
      { name: "description", content: "قنوات تقديم البلاغات وطلب الحماية والتواصل مع هيئة مكافحة الفساد الفلسطينية." },
    ],
  }),
});

function Contact() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="تواصل معنا"
        title="هل لديك بلاغ عن فساد؟"
        description="هويّتك محمية بموجب القانون الفلسطيني. جميع البلاغات تعامل بأعلى معايير السرية."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: AlertTriangle, t: "تقديم بلاغ", d: "قدّم بلاغاً رسمياً بجريمة فساد يخضع لاختصاص الهيئة.", cta: "بدء البلاغ", href: "https://www.pacc.ps/complaints/create" },
            { icon: Shield, t: "طلب حماية", d: "احصل على حماية قانونية للمبلغين والشهود بموجب القانون.", cta: "طلب الحماية", href: "https://www.pacc.ps/WitnessProtection" },
            { icon: Send, t: "التواصل العام", d: "استفسارات إعلامية، أكاديمية، أو مؤسسية.", cta: "إرسال رسالة", href: null },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg gradient-accent text-accent-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-primary">{c.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.d}</p>
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {c.cta}
                </a>
              ) : (
                <button className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  {c.cta}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <form className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-soft" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-lg font-bold text-primary">نموذج تواصل سريع</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">الاسم</span>
                <input type="text" className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">البريد الإلكتروني</span>
                <input type="email" className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="mb-1 block font-medium">الموضوع</span>
                <input type="text" className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="mb-1 block font-medium">التفاصيل</span>
                <textarea rows={5} className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent" />
              </label>
            </div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-md gradient-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-soft">
              <Send className="h-4 w-4" /> إرسال
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              * نموذج تجريبي — سيُربط بنظام إدارة البلاغات الرسمي لاحقاً.
            </p>
          </form>

          <aside className="lg:col-span-2 rounded-2xl gradient-hero p-6 text-white shadow-elevated">
            <h3 className="text-lg font-bold">قنوات التواصل الرسمية</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5" /> <div><div className="font-semibold">المقر</div><div className="opacity-85">رام الله - فلسطين</div></div></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5" /> <div><div className="font-semibold">الخط الساخن</div><div className="opacity-85" dir="ltr">1800-000-100</div></div></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5" /> <div><div className="font-semibold">البريد الإلكتروني</div><div className="opacity-85" dir="ltr">info@pacc.pna.ps</div></div></li>
            </ul>
            <div className="mt-8 rounded-lg bg-white/10 p-4 text-xs leading-6 backdrop-blur">
              يحمي القانون الفلسطيني هوية المبلّغين والشهود، وتعامل الهيئة كل بلاغ بسرية تامة.
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
