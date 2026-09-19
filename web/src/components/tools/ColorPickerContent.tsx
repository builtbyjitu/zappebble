import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Pipette,
  Sliders,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Palette,
  History,
  Copy,
  Check,
  Code
} from 'lucide-react';

export function ColorPickerContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction Concept & Core Positioning */}
      <section aria-labelledby="intro-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="intro-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Browser-Based Color Picking & Contrast Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble combines an interactive color studio, real-time HEX/RGB/HSL conversion, screen pixel sampling via
            the browser EyeDropper API, and live WCAG 2.1 accessibility contrast checking. Everything runs 100% locally
            inside your browser memory without transmitting your color data or screen content to remote servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Palette size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Multi-Format Conversion</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instantly view and copy synchronized HEX (<code>#2563EB</code>), RGB (<code>rgb(37, 99, 235)</code>), and
              HSL (<code>hsl(221, 83%, 53%)</code>) values as you adjust colors or sliders.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Eye size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">WCAG 2.1 Contrast Testing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verify legibility against white, black, or custom background colors with real-time pass/fail ratings for
              normal text (AA/AAA) and large headings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Pipette size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Screen EyeDropper & History</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sample any visible pixel directly from your display on supported browsers, and store up to 16 recent color
              swatches in your local browser profile.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How to Use the Color Picker */}
      <section aria-labelledby="how-to-use-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-to-use-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Use the Color Picker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Select, adjust, and export colors in three simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Choose or Sample a Color
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Click the native color swatch, type or paste a 3- or 6-digit HEX code, tweak the red/green/blue sliders,
              or click <strong>Pick Color from Screen</strong> to sample pixels directly using the browser EyeDropper.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Inspect Formats & Contrast
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Review synchronized HEX, RGB, and HSL values in the format rows. Check the WCAG 2.1 contrast score against
              white, black, or a custom background color to ensure text legibility.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Copy Values & Reuse Palettes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Click <strong>Copy</strong> next to HEX, RGB, or HSL to paste directly into your CSS or design files.
              Recent colors are automatically saved to your local palette for quick recall.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HEX vs RGB vs HSL */}
      <section aria-labelledby="formats-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="formats-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            HEX vs. RGB vs. HSL: What&apos;s the Difference?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Each color model represents the same visual spectrum using a different mathematical structure. Understanding
            their differences helps you choose the right format for your workflow:
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Format
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Structure & Notation
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    How It Works
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    HEX
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    #2563EB
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Hexadecimal base-16 shorthand representing red, green, and blue intensities from 00 to FF (0 to 255).
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    CSS stylesheets, Tailwind configuration, Figma, design tokens, brand style guides
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    RGB
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    rgb(37, 99, 235)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Additive light model specifying Red, Green, and Blue channels as decimal integers from 0 to 255.
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Canvas manipulation, WebGL, image processing, CSS opacity functions (rgba)
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    HSL
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    hsl(221, 83%, 53%)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Cylindrical model: Hue (0–360° on color wheel), Saturation (0–100%), and Lightness (0–100%).
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Design systems, hover/active state variations (adjusting lightness without changing hue)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Convert HEX, RGB, and HSL Values */}
      <section aria-labelledby="conversion-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="conversion-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Convert HEX, RGB, and HSL Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble computes equivalent representations in real time. Changing any channel slider immediately updates
            the hexadecimal, RGB, and HSL outputs.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3">
          <span className="font-semibold text-slate-900 dark:text-white block text-xs sm:text-sm">
            Example: Standard ZapPebble Blue
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">HEX</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">#2563EB</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">RGB</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">rgb(37, 99, 235)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-bold">HSL</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">hsl(221, 83%, 53%)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
            Need to generate a QR code with custom brand colors? Use our{' '}
            <Link
              href="/tools/qr-generator"
              className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              QR Code Generator
            </Link>{' '}
            to create high-contrast scannable codes.
          </p>
        </div>
      </section>

      {/* 5. Pick a Color Directly From Your Screen */}
      <section aria-labelledby="eyedropper-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="eyedropper-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Pick a Color Directly From Your Screen
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            On supported web browsers, ZapPebble utilizes the native W3C EyeDropper API to sample any visible pixel from
            your screen—including other browser tabs, images, videos, and desktop windows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Supported Browsers</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The EyeDropper API is natively supported in modern Chromium-based desktop browsers including Google Chrome,
              Microsoft Edge, Brave, and Opera. When available, the <strong>Pick Color from Screen</strong> button activates
              immediately.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Browser Security & Fallback</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Browsers require an explicit user gesture (a direct click) to activate the eyedropper loupe. If your browser
              does not support the API (such as Firefox or Safari), ZapPebble displays a helpful fallback notice and
              provides full access via the native color spectrum swatch and HEX input.
            </p>
          </div>
        </div>
      </section>

      {/* 6. What Is Color Contrast Ratio? */}
      <section aria-labelledby="contrast-ratio-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="contrast-ratio-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Is Color Contrast Ratio?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Contrast ratio measures the difference in relative luminance (perceived brightness) between two colors.
            The scale ranges from <strong>1:1</strong> (zero contrast, identical colors) to <strong>21:1</strong> (maximum
            contrast, pure black against pure white).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white block">
            Why Contrast Matters for Accessibility (a11y)
          </span>
          <p className="leading-relaxed">
            Low contrast makes text difficult or impossible to read for users with low vision, color blindness, or age-related
            vision decline. It also impairs readability for all users under direct sunlight or on low-brightness mobile
            screens. Testing your text colors against their background ensures inclusive, readable user experiences.
          </p>
        </div>
      </section>

      {/* 7. WCAG AA vs AAA Contrast Levels */}
      <section aria-labelledby="wcag-levels-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="wcag-levels-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            WCAG AA vs. AAA Contrast Levels
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            The Web Content Accessibility Guidelines (WCAG 2.1) establish clear mathematical threshold requirements based
            on text size and font weight:
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Text Category
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Definition
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    WCAG Level AA (Minimum)
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    WCAG Level AAA (Enhanced)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Normal Text
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Body copy, paragraphs, labels, and small UI text under 18pt (or under 14pt bold)
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ≥ 4.5:1
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    ≥ 7.0:1
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Large / Bold Text
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Headings, hero text, and titles at or above 18pt (or at/above 14pt bold ~24px)
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    ≥ 3.0:1
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    ≥ 4.5:1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. How to Choose More Accessible Colors */}
      <section aria-labelledby="accessible-colors-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="accessible-colors-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Choose More Accessible Colors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Follow these practical design principles when building user interfaces:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Test Light & Dark Backgrounds</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A brand color that passes on white may fail on dark slate backgrounds. Use ZapPebble&apos;s quick preset
              buttons to test your color against both white (<code>#FFFFFF</code>) and black (<code>#000000</code>).
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Don&apos;t Rely on Color Alone</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Always accompany color cues with icons, underlines, or text labels (e.g. error alerts should include an
              alert icon, not just red text) so color-blind users can navigate confidently.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Save and Reuse Recent Colors */}
      <section aria-labelledby="history-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="history-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Save and Reuse Recent Colors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble automatically saves up to 16 unique recent color picks to your local browser storage. You can click
            any saved swatch to restore its values, or click <strong>Clear History</strong> at any time to reset your
            palette.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <span className="font-semibold text-slate-900 dark:text-white block">Local Device Profile Only</span>
          <p className="leading-relaxed">
            Your color history is stored exclusively in your browser&apos;s local storage. It is never synchronized across
            external accounts, never transmitted over the network, and never shared with third parties.
          </p>
        </div>
      </section>

      {/* 10. Using Picked Colors in CSS */}
      <section aria-labelledby="css-workflow-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="css-workflow-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Using Picked Colors in CSS
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Copying values from ZapPebble is ready for direct insertion into CSS rules, Tailwind configs, and design
            systems:
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 font-mono text-xs">
          <pre className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-auto leading-relaxed">
            <code>{`/* Hex Code */
.button-primary {
  background-color: #2563EB;
}

/* RGB Syntax */
.card-border {
  border-color: rgb(37, 99, 235);
}

/* HSL Syntax (easy to adjust lightness for hover states) */
.link-hover:hover {
  color: hsl(221, 83%, 43%); /* 10% darker */
}`}</code>
          </pre>
        </div>
      </section>

      {/* 11. Contrast vs Color Difference */}
      <section aria-labelledby="contrast-vs-hue-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="contrast-vs-hue-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why Two Colors Can Look Different but Still Have Weak Contrast
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            A common trap in web design is assuming that because two colors have completely different hues (e.g. bright
            green and bright yellow), they will provide sufficient contrast for text.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-300 space-y-2">
          <span className="font-semibold block">Hue Difference ≠ Luminance Contrast</span>
          <p className="leading-relaxed text-xs">
            The human eye perceives contrast through differences in lightness (photopic luminance), not chromatic hue.
            Green and yellow share similar relative luminance values. Placing green text over a yellow background creates
            severe visual vibration and fails WCAG AA standards despite being clearly different colors. Always rely on
            mathematical luminance contrast ratios rather than subjective color differences.
          </p>
        </div>
      </section>

      {/* 12. Privacy / Local Processing */}
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <h2
              id="privacy-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 dark:text-white"
            >
              100% Client-Side Privacy: Your Color Data Stays in Your Browser
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            All color space conversions (HEX, RGB, HSL), relative luminance computations, WCAG ratio evaluations, and
            EyeDropper sampling run entirely within your local browser sandbox.
          </p>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            ZapPebble does not transmit sampled screen pixels, color selections, or recent palettes to any external
            server. There are no tracking scripts, no third-party APIs, and no remote storage.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Zero server uploads</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>No telemetry or tracking</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Local browser storage</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Instant in-memory conversion</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
