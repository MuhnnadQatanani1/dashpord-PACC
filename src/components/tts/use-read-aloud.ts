import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n";

export type ReadState = "idle" | "playing" | "paused" | "unsupported";

export interface ReadAloudApi {
  supported: boolean;
  state: ReadState;
  rate: number;
  setRate: (rate: number) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  error: string | null;
}

function isSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

const AR_PREFERRED_VOICES = [
  "google العربية",
  "hoda",
  "mona",
  "naayf",
  "salma",
  "zariyah",
  "hamed",
  "khalid",
  "nadia",
  "tariq",
];

const EN_PREFERRED_VOICES = [
  "natural",
  "google us english",
  "aria",
  "jenny",
  "sonia",
  "zoira",
  "libby",
  "samantha",
];

function voiceScore(v: SpeechSynthesisVoice, langPrefix: "ar" | "en"): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.toLowerCase();
  if (!lang.startsWith(langPrefix)) return -1;

  let score = 0;
  if (name.includes("natural")) score += 60;
  if (name.includes("google")) score += 40;
  if (name.includes("online")) score += 15;
  if (name.includes("premium")) score += 20;

  const preferred = langPrefix === "ar" ? AR_PREFERRED_VOICES : EN_PREFERRED_VOICES;
  const idx = preferred.findIndex((p) => name.includes(p));
  if (idx !== -1) score += 80 - idx * 3;

  return score;
}

function pickBestVoice(
  synth: SpeechSynthesis,
  langPrefix: "ar" | "en",
): SpeechSynthesisVoice | null {
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -1;
  for (const v of synth.getVoices()) {
    const s = voiceScore(v, langPrefix);
    if (s > bestScore) {
      bestScore = s;
      best = v;
    }
  }
  return best;
}

export function useReadAloud(): ReadAloudApi {
  const { locale } = useLocale();
  const [state, setState] = useState<ReadState>(isSupported() ? "idle" : "unsupported");
  const [rate, setRateState] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const segmentsRef = useRef<{ text: string; el: HTMLElement }[]>([]);
  const indexRef = useRef(0);
  const rateRef = useRef(1);

  const collect = useCallback(() => {
    segmentsRef.current = [];
    const main =
      document.getElementById("main-content") ||
      (document.querySelector("main") as HTMLElement | null);
    if (!main) return;

    const selectors = "h1, h2, h3, h4, h5, p, li, blockquote, td, th";
    main.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
      if (el.closest("button, script, style, nav, [data-tts-ignore]")) return;
      const text = (el.innerText ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
      if (text) segmentsRef.current.push({ text, el });
    });
  }, []);

  const clearHighlight = useCallback(() => {
    for (const s of segmentsRef.current) s.el.classList.remove("reading-active");
  }, []);

  const speakSegment = useCallback(
    (i: number) => {
      if (!isSupported()) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      clearHighlight();

      if (i >= segmentsRef.current.length) {
        setState("idle");
        setError(null);
        return;
      }

      const { text, el } = segmentsRef.current[i];
      indexRef.current = i;
      el.classList.add("reading-active");
      el.scrollIntoView({ block: "center", behavior: "auto" });

      const utterance = new SpeechSynthesisUtterance(text);
      const langPrefix = locale === "ar" ? "ar" : "en";
      const voice = pickBestVoice(synth, langPrefix);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = langPrefix;
      }
      utterance.rate = rateRef.current;

      utterance.onstart = () => setState("playing");
      utterance.onend = () => speakSegment(i + 1);
      utterance.onerror = (e) => {
        if (e.error === "canceled" || e.error === "interrupted") return;
        setError("tts.error");
        setState("idle");
        clearHighlight();
      };

      synth.speak(utterance);
    },
    [locale, clearHighlight],
  );

  const play = useCallback(() => {
    if (!isSupported()) {
      setState("unsupported");
      setError("tts.unavailable");
      return;
    }
    const synth = window.speechSynthesis;
    if (state === "paused") {
      synth.resume();
      setState("playing");
      return;
    }
    if (segmentsRef.current.length === 0) {
      collect();
      if (segmentsRef.current.length === 0) {
        setError("tts.noContent");
        return;
      }
    }
    setError(null);
    speakSegment(0);
  }, [state, collect, speakSegment]);

  const pause = useCallback(() => {
    if (isSupported()) {
      window.speechSynthesis.pause();
      setState("paused");
    }
  }, []);

  const stop = useCallback(() => {
    if (isSupported()) window.speechSynthesis.cancel();
    clearHighlight();
    setState("idle");
    setError(null);
  }, [clearHighlight]);

  const setRate = useCallback((r: number) => {
    const clamped = Math.min(2, Math.max(0.5, r));
    rateRef.current = clamped;
    setRateState(clamped);
  }, []);

  useEffect(() => {
    if (!isSupported()) return;
    const synth = window.speechSynthesis;
    synth.getVoices();
    const onVoicesChanged = () => {
      synth.getVoices();
    };
    synth.addEventListener("voiceschanged", onVoicesChanged);
    return () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      synth.cancel();
    };
  }, []);

  return { supported: isSupported(), state, rate, setRate, play, pause, stop, error };
}
