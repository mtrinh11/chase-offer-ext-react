chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getOffers") {
    console.log("looking for offers");
    const originalUrl = window.location.href;
    (async () => {
      let items = [];
      const elements = await waitForElementsByTagname('mds-icon');
      let addableElements = Array.from(elements).filter((item) => item.getAttribute('type') === 'ico_add_circle');

      for (let i = 0; i < addableElements.length; i++) {
        const label = addableElements[i]?.parentNode?.parentNode?.parentNode?.getAttribute('aria-label');
        if (label) items.push(label);
      }

      for (let i = 0; i < addableElements.length; i++) {
        addableElements[i]?.parentNode?.parentNode?.parentNode.click()
      }
      
      window.location.href = originalUrl;

      console.log("done clicking");
      sendResponse({ offers: items });
    })();
    return true;
  }
  return false;
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

