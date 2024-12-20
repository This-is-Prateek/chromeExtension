import { useEffect, useState } from "react"
import logo from "@/assets/logo.svg"
function App() {
  const [urlStatus, setUrlStatus] = useState(false)

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "requestUrlStatus" }, (response) => { //checks the current tab url as the popup opens or component mounts
      if (response && response.url !== undefined) {
        setUrlStatus(response.url)
      }
    })
  }, [])

  const handleClick = () => { //sends a message to content.js to perform click on all connect buttons
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id, { action: "performClick" }, (response) => {
          if (response && response.status) {
            console.log(response.status);
            alert(response.status)
          }
        })
      }
    })
  }
  //conditional rendering based on the value of urlStatus
  return (
    <div className='flex flex-col items-center w-96 h-60 px-4 pt-4 pb-1 justify-between bg-black text-white'>
      {urlStatus ? (
        <>
          <div className='w-full flex flex-col items-center gap-2'>
            <div className="bg-[#0077B5] p-1 border border-white"><img src={logo} alt="logo" className="w-10" /></div>
            <h1 className="text-lg font-bold">LinkedIn Chrome Extension</h1>
            <div>Click on the button to send a connect request to all the suggested people on the page.</div>
          </div>
          <div><button onClick={handleClick} className="bg-blue-950 px-3 py-2 hover:bg-blue-800 rounded-full">Connect with All</button></div>
          <div className="flex gap-3 text-xs text-gray-200">
            <div>Made By: Prateek Kumawat</div>
            <div><a href="https://www.linkedin.com/in/prateek-kumawat-034b60ba/" className="hover:text-blue-400">Contact Me</a></div>
          </div>
        </>
      ) : <div>Open <a href="https://www.linkedin.com/mynetwork/grow/" target="_blank" className="hover:text-blue-400">this</a> to use this extension</div>}
    </div>
  );
}

export default App;
