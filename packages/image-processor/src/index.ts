import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { DevicePreset } from "@storeshots/shared";

export interface ProcessScreenshotInput {
  inputPath: string;
  outputPath: string;
  device: DevicePreset;
  quality?: number;
}

export interface ProcessedScreenshot {
  path: string;
  width: number;
  height: number;
  bytes: number;
}

export async function processScreenshot(input: ProcessScreenshotInput): Promise<ProcessedScreenshot> {
  await mkdir(path.dirname(input.outputPath), { recursive: true });

  const info = await sharp(input.inputPath)
    .resize(input.device.width, input.device.height, {
      fit: "cover",
      position: "top"
    })
    .png({
      quality: input.quality ?? 100,
      compressionLevel: 9,
      adaptiveFiltering: true
    })
    .toFile(input.outputPath);

  return {
    path: input.outputPath,
    width: info.width,
    height: info.height,
    bytes: info.size
  };
}
