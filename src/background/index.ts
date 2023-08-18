import browser from "webextension-polyfill";
import IDB from "../IDB";

browser.browserAction.onClicked.addListener((tab) =>{
  IDB.joeys.add({
      title: tab.title,
      added: new Date().getTime(),
      url: tab.url,
      icon: tab.favIconUrl
    })
  }
);
