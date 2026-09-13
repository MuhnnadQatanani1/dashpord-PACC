import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, getLocale } from "@/i18n";
import { ManageReports } from "./reports.manage";

export const Route = createFileRoute("/cpanel")({
  component: ManageReports,
  head: () => {
    const dict = dictionaries[getLocale()];
    return {
      meta: [
        { title: dict["meta.manageTitle"] },
        { name: "description", content: dict["meta.manageDesc"] },
      ],
    };
  },
});
