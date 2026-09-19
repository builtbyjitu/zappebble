import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Code,
  CheckCircle2,
  AlertCircle,
  Minimize2,
  FileCode,
  FolderTree,
  Search,
  Sliders,
  Info,
  Layers,
  Sparkles,
  ArrowRight,
  Braces,
  FileText
} from 'lucide-react';

export function JsonFormatterContent() {
  return (
    <div className="space-y-12 sm:space-y-16 text-slate-800 dark:text-slate-200">
      {/* 1. What Does JSON Formatting Do? */}
      <section aria-labelledby="what-is-formatting-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="what-is-formatting-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What Does JSON Formatting Do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            JSON (JavaScript Object Notation) is the standard data interchange format for modern web APIs, configuration
            files, and databases. When serialized for machine transmission, JSON is often compacted onto a single line
            without spaces or indentation. Formatting (also called <em>pretty-printing</em> or <em>beautifying</em>)
            restores standard line breaks and hierarchical indentation so developers can easily read, debug, and inspect
            the data structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 dark:text-slate-400">
              Minified (Raw API Output)
            </span>
            <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-xs overflow-x-auto">
              <code>{`{"user":"Alex","active":true,"roles":["admin","editor"]}`}</code>
            </pre>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Compact and efficient for network transport, but difficult for human eyes to scan and verify.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <span className="text-[11px] font-mono font-semibold uppercase text-blue-600 dark:text-blue-400">
              Formatted (ZapPebble Pretty-Print)
            </span>
            <pre className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-xs overflow-x-auto">
              <code>{`{
  "user": "Alex",
  "active": true,
  "roles": [
    "admin",
    "editor"
  ]
}`}</code>
            </pre>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Clear visual hierarchy with indentation. The underlying data values remain 100% identical.
            </p>
          </div>
        </div>
      </section>

      {/* 2. How to Format and Validate JSON */}
      <section aria-labelledby="how-to-format-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="how-to-format-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Format and Validate JSON
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble validates your JSON continuously as you type or paste. Here is the 3-step workflow:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Paste or Type Your JSON
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste your raw JSON string directly into the code editor. The live line numbers and parser monitor syntax
              instantly in real time.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Format, Minify, or Inspect Errors
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Click <strong>Format JSON</strong> to beautify your code, or <strong>Minify JSON</strong> to strip whitespace.
              If syntax errors exist, an alert displays the exact line and column location.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Copy or Download Result
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Use <strong>Copy JSON</strong> to copy the cleaned payload directly to your clipboard, or click{' '}
              <strong>Download JSON</strong> to save a clean <code>formatted.json</code> file to your computer.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Formatted vs Minified JSON */}
      <section aria-labelledby="formatted-vs-minified-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="formatted-vs-minified-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Formatted vs. Minified JSON: When to Use Each
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Formatting and minifying serve opposite but complementary purposes in the software development lifecycle.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60">
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Attribute
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Formatted JSON (Pretty-Printed)
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    Minified JSON (Compacted)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Primary Goal
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Human readability, code review, debugging, and documentation
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Reducing payload byte size and optimizing network transmission
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Whitespace & Newlines
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Structured indentation (2 spaces, 4 spaces, or tabs) with newlines per entry
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    All non-essential spaces, tabs, and newlines are stripped away
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    Typical Use Cases
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Configuration files (e.g. <code>package.json</code>, <code>tsconfig.json</code>), API response logs, unit test fixtures
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Production HTTP responses, Redis caching, message queues (Kafka, SQS), database storage
                  </td>
                </tr>
                <tr className="bg-slate-50/40 dark:bg-slate-950/20">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    ZapPebble Metric
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    Displays exact formatted byte weight in the status bar
                  </td>
                  <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">
                    Calculates exact whitespace saved and percentage reduction in real time
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Indentation Guidance */}
      <section aria-labelledby="indentation-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="indentation-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Which JSON Indentation Should You Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            ZapPebble supports three indentation standards. Formatting style is a team and project convention rather than
            a strict syntax rule:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">2 Spaces (Default)</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                Most Common
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The modern web industry standard (used by Google, npm, Prettier, and GitHub). Offers compact visual
              hierarchy without excessive horizontal scrolling in deeply nested objects.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">4 Spaces</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                High Contrast
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Common in Python, Java, and C# ecosystems. Provides pronounced visual indent depth, making it easy to trace
              nested scope levels on large desktop monitors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Tabs</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Flexible
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses standard <code>\t</code> tab characters. Allows each developer&apos;s local code editor to render
              indentation width according to their personal visual preference.
            </p>
          </div>
        </div>
      </section>

      {/* 5. JSON Syntax Basics */}
      <section aria-labelledby="syntax-rules-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="syntax-rules-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            JSON Syntax Rules You Need to Get Right
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            The JSON specification (RFC 8259) is strictly defined. While derived from JavaScript object syntax, JSON does
            NOT support several common JavaScript language conveniences:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">What JSON Requires</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
              <li><strong>Double Quotes Only:</strong> All keys and string values must be enclosed in double quotes (<code>&quot;key&quot;</code>).</li>
              <li><strong>Exact Data Types:</strong> Supports strings, numbers (integer or floating point), booleans (<code>true</code>, <code>false</code>), <code>null</code>, objects (<code>&#123; &#125;</code>), and arrays (<code>[ ]</code>).</li>
              <li><strong>Colons for Pairs:</strong> A colon (<code>:</code>) must separate each key from its value.</li>
              <li><strong>Commas for Items:</strong> Commas must separate adjacent items in arrays and key/value pairs in objects.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">What JSON Forbids</h3>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside leading-relaxed">
              <li><strong>No Single Quotes:</strong> Using <code>&apos;text&apos;</code> or <code>&apos;key&apos;</code> causes syntax failure.</li>
              <li><strong>No Trailing Commas:</strong> A comma after the last item in an array or object (e.g. <code>[1, 2,]</code>) is invalid.</li>
              <li><strong>No Comments:</strong> <code>{'//'}</code> single-line and <code>{'/* */'}</code> block comments are not allowed.</li>
              <li><strong>No Undefined or Functions:</strong> <code>undefined</code>, <code>NaN</code>, and executable code are prohibited.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Common JSON Errors */}
      <section aria-labelledby="common-errors-heading" className="space-y-6">
        <div className="space-y-2">
          <h2
            id="common-errors-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Common JSON Syntax Errors & How to Fix Them
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Here are the most frequent syntax mistakes developers encounter when hand-editing or generating JSON:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              1. Trailing Comma
            </h3>
            <pre className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-[11px] overflow-x-auto">
              <code>{`{ "name": "App", "version": "1.0", }  // ❌ Invalid`}</code>
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Fix:</strong> Remove the comma following the last property before the closing bracket or brace.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              2. Single Quotes Instead of Double
            </h3>
            <pre className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-[11px] overflow-x-auto">
              <code>{`{ 'status': 'success' }               // ❌ Invalid`}</code>
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Fix:</strong> Replace single quotation marks with standard double quotes (<code>&quot;status&quot;</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              3. Unquoted Object Keys
            </h3>
            <pre className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-[11px] overflow-x-auto">
              <code>{`{ id: 101, title: "Guide" }           // ❌ Invalid`}</code>
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Fix:</strong> Wrap property names in double quotes (<code>&quot;id&quot;</code>, <code>&quot;title&quot;</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
              4. Missing Separator Comma
            </h3>
            <pre className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-[11px] overflow-x-auto">
              <code>{`{ "a": 1 \n  "b": 2 }                    // ❌ Invalid`}</code>
            </pre>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Fix:</strong> Add a comma after the first value (<code>&quot;a&quot;: 1,</code>) before starting the next line.
            </p>
          </div>
        </div>
      </section>

      {/* 7. How Line and Column Errors Help */}
      <section aria-labelledby="line-column-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="line-column-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Find a JSON Error Using Line and Column Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            When JSON syntax is broken, native parsers halt immediately. ZapPebble extracts the exact character offset
            and maps it to human-readable <strong>Line</strong> and <strong>Column</strong> coordinates, displaying a
            highlighted snippet of the offending line.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-white block">
            Debugging Tip: Check the Characters Immediately Preceding the Error
          </span>
          <p className="leading-relaxed">
            Parsers report the position where they <em>detected</em> that syntax broke down—not necessarily where you made
            the typo. For example, if you forget a comma on Line 4, the parser may not fail until it encounters the opening
            quote on Line 5. When troubleshooting:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <li>Look at the reported Line and Column indicator in the red alert panel.</li>
            <li>Inspect the code snippet displayed below the error message.</li>
            <li>If the reported line looks correct, inspect the line immediately above it for a missing comma or unclosed quote.</li>
          </ol>
        </div>
      </section>

      {/* 8. Tree View & JSON Structure */}
      <section aria-labelledby="tree-view-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="tree-view-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Understanding JSON in Tree View
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            For complex payloads with deeply nested objects and arrays, plain code can become overwhelming. ZapPebble
            includes an interactive <strong>Tree View</strong> mode that transforms your parsed JSON into an expandable
            visual hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold uppercase">
              str
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">String Values</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Displayed in green with quotes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold uppercase">
              num
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Number Values</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Displayed in blue (integers & floats).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold uppercase">
              bool
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Booleans</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Displayed in purple (<code>true</code> / <code>false</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-bold uppercase">
              null
            </span>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Null Primitives</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explicit null primitives in amber.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Searching Large JSON */}
      <section aria-labelledby="search-json-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="search-json-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How to Find Keys and Values in Large JSON
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            When inspecting multi-megabyte API responses, locating a specific ID, email, or configuration key manually is
            tedious. ZapPebble includes an integrated search bar directly above the editor:
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm">
            <Search size={16} />
            <span>Interactive Match Counter & Navigation</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Type any substring into the search field. ZapPebble reports the total match count (e.g. <code>1/14</code>)
            and provides up and down arrows (<code>▲</code> / <code>▼</code>) that automatically scroll and highlight the
            exact matching text inside the editor.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            Need to count words, characters, or string lengths in your JSON values? Use our{' '}
            <Link
              href="/tools/word-counter"
              className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
            >
              Word & Character Counter
            </Link>{' '}
            for detailed text statistics.
          </p>
        </div>
      </section>

      {/* 10. When Should You Minify JSON? */}
      <section aria-labelledby="when-to-minify-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="when-to-minify-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            When Should You Minify JSON?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Minifying JSON strips all whitespace, tabs, and newline characters between tokens without altering the data.
            Common scenarios where minification is recommended include:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">API Payloads</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Reduces HTTP request and response header body size, cutting bandwidth usage on high-traffic microservices.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Storage & Caching</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Conserves memory when storing JSON strings in Redis, Memcached, SQLite, or browser localStorage.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">QR Code Payloads</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fewer characters produce a lower-density matrix that scans significantly faster in our{' '}
              <Link
                href="/tools/qr-generator"
                className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300"
              >
                QR Code Generator
              </Link>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start space-x-3">
          <Info size={16} className="shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Important: Minification vs. Compression (Gzip / Brotli)</span>
            <p className="leading-relaxed">
              Minification removes structural whitespace from plain text. It is not the same as binary compression algorithms
              like Gzip or Brotli, which operate at the HTTP transport layer. Combining both delivers maximum network efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Validation vs Schema Validation */}
      <section aria-labelledby="syntax-vs-schema-heading" className="space-y-4">
        <div className="space-y-2">
          <h2
            id="syntax-vs-schema-heading"
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            JSON Syntax Validation vs. JSON Schema Validation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            It is critical to distinguish between syntactic validity and schema conformity:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Syntax Validation (What ZapPebble Does)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Checks whether the text complies with RFC 8259 rules (matching brackets, quoted keys, valid commas). If the
              text can be parsed into an object or array without syntax errors, it is <strong>valid JSON</strong>.
            </p>
            <pre className="p-2 rounded bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-[11px]">
              <code>{`{ "age": "twenty" }  // ✅ Syntactically Valid`}</code>
            </pre>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              JSON Schema Validation (Business Rules)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Verifies whether valid JSON data satisfies a predefined schema contract (e.g. requiring <code>age</code> to be
              a positive integer, or requiring an <code>email</code> field). ZapPebble focuses specifically on syntax
              formatting and validation.
            </p>
            <pre className="p-2 rounded bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-[11px]">
              <code>{`// ❌ Fails schema if "age" requires integer type`}</code>
            </pre>
          </div>
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
              100% Client-Side Privacy: Your JSON Stays in Your Browser
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Developers frequently inspect JSON containing confidential data: customer records, internal API tokens,
            server configurations, database dumps, and proprietary application states.
          </p>

          <p className="text-xs sm:text-sm text-emerald-900/90 dark:text-emerald-300/90 leading-relaxed max-w-3xl">
            Many online JSON formatters transmit your code to cloud servers for validation or formatting. ZapPebble executes
            all JSON parsing, formatting, and minification 100% locally inside your browser memory using native JavaScript.
            No data is ever sent across the network, logged on external servers, or stored in any database.
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
              <span>Instant local processing</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>Safe for confidential API tokens</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
