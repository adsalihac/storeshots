import type { DevicePreset, Platform } from "@shotify/shared";
import { ShotifyError } from "@shotify/shared";

export const devicePresets: DevicePreset[] = [
  {
    id: "iphone-6-9",
    name: "iPhone 6.9\"",
    label: "Apple iPhone 6.9 inch",
    platform: "apple",
    store: "app-store",
    kind: "phone",
    width: 1320,
    height: 2868,
    pixelRatio: 3,
    viewport: {
      width: 440,
      height: 956
    }
  },
  {
    id: "iphone-6-5",
    name: "iPhone 6.5\"",
    label: "Apple iPhone 6.5 inch",
    platform: "apple",
    store: "app-store",
    kind: "phone",
    width: 1242,
    height: 2688,
    pixelRatio: 3,
    viewport: {
      width: 414,
      height: 896
    }
  },
  {
    id: "ipad-13",
    name: "iPad 13\"",
    label: "Apple iPad 13 inch",
    platform: "apple",
    store: "app-store",
    kind: "tablet",
    width: 2048,
    height: 2732,
    pixelRatio: 2,
    viewport: {
      width: 1024,
      height: 1366
    }
  },
  {
    id: "ipad-11",
    name: "iPad 11\"",
    label: "Apple iPad 11 inch",
    platform: "apple",
    store: "app-store",
    kind: "tablet",
    width: 1668,
    height: 2388,
    pixelRatio: 2,
    viewport: {
      width: 834,
      height: 1194
    }
  },
  {
    id: "android-phone",
    name: "Android Phone",
    label: "Google Play phone",
    platform: "android",
    store: "play-store",
    kind: "phone",
    width: 1080,
    height: 1920,
    pixelRatio: 3,
    viewport: {
      width: 360,
      height: 640
    }
  },
  {
    id: "android-tablet",
    name: "Android Tablet",
    label: "Google Play tablet",
    platform: "android",
    store: "play-store",
    kind: "tablet",
    width: 1600,
    height: 2560,
    pixelRatio: 2,
    viewport: {
      width: 800,
      height: 1280
    }
  }
];

export function getDevicePresets(platform: Platform = "all", ids?: string[]): DevicePreset[] {
  const byPlatform = devicePresets.filter((device) => {
    return platform === "all" ? true : device.platform === platform;
  });

  if (!ids?.length) {
    return byPlatform;
  }

  const selected = byPlatform.filter((device) => ids.includes(device.id));
  const missing = ids.filter((id) => !selected.some((device) => device.id === id));

  if (missing.length > 0) {
    throw new ShotifyError(
      "UNKNOWN_DEVICE",
      `Unknown device preset${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`
    );
  }

  return selected;
}

export function formatDevicePreset(device: DevicePreset): string {
  return `${device.id.padEnd(15)} ${device.width}x${device.height} ${device.platform} ${device.kind}`;
}
