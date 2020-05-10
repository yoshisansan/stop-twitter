'use strict'
$(function(){
  $("#main__target").sortable({ 
    handle: '.main__set-radius',
    animation: 10,
    revert: true,
    update: changeId
  });
});
function changeId() {
  const target = Array.from(document.querySelectorAll("#main__target > div.main__set-wrap > div.main__set-radius > span"));
  target.forEach(function(item, index){
    item.textContent = index + 1;;
  })
  idChromeSet()
}
function idChromeSet() {
  // なぜかidChromeSetの処理を挟むと謎の空白が追加されてしまうところを修正する
  clearData();
  const itemDom = document.querySelectorAll("#main__target > div");
  itemDom.forEach(function(item, index){
    //修正必須
    const startResetHour = item.querySelector("div.main__set-timer-wrap > div:nth-child(1) > p.main__set-value.set-hour").textContent,
          startResetMin = item.querySelector("div.main__set-timer-wrap > div:nth-child(1) > p.main__set-value.set-min").textContent,
          stopResetHour = item.querySelector("div.main__set-timer-wrap > div:nth-child(3) > p.main__set-value.set-hour").textContent,
          stopResetMin = item.querySelector("div.main__set-timer-wrap > div:nth-child(3) > p.main__set-value.set-min").textContent;

    const startTime = [startResetHour, startResetMin],
          stopTime = [stopResetHour, stopResetMin];

    const newId = item.querySelector("div.main__set-radius > span").textContent;
    const keyName = 'set' + newId;

    if(!newId) return;
    chrome.storage.local.set({ [keyName] : [startTime, stopTime,  { index: newId } ] }, function (){});
  });
}