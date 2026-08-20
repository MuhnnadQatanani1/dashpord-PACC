import { useCallback, useEffect, useState } from "react";

export interface AdminSession {
  email: string;
  display_name: string | null;
}

const STORAGE_KEY = "pacc_admin_session";

export function useAuth() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const signIn = useCallback((user: AdminSession) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setSession(user);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  return { session, loading, signIn, signOut };
}
