import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  QrCode,
  Sliders,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle,
  Layers,
  Sparkles,
  Wifi,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  Palette,
  ScanLine,
  Pipette,
  Printer
} from 'lucide-react';

export function QrGeneratorContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction Concept & Core Positioning */}
      <section aria-labelledby="qr-concept-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="qr-concept-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Browser-Based Static QR Code Generation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble creates clean, high-precision QR (Quick Response) codes directly inside your browser memory.
            Whether you are sharing a website URL, providing one-tap WiFi access, drafting an email trigger, or encoding
            contact numbers, our generator compiles your data into standard two-dimensional matrices without routing
            information through external servers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <QrCode size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Static & Permanent</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every QR code directly stores your raw payload data. There are no intermediate redirect links, no third-party
              dependencies, and no expiration dates. The code remains functional forever.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">100% Client-Side Privacy</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your network passwords, phone numbers, and private text strings are processed entirely in browser memory.
              No payloads are transmitted across the internet or logged in any database.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Printer size={18} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Dual PNG & SVG Export</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Export ready-to-use PNG raster images for digital screens or infinite-resolution vector SVG files for
              professional commercial printing, signage, and merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How to Create a QR Code */}
      <section aria-labelledby="how-to-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-to-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Create a QR Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Generating a custom QR code takes just three straightforward steps:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Choose Your Content Type
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Select what your QR code will contain: <strong>Website URL</strong>, <strong>Plain Text</strong>,{' '}
              <strong>Email</strong>, <strong>Phone</strong>, or <strong>WiFi Network</strong> credentials.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Enter Information & Customize
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fill in your content fields and customize your output: select resolution (128px to 1024px), error correction
              level (L, M, Q, H), and custom foreground/background colors.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Download or Copy Payload
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Instantly preview your QR code with real-time contrast checking. Click <strong>Download PNG</strong>,{' '}
              <strong>Download SVG</strong>, or copy the formatted raw payload string to your clipboard.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Choose the Right QR Code Type */}
      <section aria-labelledby="qr-types-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="qr-types-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Choose the Right QR Code Type
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            QR codes store formatted strings that prompt smartphone camera software to execute specific native actions.
            Selecting the appropriate type ensures devices interpret your code accurately.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Type
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Underlying Payload Format
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Scanner Behavior
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Typical Applications
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <LinkIcon size={14} className="text-blue-500 shrink-0" />
                    <span>Website URL</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    https://example.com
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Prompts user to open destination link in default web browser
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Landing pages, menus, social profiles, marketing campaigns
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <FileText size={14} className="text-blue-500 shrink-0" />
                    <span>Plain Text</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    Raw text / UTF-8
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Displays raw text or copies characters to device clipboard
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Serial numbers, instructions, cryptographic keys, notes
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Mail size={14} className="text-blue-500 shrink-0" />
                    <span>Email</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    mailto:user@domain.com?...
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Opens email app with pre-filled recipient, subject, and body
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Customer feedback, support inquiries, event RSVP triggers
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Phone size={14} className="text-blue-500 shrink-0" />
                    <span>Phone</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    tel:+15551234567
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Opens native phone dialer with number pre-filled for one-tap calling
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Customer support hotlines, business cards, emergency contacts
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Wifi size={14} className="text-blue-500 shrink-0" />
                    <span>WiFi Network</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    WIFI:T:WPA;S:SSID;P:Key;;
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Prompts Android and iOS devices to automatically connect to WiFi
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Guest networks, cafes, offices, Airbnb check-in guides
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Create a QR Code for a Website */}
      <section aria-labelledby="url-qr-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="url-qr-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Create a QR Code for a Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Website URLs are the most common payload for QR codes. When configuring a URL QR code, keep the following
            best practices in mind:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Use Full Protocol Links</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Always provide a complete web address including <code>https://</code>. ZapPebble automatically prepends{' '}
              <code>https://</code> if you omit it, ensuring modern mobile camera scanners recognize the destination as
              an interactive web link rather than plain text.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Shorter URLs Produce Cleaner Codes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Because QR codes store raw text directly, long URLs with extensive query parameters or UTM tracking tags
              require more data modules. A simpler, shorter URL creates a less dense QR code that scans faster and from
              greater distances.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start space-x-3">
          <Info size={16} className="shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Privacy & Security Note for URLs</span>
            <p className="leading-relaxed">
              While ZapPebble generates the QR image 100% locally in your browser, the destination website itself is
              publicly accessible on the web. Always test destination links before distributing printed materials to
              ensure the target webpage remains active and HTTPS-secured.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Create a WiFi QR Code */}
      <section aria-labelledby="wifi-qr-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="wifi-qr-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Create a WiFi QR Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            A WiFi QR code allows guests, customers, and employees to join your wireless network instantly without typing
            complex network passwords manually.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Network SSID</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Enter the exact name of your wireless network. ZapPebble automatically escapes reserved characters
              (such as semicolons, colons, and backslashes) according to the MeCard WiFi specification.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Security Options</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose between <strong>WPA / WPA2 (Standard)</strong>, <strong>WEP</strong> (legacy), or{' '}
              <strong>None (Open Network)</strong> for unsecured public hotspots.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Hidden SSID Support</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If your wireless router does not broadcast its network identifier, check the <em>Hidden SSID Network</em>{' '}
              option so devices explicitly probe for the non-broadcasted SSID.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-3">
          <AlertTriangle size={16} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Critical Security Warning for WiFi Passwords</span>
            <p className="leading-relaxed">
              The generated WiFi QR code contains your network password in plain readable text inside its payload. Anyone
              who scans or photographs the QR code can inspect and read your wireless password. Treat printed WiFi QR codes
              with the same physical security as writing your WiFi password on paper.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Email and Phone QR Codes */}
      <section aria-labelledby="email-phone-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="email-phone-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Email and Phone QR Codes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Streamline communication by encoding direct contact triggers into scannable barcodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Mail size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Email (mailto:) Triggers</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Encodes recipient address, optional pre-filled subject line, and optional body text. When scanned, modern
              smartphones launch the user&apos;s default email client with all fields pre-populated. Note that scanning
              does not automatically send the email—the user must review and tap send.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <Phone size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Phone (tel:) Dialer Links</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Encodes a sanitized telephone number using international or domestic dialing formats. Scanning prompts the
              device to open its native phone dialer with the number ready to call. For safety, operating systems do not
              initiate calls automatically without user confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Error Correction Levels */}
      <section aria-labelledby="ecc-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="ecc-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Is QR Error Correction?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            QR codes use Reed-Solomon error correction algorithms to retain readability even if part of the printed code is
            scratched, obscured, or torn. Choosing the right level balances scan resilience against matrix density.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Level
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Approximate Recovery
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Module Density
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Recommended Usage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    L (Low)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    ~7%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Lowest density (fewest modules)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Pristine digital screen displays where zero physical wear will occur.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    M (Medium — Default)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    ~15%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Balanced density
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    General marketing, menus, table tents, flyers, and standard print distribution.
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Q (Quartile)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    ~25%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    High density
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Industrial environments, outdoor posters, or surfaces prone to dirt and friction.
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    H (High)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">
                    ~30%
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Highest density (most modules)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    Harsh outdoor signage, vehicle decals, or when placing subtle central logo artwork.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Note: These percentages describe mathematical data recovery capability under QR standard encoding rules. They
          do not guarantee that a code will scan if critical alignment patterns or quiet zones are defaced.
        </p>
      </section>

      {/* 8. QR Size and Resolution */}
      <section aria-labelledby="resolution-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="resolution-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How Large Should a QR Code Be?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble supports four pixel resolution presets for raster PNG output (128px, 256px, 512px, and 1024px)
            alongside resolution-independent SVG vector files.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">128 × 128 px</span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Compact Digital</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Email footers, app icon badges, and small web widgets viewed directly on high-DPI displays.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">256 × 256 px</span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Standard Default</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              General website embeds, blog sidebars, presentation slide decks, and social media posts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">512 × 512 px</span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">High-Resolution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Product packaging, restaurant table tents, event badges, and business cards (up to 4 inches).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">1024 × 1024 px</span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Print-Ready Raster</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Large posters, retail window displays, and banners where vector SVG workflow is unavailable.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
          <span className="font-semibold text-slate-900 dark:text-white block">
            The 10:1 Scanning Distance Rule of Thumb
          </span>
          <p className="leading-relaxed">
            A practical industry guideline for printed QR codes is a 10:1 ratio between viewing distance and physical size.
            For example, if you expect users to scan a QR code from 10 feet away (such as on an exhibition booth or poster),
            the printed code should be at least 1 foot (12 inches) wide.
          </p>
        </div>
      </section>

      {/* 9. Colors and Contrast */}
      <section aria-labelledby="colors-contrast-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="colors-contrast-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Choose QR Colors Carefully
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Smartphone cameras do not read color; they detect luminance contrast between dark foreground modules and the
            light background. Insufficient contrast is the single most common cause of failed scans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recommended Color Combinations</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed list-disc list-inside">
              <li>Dark black (<code>#000000</code>) on crisp white (<code>#ffffff</code>) provides optimal 21:1 contrast.</li>
              <li>Deep navy, charcoal, or dark forest green on white or soft cream backgrounds.</li>
              <li>Always maintain a dark foreground over a lighter background for universal camera recognition.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Combinations to Avoid</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed list-disc list-inside">
              <li>Inverted colors (white modules on a dark background) often fail on older phone cameras.</li>
              <li>Light pastels, yellow, light gray, or neon colors on white backgrounds.</li>
              <li>Low-contrast pairings like red on black or dark gray on navy.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start space-x-3">
          <Info size={16} className="shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Real-Time Contrast Warning in ZapPebble</span>
            <p className="leading-relaxed">
              Our generator continuously computes the mathematical contrast ratio between your selected foreground and
              background colors. If the ratio drops below <strong>3.0:1</strong>, an alert appears warning that the
              combination may be unreadable by mobile camera sensors under typical lighting conditions.
            </p>
            <p className="pt-1">
              Need to inspect exact color values or convert between hex and RGB? Use our{' '}
              <Link
                href="/tools/color-picker"
                className="font-bold underline hover:text-amber-700 dark:hover:text-amber-200"
              >
                Color Picker
              </Link>{' '}
              to find high-contrast color palettes.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Quiet Zone */}
      <section aria-labelledby="quiet-zone-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="quiet-zone-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why the White Space Around a QR Code Matters
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            A QR code requires a clear buffer zone of solid background color surrounding its perimeter, known as the{' '}
            <strong>quiet zone</strong>. Without this empty border, camera decoders cannot distinguish where surrounding
            artwork, typography, or page borders end and the QR matrix begins.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Built-in Margin Protection in ZapPebble
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            ZapPebble automatically embeds a 2-module margin into every generated PNG and SVG file. When placing the
            downloaded QR code into Canva, Photoshop, or InDesign, do not crop or trim away this white border, and avoid
            overlapping background patterns or text boxes onto the code&apos;s perimeter.
          </p>
        </div>
      </section>

      {/* 11. PNG vs SVG */}
      <section aria-labelledby="png-vs-svg-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="png-vs-svg-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            PNG vs. SVG: Which QR Format Should You Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble provides both raster (PNG) and vector (SVG) export options. Choosing the correct file format ensures
            maximum fidelity for your target medium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">PNG (Portable Network Graphics)</h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                Raster
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard pixel-based format compatible with every digital platform, email client, website builder, and
              word processor. Choose PNG when sharing on social media, adding to digital PDFs, or embedding into web pages.
            </p>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Universal compatibility across all software.</li>
              <li>Fixed pixel dimensions (128px to 1024px).</li>
              <li>May blur if enlarged beyond its native export resolution.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">SVG (Scalable Vector Graphics)</h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                Vector
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mathematical XML-based vector format that scales infinitely without any loss of sharpness or pixelation.
              Choose SVG for professional print jobs, large-format billboard banners, trade show backdrops, and packaging.
            </p>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>Zero resolution limits; razor-sharp at billboard scale.</li>
              <li>Small file size regardless of print dimensions.</li>
              <li>Native support in Adobe Illustrator, Figma, and vector plotters.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 12. How to Make a QR Code Easier to Scan */}
      <section aria-labelledby="easier-to-scan-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="easier-to-scan-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Make a QR Code Easier to Scan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Maximize scanning speed and reliability across various smartphone camera qualities by following these rules:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Keep Payloads Concise</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every additional character requires more data modules, creating a denser grid. Use concise URLs and brief
              text to keep modules large and easily scannable from distance.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Maintain High Contrast</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure the foreground is significantly darker than the background. Keep contrast ratios well above 3:1 to
              prevent failure in direct sunlight or dim environments.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Preserve the Quiet Zone</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Never place surrounding text, icons, or borders right against the edge of the QR matrix. Leave the built-in
              margin intact when designing layouts.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Test Across Multiple Devices</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Before printing thousands of copies, test your QR code with both iOS and Android cameras, as well as our{' '}
              <Link
                href="/tools/qr-scanner"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR / Barcode Scanner
              </Link>{' '}
              to verify decoding accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* 13. Common QR Code Problems */}
      <section aria-labelledby="troubleshooting-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="troubleshooting-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Why Isn&apos;t My QR Code Scanning?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Quick solutions to the most common scanning failures and troubleshooting steps:
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Camera doesn&apos;t detect or outline the QR code
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> Low contrast between foreground and background colors, or an inverted color scheme
              (light modules on dark background).<br />
              <strong>Fix:</strong> Switch to standard dark foreground (<code>#000000</code>) on a white background (
              <code>#ffffff</code>) with a contrast ratio of 10:1 or higher.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Code is too dense and camera struggles to focus
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> Extremely long payload text or excessively high error correction (Level H) on a small
              printed size.<br />
              <strong>Fix:</strong> Shorten the URL, reduce error correction to Level M, or increase the physical print size.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <AlertTriangle size={16} className="shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Problem: Scanning prompts plain text instead of opening a website
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Cause:</strong> The URL was entered as plain text without an <code>https://</code> protocol prefix.<br />
              <strong>Fix:</strong> Select the <strong>Website URL</strong> tab in ZapPebble to ensure valid URL formatting.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Static vs Dynamic QR */}
      <section aria-labelledby="static-vs-dynamic-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="static-vs-dynamic-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Is This a Static or Dynamic QR Code?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble generates <strong>100% static QR codes</strong>. It is essential to understand how static codes
            differ from commercial dynamic services:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">ZapPebble Static QR Codes</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Your raw data is directly encoded into the matrix dots.</li>
              <li>Works permanently; no monthly subscriptions or expiration dates.</li>
              <li>No middleman servers, no scan limits, and zero redirect latency.</li>
              <li>Cannot be edited after generation without printing a new code.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Commercial Dynamic QR Codes</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Encodes a redirect URL managed by a third-party server.</li>
              <li>Destination link can be edited remotely after printing.</li>
              <li>Tracks scan counts, geographic locations, and device types.</li>
              <li>Stops working if the third-party provider shuts down or charges a fee.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 15. Privacy / Local Processing */}
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-800 dark:text-emerald-300">
            <ShieldCheck size={24} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <h2
              id="privacy-heading"
              className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 dark:text-white"
            >
              Your QR Data Stays in Your Browser
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Many online QR code generators transmit your input text, URLs, and network credentials to remote servers to
            generate an image, often storing your data for marketing or analytics.
          </p>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            ZapPebble runs the entire QR matrix generation and raster/vector compilation locally inside your browser memory
            using lightweight client-side JavaScript. Your text, WiFi passwords, and phone numbers are never transmitted
            across the network, never logged, and never stored on any server.
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
              <span>Instant in-memory synthesis</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Safe for WiFi passwords</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
