# WebTools — Fast, Free & Private Browser Utilities

> **Free Browser Tools. Fast. Private. Simple.**
> All-in-one browser utility platform with zero infrastructure cost and 100% client-side processing.

---

## 🌟 Overview

WebTools is a dual-distribution browser utility platform consisting of:
1. **A responsive, SEO-optimized Web Application** built with Next.js App Router and Tailwind CSS.
2. **A Manifest V3 Chrome Extension** built with TypeScript and Vite with minimal permissions.
3. **A Shared Client-Side Utility Engine** where file compression, conversion, formatting, and generation happen 100% locally on the user's device.

---

## 🚀 Initial 8 Core Tools

| Tool | Category | Processing Model | Capabilities |
|------|----------|------------------|--------------|
| **1. Image Compressor** | Image | Client-side Canvas | JPG, PNG, WebP compression, quality slider, reduction percentage |
| **2. Image Converter** | Image | Client-side Canvas | Batch convert between JPG, PNG, WebP with custom resize |
| **3. Screenshot to PDF** | PDF | Native Tab Capture + Client PDF | A4/Letter, Portrait/Landscape, high-res PDF generation |
| **4. QR Code Generator** | Generators | Client-side QR Engine | URL, text, email, phone, WiFi with PNG and vector SVG export |
| **5. JSON Formatter** | Developer | JavaScript Parser | Format, minify, validate, syntax error line/column tracking |
| **6. Word & Character Counter**| Text | Client-side Text Analyzer | Live words, characters, sentences, reading time, social limits |
| **7. Color Picker** | Color Tools | EyeDropper API | HEX, RGB, HSL extraction, copy to clipboard, palette history |
| **8. QR & Barcode Scanner** | Scanners | Client-side Video / Image Canvas | Safe preview for QR, EAN, UPC, Code 128 barcodes |

---

## 🔒 Privacy & Security USP

* **Your files stay on your device whenever possible.**
* Zero server file uploads.
* No mandatory account, no password requirements, no payment gates.
* Strict least-privilege Chrome Extension permissions (`activeTab`, `storage`).

---

## 🏗️ Repository Structure

```
webtools/
├── packages/
│   └── shared/          # Shared types, tools registry, and utility functions
├── web/                 # Next.js App Router website
│   ├── src/
│   │   ├── app/         # Routes: /, /tools, /tools/[slug], /about, /privacy, /terms, /contact
│   │   └── components/  # Design system (Button, Card, Input, FileDropzone, FAQ, ToolLayout...)
├── extension/           # Chrome Extension Manifest V3
│   ├── src/
│   │   ├── popup/       # Fast popup UI with tool search & light/dark theme
│   │   ├── background/  # Manifest V3 service worker
│   │   └── tools/       # Modular tool extensions
├── docs/                # Architecture, permissions, privacy, SEO, and developer guides
└── scripts/             # Helper utilities (e.g. icon generation)
```

---

## 🛠️ Getting Started

### Prerequisites

* Node.js v18+ (tested on Node v22)
* npm v10+

### Installation

From the root directory:

```bash
npm install
```

### Running Development Servers

```bash
# Run Next.js web application (http://localhost:3000)
npm run dev:web

# Run Chrome Extension in watch mode
npm run dev:ext
```

### Building for Production

```bash
# Build all workspaces (shared package, website, and extension)
npm run build
```

The extension distribution will be available in `extension/dist/`. To load in Google Chrome:
1. Navigate to `chrome://extensions`
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the `extension/dist` folder.

---

## 🧪 Testing & Linting

```bash
# Run unit tests across workspaces
npm run test

# Run ESLint across workspaces
npm run lint
```

---

## 📄 Documentation Links

* [Architecture Guide](docs/architecture.md)
* [Privacy Model](docs/privacy.md)
* [Extension Permissions Justification](docs/permissions.md)
* [SEO Strategy](docs/seo.md)
* [Adding New Tools](docs/adding-tools.md)

---

## ⚖️ License

MIT License. Free for personal, academic, and commercial use.
