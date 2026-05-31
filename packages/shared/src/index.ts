import { z } from "zod";

export const platformSchema = z.enum(["apple", "android", "all"]);

export const shotifyConfigSchema = z.object({
  root: z.string().min(1),
  outputDir: z.string().min(1).default("screenshots"),
  platform: platformSchema.default("all"),
  devices: z.array(z.string().min(1)).optional(),
  routes: z.array(z.string().min(1)).optional(),
  dryRun: z.boolean().default(false),
  verbose: z.boolean().default(false),
  quality: z.number().int().min(1).max(100).default(100)
});

export type Platform = z.infer<typeof platformSchema>;
export type ShotifyConfig = z.infer<typeof shotifyConfigSchema>;

export type DeviceKind = "phone" | "tablet";

export interface DevicePreset {
  id: string;
  name: string;
  platform: Exclude<Platform, "all">;
  store: "app-store" | "play-store";
  kind: DeviceKind;
  width: number;
  height: number;
  pixelRatio: number;
  viewport: {
    width: number;
    height: number;
  };
  label: string;
}

export interface RouteInfo {
  path: string;
  file: string;
  segments: string[];
  dynamic: boolean;
}

export class ShotifyError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "ShotifyError";
    this.code = code;
  }
}

export interface Logger {
  info(message: string): void;
  success(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export function createLogger(options: { verbose?: boolean; silent?: boolean } = {}): Logger {
  const write = (message: string) => {
    if (!options.silent) {
      console.log(message);
    }
  };

  return {
    info: write,
    success: (message) => write(`✓ ${message}`),
    warn: (message) => write(`! ${message}`),
    error: (message) => {
      if (!options.silent) {
        console.error(message);
      }
    },
    debug: (message) => {
      if (options.verbose && !options.silent) {
        console.log(`debug ${message}`);
      }
    }
  };
}

export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }

  return `${Math.round(ms / 1000)}s`;
}

export function routeToFileName(route: string): string {
  if (route === "/") {
    return "home";
  }

  return route
    .replace(/^\//, "")
    .replace(/[:*]/g, "")
    .replace(/[()[\]]/g, "")
    .replace(/\/+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}
