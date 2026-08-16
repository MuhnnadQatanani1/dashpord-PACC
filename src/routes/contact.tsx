import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { getLocale, useLocale, dictionaries } from "@/i18n";
import { Phone, Mail, MapPin, Shield, AlertTriangle, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.contactTitle"] },
        { name: "description", content: dict["meta.contactDesc"] },
      ],
    };
  },
});

function Contact() {
  const { t } = useLocale();
  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.desc")}
      />

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: AlertTriangle,
              t: t("contact.card1T"),
              d: t("contact.card1D"),
              cta: t("contact.card1Cta"),
              href: "https://www.pacc.ps/complaints/create",
            },
            {
              icon: Shield,
              t: t("contact.card2T"),
              d: t("contact.card2D"),
              cta: t("contact.card2Cta"),
              href: "https://www.pacc.ps/WitnessProtection",
            },
            {
              icon: Send,
              t: t("contact.card3T"),
              d: t("contact.card3D"),
              cta: t("contact.card3Cta"),
              href: null,
            },
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
          <form
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 shadow-soft"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-lg font-bold text-primary">{t("contact.formTitle")}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">{t("contact.name")}</span>
                <input
                  type="text"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">{t("contact.email")}</span>
                <input
                  type="email"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="mb-1 block font-medium">{t("contact.subject")}</span>
                <input
                  type="text"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="mb-1 block font-medium">{t("contact.details")}</span>
                <textarea
                  rows={5}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 outline-none focus:border-accent"
                />
              </label>
            </div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-md gradient-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-soft">
              <Send className="h-4 w-4" /> {t("contact.submit")}
            </button>
            <p className="mt-3 text-xs text-muted-foreground">{t("contact.formNote")}</p>
          </form>

          <aside className="lg:col-span-2 rounded-2xl gradient-hero p-6 text-white shadow-elevated">
            <h3 className="text-lg font-bold">{t("contact.officialTitle")}</h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5" />{" "}
                <div>
                  <div className="font-semibold">{t("contact.hq")}</div>
                  <div className="opacity-85">{t("footer.contactLocation")}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5" />{" "}
                <div>
                  <div className="font-semibold">{t("contact.hotline")}</div>
                  <div className="opacity-85" dir="ltr">
                    1800-000-100
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5" />{" "}
                <div>
                  <div className="font-semibold">{t("contact.email")}</div>
                  <div className="opacity-85" dir="ltr">
                    info@pacc.pna.ps
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-8 rounded-lg bg-white/10 p-4 text-xs leading-6 backdrop-blur">
              {t("contact.protectNote")}
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
