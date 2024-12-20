let currentUrlStatus = false;

export default defineBackground(() => {
  // Initial log statement to indicate the background script is loaded
  console.log('Hello background!', { id: chrome.runtime.id });

  const checkUrlAndUpdateStatus = (tab) => { // checks the current tab URL
    if (tab.url && tab.url.includes("https://www.linkedin.com/mynetwork/grow/")) {
      currentUrlStatus = true;
    } else {
      currentUrlStatus = false;
    }
  };

  chrome.tabs.onActivated.addListener((activeInfo) => { // checks for tab URL whenever tab is changed
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (chrome.runtime.lastError) {
        console.error('Error getting tab:', chrome.runtime.lastError);
      } else {
        checkUrlAndUpdateStatus(tab);
      }
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { // checks for tab URL whenever page is reloaded 
    if (changeInfo.status === 'loading') {
      if (chrome.runtime.lastError) {
        console.error('Error on tab update:', chrome.runtime.lastError);
      } else {
        checkUrlAndUpdateStatus(tab);
      }
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { // sends the status of URL match when the popup sends the appropriate message
    if (message.action === 'requestUrlStatus') {
      sendResponse({ url: currentUrlStatus });
    }
  });

  // Final log statement to indicate the background script is fully loaded
  console.log('Background script loaded');
});





