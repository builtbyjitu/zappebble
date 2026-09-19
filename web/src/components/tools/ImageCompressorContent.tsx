import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Sliders,
  Maximize2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Lock,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export function ImageCompressorContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. Quality vs. File Size: Finding the Right Balance */}
      <section aria-labelledby="quality-vs-size-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="quality-vs-size-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Quality vs. File Size: Finding the Right Balance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Compression works by reducing redundant color and spatial data in an image. Higher quality settings
            preserve subtle gradients and fine photographic textures, but produce larger files. Lower quality settings
            discard more high-frequency data, resulting in significantly smaller file sizes at the expense of potential
            compression artifacts.
          </p>
        </div>

        {/* Practical Use Case Table */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Use Case
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Suggested Quality
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Recommended Approach
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Website & Blog Images
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">
                    75% – 85%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Scale width to display container (e.g. 1200px–1600px)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Delivers fast page load and strong Core Web Vitals (LCP) with no perceptible blur.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Email Attachments & Portals
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">
                    65% – 75%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Scale down large camera photos under 1200px
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Ensures files comfortably clear strict 2MB–10MB upload limits.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Thumbnails & Previews
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">
                    60% – 70%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Scale down to compact target dimensions (e.g. 300px–600px)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Small viewing dimensions mask minor compression loss while maximizing speed.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Print & Archival Reference
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-blue-600 dark:text-blue-400">
                    85% – 95%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Keep original pixel dimensions intact
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Preserves critical color fidelity and sharpness for high-DPI output.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Note: These ranges serve as practical starting baselines. Because every image has unique color complexity and
          noise patterns, inspect the live before-and-after file size readout to confirm the best setting for your file.
        </p>
      </section>

      {/* 2. Why Image Dimensions Matter */}
      <section aria-labelledby="dimensions-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="dimensions-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why Image Dimensions Matter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Compression quality and image dimensions solve two fundamentally different problems. Quality adjusts how
            much data is used to describe each pixel, whereas dimensions determine how many total pixels exist in the
            image.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-semibold text-xs sm:text-sm">
              <AlertCircle size={16} className="shrink-0" />
              <span>Unscaled Camera Capture</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A standard smartphone photo taken at <strong className="text-slate-800 dark:text-slate-200">4000 × 3000 px</strong> contains
              12,000,000 pixels (12 megapixels). Even when compressed heavily to 60% quality, the file must still
              store information for 12 million individual points of color.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>Scaled for Web Display</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rescaling that photo to <strong className="text-slate-800 dark:text-slate-200">1600 × 1200 px</strong> reduces the pixel count
              to 1,920,000 pixels — an immediate <strong className="text-emerald-600 dark:text-emerald-400">84% reduction in raw pixel volume</strong> before
              compression is even applied.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Best Practice:</strong> If your source image is much larger than the screen or container where it
          will be viewed, enable the <strong>Optional Resize</strong> toggle in the compressor settings to scale down
          its dimensions. Resizing first, combined with moderate quality compression, yields the greatest file size
          savings.
        </p>
      </section>

      {/* 3. JPG vs PNG vs WebP Compression */}
      <section aria-labelledby="formats-comparison-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="formats-comparison-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            JPG vs PNG vs WebP Compression
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Each image format uses distinct compression algorithms designed for specific visual content. Selecting the
            right format can impact your final file size as much as the quality slider.
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
                    Best For
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Compression Behavior
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Transparency Support
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    JPG / JPEG
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Photographs, realistic scenes, continuous-tone imagery
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Lossy compression. Discards imperceptible color variations; quality slider directly controls file weight.
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    No. Transparent areas are filled with a solid white background.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    PNG
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Screenshots, logos, icons, diagrams, crisp text
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Lossless compression (DEFLATE). Preserves pixel-exact clarity and sharp lines without blurring edges.
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Yes. Full 8-bit alpha transparency channel preserved.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    WebP
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Modern web delivery, responsive graphics, general web use
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Supports both lossy and lossless predictive encoding. Often yields 25%–35% smaller files than JPG at similar visual fidelity.
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Yes. Supports alpha transparency in both lossy and lossless modes.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. PNG Transparency & Why Size Might Not Drop */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transparency Explanation */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2">
            <Layers size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Does Compressing a PNG Remove Transparency?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            When you keep the output format set to <strong>PNG</strong> or <strong>WebP</strong>, your transparent
            backgrounds are fully preserved. The alpha channel is retained during canvas re-encoding.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            However, if you explicitly choose <strong>JPG</strong> as the output format, the JPEG standard does not
            support transparency. ZapPebble automatically fills transparent pixels with a clean white background to
            prevent black-box rendering artifacts.
          </p>
        </div>

        {/* Why didn't size drop much */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2">
            <Info size={18} className="text-amber-500 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Why Didn&apos;t My Image Get Much Smaller?
            </h2>
          </div>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Already optimized:</strong> Images previously exported from optimized web tools or messaging apps
              have already had redundant data removed.
            </li>
            <li>
              <strong>PNG output selected:</strong> Standard browser canvas PNG encoding is lossless. To shrink a PNG,
              enable dimension resizing or convert the output format to WebP.
            </li>
            <li>
              <strong>High quality slider:</strong> Settings above 90% instruct the encoder to preserve almost all raw data.
            </li>
            <li>
              <strong>High visual entropy:</strong> Images with heavy photographic noise, water ripples, or foliage
              contain fewer repeating patterns to compress.
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Privacy & Verification */}
      <section aria-labelledby="privacy-architecture-heading" className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck size={18} className="shrink-0" />
          <span>Verified Local Execution</span>
        </div>
        <h2
          id="privacy-architecture-heading"
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Your Images Stay in Your Browser
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Unlike traditional online image compression services that require uploading your photos to remote servers,
          ZapPebble runs entirely inside your browser. Your images are loaded into your device&apos;s local memory, drawn to
          an offscreen HTML5 Canvas element, and re-encoded using your browser&apos;s native media capabilities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">0 Bytes Uploaded</span>
            <span className="text-slate-500 dark:text-slate-400">No network requests are made during image processing.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Zero Cloud Retention</span>
            <span className="text-slate-500 dark:text-slate-400">Your files never touch external storage or third-party servers.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">In-Memory Security</span>
            <span className="text-slate-500 dark:text-slate-400">Object URLs are automatically revoked when you close or refresh.</span>
          </div>
        </div>
      </section>

      {/* 6. Contextual Workflow Links */}
      <section aria-labelledby="workflow-links-heading" className="p-6 rounded-2xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
        <h2 id="workflow-links-heading" className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
          <Sparkles size={15} className="mr-1.5 text-blue-600 dark:text-blue-400" />
          <span>Recommended Next Steps & Related Workflows</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <Link
            href="/tools/image-converter"
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-start space-x-3 group"
          >
            <RefreshCw size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                <span>Convert Formats First</span>
                <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                Need to change file formats before or after compression? Use the Image Converter to switch between JPG, PNG, and WebP.
              </span>
            </div>
          </Link>

          <Link
            href="/tools/screenshot-to-pdf"
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-start space-x-3 group"
          >
            <FileText size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                <span>Combine into PDF</span>
                <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                Need to combine your compressed images or screenshots into a document? Convert them with Screenshot to PDF.
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
