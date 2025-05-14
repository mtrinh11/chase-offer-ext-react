/* global chrome */

import './App.css';

import { useState } from 'react'

function App() {
  const [offers, setOffers] = useState("No Offers Added")
  
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ["contentScript.js"], // must be in public/
        },
        () => {
            
          chrome.tabs.sendMessage(tabId, { action: "getOffers"}, (response) => {
            if (chrome.runtime.lastError) {
              setOffers("Offer Error: " + chrome.runtime.lastError.message);
            } else {
              setOffers("Offers: " + response.offers);
            }
          });
        }
      );
    });
  };

  return (
    <>
      <h1>Click below to activate your offers</h1>
      <div className="card">
        <button onClick={handleClick}>
          Activate Chase Offers
        </button>
        <div>{offers} </div>
      </div>
      
    </>
  );
}

export default App;
