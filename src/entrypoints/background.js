let currentUrlStatus = false;

export default defineBackground(() => {
  console.log('Hello background!', { id: chrome.runtime.id });

  const checkUrlAndUpdateStatus = (tab) => { //checks the current tab url
    if (tab.url && tab.url.includes("https://www.linkedin.com/mynetwork/grow/")) {
      currentUrlStatus = true;
    } else {
      currentUrlStatus = false;
    }
  };

  chrome.tabs.onActivated.addListener((activeInfo) => { //checks for tab url whenever tab is changed
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      checkUrlAndUpdateStatus(tab);
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //checks for tab url whenever page is reloaded 
    if (changeInfo.status === 'loading') {
      checkUrlAndUpdateStatus(tab);
    }
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => { //sends the status of url match when the popup sends the appropriate message
    if (message.action === 'requestUrlStatus') {
      sendResponse({ url: currentUrlStatus });
    }
  });
});



