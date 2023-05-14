var blockedSites = [];
const siteInput = document.querySelector('.site-title');
const addButton = document.querySelector('.add-btn');
const addbox = document.querySelector('.add-site');

// DO NOT EDIT THIS CODE BLOCK
if (chrome.webRequest) {
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Check if the request URL matches any of the blocked sites
    for (let i = 0; i < blockedSites.length; i++) {
      if (details.url.includes(blockedSites[i])) {
        console.log("Blocked request:", details.url);
        return {cancel: true}; // Cancel the request
      }
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
}
// END OF DONOT EDIT

// purpose is to reduce duplication of values
function checkSiteName(siteName) {
  for (let i = 0; i < blockedSites.length; i++) {
    if (blockedSites[i] === siteName) {
      return true;
    }
  }
  return false;
}

function showSite(site) {
    let divEl = `<div id="site-block">
    <text id="site-text"> ${site}</text> 
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>a
      </label>
    </div>`;
  addbox.insertAdjacentHTML('afterend', divEl);

}

function showAllSites() {
  for (let i = 0; i < blockedSites.length; i++) {
    siteName = blockedSites[i];
    let divEl = `<div id="site-block">
    <text id="site-text"> ${siteName}</text> 
      <label class="switch">
        <input type="checkbox">
        <span class="slider round"></span>a
      </label>
    </div>`;
  addbox.insertAdjacentHTML('afterend', divEl);
  }
}

// purpose is to add site to list of blocked sites
function addSite() {
  siteName = document.querySelector('.site-title').value;
  document.querySelector('.site-title').value = '';

  // no site name
  if (siteName == '') {
    window.alert("No site specified!");
    return;
  }
  if (checkSiteName(siteName) == false) {
    blockedSites.push(siteName);
    showSite(siteName);
  }
  else {
    window.alert("Site already exits!")
  }
}


// purpose is to make it available to remove sites
function removeSite () {
  siteName = document.querySelector('.site-title').value;
  document.querySelector('.site-title').value = '';
  if (checkSiteName(siteName) == true) {
    blockedSites.pop(siteName);
  }
}

