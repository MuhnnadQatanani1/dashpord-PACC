import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n";

export type ReadState = "idle" | "playing" | "paused" | "unsupported";
export type ReadAloudError = "tts.unavailable" | "tts.noContent" | "tts.error";

export interface ReadAloudApi {
  supported: boolean;
  state: ReadState;
  rate: number;
  voiceName: string | null;
  setRate: (rate: number) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  error: ReadAloudError | null;
}

function isSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function defaultRate(locale: "ar" | "en") {
  return locale === "ar" ? 0.86 : 1;
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

function pickVoice(langPrefix: "ar" | "en"): SpeechSynthesisVoice | undefined {
  if (!isSupported()) return undefined;
  const voices = window.speechSynthesis.getVoices() ?? [];
  const preferred = voices
    .filter((v) => v.lang.toLowerCase().startsWith(langPrefix))
    .sort((a, b) => (b.localService ? 1 : 0) - (a.localService ? 1 : 0));
  if (preferred.length > 0) return preferred[0];
  return voices[0];
}

export function useReadAloud(): ReadAloudApi {
  const { locale } = useLocale();
  const [state, setState] = useState<ReadState>(isSupported() ? "idle" : "unsupported");
  const [rate, setRateState] = useState(defaultRate(locale));
  const [error, setError] = useState<ReadAloudError | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  const segmentsRef = useRef<{ text: string; el: HTMLElement }[]>([]);
  const indexRef = useRef(0);
  const rateRef = useRef(defaultRate(locale));
  const localeRef = useRef(locale);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  localeRef.current = locale;

  const cancelSpeech = useCallback(() => {
    if (!isSupported()) return;
    const current = utteranceRef.current;
    utteranceRef.current = null;
    if (current) {
      current.onstart = null;
      current.onend = null;
      current.onerror = null;
    }
    window.speechSynthesis.cancel();
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
      const text = prepareTextForSpeech(el.innerText ?? el.textContent ?? "", localeRef.current);
      if (!text || text.length < 2) return;
      for (const chunk of splitForSpeech(text)) {
        segmentsRef.current.push({ text: chunk, el });
      }
    });
  }, []);

  const clearHighlight = useCallback(() => {
    for (const s of segmentsRef.current) s.el.classList.remove("reading-active");
  }, []);

  const cleanup = useCallback(() => {
    cancelSpeech();
    clearHighlight();
  }, [cancelSpeech, clearHighlight]);

  const speakSegment = useCallback(
    (i: number) => {
      if (!isSupported()) return;
      cancelSpeech();
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
      utteranceRef.current = utterance;
      const langPrefix = localeRef.current === "ar" ? "ar" : "en";
      const voice = pickVoice(langPrefix);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
        setVoiceName(voice.name);
      } else {
        utterance.lang = langPrefix === "ar" ? "ar-AR" : "en-US";
        setVoiceName(null);
      }
      utterance.rate = rateRef.current;
      utterance.pitch = 1;

      utterance.onstart = () => setState("playing");
      utterance.onend = () => {
        if (utteranceRef.current !== utterance) return;
        utteranceRef.current = null;
        void speakSegment(i + 1);
      };
      utterance.onerror = (event) => {
        if (utteranceRef.current !== utterance) return;
        utteranceRef.current = null;
        if (event.error === "canceled" || event.error === "interrupted") return;
        clearHighlight();
        setError("tts.error");
        setState("idle");
      };

      window.speechSynthesis.speak(utterance);
    },
    [cancelSpeech, clearHighlight],
  );

  const play = useCallback(() => {
    if (!isSupported()) {
      setState("unsupported");
      setError("tts.unavailable");
      return;
    }
    if (state === "paused" && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
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
    if (isSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setState("paused");
    }
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setState("idle");
    setError(null);
  }, [cleanup]);

  const setRate = useCallback((r: number) => {
    const clamped = Math.min(1.4, Math.max(0.65, r));
    rateRef.current = clamped;
    setRateState(clamped);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  useEffect(() => {
    if (!isSupported()) {
      setState("unsupported");
      return;
    }
    const nextRate = defaultRate(locale);
    rateRef.current = nextRate;
    setRateState(nextRate);
    segmentsRef.current = [];
    indexRef.current = 0;
    setVoiceName(pickVoice(locale)?.name ?? null);
    cleanup();
    setState("idle");
  }, [locale, cleanup]);

  return {
    supported: isSupported(),
    state,
    rate,
    voiceName: voiceName ?? (locale === "ar" ? "صوت عربي (المتصفح)" : "Browser voice"),
    setRate,
    play,
    pause,
    stop,
    error,
  };
}