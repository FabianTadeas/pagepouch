import IDB from "../IDB";
const target = import.meta.env.VITE_TARGET

function callback(tab: browser.tabs.Tab | chrome.tabs.Tab) {
  IDB.joeys.add({
      title: tab.title,
      added: new Date().getTime(),
      url: tab.url,
      icon: tab.favIconUrl
  })
}

if (target === "v2") {
  browser.browserAction.onClicked.addListener(callback)
} else {
  chrome.action.onClicked.addListener(callback)
}
