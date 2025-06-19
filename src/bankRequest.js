/* global chrome */

export function chase() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError || !tabs.length) {
        return reject("Error querying tabs: " + (chrome.runtime.lastError?.message || "No active tab"));
      }

      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ["contentScript.js"], // must be in public/
        },
        () => {
          if (chrome.runtime.lastError) {
            return reject("Error injecting script: " + chrome.runtime.lastError.message);
          }
          let formattedRes = []
          chrome.tabs.sendMessage(tabId, { action: "getOffers"}, (response) => {
            if (chrome.runtime.lastError) {
              return reject("Error: " + chrome.runtime.lastError.message);
            } else {
              let res = response.offers
              
              for (let i of res){
                let iarr = i.split(" ").slice(3).join(" ");
                formattedRes.push(iarr)
              }
              
              resolve(formattedRes);

              chrome.storage.local.set({ offers: formattedRes }, () => {
                console.log("Offers saved to storage.");
              });
            }
          });

          
        }
      );
    });
  })
}