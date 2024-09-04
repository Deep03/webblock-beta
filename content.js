// document.querySelector('.toggle').addEventListener('click', function() {
//     this.classList.toggle('active');
//   });

document.addEventListener('DOMContentLoaded', function () {
    // Load the toggle state from storage
    chrome.storage.local.get('toggleState', function (result) {
        const isActive = result.toggleState || false;
        const toggleElement = document.querySelector('.toggle');
        if (isActive) {
            toggleElement.classList.add('active');
        }
    });

    // Add event listener to the toggle
    document.querySelector('.toggle').addEventListener('click', function () {
        const isActive = this.classList.toggle('active');
        // Save the toggle state to storage
        chrome.storage.local.set({ 'toggleState': isActive });
        // Notify the background script to update rules
        chrome.runtime.sendMessage({ action: isActive ? 'enable' : 'disable' });
    });
});
