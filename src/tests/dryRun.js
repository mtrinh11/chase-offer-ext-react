(async () => {
    // SETTINGS
    const DRY_RUN = true; // Set to false to actually click items
    
    console.log("🚀 Starting local test...");
    
    const items = [];
    
    // 1. SELECTORS
    // Targeting the main tile wrapper to read the label
    const tileSelector = '.offerTileGridItemContainer [data-cy="commerce-tile"], .singleCarouselContainer [data-cy="commerce-tile"]';
    const tiles = document.querySelectorAll(tileSelector);
  
    console.log(`🔎 Found ${tiles.length} total tiles.`);
  
    for (const tile of tiles) {
      const label = tile.getAttribute("aria-label");
  
      // 2. CHECKS
      if (!label) {
        console.warn("Skipping tile with no label", tile);
        continue;
      }
  
      if (label.includes("Success Added")) {
        // console.log(`Skipping already added: "${label}"`); // Uncomment to see skipped items
        continue;
      }
  
      // 3. FIND THE "ADD" BUTTON
      // We try to find the specific "plus" button inside the tile. 
      // If not found, we fallback to the tile itself (though that might cause navigation).
      const actionButton = tile.querySelector('[data-cy="commerce-tile-button"]') || tile;
  
      items.push(label);
  
      if (DRY_RUN) {
          console.log(`[DRY RUN] Would have clicked: "${label}"`);
          // Highlight the element physically on the screen so you can see what was selected
          actionButton.style.border = "2px solid red"; 
          actionButton.style.backgroundColor = "yellow";
      } else {
          console.log(`[CLICKING] "${label}"`);
          actionButton.click();
          
          // Small delay to prevent overwhelming the browser
          await new Promise(r => setTimeout(r, 200)); 
      }
    }
  
    console.log("✅ Done! Offers processed:", items);
  })();