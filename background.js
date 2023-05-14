// global vars
const blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');
var addbox = document.querySelector('.add-site');
let index = 0;
let index1 = 0;
const addButton = document.getElementById("add-btn-id");
const removeButton = document.getElementById('remove-btn');



// DO NOT EDIT THIS CODE BLOCK
function blockSite() {
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
}
// END OF DONOT EDIT


// shows all the sites that are currently on the server list
function showAllSites() {
  for (let i = 0; i < blockedSites.length; i++) {
    siteName = blockedSites[i];
    let divEl = `<div class="site-block">
        <text id="site-text"> ${siteName}</text> 
        <label class="switch">
            <input type="checkbox" id="toggle-${i}">
            <span class="slider round"></span>
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


// shows a particular site
function showSite(site, index) {
  let divEl = `<div class="site-block">
                <text id="site-text"> ${site}</text> 
                <label class="switch">
                    <input type="checkbox" id="toggle-${index}">
                    <span class="slider round"></span>
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
    showSite(siteName, index1);
    index1++;
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

function toggleStat(toggle) {
  if (document.getElementById('toggle')) {
    toggle.addEventListener('change', (event) => {
      if (event.target.checked) {
        return true;
      } else {
        return false;
      }
    });  
  }
  else {
    return;
  }
}


if (addButton) {
  addButton.addEventListener('click', () => {
    addSite();
  });
}

if (removeButton) {
  removeButton.addEventListener('click', () => {
    removeSite();
  });
}


// main game loop

for (let i = 0; i < blockedSites.length;i++) {
    toggle_id = "toggle-" + i;
    let toggle = document.getElementById(toggle_id);
    if (toggle) {
      state  = toggleStat(toggle);
      if (state == false) {
        site_text = document.getElementById("site-text");
        console.log(site_text);
      }
    }
}