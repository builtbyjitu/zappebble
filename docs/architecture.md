# ZapPebble Architecture Specification

## 1. Monorepo Overview

ZapPebble is built as a lightweight, zero-infrastructure monorepo using standard npm workspaces:

```
webtools/
├── packages/
│   └── shared/          # Shared tool registry, types, and client-side processing helpers
├── web/                 # Next.js App Router SEO-optimized website with Tailwind CSS
├── extension/           # Chrome Extension Manifest V3 with Vite & modular tool architecture
├── docs/                # Architectural, privacy, permissions, and SEO documentation
└── scripts/             # Build and asset generation utilities
```

## 2. Shared Client-Side Utility Architecture

To avoid duplicating algorithms between the website and the Chrome Extension, business logic and tool registries live in `@webtools/shared`.

```
User Action (Drop File / Enter Text)
       │
       ▼
┌──────────────────┐       ┌──────────────────┐
│   Extension UI   │       │    Website UI    │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         └───────────┬──────────────┘
                     ▼
        ┌─────────────────────────┐
        │     @webtools/shared    │
        │  (Client-side engines)  │
        └────────────┬────────────┘
                     ▼
        ┌─────────────────────────┐
        │  Native Browser APIs    │
        │  (Canvas, Workers, PDF) │
        └────────────┬────────────┘
                     ▼
         100% Local File Output
```

## 3. Technology Choices & Justifications

* **Chrome Extension:** Manifest V3, TypeScript, Vite, Tailwind CSS. Minimum permissions, zero remote code execution, fast popup.
* **Website:** Next.js 14 App Router, TypeScript, Tailwind CSS. Static generation with `generateStaticParams()` for optimal Core Web Vitals and zero server costs.
* **State & Processing:** HTML5 Canvas, modern Web APIs (`EyeDropper`, `FileReader`, `Blob`, `URL.createObjectURL`). Zero external server transmission.
