import { useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAnalyticsSettings } from "@/lib/analytics.functions";

export function AnalyticsScript() {
  const loadSettings = useServerFn(getAnalyticsSettings);

  useEffect(() => {
    let cancelled = false;

    void loadSettings({ data: undefined })
      .then((settings) => {
        if (cancelled || !settings.enabled || !settings.measurementId) return;
        if (document.querySelector("script[data-pacc-google-analytics]")) return;

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.measurementId}`;
        script.dataset.paccGoogleAnalytics = "true";
        document.head.appendChild(script);

        const inline = document.createElement("script");
        inline.dataset.paccGoogleAnalytics = "true";
        inline.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${settings.measurementId}', { anonymize_ip: true });`;
        document.head.appendChild(inline);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [loadSettings]);

  return null;
}
