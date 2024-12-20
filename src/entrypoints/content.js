export default defineContentScript({
  matches: ['https://www.linkedin.com/mynetwork/grow/*'], //script is injected in sites that matches the url
  main() {
    const connect = () => {
      const buttons = document.querySelectorAll("button")
      if (buttons.length > 0) {
        const connectBtns = Array.from(buttons).filter((value) => (value.textContent === "Connect"))
        if (connectBtns.length > 0) {
          connectBtns.forEach((button) => {
            setTimeout(() => {
              button.click()
            }, 3000)
          })
          return "click actions scheduled to perform"
        } else {
          return "No return buttons available to click"
        }
      } else {
        return "No buttons available to click"
      }
    }

    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => { //listens for the popup script to send message to perform clicks
      if (data.action === "performClick") {
        const result = connect()
        sendResponse({ status: result })
      }
    })
  },
});
