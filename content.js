'use strict';

chrome.storage.local.get(null, function(data){
  console.log(data);
  const getSort = Object.keys(data).sort(( a, b ) => data[a][0] > data[b][0] ? 1 : -1);
  for( let i = 0; getSort.length > i;i++ ) {
    let getTime = data[getSort[i]];
    const result = timeFind(getTime);

    if(result !== false) {
      const regulatedTime = `${getTime[0][0]}:${getTime[0][1]} ~ ${getTime[1][0]}:${getTime[1][1]} 迄は STOP Twitter 中です。`;
      chrome.runtime.sendMessage(
        { resultData: { stopTime : regulatedTime } }
      );
    }
  }
});

const timeFind = (getTime) => {
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
    if(nowHour > startHour || nowHour < finishHour) return true;
  }

  if(termHour > 0) {
    if(nowHour > startHour && nowHour < finishHour) return true;
  }

  if(termHour === 0){
    if(nowHour === startHour && nowHour === finishHour) {
      const result = nowMin >= startMin && nowMin < finishMin ? true : false;
      return result;
    }
  }

  if(nowHour === startHour) return StartMin(startMin);
  if(nowHour === finishHour) return FinishMin(finishMin);

  function FinishMin(finishMin) {
    const result = nowMin < finishMin ? true : false ;
    return result;
  }

  function StartMin(startMin) {
    const result = nowMin >= startMin ? true : false ;
    return result;
  }
  return false;
}
  // const today = new Date();
  // const nowHour = today.getHours();
  // const nowMin = today.getMinutes();

    // if(nowHour >= Number(getTime[0][0]) && nowHour <= Number(getTime[1][0])) {
    //   result = nowHour !== Number(getTime[1][0]) ? true : nowMin <= Number(getTime[1][1]);
    // } else if(nowHour >= Number(getTime[0][0]) && (Number(getTime[0][0]) - Number(getTime[1][0])) > 0){
    //   result = nowHour !== Number(getTime[1][0]) ? true : nowMin <= Number(getTime[1][1]);
    // }