'use strict'

chrome.browserAction.setIcon({ path:"img/stop-twitter-off.png" });
chrome.storage.local.get(null, function(item){
  console.log(item);
})

document.querySelector("body > div > div.main__boxes > div.main__box-setting > button").addEventListener('click', checkSubmit);

const hour = Array.from(document.querySelectorAll("body > div > div > div > input.main__box-time.hour"));
const min = Array.from(document.querySelectorAll("body > div > div > div > input.main__box-time.min"));
hour.forEach( h => h.addEventListener('change', function(){
  const upper = 24;
  checkInput(h, upper);
}));
min.forEach( m => m.addEventListener('change', function(){
  const upper = 60;
  checkInput(m, upper);
}));

const startHour = document.querySelector("body > div > div.main__boxes > div:nth-child(2) > input.main__box-time.hour"),
      startMin = document.querySelector("body > div > div.main__boxes > div:nth-child(2) > input.main__box-time.min"),
      stopHour = document.querySelector("body > div > div.main__boxes > div:nth-child(3) > input.main__box-time.hour"),
      stopMin = document.querySelector("body > div > div.main__boxes > div:nth-child(3) > input.main__box-time.hour");

const date = new Date();
startHour.value = date.getHours();
stopHour.value = date.getHours() + 1;
startHour.textContent = startHour.value;
stopHour.textContent = stopHour.value;

function readyTimer() {
  chrome.storage.local.get(null, function (items) {
    setTimerOld(items);
  });  
}
readyTimer();

function setTimerOld(items) {
  const resetDom = document.getElementById("main__target");
  resetDom.innerHTML = "";
  Object.keys(items).forEach( function(itemKey) {
    const item = items[itemKey];
    createSetDom(item);
  });
  addDeleteFunc();
}

function checkInput(time, upper) {
  if(upper === 60 && time.value !== '00') time.value = time.value.replace(/^0{2*}/, '0');
  if(upper === 60 && time.value === '0') time.value = time.value.replace(/^0*/, '00');
  if(upper === 24 && time.value !== '0') time.value = time.value.replace(/^0*/, '');
  const passClass = "";
  const cautionClass = "0 0 2px red";
  time.value.match(/^[0-9]{1,2}$/) && (time.value < upper) ? addClass(time, passClass, 'true') : addClass(time, cautionClass, 'false');
  return;
}

function addClass(time, classState, result) {
  time.style.boxShadow = classState;
  time.name = result;
}

function checkSubmit() {
  const times = hour.concat(min);
  const checkedSubmit = times.find( time => time.name !== 'true' );
  if(!checkedSubmit) {
    const startTime = [hour[0].value, min[0].value];
    const stopTime = [hour[1].value, min[1].value];
    createNewTimer(startTime, stopTime);
  };
  return;
}

function createSetDom(item) {  
  const position = document.getElementById("main__target");
  const newElement = document.createElement("div");
  const bcgClass = addBcgClass(item);
  newElement.classList.add('main__set-wrap', bcgClass);
  const domData = `
    <div class="main__set-radius">
      <span class="main__set-number">${item[2].index}</span>
    </div>
    <div class="main__set-timer-wrap">
      <div class="main__set-timer"><p id="startHour" class="main__set-value set-hour">${item[0][0]}</p><span>:</span><p id="startMin" class="main__set-value set-min">${item[0][1]}</p></div>
      <span class="main__set-nyoro">~</span>
      <div class="main__set-timer"><p id="finishHour" class="main__set-value set-hour">${item[1][0]}</p><span>:</span><p id="finishMin" class="main__set-value set-min">${item[1][1]}</p></div>
    </div>
    <div class="main__set-remove">
      <span class="main__set-remove-x"></span>
    </div>
  `;
  newElement.innerHTML = domData;
  position.appendChild(newElement);
}

const addBcgClass = (getTime) => {
  const today = new Date();
  const nowHour = today.getHours(),
        nowMin = today.getMinutes();
  const startHour = Number(getTime[0][0]),
        finishHour = Number(getTime[1][0]),
        startMin = Number(getTime[0][1]),
        finishMin = Number(getTime[1][1]);

  const termHour = finishHour - startHour;

  if(termHour < 0) {
    // 日を跨ぐ時間の処理
    if(nowHour > startHour || nowHour < finishHour) return 'blue-bcg';
  }

  if(termHour > 0) {
    if(nowHour > startHour && nowHour < finishHour) return 'blue-bcg';
  }

  if(termHour === 0){
    if(nowHour === startHour && nowHour === finishHour) {
      const result = nowMin >= startMin && nowMin < finishMin ? 'blue-bcg' : 'gray-bcg';
      return result;
    }
  }

  if(nowHour === startHour) return StartMin(startMin);
  if(nowHour === finishHour) return FinishMin(finishMin);

  function FinishMin(finishMin) {
    console.log(nowMin, finishMin);
    const result = nowMin < finishMin ? 'blue-bcg' : 'gray-bcg';
    return result;
  }

  function StartMin(startMin) {
    const result = nowMin >= startMin ? 'blue-bcg' : 'gray-bcg';
    return result;
  }
}

function addDeleteFunc() {
  const target = document.querySelectorAll("#main__target > div");
  target.forEach(function(item){
    const removeBtn = item.querySelector("div.main__set-remove > span");
    removeBtn.addEventListener('click', function() {
      storageRemove(item);
    });
  })
}
