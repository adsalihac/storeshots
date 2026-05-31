#!/usr/bin/env node
import { Command } from "commander";
import { generateScreenshots, listDevices, listRoutes, runDoctor } from "@shotify/core";
import { formatDevicePreset } from "@shotify/device-presets";
import { ShotifyError } from "@shotify/shared";

const program = new Command();

program
  .name("shotify")
  .description("Generate App Store and Play Store screenshots from Expo Router apps.")
  .version("0.1.0");

program
  .command("generate")
  .description("Generate store screenshots")
  .option("-r, --root <path>", "Expo project root", process.cwd())
  .option("-o, --output <path>", "Output directory", "screenshots")
  .option("-p, --platform <platform>", "Device platform: apple, android, all", "all")
  .option("-d, --devices <ids>", "Comma separated device preset ids")
  .option("--routes <routes>", "Comma separated route paths")
  .option("--dry-run", "Print the generation plan without writing screenshots")
  .option("--verbose", "Print debug output")
  .action((options) => {
    return withErrorBoundary(() => runGenerate(options as GenerateOptions));
  });

program
  .command("routes")
  .description("List Expo Router routes")
  .option("-r, --root <path>", "Expo project root", process.cwd())
  .action((options) => {
    return withErrorBoundary(async () => {
      const routes = await listRoutes(options.root);
      for (const route of routes) {
        console.log(`${route.path.padEnd(24)} ${route.dynamic ? "dynamic" : "static"} ${route.file}`);
      }
    });
  });

program
  .command("devices")
  .description("List supported device presets")
  .option("-p, --platform <platform>", "Device platform: apple, android, all", "all")
  .action((options) => {
    return withErrorBoundary(async () => {
      for (const device of listDevices(options.platform)) {
        console.log(formatDevicePreset(device));
      }
    });
  });

program
  .command("doctor")
  .description("Check the local screenshot generation environment")
  .option("-r, --root <path>", "Expo project root", process.cwd())
  .action((options) => {
    return withErrorBoundary(async () => {
      const checks = await runDoctor(options.root);
      for (const check of checks) {
        console.log(`${check.ok ? "✓" : "!"} ${check.name.padEnd(14)} ${check.message}`);
      }
    });
  });

program.parseAsync(normalizeArgv(process.argv));

interface GenerateOptions {
  root: string;
  output: string;
  platform: "apple" | "android" | "all";
  devices?: string;
  routes?: string;
  dryRun?: boolean;
  verbose?: boolean;
}

async function runGenerate(options: GenerateOptions): Promise<void> {
  await generateScreenshots({
    root: options.root,
    outputDir: options.output,
    platform: options.platform,
    devices: parseList(options.devices),
    routes: parseList(options.routes),
    dryRun: Boolean(options.dryRun),
    verbose: Boolean(options.verbose)
  });
}

function normalizeArgv(argv: string[]): string[] {
  const args = argv.slice(2);
  const knownCommands = new Set(["generate", "routes", "devices", "doctor", "help"]);

  if (args[0] === "-h" || args[0] === "--help" || args[0] === "-V" || args[0] === "--version") {
    return argv;
  }

  if (args.length === 0 || args[0]?.startsWith("-") || !knownCommands.has(args[0] ?? "")) {
    return [argv[0] ?? "node", argv[1] ?? "shotify", "generate", ...args];
  }

  return argv;
}

function parseList(value?: string): string[] | undefined {
  if (!value) {
    return undefined;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function withErrorBoundary(fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
  } catch (error) {
    if (error instanceof ShotifyError) {
      console.error(`Shotify ${error.code}: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown Shotify error");
    }

    process.exitCode = 1;
  }
}
