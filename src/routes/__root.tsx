import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { syncA11y } from "../lib/accessibility-store";
import { useLocale, getLocale, dictionaries } from "../i18n";
import { AccessibilityWidget } from "../components/accessibility/AccessibilityWidget";
import { ReadAloud } from "../components/tts/ReadAloud";

function NotFoundComponent() {
  const { t, dir } = useLocale();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir={dir}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("meta.notFoundTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("meta.notFoundDesc")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("meta.notFoundBack")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t, dir } = useLocale();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir={dir}>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("meta.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("meta.errorDesc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("meta.errorRetry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10"
          >
            {t("meta.errorHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8567a294-9d53-4f0f-8a60-921bdb47b035/id-preview-daddef64--41f8e4af-32c4-4fc8-807a-a5dedce36be1.lovable.app-1784630798470.png";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const dict = dictionaries[getLocale()];
    const title = dict["meta.siteTitle"];
    const desc = dict["meta.siteDesc"];
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title },
        { name: "description", content: desc },
        { name: "author", content: dict["meta.siteAuthor"] },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Tajawal:wght@500;700;800;900&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_INIT = `(function(){try{var s=localStorage.getItem('pacc-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=(s==='light'||s==='dark')?s:(m?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`;

const LOCALE_INIT = `(function(){try{var l=localStorage.getItem('pacc-locale');var v=(l==='ar'||l==='en')?l:'ar';window.__PACC_LOCALE__=v;document.documentElement.lang=v;document.documentElement.dir=(v==='ar')?'rtl':'ltr';}catch(e){}})();`;

function RootShell({ children }: { children: ReactNode }) {
  const locale = getLocale();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: LOCALE_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { t } = useLocale();

  useEffect(() => {
    syncA11y();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:z-[100] focus:bg-primary focus:px-4 focus:py-2 focus:text-center focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {t("common.skip")}
      </a>
      <Outlet />
      <AccessibilityWidget />
      <ReadAloud />
    </QueryClientProvider>
  );
}
