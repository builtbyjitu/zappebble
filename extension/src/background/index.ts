/**
 * WebTools Manifest V3 Service Worker
 * Handles minimal background events according to the least-privilege security model.
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[WebTools] Extension installed successfully. Client-side tools ready.');
  }
});

// Listener for background tab capture or coordination
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'PING') {
    sendResponse({ status: 'PONG', timestamp: Date.now() });
    return true;
  }

  if (message.type === 'CAPTURE_VISIBLE_TAB') {
    chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, dataUrl });
      }
    });
    return true; // Keep channel open for async response
  }

  return false;
});
