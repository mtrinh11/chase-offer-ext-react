
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action !== "getOffers") return false;

  console.log("looking for offers");
  const originalUrl = window.location.href;

  (async () => {
    const items = [];

    // SELECTOR STRATEGY:
    // 1. Grid items: found inside .offerTileGridItemContainer
    // 2. Carousel items: found inside .singleCarouselContainer
    // We target [data-cy="commerce-tile"] directly, ignoring the dynamic 'z9bqz54' class.
    
    const selector = '.offerTileGridItemContainer [data-cy="commerce-tile"], .singleCarouselContainer [data-cy="commerce-tile"]';
    
    const tiles = document.querySelectorAll(selector);

    console.log(`Found ${tiles.length} potential offers`);

    tiles.forEach((tile) => {
      const label = tile.getAttribute("aria-label");

      if (!label) return;

      // Skip tiles that already have "Success Added" in the label
      if (label.includes("Success Added")) return;

      items.push(label);

      // Click the tile
      // Note: Standard click() works even if the carousel item is off-screen
      tile.click();
    });

    // Optional: Add a small delay if clicks aren't registering fast enough
    await new Promise(r => setTimeout(r, 100));

    window.location.href = originalUrl;
    console.log("done looking for offers");
    window.location.href = originalUrl;
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

