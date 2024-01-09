const { keyboard, Key, screen, Region, mouse, Point, sleep, pixelWithColor } = require("@nut-tree/nut-js");
const Pixelmatch = require("pixelmatch");
const sharp = require("sharp");
const PNG = require('pngjs').PNG;
const fs = require("fs");


// 画面上の取得した範囲を二値化した画像と想定される画像を比較する関数
async function isImageEqual(imgRegion, imgUrl) {
    // 渡されたregionの範囲で画像のBufferを取得する
    const RegionImage = await screen.grabRegion(imgRegion);

    
    // TODO:取得した画像の縦幅と横幅を取得する
    console.log("----------------------------------------");
    console.log(`RegionImage.width:${RegionImage.width}`);
    console.log("----------------------------------------");
    console.log(`RegionImage.height:${RegionImage.height}`);
    console.log("----------------------------------------");

    // 取得したregionの範囲をsharpオブジェクトにする
    const imgRegionSharp = sharp(RegionImage.data, {
        raw: {
            width: RegionImage.width,
            height: RegionImage.height,
            channels: RegionImage.channels
        }
    });

    // TODO:sharpオブジェクトになった後の画像の縦幅と横幅を取得する
    console.log("-----------------------------------------------------");
    console.log(`imgRegionSharp.width:${imgRegionSharp.width}`);
    console.log("-----------------------------------------------------");
    console.log(`imgRegionSharp.height:${imgRegionSharp.height}`);
    console.log("-----------------------------------------------------");

    // 画像を2値化する
    imgRegionSharp.threshold(100);

    // TODO:2値化した後の画像の縦幅と横幅を取得する
    console.log("--------------------------------------------------------");
    console.log(`imgRegionSharp.width:${imgRegionSharp.width}`);
    console.log("--------------------------------------------------------");
    console.log(`imgRegionSharp.height:${imgRegionSharp.height}`);
    console.log("--------------------------------------------------------");

    // 2値化した画像のBufferを変数に詰める
    const blackWhiteImageBuffer = await imgRegionSharp.toBuffer();
    
    // 引数から画像のBufferを取得する
    const correctImageBuffer = PNG.sync.read(fs.readFileSync(imgUrl)).data;

    // TODO:引っ張って来た画像の縦幅と横幅を取得する
    const temp = PNG.sync.read(fs.readFileSync(imgUrl));
    console.log("----------------------------------------------------");
    console.log(`imgUrl.width:${temp.width}`);
    console.log("----------------------------------------------------");
    console.log(`imgUrl.height:${temp.height}`);
    console.log("----------------------------------------------------");


    // 差分を比較する
    const diffValue = Pixelmatch(blackWhiteImageBuffer, correctImageBuffer, null, imgRegionSharp.width, imgRegionSharp.height);

    // 差分の閾値によってreturnを返す
    if (diffValue <= 10) {
        return true;
    } else {
        return false;
    }
}

(async () => {
    await sleep(1000);
    // const tukauImage = await screen.grabRegion(new Region(1125, 790, 80, 27));

    // const tukauImageSharp = sharp(tukauImage.data, {
    //     raw: {
    //         width: tukauImage.width,
    //         height: tukauImage.height,
    //         channels: tukauImage.channels
    //     }
    // });
    // tukauImageSharp.threshold(100);
    // tukauImageSharp.toFile("rarara.png");


    // const correctImage = sharp("rarara.png");
    // const correctImageBuffer = await correctImage.toBuffer();

    // const correctImageBuffer = PNG.sync.read(fs.readFileSync('rarara.png'));

    // console.log(await tukauImageSharp.toBuffer());
    // console.log(correctImageBuffer.data);

    // const sabun = Pixelmatch(await tukauImageSharp.toBuffer(), correctImageBuffer.data, null, tukauImage.width, tukauImage.height);
    // console.log(sabun);

    console.log(await isImageEqual(new Region(1125, 790, 80, 27), "correct-img/kawanotebukuro/tukau.png"));
})();