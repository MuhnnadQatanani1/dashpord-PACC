import { useSyncExternalStore } from "react";

export type FontSizeLevel = "default" | "lg" | "xl";

export interface A11yState {
  contrast: boolean;
  fontsize: FontSizeLevel;
  spacing: boolean;
  links: boolean;
  images: boolean;
  motion: boolean;
}

export const STORAGE_KEY = "pacc-aa";

export const a11yDefaults: A11yState = {
  contrast: false,
  fontsize: "default",
  spacing: false,
  links: false,
  images: false,
  motion: false,
};

function load(): A11yState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...a11yDefaults, ...(JSON.parse(raw) as Partial<A11yState>) };
  } catch {
    /* ignore */
  }
  return a11yDefaults;
}

let current: A11yState = typeof window === "undefined" ? a11yDefaults : load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function applyAttributes(state: A11yState) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.toggleAttribute("data-aa-contrast", state.contrast);
  root.toggleAttribute("data-aa-spacing", state.spacing);
  root.toggleAttribute("data-aa-links", state.links);
  root.toggleAttribute("data-aa-images", state.images);
  root.toggleAttribute("data-aa-motion", state.motion);
  if (state.fontsize === "default") {
    root.removeAttribute("data-aa-fontsize");
  } else {
    root.setAttribute("data-aa-fontsize", state.fontsize);
  }
}

export function getA11y(): A11yState {
  return current;
}

export function setA11y(patch: Partial<A11yState>) {
  current = { ...current, ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* ignore */
  }
  applyAttributes(current);
  emit();
}

export function resetA11y() {
  setA11y({ ...a11yDefaults });
}

export function syncA11y() {
  applyAttributes(current);
}

export function subscribeA11y(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useA11y(): A11yState {
  return useSyncExternalStore(subscribeA11y, getA11y, () => a11yDefaults);
}
