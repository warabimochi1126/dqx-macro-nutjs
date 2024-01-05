const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function dialogSkip() {
  await sleep(500 + getRandomInt(0, 100));
  await keyboard.type(Key.Escape);
  await sleep(500 + getRandomInt(0, 100));
  await keyboard.type(Key.Enter);
}
let maxAlechemyChecker = false;
(async () => {
  await sleep(3000);

  // ランプ錬金設備を使用している状態でスタートする
  //  "つかう"選択
  await keyboard.type(Key.Enter);

  //  "錬金をする"選択
  await dialogSkip();

  // ランプ選択
  await dialogSkip();

  // 装備選択
  for (let i = 0; i < process.argv[2]; i++) {
    if (maxAlechemyChecker) {
      await sleep(1000 + getRandomInt(500, 1500));
      await keyboard.type(Key.Down);      
      maxAlechemyChecker = false;
    }

    await dialogSkip();
  
    // 錬金選択
    await dialogSkip();

    // "ふつうに付ける"選択
    await dialogSkip();
  
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
      console.log("startColor:分岐入った");
      await dialogSkip();
      await dialogSkip();
      await dialogSkip();
    }
  
    await sleep(500 + getRandomInt(0, 100));
    await keyboard.type(Key.Up);
    await sleep(500 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
  
    // スタート確定
    await sleep(500 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
  


    // 抽選フェーズ終了
    //  パル引いた場合
    //  Enter 3回
    //  パル引かなかった場合
    //  Enter 2回
    await sleep(26000, getRandomInt(1000, 2000));
    const finishColor = await screen.grabRegion(new Region(1118, 940, 1, 1));
    const finishColorString = finishColor.data.toString("hex");
    console.log(`finishColorString:${finishColorString}`);
    if (finishColorString.charAt(0) == "a") {
      console.log("finishColor:分岐入った");
      await dialogSkip();
    }
    
    await dialogSkip();
    await dialogSkip();
  
    //  錬金数の上限に達した場合
    //  Enter 1回
    //  達さなかった場合
    //  何もしない
    await sleep(2000 + getRandomInt(500, 1500));
    const maxAlchemyReach = await screen.grabRegion(new Region(1038, 940, 1, 1));
    const maxAlchemyReachString = maxAlchemyReach.data.toString("hex");
    console.log(`maxAlechemyReachString:${maxAlchemyReachString}`);
    if (maxAlchemyReachString.charAt(0) == "e") {
      console.log("maxAlchemyReachString:分岐入った");
      maxAlechemyChecker = true;
      await sleep()
    }
    
    // 分岐終了
    await sleep(1000);
    await keyboard.type(Key.Enter);
    console.log("------------------------------------");

  }
})();


module.exports = { sleep }