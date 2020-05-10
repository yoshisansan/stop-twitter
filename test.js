// twitter煩悩にまみれがちな現代人へ捧げるSTOPtwitter。仕事でネット検索しているはずが気がついたらTwitterを眺めてしまっていることってよくありませんか？それはtwiitter煩悩のせいです。煩悩まみれの貴方はSTOPtwitterを使って見れないようにしてください。

const locate = location.href;
const target = 'twitter.com';
const dammy = 'twitter.th';
const regex = new RegExp(target, 'gi');
const isTwitter = target.match(regex);

if(isTwitter) {
  const body = document.querySelector("body");
  body.style.filter = 'blur(6px)';
  setTimeout(() => { alert('この時間帯は禁止されています'); }, 1);
  // alertBoard(body);
  // alert('この時間帯はTweet禁止にしています');
}
function alertBoard(body) {
  const html = `
  <div class="test">
    <p>Twitterを禁止にしています</p>
  </div>
  `
  // body.innerHTML = html;
  const div = document.createElement('div');
  div.innerHTML = html;
  // html.classList.add('hoge');
  // html.textContent = 'これはテストです';
  body.parentNode.insertBefore(div, body);
  const hoge = document.querySelector('hoge');
  // hoge.style.background = '#e8e8e8';
}

const css = `
  hoge {
    width: 30%;
    line-height: 6rem;
    margin: 0 auto;
    height: 10rem;
    text-align: center;
    align-items: center;
    background: #e0e0e0;
}
`

// if(isTwitter) twiAlert(isTwitter);
// async function twiAlert(isTwitter) {
//   const body = await document.querySelector("body");
//   body.style.filter = await 'blur(6px)';
//   alert('この時間帯はTweet禁止にしています');
// }

if(isTwitter) {
  const body = document.querySelector("body");
  body.style.filter = 'blur(6px)';
  alert('この時間帯はTweet禁止にしています');
}


// Tweet禁止日数は自動で記録される