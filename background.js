// var blockedSites = [];

const blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');

const siteInput = document.querySelector('.site-title');
const addButton = document.querySelector('.add-btn');
var addbox = document.querySelector('.add-site');
let index = 0;


const addButton_e = document.getElementById("add-btn-id");
const removeButton = document.querySelector('remove-btn');

if (addButton_e) {
  addButton_e.addEventListener('click', () => {
    addSite();
  });
}

if (removeButton) {
  addButton.addEventListener('click', () => {
    removeSite();
  });
}

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
showAllSites();
// purpose is to reduce duplication of values
function checkSiteName(siteName) {
  for (let i = 0; i < blockedSites.length; i++) {
    if (blockedSites[i] === siteName) {
      index = i;
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
  localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
}


// purpose is to make it available to remove sites
function removeSite () {
  siteName = document.querySelector('.site-title').value;
  document.querySelector('.site-title').value = '';
  if (blockedSites.length == 0) {
    window.alert("Site does not exist");
    return;
  }
  if (checkSiteName(siteName) == true) {
    blockedSites.splice(index, 1);
  }
  else {
    window.alert("Site does not exist");
    return;
  }
  localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
  location.reload();
}

