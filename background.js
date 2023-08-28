const blockedSites = []; // Initialize with an empty array

function blockSite() {
  if (chrome.webRequest) {
    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        if (blockedSites.some(site => details.url.includes(site))) {
          return { cancel: true };
        }
      },
      { urls: blockedSites.map(site => "*://*." + site + "/*") },
      ["blocking"]
    );
  }
}

blockSite()