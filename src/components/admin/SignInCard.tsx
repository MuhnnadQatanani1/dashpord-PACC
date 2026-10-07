import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useServerFn } from "@tanstack/react-start";
import { useLocale } from "@/i18n";
import { adminLogin, type AdminUser } from "@/lib/auth.functions";

export function SignInCard({ onSignIn }: { onSignIn: (user: AdminUser) => void }) {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const login = useServerFn(adminLogin);

  const inputCls =
    "focus-ring w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const user = await login({ data: { email, password } });
      if (user) {
        onSignIn(user);
      } else {
        setError(t("auth.error"));
      }
    } catch {
      setError(t("auth.dbError"));
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="text-lg font-bold text-primary">{t("auth.login")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("auth.adminOnly")}</p>
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-foreground">{t("auth.email")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
            dir="ltr"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-foreground">{t("auth.password")}</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputCls}
            dir="ltr"
          />
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("auth.loginBtn")}
        </button>
      </form>
    </div>
  );
}
