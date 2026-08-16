import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useLocale } from "@/i18n";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="inline-flex rounded-xl bg-white p-3 shadow-elevated">
              <img
                src="/observatory-logo.png"
                alt={t("common.logoAlt")}
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-md text-sm leading-8 text-primary-foreground md:text-base">
              {t("footer.aboutText")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t("footer.quickLinks")}</h4>
            <ul className="mt-4 space-y-2 text-sm opacity-85">
              <li>
                <Link to="/about" className="hover:opacity-100">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:opacity-100">
                  {t("footer.dashboard")}
                </Link>
              </li>
              <li>
                <Link to="/concepts" className="hover:opacity-100">
                  {t("footer.concepts")}
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:opacity-100">
                  {t("footer.methodology")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t("footer.contact")}</h4>
            <ul className="mt-4 space-y-3 text-sm opacity-85">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {t("footer.contactLocation")}
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Phone className="h-4 w-4" /> 1800-000-100
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Mail className="h-4 w-4" /> info@pacc.pna.ps
              </li>
              <li className="flex items-center gap-2" dir="ltr">
                <Globe className="h-4 w-4" /> pacc.pna.ps
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-75 md:flex-row">
          <div>{t("footer.rights", { year: new Date().getFullYear() })}</div>
          <div>{t("footer.note")}</div>
        </div>
      </div>
    </footer>
  );
}
