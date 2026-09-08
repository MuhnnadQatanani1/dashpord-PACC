import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminLogout, getAdminSession } from "./auth.functions";

export interface AdminSession {
  email: string;
  display_name: string | null;
}

export function useAuth() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const loadSession = useServerFn(getAdminSession);
  const logout = useServerFn(adminLogout);

  useEffect(() => {
    void loadSession({ data: undefined })
      .then((user) => setSession(user))
      .finally(() => setLoading(false));
  }, [loadSession]);

  const signIn = useCallback((user: AdminSession) => {
    setSession(user);
  }, []);

  const signOut = useCallback(async () => {
    await logout({ data: undefined });
    setSession(null);
  }, [logout]);

  return { session, loading, signIn, signOut };
}
