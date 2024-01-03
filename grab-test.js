const { screen, Region } = require("@nut-tree/nut-js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    sleep(1000);
    console.log(((await screen.grabRegion(new Region(1038, 940, 1, 1))).data));
    console.log(((await screen.grabRegion(new Region(1038, 940, 1, 1))).data.toString("hex")));
    await screen.captureRegion("rarara", new Region(1038, 940, 1, 1));
  })();

  // efeeeaff　を抽選開始時の分岐に使います
//   console.log(((await screen.grabRegion(new Region(660, 900, 1, 1))).data));
//   console.log(((await screen.grabRegion(new Region(660, 900, 1, 1))).data.toString("hex")));

  // 抽選からパル引いた時の判定は"!"の部分で判定します
  //  a8aaaaff をパル判定に使います
//   console.log(((await screen.grabRegion(new Region(1118, 940, 1, 1))).data));
//   console.log(((await screen.grabRegion(new Region(1118, 940, 1, 1))).data.toString("hex")));

//  錬金数上限達成の判定に使う
// console.log(((await screen.grabRegion(new Region(1038, 940, 1, 1))).data));
// console.log(((await screen.grabRegion(new Region(1038, 940, 1, 1))).data.toString("hex")));
//  e8e8e7ff を上限達成判定に使います