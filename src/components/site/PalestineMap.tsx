import { useState, useEffect, lazy, Suspense } from "react";
import type { PalestineMapProps } from "@/types/map";
import { ErrorBoundary } from "./ErrorBoundary";
import { useLocale } from "@/i18n";

const LeafletMap = lazy(() =>
  import("./PalestineMapInner").then((m) => ({ default: m.PalestineMapInner })),
);

function Loading() {
  const { t } = useLocale();
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        {t("map.loading")}
      </div>
    </div>
  );
}

export function PalestineMap(props: PalestineMapProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Loading />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <div className="h-full w-full" dir="ltr">
          <LeafletMap {...props} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
