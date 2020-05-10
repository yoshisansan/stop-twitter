'use strict';

chrome.runtime.onMessage.addListener(function(resultData){
  console.log(resultData);
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.remove(tab.id, function(){});
  });
  chrome.tabs.create({
    "url": "action/index.html"
  });
  window.timeSchedule = (callback) => {
    callback(resultData);
  }
});

