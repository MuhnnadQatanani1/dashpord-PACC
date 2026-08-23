import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n";

export type ReadState = "idle" | "playing" | "paused" | "unsupported";

export interface ReadAloudApi {
  supported: boolean;
  state: ReadState;
  rate: number;
  voiceName: string | null;
  setRate: (rate: number) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  error: string | null;
}

function isSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

const AR_PREFERRED_VOICES = [
  "microsoft hamed",
  "microsoft salma",
  "microsoft zariyah",
  "microsoft fatima",
  "microsoft amina",
  "google العربية",
  "google عربي",
  "majed",
  "maged",
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

const AR_LANG_PRIORITY = ["ar-PS", "ar-SA", "ar-EG", "ar-AE", "ar-JO", "ar-LB", "ar"];
const EN_LANG_PRIORITY = ["en-US", "en-GB", "en-AU", "en"];

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
  if (v.localService) score += 4;

  const langPriority = langPrefix === "ar" ? AR_LANG_PRIORITY : EN_LANG_PRIORITY;
  const localeIdx = langPriority.findIndex((l) => lang === l.toLowerCase());
  if (localeIdx !== -1) score += 30 - localeIdx * 3;

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

function defaultRate(locale: "ar" | "en") {
  return locale === "ar" ? 0.86 : 1;
}

function fallbackLang(locale: "ar" | "en") {
  return locale === "ar" ? "ar-SA" : "en-US";
}

function normalizeArabicForSpeech(text: string) {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/\u0640/g, "")
    .replace(/PACC/gi, "هيئة مكافحة الفساد الفلسطينية")
    .replace(/KPIs?/gi, "مؤشرات الأداء الرئيسية")
    .replace(/UNCAC/gi, "اتفاقية الأمم المتحدة لمكافحة الفساد")
    .replace(/\b(\d{4})\s*[–—-]\s*(\d{4})\b/g, "من $1 إلى $2")
    .replace(/([٠-٩0-9])\s*[%٪]/g, "$1 بالمئة")
    .replace(/×/g, " مضروبة في ")
    .replace(/[•·]/g, "، ")
    .replace(/\s+([،؛؟.!])/g, "$1")
    .replace(/([،؛؟.!])(?=\S)/g, "$1 ");
}

function prepareTextForSpeech(text: string, locale: "ar" | "en") {
  let prepared = text
    .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (locale === "ar") {
    prepared = normalizeArabicForSpeech(prepared);
  } else {
    prepared = prepared.replace(/\b(\d{4})\s*[–—-]\s*(\d{4})\b/g, "from $1 to $2");
  }

  return prepared.replace(/\s+/g, " ").trim();
}

function splitForSpeech(text: string) {
  const chunks: string[] = [];
  const sentences = text.match(/[^.!؟؛،:]+[.!؟؛،:]?/g) ?? [text];
  let current = "";

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) continue;
    if ((current + " " + next).trim().length > 140 && current) {
      chunks.push(current.trim());
      current = next;
    } else {
      current = `${current} ${next}`.trim();
    }
  }

  if (current) chunks.push(current.trim());
  return chunks;
}

function waitForVoices(synth: SpeechSynthesis): Promise<SpeechSynthesisVoice[]> {
  const voices = synth.getVoices();
  if (voices.length > 0) return Promise.resolve(voices);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      synth.removeEventListener?.("voiceschanged", finish);
      if ("onvoiceschanged" in synth && synth.onvoiceschanged === finish) {
        synth.onvoiceschanged = null;
      }
      resolve(synth.getVoices());
    };

    synth.addEventListener?.("voiceschanged", finish, { once: true });
    synth.onvoiceschanged = finish;
    window.setTimeout(finish, 900);
  });
}

