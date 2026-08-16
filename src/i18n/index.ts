import { useSyncExternalStore } from "react";
import { ar, type Dict } from "./ar";
import { en } from "./en";
import { dt } from "./data";

export type Locale = "ar" | "en";

export const STORAGE_KEY = "pacc-locale";

export const dictionaries: Record<Locale, Dict> = { ar, en };

declare global {
  interface Window {
    __PACC_LOCALE__?: string;
  }
}

function readStored(): Locale | null {
  if (typeof window === "undefined") return null;
  const global = window.__PACC_LOCALE__;
  if (global === "ar" || global === "en") return global;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "ar" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function detect(): Locale {
  return readStored() ?? "ar";
}

let current: Locale = detect();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function applyToDocument(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export function getLocale(): Locale {
  return current;
}

export function setLocale(locale: Locale) {
  current = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  applyToDocument(locale);
  emit();
}

export function subscribeLocale(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function translate(
  locale: Locale,
  key: keyof Dict,
  vars?: Record<string, string | number>,
): string {
  let str: string = dictionaries[locale][key] ?? String(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

export interface UseLocale {
  locale: Locale;
  dir: "rtl" | "ltr";
  isRtl: boolean;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: keyof Dict, vars?: Record<string, string | number>) => string;
  d: (ar: string) => string;
  pick: (ar: string, en: string) => string;
}

export function useLocale(): UseLocale {
  const locale = useSyncExternalStore(subscribeLocale, getLocale, () => "ar" as Locale);
  return {
    locale,
    dir: locale === "ar" ? "rtl" : "ltr",
    isRtl: locale === "ar",
    setLocale,
    toggle: () => setLocale(locale === "ar" ? "en" : "ar"),
    t: (key, vars) => translate(locale, key, vars),
    d: (ar) => dt(locale, ar),
    pick: (ar, en) => (locale === "ar" ? ar : en),
  };
}
