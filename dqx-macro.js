const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  await sleep(3000);

  // ランプ錬金設備を使用している状態でスタートする
  await keyboard.type(Key.Enter);

  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // ランプ選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // 装備選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // 錬金選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // "ふつうに付ける"選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // "スタート"選択
  // "ひっさつ"表示時の判定が必要でないように上キーでずらす
  //  何もない場合の分岐
  //  tesseract.jsでうまくやる
  
  if(true) {

  }

  await keyboard,type(Key.Up);
  await keyboard.type(Key.Enter);

  // スタート確定
  await keyboard.type(Key.Enter);

  // 抽選フェーズ終了
  // パル引いた場合
  if (true) {

  }
  await keyboard.type(Key.Enter);
  await keyboard.type(Key.Enter);

  // 錬金数の上限に達した場合
  if (true) {

  }
  
  // 分岐終了
  await keyboard.type(Key.Enter);
})();