# A Chrome Extension to Activate Chase Credit Card offers.

Inspired to use React and Vite by https://medium.com/@5tigerjelly/creating-a-chrome-extension-with-react-and-vite-boilerplate-provided-db3d14473bf6


the button is in class r9jbijb. type = "ico_add_circle"
then it opens the page, will need to go back and repeat I think.

      "https://secure.chase.com/web/auth/*"


      "content_scripts": [
        {
          "js": ["scripts/addOffers.js"],
          "matches": [
            "https://secure.chase.com/web/auth/*"
          ]
        }
      ]


<!-- stuff from other -->


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

console.log("looking for offers")



waitForElementsByClassName('r9jbijb', (ele) => {
    console.log('Found elements:', ele.length);
    for (let i = 0; i < ele.length; i++) {
        console.log(i, ele[i].parentNode.parentNode);
    }
    console.log("clicked", ele[0])
    ele[0].click()

});

waitForElementsByID('back-button', (ele) => {
    console.log('Found elements:', ele.length);
    // for (let i = 0; i < ele.length; i++) {
    //     console.log(i, ele[i].parentNode.parentNode);
    // }
    // console.log("clicked", ele[0])
    ele[0].click()

})

