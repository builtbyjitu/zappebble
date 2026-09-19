import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  RefreshCw,
  Maximize2,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Sliders,
  HelpCircle,
  Pipette
} from 'lucide-react';

export function ImageConverterContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. What Happens When You Convert an Image Format? */}
      <section aria-labelledby="conversion-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="conversion-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Happens When You Convert an Image Format?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Every image format uses a distinct file container and encoding standard. When you convert an image, your
            browser decodes the source file into raw pixel bitmap data in memory, draws it onto an offscreen HTML5
            Canvas, and then re-encodes those pixels into the target format&apos;s structure (JPG, PNG, or WebP).
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-300 flex items-start space-x-3">
          <Info size={18} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Important: Conversion is Not the Same as Compression</span>
            <span className="text-amber-800 dark:text-amber-300 leading-relaxed block text-xs">
              Changing an image format changes how pixel data is stored, which may increase or decrease file size
              depending on the formats chosen. If your primary goal is making a file smaller rather than changing its
              extension, use the{' '}
              <Link href="/tools/image-compressor" className="font-bold underline hover:text-amber-700 dark:hover:text-amber-200">
                Image Compressor
              </Link>
              .
            </span>
          </div>
        </div>
      </section>

      {/* 2. JPG vs PNG vs WebP Comparison Table */}
      <section aria-labelledby="format-guide-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="format-guide-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            JPG vs PNG vs WebP: Format Comparison Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            No single image format is universally superior for every scenario. The best format depends on the visual
            content, required transparency, and target platform.
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
                    Typical Characteristics
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
                    Photographs, complex artwork, continuous-tone imagery
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Lossy discrete cosine transform (DCT). Excellent compression ratios on photographic gradients; universal software and device compatibility.
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    No. Transparent pixels are rendered against a solid white background.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    PNG
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Screenshots, logos, UI assets, diagrams with text
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Lossless DEFLATE algorithm. Keeps sharp edges and text completely crisp; larger file sizes for complex photographs.
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Yes. Full 8-bit alpha channel for variable opacity and transparent cutouts.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    WebP
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Modern websites, web applications, mobile apps
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Advanced predictive coding supporting both lossy and lossless modes. Delivers substantially smaller files than JPG and PNG for web delivery.
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

      {/* 3. Conversion Direction Guide */}
      <section aria-labelledby="conversion-scenarios-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="conversion-scenarios-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Which Image Format Should You Convert To?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Choose your conversion target based on your specific workflow requirements:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* PNG to JPG */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>PNG</span>
              <ArrowRight size={12} />
              <span>JPG</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">For Photos Saved as PNG</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When a photograph or camera capture was saved as a heavy PNG, converting it to JPG can significantly
              reduce file size while retaining universal compatibility across all legacy operating systems and apps.
            </p>
          </div>

          {/* JPG to PNG */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>JPG</span>
              <ArrowRight size={12} />
              <span>PNG</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">For Editing & Compatibility</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Useful when an application specifically requires a PNG file. Note that converting a JPG to PNG will not
              restore compression artifacts or add transparency if the source JPG has a solid background.
            </p>
          </div>

          {/* JPG or PNG to WebP */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>JPG / PNG</span>
              <ArrowRight size={12} />
              <span>WebP</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">For Website Optimization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Recommended for modern web publishing. WebP produces smaller assets than JPG and PNG at comparable
              visual quality, directly improving page load times and Core Web Vitals (Largest Contentful Paint).
            </p>
          </div>

          {/* WebP to JPG */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>WebP</span>
              <ArrowRight size={12} />
              <span>JPG</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">For Legacy App Compatibility</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When you download WebP images from the web that older image editors, office suites, or online submission
              portals reject, converting to JPG makes them universally accessible.
            </p>
          </div>

          {/* WebP to PNG */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>WebP</span>
              <ArrowRight size={12} />
              <span>PNG</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Preserving WebP Transparency</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Converts transparent WebP graphics into standard PNG format while retaining 100% of the alpha transparency
              channel for use in desktop graphic design programs.
            </p>
          </div>

          {/* Batch Processing */}
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
              <Sparkles size={14} />
              <span>Batch Conversion</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Multiple Files to One Format</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Drag and drop mixed collections of JPG, PNG, and WebP files to convert them all to your chosen target
              format simultaneously, and download the results as a single ZIP archive.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Transparency, Quality, and Resizing Technical Guides */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Transparency */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2">
            <Layers size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              What Happens to Transparent Backgrounds?
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            If your source image has a transparent background:
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Converting to PNG or WebP:</strong> Transparency is fully preserved via the 8-bit alpha channel.
            </li>
            <li>
              <strong>Converting to JPG:</strong> Because the JPEG standard has no alpha channel, ZapPebble automatically
              fills transparent pixels with solid white to avoid black-box artifacts.
            </li>
          </ul>
        </div>

        {/* Quality */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2">
            <Sliders size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Does Converting an Image Reduce Quality?
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Quality depends on the target format&apos;s encoding mode:
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Converting to PNG:</strong> Lossless encoding preserves the exact pixel values from the canvas.
            </li>
            <li>
              <strong>Converting to JPG or WebP:</strong> Lossy encoding applies the quality slider setting (1%–100%).
            </li>
            <li>
              <strong>Converting JPG to PNG:</strong> Does not recreate original detail already discarded by JPEG.
            </li>
          </ul>
        </div>

        {/* Resizing */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
          <div className="flex items-center space-x-2">
            <Maximize2 size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Image Conversion and Resizing
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Format conversion and dimension resizing are separate operations:
          </p>
          <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Preserve Dimensions:</strong> By default, original pixel width and height are preserved.
            </li>
            <li>
              <strong>Optional Resize:</strong> Enable the resize toggle to scale pixel width or height.
            </li>
            <li>
              <strong>Aspect Ratio Lock:</strong> Keeps proportional width and height to prevent image distortion.
            </li>
          </ul>
        </div>
      </section>

      {/* 5. Common Conversion Problems */}
      <section aria-labelledby="common-issues-heading" className="space-y-4">
        <h2
          id="common-issues-heading"
          className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Common Image Conversion Questions & Problem Solving
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Why is my converted file larger than the original?</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you convert a heavily compressed JPG into a PNG, the lossless PNG algorithm stores raw pixel data
              without discarding visual information, which often results in a larger file. To reduce size, convert to
              WebP or use the <Link href="/tools/image-compressor" className="text-blue-600 dark:text-blue-400 underline">Image Compressor</Link>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Why did my transparent background turn white?</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You selected JPG as the output format. The JPEG specification does not support an alpha transparency
              channel. To preserve transparency, select PNG or WebP as the target format instead.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Why wasn&apos;t my file accepted?</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              ZapPebble currently supports JPG, JPEG, PNG, and WebP files up to 50MB. Formats like SVG (vector), GIF,
              TIFF, and RAW camera files are not accepted by this converter.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Does repeated conversion degrade image quality?</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes. Repeatedly converting between lossy formats (like JPG to WebP and back to JPG) causes &ldquo;generation loss&rdquo;
              where compression artifacts accumulate. For master editing, keep an original PNG or high-quality archive.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Privacy & Verification */}
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
          Your image is converted locally in your browser instead of being uploaded to a remote image-processing server.
          The decoding, canvas rendering, format re-encoding, and ZIP archiving execute entirely within your device&apos;s
          temporary browser memory.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">0 Bytes Uploaded</span>
            <span className="text-slate-500 dark:text-slate-400">Files never travel over the network or cloud APIs.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Private by Design</span>
            <span className="text-slate-500 dark:text-slate-400">Confidential graphics, receipts, and personal photos stay on your machine.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Instant Revocation</span>
            <span className="text-slate-500 dark:text-slate-400">Blob URLs are safely cleaned up from memory when you finish.</span>
          </div>
        </div>
      </section>

      {/* 7. Contextual Workflow Links */}
      <section aria-labelledby="workflow-links-heading" className="p-6 rounded-2xl border border-blue-200/70 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
        <h2 id="workflow-links-heading" className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
          <Sparkles size={15} className="mr-1.5 text-blue-600 dark:text-blue-400" />
          <span>Recommended Next Steps & Related Workflows</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <Link
            href="/tools/image-compressor"
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-start space-x-3 group"
          >
            <RefreshCw size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                <span>Compress Image Size</span>
                <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                Want to reduce the file size of your converted files? Use the Image Compressor.
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
                <span>Convert to PDF</span>
                <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                Need to assemble your converted image files into a single document? Use Screenshot to PDF.
              </span>
            </div>
          </Link>

          <Link
            href="/tools/color-picker"
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex items-start space-x-3 group"
          >
            <Pipette size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center">
                <span>Sample Image Colors</span>
                <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                Need to inspect brand colors or check WCAG contrast from your artwork? Use the Color Picker.
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
