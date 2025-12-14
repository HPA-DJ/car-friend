# Car Friend Chrome Extension

A Chrome extension that extracts canonical and Spanish alternate URLs from hpacademy.com pages.

## Features

- Automatically extracts canonical URLs from `<link rel="canonical">` tags
- Extracts Spanish alternate URLs from `<link rel="alternate" hreflang="es">` tags
- Click-to-copy functionality for both URLs
- Visual feedback when copying URLs
- Works only on hpacademy.com domain

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select this directory
5. The extension icon should appear in your toolbar

## Usage

1. Navigate to any page on hpacademy.com
2. Click the extension icon in your toolbar
3. The popup will display the canonical and Spanish URLs (if available)
4. Click the "Copy" button next to any URL to copy it to your clipboard
5. A "Copied!" message will appear briefly to confirm

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Popup interface
- `popup.js` - Extension logic
- `popup.css` - Styling
- `icons/` - Extension icons (generated with car emoji 🏎️)

## Notes

- Icons have been generated with the car emoji 🏎️.
- The extension only works on hpacademy.com pages for security and relevance.

