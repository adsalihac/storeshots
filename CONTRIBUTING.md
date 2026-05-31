# Contributing

Thanks for helping make Shotify better for Expo developers.

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

## Guidelines

- Keep CLI behavior predictable and scriptable.
- Prefer typed package boundaries over hidden coupling.
- Add focused tests for route parsing, device presets, image processing, and CLI command behavior.
- Keep generated screenshots out of commits unless they are intentional fixtures.

## Commit Style

Use clear, present-tense commits:

```txt
add route discovery for grouped Expo routes
fix android tablet preset dimensions
document CI screenshot workflow
```
