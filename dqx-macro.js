const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  let count = 1;
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
  for (let i = 0; i < 2; i++) {
    if(count % 4 == 0) {
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Down);
      count = 1;
    }
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
    count++;
    console.log(`count:${count}`);
  
    // 錬金選択
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  
    // "ふつうに付ける"選択
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  
    // "スタート"選択
    //  分岐がある時
    //  Enter 3回 -> Up 1回 -> Enter 1回
    //  分岐がない時
    //  Up 1回 -> Enter 1回
  
    await sleep(2000 + getRandomInt(500, 1500));
    const startColor = await screen.grabRegion(new Region(660, 900, 1, 1));
    const startColorString = startColor.data.toString("hex");
    console.log(`startColorString:${startColorString}`);
    if(startColorString.charAt(0) == "e" || startColorString.charAt(0) == "f") {
      console.log("分岐入った");
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Enter);
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Enter);
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Enter);
    }
  
    console.log("分岐終わった");
    await sleep(500 + getRandomInt(500, 1000));
    await keyboard.type(Key.Up);
    await sleep(500 + getRandomInt(500, 1000));
    await keyboard.type(Key.Enter);
  
    // スタート確定
    await sleep(500 + getRandomInt(300, 700));
    await keyboard.type(Key.Enter);
  
    // 抽選フェーズ終了
    //  パル引いた場合
    //  Enter 3回
    //  パル引かなかった場合
    //  Enter 2回
    await sleep(25000, getRandomInt(5000, 10000));
    const finishColor = await screen.grabRegion(new Region(1118, 940, 1, 1));
    const finishColorString = finishColor.data.toString("hex");
    console.log(`finishColorString:${finishColorString}`);
    if (finishColorString.charAt(0) == "a") {
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Enter);
    }
  
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
    await sleep(2000 + getRandomInt(500, 1500));
    await keyboard.type(Key.Enter);
  
    //  錬金数の上限に達した場合
    //  Enter 1回
    //  達さなかった場合
    //  何もしない
    await sleep(2000 + getRandomInt(500, 1500));
    const maxAlchemyReach = await screen.grabRegion(new Region(1038, 940, 1, 1));
    const maxAlchemyReachString = maxAlchemyReach.data.toString("hex");
    console.log(`maxAlechemyReachString:${maxAlchemyReachString}`);
    if (maxAlchemyReachString.charAt(0) == "e") {
      await sleep(2000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Enter);
    }
    
    // 分岐終了
    await keyboard.type(Key.Enter);  
  }
})();


module.exports = { sleep }