import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FileTerminal } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/shotify/shotify",
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950">
            <FileTerminal className="h-4 w-4 text-blue-400" />
          </span>
          Shotify
        </span>
      )
    },
    links: [
      {
        text: "Website",
        url: "https://shotify.dev"
      }
    ]
  };
}
