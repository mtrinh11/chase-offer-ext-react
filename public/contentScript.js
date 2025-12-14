chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "getOffers") return false;

  console.log("looking for offers");
  const originalUrl = window.location.href;

  (async () => {
    const items = [];

    const containers = document.querySelectorAll(".offerTileGridItemContainer");

    containers.forEach((container) => {
      // Find the actual clickable tile
      const tile = container.querySelector('[data-cy="commerce-tile"]');

      if (!tile) return;

      const label = tile.getAttribute("aria-label");

      if (label) items.push(label);

      // Click the tile
      tile.click();
    });

    window.location.href = originalUrl;

    console.log("done looking for offers");
    sendResponse({ offers: items });
  })();

  return true; // keep message channel open
});

function waitForElementsByClassName(selector, callback, interval = 100, timeout = 3000) {
    const start = Date.now();
    const timer = setInterval(() => {
        const elements = document.getElementsByClassName(selector);
        if (elements.length > 0 || Date.now() - start > timeout) {
          clearInterval(timer);
          callback(elements)
        }      
    }, interval);
}

function waitForElementsByTagname(selector, interval = 100, timeout = 3000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const timer = setInterval(() => {
        const elements = document.getElementsByTagName(selector);
        if (elements.length > 0 || Date.now() - start > timeout) {
          clearInterval(timer);
          resolve(elements)
        }      
    }, interval);
  })
}

