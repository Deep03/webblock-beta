const ruleIds = [1, 2, 3, 4, 5, 6, 7];  // Array of rule IDs

// Function to update the blocking rules based on toggle state
function updateBlockingRules(enable) {
    if (enable) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIds,  // Remove existing rules with these IDs
            addRules: [
                {
                    "id": 4,
                    "priority": 4,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": "*://*.facebook.com/*",
                        "resourceTypes": ["main_frame"]
                    }
                },
                {
                    "id": 2,
                    "priority": 2,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": "*://*.reddit.com/*",
                        "resourceTypes": ["main_frame"]
                    }
                },
                {
                    "id": 3,
                    "priority": 3,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": "*://*.twitter/*",
                        "resourceTypes": ["main_frame"]
                    }
                },
                {
                    "id": 1,
                    "priority": 1,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": "*://*.https://x.com/home?lang=en/*",
                        "resourceTypes": ["main_frame"]
                    }
                },
                {
                    "id": 5,
                    "priority": 5,
                    "action": { "type": "block" },
                    "condition": {
                        "urlFilter": "*://*.instagram.com/*",
                        "resourceTypes": ["main_frame"]
                    }
                }
            ]
        }).then(() => {
            console.log("Blocking rules enabled.");
        }).catch((error) => {
            console.error("Error enabling blocking rules:", error);
        });
    } else {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIds
        }).then(() => {
            console.log("Blocking rules disabled.");
        }).catch((error) => {
            console.error("Error disabling blocking rules:", error);
        });
    }
}

// Initialize the state and set up message listener
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get('toggleState', function(result) {
        updateBlockingRules(result.toggleState || false);
    });
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'enable') {
        updateBlockingRules(true);
    } else if (message.action === 'disable') {
        updateBlockingRules(false);
    }
});
