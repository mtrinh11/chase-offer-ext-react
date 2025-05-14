
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  response = {}
  if (request.action === "getTitle") {
    response[title] = document.title
    sendResponse({title: document.title});
    return true
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getOffers") {
    console.log("looking for offers")
    waitForElementsByClassName('r9jbijb', (ele) => {
      sendResponse({ offers: ele });
      console.log('Found elements:', ele.length);
      for (let i = 0; i < ele.length; i++) {
        console.log(i, ele[i].parentNode.parentNode);
      }
      if (ele != null && ele != undefined){
          console.log("clicked", ele[0])
          // ele[0].parentNode.parentNode.click()
          // window.history.back()
      
    }});

    
  }
});

function waitForElementsByClassName(selector, callback, interval = 100, timeout = 5000) {
    const start = Date.now();
    const timer = setInterval(() => {
        const elements = document.getElementsByClassName(selector);
        if (elements.length > 0 || Date.now() - start > timeout) {
            clearInterval(timer);
            callback(elements);
        }
    }, interval);
}

function waitForElementsByID(selector, callback, interval = 100, timeout = 5000) {
    const start = Date.now();
    const timer = setInterval(() => {
        const elements = document.getElementById(selector);
        if (elements != null && ( elements.length > 0 || Date.now() - start > timeout)) {
            clearInterval(timer);
            callback(elements);
        }
    }, interval);
}


// waitForElementsByID('back-button', (ele) => {
//     console.log('Found elements:', ele.length);
//     // for (let i = 0; i < ele.length; i++) {
//     //     console.log(i, ele[i].parentNode.parentNode);
//     // }
//     // console.log("clicked", ele[0])
//     ele[0].click()
// })
