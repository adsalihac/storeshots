# Storeshots

Generate App Store and Play Store screenshots from Expo Router apps.

Storeshots is a developer-first CLI that discovers routes in an Expo app, opens them on supported device presets, captures screenshots, and exports store-ready PNG assets with one command.

```bash
npx storeshots
```

## Why

Store screenshots are repetitive release work: launch the simulator, navigate each route, capture images, resize assets, and repeat across Apple and Android device sizes. Storeshots turns that workflow into a repeatable command that can run locally or in CI.

```txt
✓ Found 14 routes
✓ Captured screenshots
✓ Generated iPhone 6.9"
✓ Generated iPhone 6.5"
✓ Generated iPad screenshots
✓ Generated Android screenshots

Done in 18s
```

## Monorepo

```txt
apps/
  website
  docs
  playground
packages/
  cli
  core
  expo-router-discovery
  screenshot-engine
  image-processor
  device-presets
  shared
  ui
examples/
  basic-expo-router
  ecommerce-app
  learning-app
```

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```

Run the CLI from an Expo Router project:

```bash
npx storeshots
npx storeshots routes
npx storeshots devices
npx storeshots doctor
```

## Packages

- `@storeshots/cli` provides the `storeshots` binary.
- `@storeshots/core` coordinates route discovery, capture, and processing.
- `@storeshots/expo-router-discovery` converts Expo Router files into app routes.
- `@storeshots/screenshot-engine` owns simulator/device capture orchestration.
- `@storeshots/image-processor` prepares high quality PNG exports with Sharp.
- `@storeshots/device-presets` defines App Store and Play Store target devices.
- `@storeshots/shared` contains shared schemas, logging, and utilities.
- `@storeshots/ui` contains reusable UI primitives for the website and docs.

## Status

This repository is structured as a launch-ready open-source product scaffold. The CLI architecture is implemented with safe dry-run capture defaults so package behavior can be developed and tested without requiring a simulator in every environment.

## License

MIT
