/* global chrome */

import './App.css';

import { useState, useEffect } from 'react'

function App() {
  const [title, setTitle] = useState("Loading...");
  const [offers, setOffers] = useState("0 offers")
  
  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ["contentScript.js"], // must be in public/
        },
        () => {
          chrome.tabs.sendMessage(tabId, { action: "getTitle" }, (response) => {
            if (chrome.runtime.lastError) {
              setTitle("Error: " + chrome.runtime.lastError.message);
            } else {
              setTitle("Title: " + response.title);
            }
          chrome.tabs.sendMessage(tabId, { action: "getOffers"}, (response) => {
            if (chrome.runtime.lastError) {
              setOffers("Offer Error: " + chrome.runtime.lastError.message);
            } else {
              setOffers("Offers: " + response.offers);
            }
            
          })
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
          Activate
        </button>
        <div> {title}</div>
        <div>{offers} </div>
      </div>
      
    </>
  );
}

export default App;
