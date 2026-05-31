import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import type { RouteInfo } from "@storeshots/shared";
import { StoreshotsError, unique } from "@storeshots/shared";

const routeExtensions = new Set([".tsx", ".ts", ".jsx", ".js"]);
const ignoredFilePrefixes = ["_", "+", "."];

export interface DiscoverRoutesOptions {
  root: string;
  appDir?: string;
  includeDynamic?: boolean;
}

export async function discoverExpoRoutes(options: DiscoverRoutesOptions): Promise<RouteInfo[]> {
  const appDir = await resolveAppDirectory(options.root, options.appDir);
  const files = await walkRouteFiles(appDir);
  const includeDynamic = options.includeDynamic ?? true;
  const routes = files
    .map((file) => routeFromFile(appDir, file))
    .filter((route): route is RouteInfo => route !== null)
    .filter((route) => (includeDynamic ? true : !route.dynamic));

  return routes.sort((a, b) => {
    if (a.path === "/") {
      return -1;
    }

    if (b.path === "/") {
      return 1;
    }

    return a.path.localeCompare(b.path);
  });
}

export async function resolveAppDirectory(root: string, explicitAppDir?: string): Promise<string> {
  const candidates = explicitAppDir
    ? [path.resolve(root, explicitAppDir)]
    : [path.join(root, "app"), path.join(root, "src", "app")];

  for (const candidate of candidates) {
    try {
      const candidateStat = await stat(candidate);

      if (candidateStat.isDirectory()) {
        return candidate;
      }
    } catch {
      // Try the next conventional Expo Router location.
    }
  }

  throw new StoreshotsError(
    "APP_DIR_NOT_FOUND",
    "Could not find an Expo Router app directory. Expected app/ or src/app/."
  );
}

export function routeFromFile(appDir: string, file: string): RouteInfo | null {
  const extension = path.extname(file);

  if (!routeExtensions.has(extension)) {
    return null;
  }

  const basename = path.basename(file, extension);

  if (ignoredFilePrefixes.some((prefix) => basename.startsWith(prefix))) {
    return null;
  }

  const relativePath = path.relative(appDir, file).replaceAll(path.sep, "/");
  const withoutExtension = relativePath.slice(0, -extension.length);
  const rawSegments = withoutExtension.split("/");
  const routeSegments = rawSegments.flatMap((segment, index) => {
    if (segment === "index" && index === rawSegments.length - 1) {
      return [];
    }

    if (/^\(.+\)$/.test(segment)) {
      return [];
    }

    return [normalizeSegment(segment)];
  });

  const dynamic = routeSegments.some((segment) => segment.startsWith(":") || segment.startsWith("*"));
  const pathName = `/${routeSegments.join("/")}`.replace(/\/+/g, "/");

  return {
    path: pathName === "/" ? "/" : pathName.replace(/\/$/, ""),
    file,
    segments: routeSegments,
    dynamic
  };
}

function normalizeSegment(segment: string): string {
  const optionalCatchAll = segment.match(/^\[\[\.\.\.(.+)\]\]$/);

  if (optionalCatchAll) {
    return `*${optionalCatchAll[1]}?`;
  }

  const catchAll = segment.match(/^\[\.\.\.(.+)\]$/);

  if (catchAll) {
    return `*${catchAll[1]}`;
  }

  const optionalDynamic = segment.match(/^\[\[(.+)\]\]$/);

  if (optionalDynamic) {
    return `:${optionalDynamic[1]}?`;
  }

  const dynamic = segment.match(/^\[(.+)\]$/);

  if (dynamic) {
    return `:${dynamic[1]}`;
  }

  return segment;
}

async function walkRouteFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        if (entry.name.startsWith(".")) {
          return [];
        }

        return walkRouteFiles(absolutePath);
      }

      if (!entry.isFile()) {
        return [];
      }

      if (entry.name.endsWith(".d.ts") || entry.name.includes(".test.") || entry.name.includes(".spec.")) {
        return [];
      }

      return [absolutePath];
    })
  );

  return unique(files.flat());
}
