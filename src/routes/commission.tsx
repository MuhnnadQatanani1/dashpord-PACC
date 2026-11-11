import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/commission")({
  beforeLoad: () => {
    throw redirect({ to: "/about", hash: "commission", statusCode: 301 });
  },
});
