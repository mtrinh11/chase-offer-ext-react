/* global chrome */

import './App.css';

import { useState, useEffect } from 'react'
import {chase} from './bankRequest.js'

function App() {
  const [offers, setOffers] = useState([])
  
  useEffect(() => {
    chrome.storage.local.get("offers", (result) => {
      if (result.offers && result.offers.length > 0) {
        setOffers(result.offers);
      }
    });
  }, []);

  const handleClick = async () => {
    try {
      let response = await chase()
      
      if (!response || response.length === 0){
        setOffers(["No Offers Added"])
      } else {
        setOffers(response)
      }
      console.log("Offers", offers)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <>
      <h2>
        Activate Your Chase Offers
      </h2>
      <p>
        Login to your Chase account and then go to your Chase Offers before 
        clicking. We do not store any login credentials, so you will have to go 
        to the Chase Offers page where you can see "All Offers". 
      </p>
      <div className="card">
        <button onClick={handleClick}>
          Activate Chase Offers
        </button>
        <div> 
          {offers.length > 0 ? 
          <p>Activated Last:
            {offers.map((item, index) => (
            <p key={index}>{item}</p>))}
          </p>
           : []
        }
        </div>
      </div>
      
    </>
  );
}

export default App;