export function useReadAloud(): ReadAloudApi {
  const { locale } = useLocale();
  const [state, setState] = useState<ReadState>(isSupported() ? "idle" : "unsupported");
  const [rate, setRateState] = useState(defaultRate(locale));
  const [error, setError] = useState<string | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  const segmentsRef = useRef<{ text: string; el: HTMLElement }[]>([]);
  const indexRef = useRef(0);
  const rateRef = useRef(defaultRate(locale));
  const keepAliveRef = useRef<number | null>(null);
  const segmentTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (keepAliveRef.current !== null) window.clearInterval(keepAliveRef.current);
    if (segmentTimerRef.current !== null) window.clearTimeout(segmentTimerRef.current);
    keepAliveRef.current = null;
    segmentTimerRef.current = null;
  }, []);

  const collect = useCallback(() => {
    segmentsRef.current = [];
    const main =
      document.getElementById("main-content") ||
      (document.querySelector("main") as HTMLElement | null);
    if (!main) return;

    const selectors = "h1, h2, h3, h4, h5, p, li, blockquote, td, th";
    main.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
      if (el.closest("button, script, style, nav, [data-tts-ignore]")) return;
      const text = prepareTextForSpeech(el.innerText ?? el.textContent ?? "", locale);
      if (!text || text.length < 2) return;
      for (const chunk of splitForSpeech(text)) {
        segmentsRef.current.push({ text: chunk, el });
      }
    });
  }, [locale]);

  const clearHighlight = useCallback(() => {
    for (const s of segmentsRef.current) s.el.classList.remove("reading-active");
  }, []);

  const speakSegment = useCallback(
    async (i: number) => {
      if (!isSupported()) return;
      const synth = window.speechSynthesis;
      clearTimers();
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

      await waitForVoices(synth);
      const utterance = new SpeechSynthesisUtterance(text);
      const langPrefix = locale === "ar" ? "ar" : "en";
      const voice = pickBestVoice(synth, langPrefix);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
        setVoiceName(`${voice.name} (${voice.lang})`);
      } else {
        utterance.lang = fallbackLang(locale);
        setVoiceName(null);
      }
      utterance.rate = rateRef.current;
      utterance.pitch = locale === "ar" ? 0.96 : 1;
      utterance.volume = 1;

      utterance.onstart = () => setState("playing");
      utterance.onend = () => {
        clearTimers();
        void speakSegment(i + 1);
      };
      utterance.onerror = (e) => {
        if (e.error === "canceled" || e.error === "interrupted") return;
        clearTimers();
        setError("tts.error");
        setState("idle");
        clearHighlight();
      };

      synth.speak(utterance);
      window.setTimeout(() => synth.resume(), 0);
      keepAliveRef.current = window.setInterval(() => {
        if (!synth.speaking || synth.paused) synth.resume();
      }, 5000);
      segmentTimerRef.current = window.setTimeout(
        () => {
          if (synth.speaking) return;
          void speakSegment(i + 1);
        },
        Math.max(4000, text.length * 95),
      );
    },
    [locale, clearHighlight, clearTimers],
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
    void speakSegment(0);
  }, [state, collect, speakSegment]);

  const pause = useCallback(() => {
    if (isSupported()) {
      window.speechSynthesis.pause();
      setState("paused");
    }
  }, []);

  const stop = useCallback(() => {
    clearTimers();
    if (isSupported()) window.speechSynthesis.cancel();
    clearHighlight();
    setState("idle");
    setError(null);
  }, [clearHighlight, clearTimers]);

  const setRate = useCallback((r: number) => {
    const clamped = Math.min(1.4, Math.max(0.65, r));
    rateRef.current = clamped;
    setRateState(clamped);
  }, []);

  useEffect(() => {
    if (!isSupported()) return;
    const synth = window.speechSynthesis;
    void waitForVoices(synth);
    const onVoicesChanged = () => {
      synth.getVoices();
    };
    synth.addEventListener?.("voiceschanged", onVoicesChanged);
    synth.onvoiceschanged = onVoicesChanged;
    return () => {
      clearTimers();
      synth.removeEventListener?.("voiceschanged", onVoicesChanged);
      if (synth.onvoiceschanged === onVoicesChanged) synth.onvoiceschanged = null;
      synth.cancel();
    };
  }, [clearTimers]);

  useEffect(() => {
    const nextRate = defaultRate(locale);
    rateRef.current = nextRate;
    setRateState(nextRate);
    segmentsRef.current = [];
    indexRef.current = 0;
    setVoiceName(null);
    clearTimers();
    if (isSupported()) window.speechSynthesis.cancel();
    setState(isSupported() ? "idle" : "unsupported");
  }, [locale, clearTimers]);

  return { supported: isSupported(), state, rate, voiceName, setRate, play, pause, stop, error };
}
