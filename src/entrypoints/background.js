let currentUrlStatus = false;

export default defineBackground(() => {
  console.log('Hello background!', { id: chrome.runtime.id });

  const checkUrlAndUpdateStatus = (tab) => {
    if (tab.url && tab.url.includes("https://www.linkedin.com/mynetwork/grow/")) {
      currentUrlStatus = true;
    } else {
      currentUrlStatus = false;
    }
  };

  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      checkUrlAndUpdateStatus(tab);
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
      checkUrlAndUpdateStatus(tab);
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'requestUrlStatus') {
      sendResponse({ url: currentUrlStatus });
    }
  });
});



