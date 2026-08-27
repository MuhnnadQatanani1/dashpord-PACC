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
  return typeof window !== "undefined" && "Audio" in window;
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

export function useReadAloud(): ReadAloudApi {
  const { locale } = useLocale();
  const [state, setState] = useState<ReadState>(isSupported() ? "idle" : "unsupported");
  const [rate, setRateState] = useState(defaultRate(locale));
  const [error, setError] = useState<ReadAloudError | null>(null);
  const [voiceName, setVoiceName] = useState<string | null>(null);

  const segmentsRef = useRef<{ text: string; el: HTMLElement }[]>([]);
  const indexRef = useRef(0);
  const rateRef = useRef(defaultRate(locale));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const cleanupAudio = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
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

  const requestAudio = useCallback(
    async (text: string) => {
      const controller = new AbortController();
      abortRef.current = controller;
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text, locale, rate: rateRef.current }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return URL.createObjectURL(await response.blob());
    },
    [locale],
  );

  const speakSegment = useCallback(
    async (i: number) => {
      if (!isSupported()) return;
      cleanupAudio();
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

      try {
        const audioUrl = await requestAudio(text);
        audioUrlRef.current = audioUrl;
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onplay = () => setState("playing");
        audio.onended = () => {
          cleanupAudio();
          void speakSegment(i + 1);
        };
        audio.onerror = () => {
          cleanupAudio();
          setError("tts.error");
          setState("idle");
          clearHighlight();
        };
        await audio.play();
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        cleanupAudio();
        setError("tts.error");
        setState("idle");
        clearHighlight();
      }
    },
    [cleanupAudio, clearHighlight, requestAudio],
  );

  const play = useCallback(() => {
    if (!isSupported()) {
      setState("unsupported");
      setError("tts.unavailable");
      return;
    }
    if (state === "paused") {
      void audioRef.current?.play();
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
    if (isSupported() && audioRef.current) {
      audioRef.current.pause();
      setState("paused");
    }
  }, []);

  const stop = useCallback(() => {
    cleanupAudio();
    clearHighlight();
    setState("idle");
    setError(null);
  }, [cleanupAudio, clearHighlight]);

  const setRate = useCallback((r: number) => {
    const clamped = Math.min(1.4, Math.max(0.65, r));
    rateRef.current = clamped;
    setRateState(clamped);
  }, []);

  useEffect(() => {
    return () => cleanupAudio();
  }, [cleanupAudio]);

  useEffect(() => {
    const nextRate = defaultRate(locale);
    rateRef.current = nextRate;
    setRateState(nextRate);
    segmentsRef.current = [];
    indexRef.current = 0;
    setVoiceName(locale === "ar" ? "Python TTS (Arabic)" : "Python TTS (English)");
    cleanupAudio();
    setState(isSupported() ? "idle" : "unsupported");
  }, [locale, cleanupAudio]);

  return {
    supported: isSupported(),
    state,
    rate,
    voiceName: voiceName ?? (locale === "ar" ? "Python TTS (Arabic)" : "Python TTS (English)"),
    setRate,
    play,
    pause,
    stop,
    error,
  };
}
