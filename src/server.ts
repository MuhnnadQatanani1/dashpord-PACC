import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
const MAX_TTS_CHARS = 5000;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function isTtsRequest(request: Request): boolean {
  const url = new URL(request.url);
  return url.pathname === "/api/tts";
}

async function handleTtsRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { allow: "POST" },
    });
  }

  let payload: { text?: unknown; locale?: unknown; rate?: unknown };
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  if (!text) return Response.json({ error: "Text is required." }, { status: 400 });
  if (text.length > MAX_TTS_CHARS) {
    return Response.json({ error: "Text is too long." }, { status: 413 });
  }

  const locale = payload.locale === "en" ? "en" : "ar";
  const rate = typeof payload.rate === "number" && Number.isFinite(payload.rate) ? payload.rate : 1;
  const clampedRate = Math.min(1.4, Math.max(0.65, rate));

  try {
    const { resolve } = await import("node:path");
    const scriptPath = resolve(process.cwd(), "scripts/tts.py");
    const stdout = await runPythonTts(scriptPath, text, locale, clampedRate);

    return new Response(stdout, {
      headers: {
        "content-type": "audio/wav",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Python text-to-speech failed.",
      },
      { status: 500 },
    );
  }
}

async function runPythonTts(
  scriptPath: string,
  text: string,
  locale: "ar" | "en",
  rate: number,
): Promise<Uint8Array> {
  const { spawn } = await import("node:child_process");

  return await new Promise((resolve, reject) => {
    const child = spawn("python3", [scriptPath, "--lang", locale, "--rate", String(rate)], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error("Python text-to-speech timed out."));
    }, 30000);

    child.stdout.on("data", (chunk: Buffer) => stdout.push(chunk));
    child.stderr.on("data", (chunk: Buffer) => stderr.push(chunk));
    child.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timeout);
      if (code === 0) {
        resolve(Buffer.concat(stdout));
        return;
      }
      reject(
        new Error(Buffer.concat(stderr).toString("utf8") || `Python TTS exited with ${code}.`),
      );
    });

    child.stdin.end(text);
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (isTtsRequest(request)) return await handleTtsRequest(request);
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
