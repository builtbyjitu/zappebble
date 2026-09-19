import React from 'react';
import Link from 'next/link';
import {
  ScanBarcode,
  Camera,
  Upload,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Cpu,
  Layers,
  HelpCircle,
  ArrowRight,
  Sparkles,
  QrCode,
  Lock,
  Eye,
  Info
} from 'lucide-react';

export function QrScannerContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction Concept & Core Positioning */}
      <section aria-labelledby="intro-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="intro-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Browser-Based QR & Barcode Scanning
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble lets you scan QR codes and supported 1D barcodes directly inside your browser from an image file
            or your live device camera. All visual analysis and decoding execute 100% locally in browser memory without
            uploading your pictures or streaming your camera feed to remote servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Upload size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Image & Camera Modes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Drag and drop screenshots, photos, and saved graphics, or click to activate your device camera for real-time
              viewfinder scanning.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ScanBarcode size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Multi-Format Decoding</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Decode 2D QR Codes alongside popular 1D retail and logistics barcodes: EAN-13, EAN-8, UPC-A, UPC-E, Code 128,
              Code 39, and ITF.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Safe Link Inspection</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scanned values are displayed as plain text first. The scanner never auto-redirects, letting you inspect URLs
              before choosing to open them.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How to Scan a QR Code or Barcode */}
      <section aria-labelledby="how-to-scan-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-to-scan-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Scan a QR Code or Barcode
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Scan and extract data from any code in three straightforward steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Choose Upload or Camera Mode
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select <strong>Upload Image</strong> if you have an image file, screenshot, or downloaded graphic. Select{' '}
              <strong>Scan with Camera</strong> if you want to scan a physical label, printed ticket, or screen using your
              device webcam.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Provide Image or Start Camera
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              In upload mode, drop or browse your image file (PNG, JPG, WebP, GIF). In camera mode, click{' '}
              <strong>Start Camera</strong>, grant the browser permission prompt, and hold the code inside the blue
              viewfinder reticle.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Review Decoded Result
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The detected code format, timestamp, and decoded value appear immediately. Click <strong>Copy Value</strong>{' '}
              to copy to your clipboard, or click <strong>Open Link</strong> if the result is a verified web URL.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Upload vs Camera Workflows */}
      <section aria-labelledby="upload-vs-camera-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="upload-vs-camera-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Upload an Image or Scan With Your Camera
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble provides two distinct input paths to accommodate both digital files and real-world physical codes:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Upload size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Image Upload Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload mode is engineered for digital graphics and previously captured photos. When an image file is
              selected, ZapPebble mounts the image in an off-screen HTML5 canvas element, renders it over a solid white
              background to eliminate transparency issues, and runs multi-scale decoding passes.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Best for:</strong> Screenshots from messaging apps, downloaded QR codes, scanned PDF graphics,
                saved photos, and digital shipping invoices.
              </li>
              <li>
                <strong>Supported formats:</strong> PNG, JPG/JPEG, WebP, and non-animated GIF.
              </li>
              <li>
                <strong>Multi-code support:</strong> If an image contains multiple codes, ZapPebble attempts to report
                all detected results simultaneously.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Camera size={20} />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Camera Scan Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Camera mode turns your laptop webcam or smartphone rear camera into an interactive scanner. Camera access
              is never started automatically; you must explicitly click <strong>Start Camera</strong> and confirm your
              browser&apos;s permission prompt.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Best for:</strong> Printed QR codes on posters, event badges, restaurant menus, retail product
                packaging, and barcodes on physical books or packages.
              </li>
              <li>
                <strong>Performance throttled:</strong> Video frames are analyzed at an optimized 180ms interval to
                maintain responsive UI and minimize battery and CPU consumption.
              </li>
              <li>
                <strong>Auto-stop on detection:</strong> Once a code is recognized, the camera stream stops immediately
                and releases hardware tracks, preserving device privacy and power.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Supported QR and Barcode Formats */}
      <section aria-labelledby="supported-formats-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="supported-formats-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Supported QR and Barcode Formats
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble decodes both 2D matrix symbols and 1D linear barcodes commonly used across web links, consumer retail,
            and supply chain operations:
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/90 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-4 font-semibold">Symbology</th>
                <th className="py-3 px-4 font-semibold">Dimension</th>
                <th className="py-3 px-4 font-semibold">Encoding Capability</th>
                <th className="py-3 px-4 font-semibold">Primary Real-World Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/80">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">QR Code</td>
                <td className="py-3 px-4 font-mono text-slate-500">2D Matrix</td>
                <td className="py-3 px-4">Up to 7,089 numeric or 4,296 alphanumeric characters</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Web URLs, WiFi credentials, contact cards (vCard), authentication tokens, digital payments
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">EAN-13 & EAN-8</td>
                <td className="py-3 px-4 font-mono text-slate-500">1D Linear</td>
                <td className="py-3 px-4">13 or 8 numeric digits with modulo-10 checksum</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  International consumer retail products, books (ISBN-13), groceries, and packaging worldwide
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">UPC-A & UPC-E</td>
                <td className="py-3 px-4 font-mono text-slate-500">1D Linear</td>
                <td className="py-3 px-4">12 numeric digits (UPC-A) or 8-digit compressed (UPC-E)</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Standard North American retail point-of-sale inventory tracking and consumer goods
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Code 128</td>
                <td className="py-3 px-4 font-mono text-slate-500">1D Linear</td>
                <td className="py-3 px-4">High-density full 128 ASCII character set</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  E-commerce parcel tracking, logistics, shipping containers (GS1-128), and inventory management
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">Code 39</td>
                <td className="py-3 px-4 font-mono text-slate-500">1D Linear</td>
                <td className="py-3 px-4">43 characters (uppercase letters A–Z, numbers 0–9, punctuation)</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Automotive, defense, healthcare equipment, identification badges, and internal warehouse labels
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">ITF (Interleaved 2 of 5)</td>
                <td className="py-3 px-4 font-mono text-slate-500">1D Linear</td>
                <td className="py-3 px-4">Continuous paired numeric digits</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                  Corrugated cardboard shipping cartons, carton master packs (ITF-14), and industrial manufacturing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. How the Scanner Decodes Your Code (Native vs Fallback Engine) */}
      <section aria-labelledby="how-it-decodes-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-it-decodes-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How the Scanner Decodes Your Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble employs a tiered scanning pipeline designed to deliver optimal decoding speed and broad browser
            compatibility:
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Cpu size={18} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tier 1: Native Browser BarcodeDetector API
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              On supported modern browsers (such as Chrome and Edge on desktop and Android), ZapPebble accesses the
              standard <code>BarcodeDetector</code> interface. This browser-level API analyzes image buffers directly,
              often taking advantage of hardware-accelerated operating system routines to detect barcodes in milliseconds
              with minimal CPU utilization.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <QrCode size={18} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tier 2: Multi-Pass Client-Side QR Decoder
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If the native API is unavailable or fails to detect a code, ZapPebble activates its client-side software
              engine. For QR codes, it executes a three-pass resolution strategy:
            </p>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-decimal pl-5">
              <li>
                <strong>Original resolution pass:</strong> Clamped to a maximum of 1,600px to prevent browser freezing on
                high-resolution smartphone photos.
              </li>
              <li>
                <strong>Downscaled pass (800px):</strong> Filters out high-frequency subpixel sensor noise and micro-blur
                typical of handheld camera captures.
              </li>
              <li>
                <strong>Upscaled pass (640px):</strong> Enhances small low-resolution thumbnails below 320px with nearest-neighbor
                sampling to sharpen individual modules.
              </li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Layers size={18} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Tier 3: Software 1D Scanline Analysis
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For 1D linear barcodes (such as Code 39 and EAN-13), the fallback engine extracts horizontal scanline runs
              at 35%, 50%, and 65% image heights. It calculates relative bar-and-space widths, calculates guard and center
              patterns, and verifies checksum algorithms in memory.
            </p>
          </div>
        </div>
      </section>

      {/* 6. QR Codes vs Traditional Barcodes */}
      <section aria-labelledby="qr-vs-barcodes-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="qr-vs-barcodes-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            QR Codes vs Traditional Barcodes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Understanding the architectural differences between two-dimensional matrix codes and one-dimensional linear
            barcodes helps explain how each format functions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">2D QR Codes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              QR (Quick Response) codes store data in two dimensions across a grid of dark and light squares called
              modules. Three prominent finder pattern squares in the corners allow scanners to establish orientation,
              skew angle, and size instantly.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>
                <strong>High data capacity:</strong> Can store complex strings like full URLs, multi-line contact cards,
                or cryptographic tokens.
              </li>
              <li>
                <strong>Reed-Solomon error correction:</strong> Built-in redundancy allows the code to remain readable
                even if up to 30% of the graphic is damaged or obscured.
              </li>
              <li>
                <strong>Omnidirectional:</strong> Can be scanned from any angle ($360^\circ$) without needing to align
                horizontally.
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">1D Linear Barcodes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Traditional barcodes (EAN, UPC, Code 128, Code 39) encode data in one dimension through varying widths of
              parallel bars and spaces. They function primarily as numerical or alphanumeric identifiers that map to
              records in external databases.
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>
                <strong>Compact identifiers:</strong> Highly optimized for short numeric product codes (8 to 14 digits)
                or serial numbers.
              </li>
              <li>
                <strong>Checksum validation:</strong> Most 1D formats include a mandatory trailing check digit (such as
                modulo-10 or modulo-43) to prevent misreads.
              </li>
              <li>
                <strong>Directional alignment:</strong> The scanline must cut cleanly across all vertical bars and spaces
                simultaneously to decode.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. What Happens After a Code Is Detected? */}
      <section aria-labelledby="detected-result-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="detected-result-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Happens After a Code Is Detected?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            When ZapPebble recognizes a code, it renders a detailed result card in the workspace right column:
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Format Badge</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">e.g. QR CODE, EAN 13</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Timestamp</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Exact detection time</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Copy Value</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">One-click clipboard copy</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Safe Open Link</span>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Explicit manual button</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-300 font-semibold text-xs">
              <AlertTriangle size={15} />
              <span>No Automatic Navigation</span>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              ZapPebble <strong>never automatically navigates</strong> or redirects your browser window upon detecting a
              code. The decoded payload is always presented as plain text first so you can inspect the full destination
              before choosing to interact with it.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Safe URL Handling */}
      <section aria-labelledby="safe-url-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="safe-url-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why Does the Scanner Ask Before Opening a Link?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            QR codes encountered on public posters, flyers, or unsolicited messages can be manipulated to redirect
            unsuspecting users to malicious or phishing destinations (a practice often referred to as &ldquo;QRishing&rdquo;).
            ZapPebble implements strict URL safety boundaries:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Lock size={18} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Strict Protocol Validation</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The <strong>Open Link</strong> button appears <em>only</em> if the decoded text passes strict URL parsing
              and matches the <code>http:</code> or <code>https:</code> protocol scheme.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Execution schemes such as <code>javascript:</code>, <code>data:</code>, <code>file:</code>, and{' '}
              <code>vbscript:</code> are strictly rejected and treated as plain text to prevent script injection and
              unintended local file execution.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <Eye size={18} />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">What URL Validation Does & Does Not Do</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>What it does:</strong> Verifies that the decoded string forms a syntactically valid web URL with a
              standard HTTP/HTTPS protocol, and isolates navigation to a new browser tab with{' '}
              <code>{'rel="noopener noreferrer"'}</code>.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>What it does not do:</strong> The scanner cannot check if the destination website is trustworthy,
              free of malware, or authentic. Always review the full domain name and URL path displayed in the text box
              before opening external links.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Non-URL Results */}
      <section aria-labelledby="non-url-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="non-url-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What If the QR Code Contains Text Instead of a Link?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Not all QR codes point to websites. Many encode plain text, credentials, or structured metadata:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">WiFi Credentials</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Formatted as <code>WIFI:S:MyNetwork;T:WPA;P:password;;</code>. ZapPebble displays the full text so you can
              copy the network password directly.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Contact Cards (vCard)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Structured text starting with <code>BEGIN:VCARD</code> containing names, phone numbers, and emails. Easily
              copy the block to paste into your contacts manager.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">Plain Text & Serial Numbers</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Serial numbers, tracking IDs, cryptographic addresses, or plain notes. Displayed safely in a scrollable,
              selectable monospace box.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Why Isn't My QR Code or Barcode Scanning? */}
      <section aria-labelledby="troubleshooting-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="troubleshooting-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why Isn&apos;t My QR Code or Barcode Scanning?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            If an uploaded image or camera feed fails to recognize a code, check these common causes and practical fixes:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">1. Image Is Blurry or Out of Focus</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Camera lenses require adequate focal distance. Move your device slightly farther away (6 to 12 inches) so
              the auto-focus can lock onto the code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">2. Low Contrast or Inverted Colors</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              QR codes require sharp contrast between dark modules and light backgrounds. Codes with light gray on white
              or low-contrast custom colors may fail edge detection.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">3. Glare and Surface Reflections</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scanning codes on glossy monitors, smartphones, or plastic packaging frequently creates bright glare spots
              that wash out modules. Tilt the screen or package slightly to disperse reflections.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">4. Missing Quiet Zone (White Border)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Both QR codes and 1D barcodes require a clean margin (quiet zone) around the perimeter. If an image is
              cropped tightly against the bars or modules, the scanner cannot locate the code boundary.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">5. Barcode Is Angled or Curved</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              1D barcodes (such as UPC on bottles or cans) must have a horizontal line of sight cutting through all bars.
              Flatten packaging or align the barcode parallel to the camera horizontal axis.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white">6. Unsupported Symbology</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Specialized 2D matrix formats (like PDF417 on driver&apos;s licenses, Aztec, or Data Matrix) are decoded if
              your browser supports the native <code>BarcodeDetector</code>, but are not supported by the software fallback.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Camera Permission Troubleshooting */}
      <section aria-labelledby="camera-permission-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="camera-permission-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Camera Permission Troubleshooting
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            If you encounter a &ldquo;Camera Permission Denied&rdquo; or &ldquo;Camera Unavailable&rdquo; notice, follow these resolution steps:
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Check the Browser Address Bar</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Look for a camera icon with a red slash or a lock/tune icon on the left side of your browser URL bar.
                  Click it to view site permissions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Reset Permission to &ldquo;Allow&rdquo;</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Toggle the camera permission toggle from &ldquo;Block&rdquo; to &ldquo;Allow&rdquo; (or &ldquo;Ask&rdquo;). Refresh the page and click{' '}
                  <strong>Start Camera</strong> again.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Use Upload Image as Fallback</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  If your device lacks a camera or browser permissions are restricted by your operating system, simply take
                  a photo with your device&apos;s native camera app and upload the file in the <strong>Upload Image</strong> tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Privacy & Client-Side Execution Guarantee */}
      <section aria-labelledby="privacy-guarantee-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="privacy-guarantee-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Your Images & Camera Feed Stay in Your Browser
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            QR codes frequently contain sensitive personal information: home WiFi credentials, two-factor authentication
            backup keys, confidential document links, or private shipping details. ZapPebble is engineered with strict
            client-side privacy:
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-950/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-semibold text-xs">
            <ShieldCheck size={18} />
            <span>Zero Remote Processing Guarantee</span>
          </div>
          <ul className="text-xs text-emerald-900 dark:text-emerald-200/90 space-y-1.5 list-disc pl-5 leading-relaxed">
            <li>
              <strong>No image uploads:</strong> Uploaded images are loaded into local browser memory via object URLs. No
              image data is ever transmitted to remote servers.
            </li>
            <li>
              <strong>No video recording or transmission:</strong> Camera frames are processed in-memory frame-by-frame. No
              video clips or photos are recorded or stored.
            </li>
            <li>
              <strong>Immediate hardware release:</strong> Stopping the camera or closing the browser tab immediately calls{' '}
              <code>MediaStreamTrack.stop()</code>, releasing your webcam hardware indicator light.
            </li>
            <li>
              <strong>No telemetry or tracking:</strong> Decoded strings and URLs are never logged, analyzed, or sent to
              third-party analytics services.
            </li>
          </ul>
        </div>
      </section>

      {/* 13. Related Tools & Workflow Integrations */}
      <section aria-labelledby="related-tools-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="related-tools-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Related Tools & Workflow Integrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Combine the scanner with other client-side ZapPebble utilities to streamline your digital workflows:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/tools/qr-generator"
            className="group p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 transition-all shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                QR Code Generator
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Need to create high-resolution QR codes? Generate customized QR codes for URLs, WiFi, or text with PNG and
              SVG export.
            </p>
          </Link>

          <Link
            href="/tools/color-picker"
            className="group p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 transition-all shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Color Picker & Contrast
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Having trouble scanning a colored QR code? Test background and foreground color contrast ratios against WCAG
              accessibility standards.
            </p>
          </Link>

          <Link
            href="/tools/image-converter"
            className="group p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 transition-all shadow-2xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Image Converter
              </span>
              <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Convert raw camera snapshots or unfamiliar image formats into standard PNG or JPG files for seamless scanning
              and sharing.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
