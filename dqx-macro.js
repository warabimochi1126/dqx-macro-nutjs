const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage } = require("@nut-tree/nut-js");
const { ocr } = require("./ocr");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  await sleep(3000);

  // ランプ錬金設備を使用している状態でスタートする
  //  "つかう"選択
  await keyboard.type(Key.Enter);

  //  "錬金する"選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // ランプ選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // 装備選択
  // ３回に１回下キーを入れる必要がある
  let count = 1;
  if(count % 4 == 0) {
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Down);
    count = 1;
  }
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);
  count++;

  // 錬金選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // "ふつうに付ける"選択
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  // "スタート"選択
  //  分岐がある時
  //  画像取得 -> tesseract -> 文字列取得 -> 末尾"?"で判定する
  //  Enter 3回 -> Up 1回 -> Enter 1回
  //  分岐がない時
  //  画像取得 -> tesseract -> 文字列取得 -> 末尾"?"で判定する
  //  Up 1回 -> Enter 1回
  await sleep(2000 + getRandomInt(500, 1500));
  await screen.captureRegion("dialog", new Region(630, 875, 660, 120));
  const ocrText = await ocr("dialog.png");
  console.log(`ocrText: ${ocrText}`);
  if(ocrText.slice(-2) == "!") {
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  }

  await sleep(500 + getRandomInt(500, 1000));
  await keyboard.type(Key.Up);
  await sleep(500 + getRandomInt(500, 1000));
  await keyboard.type(Key.Enter);

  // スタート確定
  await sleep(500 + getRandomInt(300, 700));
  await keyboard.type(Key.Enter);

  // 抽選フェーズ終了
  //  パル引いた場合
  //  画像取得 -> tesseract -> 文字列取得 -> 頭3文字に"パルプ"で判定する
  //  Enter 3回
  //  パル引かなかった場合
  //  Enter 2回
  await sleep(25000, getRandomInt(5000, 10000));
  await screen.captureRegion("dialog", new Region(630, 875, 660, 120));
  const ocrText2 = await ocr("dialog.png");
  console.log(`ocrText2: ${ocrText2}`);

  if (ocrText2.slice(0, 3) == "パルプ") {
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  }

  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);
  await sleep(2000 + getRandomInt(500, 1500));
  await keyboard.type(Key.Enter);

  //  錬金数の上限に達した場合
  //  画像取得 -> tesseract -> 文字列取得 -> 後ろ3文字の"しだ!"で判定する
  //  Enter 1回
  //  達さなかった場合
  //  何もしない
  await sleep(2000 + getRandomInt(500, 1500));
  await screen.captureRegion("dialog", new Region(630, 875, 660, 120));
  const ocrText3 = await ocr("dialog.png");
  console.log(`ocrText3: ${ocrText3}`);
  if (ocrText3.slice(-3) == "しだ!") {
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  }
  
  // 分岐終了
  await keyboard.type(Key.Enter);
})();


module.exports = { sleep }