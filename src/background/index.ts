import IDB from "../IDB";
const target = import.meta.env.VITE_TARGET

function addJoey(tab: browser.tabs.Tab | chrome.tabs.Tab) {
  IDB.joeys.add({
    title: tab.title,
      added: new Date().getTime(),
      url: tab.url,
      icon: tab.favIconUrl
  })
}

if (target === "v2") {
  browser.browserAction.onClicked.addListener((tab)=>{
    browser.browserAction.setIcon({path: "/favicon_green.svg", tabId:tab.id})
    addJoey(tab)
  })
} else {
  chrome.action.onClicked.addListener((tab)=>{
    chrome.action.setIcon({path: "/favicon_green.svg", tabId:tab.id});
    addJoey(tab)
  })
}
