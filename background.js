// global vars
const blockedSites = JSON.parse(localStorage.getItem('blockedSites') || '[]');
var addbox = document.querySelector('.add-site');
let index = 0;
let site_counter = 0;
const addButton = document.getElementById("add-btn-id");
const removeButton = document.getElementById('remove-btn');
let remove_index = 0;
let skip_list = [];

for (let i = 0; i < blockedSites.length; i++) {
    skip_list.push(i);
}

// DO NOT EDIT THIS CODE BLOCK
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
function showSite(site, count) {
  let divEl = `<div class="site-block">
                <text id="site-text"> ${site}</text> 
                <label class="switch">
                    <input type="checkbox" id="toggle-${count}">
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
    showSite(siteName, site_counter);
    site_counter++;
  }
  else {
    window.alert("Site already exits!")
  }
  localStorage.setItem('blockedSites', JSON.stringify(blockedSites));
  blockSite();
}

console.log(blockedSites);
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
    let toggle_id = "toggle-" + i;
    let toggle = document.getElementById(toggle_id);
    toggle.addEventListener('change', (event) => {
      if (!event.target.checked) {
        skip_list.push(i);
      } else {
        var index = skip_list.indexOf(i);
        if (index > -1) {
          skip_list.splice(index, 1);
        }
        // Perform actions when checkbox is unchecked
      }
      console.log(skip_list);
    });
}