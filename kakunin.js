const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage, Point } = require("@nut-tree/nut-js");
const sharp = require("sharp");
const Pixelmatch = require("pixelmatch");
const PNG = require('pngjs').PNG;
const fs = require("fs");



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function isImageEqual(imgRegion, imgUrl) {
    // 渡されたregionの範囲で画像のBufferを取得する
    const RegionImage = await screen.grabRegion(imgRegion);

    // 取得したregionの範囲をsharpオブジェクトにする
    const imgRegionSharp = sharp(RegionImage.data, {
        raw: {
            width: RegionImage.width,
            height: RegionImage.height,
            channels: RegionImage.channels
        }
    });

    // 画像を2値化する
    imgRegionSharp.threshold(150);

    // 2値化した画像のBufferを変数に詰める
    const blackWhiteImageBuffer = await imgRegionSharp.toBuffer();
    
    // 引数から画像のBufferを取得する
    const correctImageBuffer = PNG.sync.read(fs.readFileSync(imgUrl)).data;

    console.log(correctImageBuffer);

    const width = RegionImage.width;
    const height = RegionImage.height;
    const diff = new PNG({width, height});
    // 差分を比較する
    const diffValue = Pixelmatch(blackWhiteImageBuffer, correctImageBuffer, diff.data, RegionImage.width, RegionImage.height);
    fs.writeFileSync('diff.png', PNG.sync.write(diff));


    // const bufferSharp = sharp(buffer, {
    //     raw: {
    //         width: RegionImage.width,
    //         height: RegionImage.height,
    //         channels: RegionImage.channels
    //     }
    // });
    // bufferSharp.toFile("buffersharp.png");

    console.log("----------------------------------------------");
    console.log(`diffValue:${diffValue}`);
    console.log("----------------------------------------------");
    
    // 差分の閾値によってreturnを返す
    if (diffValue <= 20) {
        return true;
    } else {
        return false;
    }
}


const imgPath = "correct-img/renkin";

(async () => {
  await sleep(1000);
  
//   const temp = await screen.grabRegion(new Region(1171, 814, 60, 32));
//   const temp2 = sharp(temp.data, {
//     raw: {
//         width: temp.width,
//         height: temp.height,
//         channels: temp.channels
//     }
//   });

//   console.log(temp.data);
//   temp2.threshold(150);

//   const windowInputBuffer = await temp2.toBuffer();
//   const fileInputBuffer = PNG.sync.read(fs.readFileSync("correct-img/renkin/hai.png")).data;
  
//   console.log(windowInputBuffer);
//   console.log(fileInputBuffer);


//   const matchScore = Pixelmatch(windowInputBuffer, fileInputBuffer, null, temp.width, temp.height);
//   console.log(`matchScore:${matchScore}`);

    console.log(await isImageEqual(new Region(600, 253, 125, 30), `${imgPath}/dousuru.png`));
})();