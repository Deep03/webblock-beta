# Website Blocker Chrome Extension

This Chrome extension allows you to block certain websites from being accessed in your browser. You can add websites to the blocklist and prevent them from loading.

## Installation

1. Download or clone this repository to your local machine.

2. Open Google Chrome.

3. Type `chrome://extensions` in the address bar and press Enter.

4. Enable the **Developer mode** (toggle button) located at the top right corner of the Extensions page.

5. Click on the **Load unpacked** button and select the folder where you cloned/downloaded the extension.

6. The extension should now be installed and visible in the extensions list.

## Usage

1. Click on the extension's icon in the Chrome toolbar.

2. To add a website to the blocklist, enter the website's URL or domain in the input field under **Add Site** and click the **Add** button.

3. To remove a website from the blocklist, enter the website's URL or domain in the input field under **Remove Site** and click the **Remove** button.

4. The blocked websites will be prevented from loading in your browser.

## Important Notes

- This extension uses the `chrome.webRequest` API to block website requests, which may not work in all Chrome versions or environments.

- The blocklist is stored in the browser's local storage. If you clear your browser data or use a different browser, the blocklist will be reset.

- The extension works based on the URLs or domains you specify. Make sure to enter the correct URLs or domains to block the desired websites.

- This extension is intended for personal use and should be used responsibly. Respect the privacy and access rights of others when blocking websites.

## License

This project is licensed under the [MIT License](LICENSE).
