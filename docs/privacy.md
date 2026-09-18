# ZapPebble Privacy Architecture

## Philosophy

> Your files are processed locally in your browser. Nothing is uploaded to our servers.

Most web utility tools on the internet force users to upload their sensitive documents, pictures, and code to remote servers, incurring infrastructure costs and creating security liabilities. ZapPebble operates on a zero-upload client-side model.

## Data Flow

* **Image Compression & Conversion:** Images are decoded directly into HTML5 `<canvas>` or `OffscreenCanvas` contexts in the browser and compressed locally.
* **JSON Formatting:** Handled entirely by browser JavaScript engine parsing (`JSON.parse` / `JSON.stringify`).
* **Text & Word Counting:** Text strings are analyzed in-memory.
* **QR Codes & Barcodes:** QR generation and scanning use client-side canvas pixels. Detected URLs are never opened automatically.
* **Screenshot to PDF:** Native tab capture is rendered into a PDF document client-side via JavaScript.
* **Color Picker:** Uses the native browser EyeDropper API; palettes are stored only in local browser storage.
