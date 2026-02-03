// Extract links from the current page
async function extractLinks() {
  try {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if we're on hpacademy.com
    if (!tab.url || !tab.url.includes('hpacademy.com')) {
      showError('This extension only works on hpacademy.com');
      return;
    }

    // Inject script to extract links from the page
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const canonical = document.querySelector('link[rel="canonical"]');
        const english = document.querySelector('link[rel="alternate"][hreflang="en"]');
        const spanish = document.querySelector('link[rel="alternate"][hreflang="es"]');
        
        return {
          canonical: canonical ? canonical.getAttribute('href') : null,
          english: english ? english.getAttribute('href') : null,
          spanish: spanish ? spanish.getAttribute('href') : null
        };
      }
    });

    if (results && results[0] && results[0].result) {
      const { canonical, english, spanish } = results[0].result;
      
      // Populate the input fields
      document.getElementById('canonical-url').value = canonical || '';
      document.getElementById('english-url').value = english || '';
      document.getElementById('spanish-url').value = spanish || '';

      // Show messages if links are missing
      if (!canonical) {
        showFieldMessage('canonical-status', 'Canonical URL not found', 'warning');
      } else {
        clearFieldMessage('canonical-status');
      }

      if (!english) {
        showFieldMessage('english-status', 'English URL not found', 'warning');
      } else {
        clearFieldMessage('english-status');
      }

      if (!spanish) {
        showFieldMessage('spanish-status', 'Spanish URL not found', 'warning');
      } else {
        clearFieldMessage('spanish-status');
      }
    }
  } catch (error) {
    console.error('Error extracting links:', error);
    showError('Error extracting links. Make sure you are on a valid hpacademy.com page.');
  }
}

// Copy text to clipboard
async function copyToClipboard(text, buttonId, statusId) {
  if (!text) {
    showFieldMessage(statusId, 'No URL to copy', 'error');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showFieldMessage(statusId, 'Copied!', 'success');
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      clearFieldMessage(statusId);
    }, 2000);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    showFieldMessage(statusId, 'Failed to copy', 'error');
  }
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

// Show field-specific status message
function showFieldMessage(statusId, message, type) {
  const statusDiv = document.getElementById(statusId);
  statusDiv.textContent = message;
  statusDiv.className = `status-message ${type}`;
  statusDiv.style.display = 'block';
}

// Clear field-specific status message
function clearFieldMessage(statusId) {
  const statusDiv = document.getElementById(statusId);
  statusDiv.textContent = '';
  statusDiv.style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Extract links when popup opens
  extractLinks();

  // Copy button handlers
  document.getElementById('copy-canonical').addEventListener('click', () => {
    const url = document.getElementById('canonical-url').value;
    copyToClipboard(url, 'copy-canonical', 'canonical-status');
  });

  document.getElementById('copy-spanish').addEventListener('click', () => {
    const url = document.getElementById('spanish-url').value;
    copyToClipboard(url, 'copy-spanish', 'spanish-status');
  });

  document.getElementById('copy-english').addEventListener('click', () => {
    const url = document.getElementById('english-url').value;
    copyToClipboard(url, 'copy-english', 'english-status');
  });
});

