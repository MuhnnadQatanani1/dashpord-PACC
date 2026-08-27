#!/usr/bin/env python3
import argparse
import os
import subprocess
import sys
import tempfile
import wave


def fail(message: str, code: int = 1) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(code)


def synthesize_with_pyttsx3(text: str, output_path: str, lang: str, rate: float) -> None:
    try:
        import pyttsx3
    except Exception as exc:
        fail(
            "Python TTS requires the pyttsx3 package. Install it with: python3 -m pip install pyttsx3",
        )

    engine = pyttsx3.init()
    voices = engine.getProperty("voices") or []
    selected_id = pick_voice(voices, lang)
    if selected_id:
        engine.setProperty("voice", selected_id)

    base_rate = 150 if lang == "ar" else 175
    engine.setProperty("rate", max(90, min(240, int(base_rate * rate))))
    engine.save_to_file(text, output_path)
    engine.runAndWait()


def pick_voice(voices, lang: str):
    preferred = (
        ["arabic", "ar_", "ar-", "haged", "maged", "majed", "salma", "hoda", "mona", "tarik"]
        if lang == "ar"
        else ["english", "en_", "en-", "samantha", "alex", "daniel", "victoria", "karen"]
    )

    best_voice = None
    best_score = -1
    for voice in voices:
        haystack = " ".join(
            [
                str(getattr(voice, "id", "")),
                str(getattr(voice, "name", "")),
                " ".join([str(lang) for lang in (getattr(voice, "languages", []) or [])]),
            ],
        ).lower()
        score = 0
        for index, needle in enumerate(preferred):
            if needle in haystack:
                score = max(score, 100 - index)
        if score > best_score:
            best_voice = voice
            best_score = score

    return getattr(best_voice, "id", None) if best_voice and best_score > 0 else None


def write_silence(output_path: str) -> None:
    with wave.open(output_path, "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(16000)
        wav.writeframes(b"\x00\x00" * 1600)


def ensure_wav(output_path: str) -> str:
    with open(output_path, "rb") as audio:
        header = audio.read(12)
    if header.startswith(b"RIFF") and header[8:12] == b"WAVE":
        return output_path

    converted = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    converted.close()
    try:
        subprocess.run(
            ["afconvert", "-f", "WAVE", "-d", "LEI16@22050", output_path, converted.name],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        return converted.name
    except Exception:
        try:
            os.unlink(converted.name)
        except OSError:
            pass
        return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate speech audio for the PACC dashboard.")
    parser.add_argument("--lang", choices=["ar", "en"], default="ar")
    parser.add_argument("--rate", type=float, default=1.0)
    args = parser.parse_args()

    text = sys.stdin.read().strip()
    if not text:
        fail("No text provided for TTS.")
    if len(text) > 5000:
        fail("Text is too long for one TTS request.", 2)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        output_path = tmp.name

    try:
        synthesize_with_pyttsx3(text, output_path, args.lang, args.rate)
        if not os.path.exists(output_path) or os.path.getsize(output_path) == 0:
            write_silence(output_path)
        readable_output_path = ensure_wav(output_path)
        with open(readable_output_path, "rb") as audio:
            sys.stdout.buffer.write(audio.read())
    finally:
        try:
            os.unlink(output_path)
        except OSError:
            pass
        if "readable_output_path" in locals() and readable_output_path != output_path:
            try:
                os.unlink(readable_output_path)
            except OSError:
                pass


if __name__ == "__main__":
    main()
