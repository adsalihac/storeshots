# Shotify

Generate App Store and Play Store screenshots from Expo Router apps.

Shotify is a developer-first CLI that discovers routes in an Expo app, opens them on supported device presets, captures screenshots, and exports store-ready PNG assets with one command.

```bash
npx shotify
```

## Why

Store screenshots are repetitive release work: launch the simulator, navigate each route, capture images, resize assets, and repeat across Apple and Android device sizes. Shotify turns that workflow into a repeatable command that can run locally or in CI.

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
npx shotify
npx shotify routes
npx shotify devices
npx shotify doctor
```

## Packages

- `@shotify/cli` provides the `shotify` binary.
- `@shotify/core` coordinates route discovery, capture, and processing.
- `@shotify/expo-router-discovery` converts Expo Router files into app routes.
- `@shotify/screenshot-engine` owns simulator/device capture orchestration.
- `@shotify/image-processor` prepares high quality PNG exports with Sharp.
- `@shotify/device-presets` defines App Store and Play Store target devices.
- `@shotify/shared` contains shared schemas, logging, and utilities.
- `@shotify/ui` contains reusable UI primitives for the website and docs.

## Status

This repository is structured as a launch-ready open-source product scaffold. The CLI architecture is implemented with safe dry-run capture defaults so package behavior can be developed and tested without requiring a simulator in every environment.

## License

MIT
