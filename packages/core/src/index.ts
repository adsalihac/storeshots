import { access } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { getDevicePresets } from "@storeshots/device-presets";
import { discoverExpoRoutes, resolveAppDirectory } from "@storeshots/expo-router-discovery";
import { processScreenshot } from "@storeshots/image-processor";
import { createScreenshotEngine } from "@storeshots/screenshot-engine";
import type { DevicePreset, RouteInfo, StoreshotsConfig } from "@storeshots/shared";
import { StoreshotsError, createLogger, formatDuration, routeToFileName, StoreshotsConfigSchema } from "@storeshots/shared";

const execFileAsync = promisify(execFile);

export interface GenerateResult {
  routes: RouteInfo[];
  devices: DevicePreset[];
  outputDir: string;
  files: string[];
  durationMs: number;
}

export async function generateScreenshots(input: Partial<StoreshotsConfig> = {}): Promise<GenerateResult> {
  const startedAt = Date.now();
  const config = StoreshotsConfigSchema.parse({
    root: process.cwd(),
    ...input
  });
  const root = path.resolve(config.root);
  const outputDir = path.isAbsolute(config.outputDir) ? config.outputDir : path.join(root, config.outputDir);
  const logger = createLogger({ verbose: config.verbose });
  const routes = config.routes?.length
    ? config.routes.map((route) => ({
        path: route.startsWith("/") ? route : `/${route}`,
        file: "manual",
        segments: route.split("/").filter(Boolean),
        dynamic: route.includes(":") || route.includes("*")
      }))
    : await discoverExpoRoutes({ root });
  const devices = getDevicePresets(config.platform, config.devices);
  const engine = createScreenshotEngine();
  const rawOutputDir = path.join(outputDir, ".raw");
  const files: string[] = [];

  if (routes.length === 0) {
    throw new StoreshotsError("NO_ROUTES_FOUND", "No Expo Router screens were found to capture.");
  }

  logger.success(`Found ${routes.length} route${routes.length === 1 ? "" : "s"}`);
  logger.debug(`Using ${devices.length} device preset${devices.length === 1 ? "" : "s"}`);

  for (const device of devices) {
    logger.info(`Generating ${device.name}`);

    for (const route of routes) {
      const capture = await engine.capture({
        root,
        outputDir: rawOutputDir,
        route,
        device,
        dryRun: config.dryRun,
        logger
      });

      if (capture.skipped) {
        logger.debug(`Planned ${route.path} for ${device.id}`);
        continue;
      }

      const outputPath = path.join(outputDir, device.id, `${routeToFileName(route.path)}.png`);
      const processed = await processScreenshot({
        inputPath: capture.rawPath,
        outputPath,
        device,
        quality: config.quality
      });

      files.push(processed.path);
    }
  }

  if (config.dryRun) {
    logger.success("Planned screenshot generation");
  } else {
    logger.success("Captured screenshots");

    if (devices.some((device) => device.platform === "apple")) {
      logger.success("Generated App Store assets");
    }

    if (devices.some((device) => device.platform === "android")) {
      logger.success("Generated Play Store assets");
    }
  }

  logger.info(`Done in ${formatDuration(Date.now() - startedAt)}`);

  return {
    routes,
    devices,
    outputDir,
    files,
    durationMs: Date.now() - startedAt
  };
}

export async function listRoutes(root = process.cwd()): Promise<RouteInfo[]> {
  return discoverExpoRoutes({ root });
}

export function listDevices(platform: StoreshotsConfig["platform"] = "all"): DevicePreset[] {
  return getDevicePresets(platform);
}

export interface DoctorCheck {
  name: string;
  ok: boolean;
  message: string;
}

export async function runDoctor(root = process.cwd()): Promise<DoctorCheck[]> {
  const checks = await Promise.all([
    checkPackageJson(root),
    checkAppDirectory(root),
    checkCommand("xcrun", "Apple simulator tooling"),
    checkCommand("adb", "Android Debug Bridge"),
    checkSharp()
  ]);

  return checks;
}

async function checkPackageJson(root: string): Promise<DoctorCheck> {
  try {
    await access(path.join(root, "package.json"));

    return {
      name: "package.json",
      ok: true,
      message: "Found project package.json"
    };
  } catch {
    return {
      name: "package.json",
      ok: false,
      message: "No package.json found in the selected root"
    };
  }
}

async function checkAppDirectory(root: string): Promise<DoctorCheck> {
  try {
    const appDir = await resolveAppDirectory(root);

    return {
      name: "expo-router",
      ok: true,
      message: `Found ${path.relative(root, appDir) || appDir}`
    };
  } catch (error) {
    return {
      name: "expo-router",
      ok: false,
      message: error instanceof Error ? error.message : "Could not find Expo Router app directory"
    };
  }
}

async function checkCommand(command: string, label: string): Promise<DoctorCheck> {
  try {
    await execFileAsync(command, ["--version"]);

    return {
      name: command,
      ok: true,
      message: `${label} is available`
    };
  } catch {
    return {
      name: command,
      ok: false,
      message: `${label} was not found on PATH`
    };
  }
}

async function checkSharp(): Promise<DoctorCheck> {
  try {
    const imageProcessor = await import("@storeshots/image-processor");

    return {
      name: "sharp",
      ok: typeof imageProcessor.processScreenshot === "function",
      message: "Sharp image processing is available through @storeshots/image-processor"
    };
  } catch {
    return {
      name: "sharp",
      ok: false,
      message: "Sharp could not be loaded"
    };
  }
}
