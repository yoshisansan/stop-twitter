'use strict'
//chromeのローカルフォルダからのデータのやり取りはここで行う

function createNewTimer(startTime, stopTime) {
  chrome.storage.local.get(null , function (setData) {
    // 空の場合は新しくセットする
    if(!setData) {
      const id = 1;
      const keyName = 'set' + id;
      chrome.storage.local.set({ [keyName] : [startTime, stopTime, { index: id } ] }, function (){});
      return;
    }
    storageSet(setData, startTime, stopTime);
  });
}

function storageSet(setData, startTime, stopTime) {
  const id = Object.keys(setData).length + 1;
  const keyName = 'set' + id;
  chrome.storage.local.set({ [keyName] : [startTime, stopTime,  { index: id } ] }, function (){
    const storageSet = [startTime, stopTime,  { index: id } ]
    createSetDom(storageSet);
  }); 
  addEventAdd(id);
}

function addEventAdd(id) {
  const storageId = 'set' + id;
  chrome.storage.local.get(storageId, function(item){
    const target = document.querySelectorAll("#main__target > div");
    const targetLast = target[target.length - 1];
    const lastElement = targetLast.querySelector("div.main__set-remove > span");
    lastElement.addEventListener('click', function(){
      storageRemove(targetLast);
    });
  });
}

function clearData() {
  chrome.storage.local.clear(function () {});
}

function clearView() {
  // addEventListenerは上書き更新されないためView側を消して挿入してリセット。（onclick属性はchrome extensionsでは禁止されている）
  console.log('clearView');
  
  const target = document.querySelectorAll("#main__target > div");
  target.innerHTML = target;

}

function adjustView(removeId) {
  // adjustSetIdで更新したChromeStorageの内容が再レンダリングできないため、リアルタイムで反映できず仕方がないのでView側の見た目も整える
  const items = document.querySelectorAll("#main__target > div > div.main__set-radius > span");
  for(let i = removeId - 1; items.length > i;i++) { items[i].textContent = i + 1; }
  resetStorageData();
}

function storageRemove(item) {
  const removeId = item.querySelector("div.main__set-radius > span").textContent;
  item.parentNode.removeChild(item);
  console.log(`deleted id:${removeId}`);
  adjustView(removeId);
}

function resetStorageData() {
  clearData();
  const target = document.querySelectorAll("#main__target > div");
  target.forEach(function(item){
    const startResetHour = item.querySelector("div.main__set-timer-wrap > div:nth-child(1) > p.main__set-value.set-hour").textContent;
    const startResetMin = item.querySelector("div.main__set-timer-wrap > div:nth-child(1) > p.main__set-value.set-min").textContent;
    const stopResetHour = item.querySelector("div.main__set-timer-wrap > div:nth-child(3) > p.main__set-value.set-hour").textContent;
    const stopResetMin = item.querySelector("div.main__set-timer-wrap > div:nth-child(3) > p.main__set-value.set-min").textContent;
    const startTime = [startResetHour, startResetMin];
    const stopTime = [stopResetHour, stopResetMin];
    const newId = item.querySelector("div.main__set-radius > span").textContent;
    const keyName = 'set' + newId;
    chrome.storage.local.set({ [keyName] : [startTime, stopTime,  { index: newId } ] }, function (){});
  });
}
