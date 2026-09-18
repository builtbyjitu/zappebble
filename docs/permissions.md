# WebTools Chrome Extension Permissions Guide

WebTools adheres strictly to the Chrome Web Store **Least-Privilege Security Model**. We request only the absolute minimum permissions required to perform user-initiated utility actions.

## Declared Permissions

| Permission | Purpose | Justification |
|------------|---------|---------------|
| `activeTab` | Screenshot to PDF / Color sampling | Allows capturing the visible area of the currently active tab ONLY when the user explicitly triggers the action from the popup. Does not grant broad access to browsing history or inactive tabs. |
| `storage` | Local User Settings & Recent Palettes | Persists user preferences (e.g. dark mode, recent colors) locally inside the browser. No data is synchronized or sent to external servers. |

## Explicitly Avoided Permissions

We deliberately DO NOT request:
* `cookies` (no cookie tracking)
* `webRequest` / `webRequestBlocking` (no network interception)
* `history` (no access to user navigation history)
* `downloads` (native standard `<a>` download attributes handle file saving)
* `scripting` / broad `<all_urls>` host permissions (no background code injection)
