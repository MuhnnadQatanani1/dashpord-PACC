import { createServerFn } from "@tanstack/react-start";

export const getDebugInfo = createServerFn({ method: "GET" }).handler(async () => {
  const key = ["DATABASE", "_URL"].join("");
  const url = process.env[key];
  return {
    hasUrl: !!url,
    urlPrefix: url ? url.substring(0, 30) + "..." : "NOT SET",
    nodeEnv: process.env["NODE_ENV"],
    nitroEnv: process.env["NITRO_PRESET"],
  };
});
