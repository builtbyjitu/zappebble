import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Sliders,
  Maximize2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle,
  Layers,
  Sparkles,
  Printer,
  Compass,
  Monitor
} from 'lucide-react';

export function ScreenshotPdfContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. What Happens When Images Become a PDF? */}
      <section aria-labelledby="pdf-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="pdf-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Happens When Images Become a PDF?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            When you convert a screenshot to PDF in ZapPebble, your browser decodes the source image into raw bitmap
            pixels, normalizes any transparent regions against a clean white background using an offscreen HTML5 canvas,
            and embeds the image as a high-fidelity JPEG XObject stream inside a standard PDF-1.4 document structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Fixed Document Geometry</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike standalone image files that stretch or resize unpredictably across different photo viewers, a PDF
              locks in precise physical page dimensions, margins, and print boundaries.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Printer size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Standard Print Readiness</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              PDFs conform to universal paper specifications like ISO A4 and US Letter, ensuring screenshots print
              accurately on physical paper without unexpected cutoff or distorted margins.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Monitor size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Cross-Platform Integrity</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              PDFs render identically on Windows, macOS, Linux, iOS, and Android. Your recipient views the exact layout,
              contrast, and typography you intended.
            </p>
          </div>
        </div>
      </section>

      {/* 2. A4 vs Letter vs Original Page Size */}
      <section aria-labelledby="page-size-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="page-size-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            A4 vs. US Letter vs. Original Image Size: Choosing the Right Format
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Selecting the right page size ensures your screenshot fits naturally into standard paper workflows or
            maintains exact digital pixel fidelity.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Page Size Option
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Dimensions (Points & Metric/Imperial)
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Best Use Case
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Key Advantage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    ISO A4
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    595.28 × 841.89 pt<br />
                    (210 × 297 mm)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    International business, Europe, Asia, legal filings, global documentation
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Universal international standard; prints seamlessly outside North America.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    US Letter
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    612.00 × 792.00 pt<br />
                    (8.5 × 11.0 in)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    United States, Canada, Mexico, domestic corporate memos, academic submissions
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Standard North American desktop printer size; prevents automatic scale-to-fit warnings.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Original Image Size
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    Exact Image Width × Height<br />
                    (1 px = 1 pt)
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Digital bug reports, UI/UX design mockups, wide dashboards, software receipts
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Zero white borders or letterboxing; page geometry matches your screenshot exactly.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Portrait vs Landscape: Matching Screenshot Orientation */}
      <section aria-labelledby="orientation-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="orientation-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Portrait vs. Landscape: Matching Screenshot Orientation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            A mismatch between screenshot proportions and page orientation is the most common reason for unwanted white
            bands (letterboxing) or shrunken, illegible text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2">
              <Compass size={16} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Auto Detect (Recommended)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              ZapPebble checks your image&apos;s natural pixel dimensions. If width exceeds height, it automatically
              sets Landscape; if height exceeds width, it selects Portrait. This maximizes printable area with zero
              manual guesswork.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Portrait Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Best for vertical mobile screenshots, full-page webpage captures, chat logs, email threads, and invoices.
              The short edge is the width, and the long edge is the height.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2">
              <Monitor size={16} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Landscape Mode</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ideal for wide desktop browser windows, analytics dashboards, spreadsheet tables, video captures, and
              presentation slides (16:9 or 16:10 aspect ratios).
            </p>
          </div>
        </div>
      </section>

      {/* 4. Fit, Fill, and Original: Understanding Image Placement */}
      <section aria-labelledby="fit-modes-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="fit-modes-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Fit, Fill, and Original: What&apos;s the Difference?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Image placement controls how your screenshot scales and positions itself relative to the printable area of
            the page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                Fit to Page (Default)
              </span>
              <Maximize2 size={16} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Proportional Best Fit</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uniformly scales the screenshot so the entire image fits within the printable area while strictly
              preserving the original aspect ratio. No cropping occurs. If the image proportions differ from the paper,
              symmetrical whitespace is centered around the image.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                Fill Page
              </span>
              <Layers size={16} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Edge-to-Edge Fill</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Stretches the image dimensions to fill 100% of the available printable area between margins. Note: if the
              screenshot&apos;s aspect ratio does not match the page aspect ratio, horizontal or vertical distortion
              will occur. Best used when edge-to-edge coverage is required.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Original 1:1
              </span>
              <Sliders size={16} className="text-slate-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Exact 1:1 Pixel Scale</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Places the image on the page at 1 pixel = 1 PDF point scale, centered on the page. No scaling is applied.
              If the screenshot is larger than the available printable area, outer edges may extend beyond margins.
              Ideal for small UI elements or icons.
            </p>
          </div>
        </div>
      </section>

      {/* 5. How PDF Margins Affect Your Screenshots */}
      <section aria-labelledby="margins-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="margins-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How PDF Margins Affect Your Screenshots
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Margins define the blank border between the edge of the PDF page and the outer boundary of your screenshot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">None (0 pt / 0 mm)</h3>
              <span className="text-[11px] font-mono text-slate-500">Bleed-to-edge</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Allows the image to extend completely to the edges of the page. Best for digital viewing, presentations,
              and full-screen desktop captures where you want zero wasted whitespace.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Small (18 pt / 0.25 in)</h3>
              <span className="text-[11px] font-mono text-slate-500">6.35 mm</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Provides a compact, elegant buffer around your capture. Prevents UI text from touching the page boundary
              while preserving maximum readability on mobile devices and laptops.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Medium (36 pt / 0.5 in)</h3>
              <span className="text-[11px] font-mono text-slate-500">12.7 mm</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard corporate and print margin. Leaves comfortable clearance for physical desktop printers, hole
              punching, ring binders, and formal document archives.
            </p>
          </div>
        </div>
      </section>

      {/* 6. How Image Size Affects PDF File Size */}
      <section aria-labelledby="file-size-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="file-size-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How Image Resolution Affects PDF File Size
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            A common misconception is that converting an image to PDF automatically compresses it into a tiny file. In
            reality, a PDF document acts as a standardized wrapper around your embedded image stream.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="flex items-start space-x-3">
            <Info size={18} className="shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white block">
                Why is the PDF file size close to the original image size?
              </span>
              <p className="leading-relaxed">
                The PDF-1.4 binary overhead (catalog, page tree, xref table) is approximately 1 KB. More than 99% of
                the resulting PDF file size comes directly from the embedded image stream. ZapPebble encodes your
                screenshot using high-quality JPEG compression (0.95 quality rating) to maintain razor-sharp text and UI
                clarity while preventing bloated file sizes.
              </p>
              <p className="pt-1 text-xs text-slate-500 dark:text-slate-400">
                Need to shrink a massive 4K or retina screenshot before embedding it into a PDF? Use our{' '}
                <Link
                  href="/tools/image-compressor"
                  className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Image Compressor
                </Link>{' '}
                to reduce pixel dimensions or file weight first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Practical Tips for Better Screenshot PDFs */}
      <section aria-labelledby="best-practices-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="best-practices-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Get the Best Results from Screenshot to PDF
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Follow these practical tips to ensure your generated PDF documents look professional, crisp, and easy to
            read.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Match Orientation to Content</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If your screenshot was captured from a widescreen monitor (1920×1080 or 2560×1440), keep orientation set
              to <strong>Landscape</strong> or <strong>Auto Detect</strong>. Forcing a wide capture into Portrait mode
              scales down text until it becomes difficult to read.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Use Original Size for Digital Archiving</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If the PDF will only be viewed on screens (e.g. bug tracking in Jira or GitHub, design reviews, software
              receipts), choose <strong>Original Image Size</strong> with <strong>None (0 pt)</strong> margin for a
              borderless 1:1 view.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Crop Before Converting</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Exclude unnecessary browser tabs, bookmarks bars, and desktop taskbars prior to conversion. Cropping to
              the relevant window or modal allows the content to scale significantly larger on the PDF page.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Convert Between Formats If Needed</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have source files in different formats or need to extract images from captures, you can use our{' '}
              <Link
                href="/tools/image-converter"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                Image Converter
              </Link>{' '}
              to switch between PNG, JPG, and WebP instantly.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Common Troubleshooting Information */}
      <section aria-labelledby="troubleshooting-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="troubleshooting-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Common Screenshot to PDF Problems & Troubleshooting
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Quick solutions to the most frequent formatting issues when generating PDF documents from screenshots.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Image edges or text are cut off in the PDF
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> The placement mode is set to <em>Original 1:1</em> on a standard paper size (A4 or
              Letter), and the screenshot&apos;s natural pixel width exceeds the page dimensions.<br />
              <strong>Solution:</strong> Switch the fit mode to <strong>Fit to Page</strong>. This scales your image
              proportionally so all content stays safely inside the page margins.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Text looks very small or blurry
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> A wide desktop screenshot (e.g. 1920×1080) was placed onto a vertical Portrait
              page. To fit the wide width, the image was scaled down significantly, shrinking the text.<br />
              <strong>Solution:</strong> Change orientation to <strong>Landscape</strong> or select{' '}
              <strong>Original Image Size</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Wide white bands appear above and below the screenshot
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> The aspect ratio of your capture does not match standard 1:1.414 (A4) or 1:1.294
              (Letter) paper proportions. When using <em>Fit to Page</em>, empty space is centered naturally.<br />
              <strong>Solution:</strong> Select <strong>Original Image Size</strong> to create a PDF whose page geometry
              matches your screenshot exactly, eliminating letterboxing.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertCircle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Transparent PNG or WebP images show dark or black backgrounds
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>How ZapPebble Solves This:</strong> The PDF standard does not natively support transparent JPEG
              streams. ZapPebble automatically draws your image over a crisp white background canvas prior to JPEG
              encoding, ensuring transparent areas render cleanly as white rather than black or corrupted pixels.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Privacy & In-Browser Processing */}
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <h2
              id="privacy-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 dark:text-white"
            >
              100% Client-Side Privacy: Your Screenshots Stay in Your Browser
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Screenshots often contain sensitive and confidential information: private chat conversations, bank accounts,
            invoices, proprietary source code, internal company metrics, and personal emails.
          </p>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Unlike traditional online PDF converters that upload your files to remote cloud servers for processing,
            ZapPebble compiles the entire PDF binary document locally inside your browser memory using JavaScript and
            HTML5 Canvas. Your images are never transmitted across the network, never logged, and never stored on any
            external server.
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
              <span>Instant local generation</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Safe for confidential documents</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
