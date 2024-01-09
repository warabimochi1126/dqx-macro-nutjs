const { keyboard, Key, screen, Region, mouse, Point, sleep, pixelWithColor } = require("@nut-tree/nut-js");
const Pixelmatch = require("pixelmatch");
const sharp = require("sharp");
const PNG = require('pngjs').PNG;
const fs = require("fs");
const { KeyObject } = require("crypto");


// 画面上の取得した範囲を二値化した画像と想定される画像を比較する関数
/**
 * 
 * @param {Region} imgRegion - DQX内の比較するregion
 * @param {string} imgUrl - 正解が詰まっている画像ファイルまでのパス
 * @returns {boolean} - 比較した結果を格納した真偽値
 */
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
    imgRegionSharp.threshold(100);

    // 2値化した画像のBufferを変数に詰める
    const blackWhiteImageBuffer = await imgRegionSharp.toBuffer();
    
    // 引数から画像のBufferを取得する
    const correctImageBuffer = PNG.sync.read(fs.readFileSync(imgUrl)).data;

    // 差分を比較する
    const diffValue = Pixelmatch(blackWhiteImageBuffer, correctImageBuffer, null, RegionImage.width, RegionImage.height);

    // 差分の閾値によってreturnを返す
    if (diffValue <= 10) {
        return true;
    } else {
        return false;
    }
}

// 定期実行して検知されたら次の処理に飛ばす関数
async function nextStepOnCallback(callback) {
    while (true) {
        await sleep(1000);
        const nextFlag = await callback();
        if (nextFlag) {
            console.log("callbackの実行結果がtrueになった。");
            break;
        } else {
            console.log("callbackの実行結果がfalseになった。");
        }
    }
}


(async () => {
    const imgPath = "correct-img/kawanotebukuro";
    await sleep(1000);

    await nextStepOnCallback(() => isImageEqual(new Region(1125, 790, 80, 27), `${imgPath}/tukau.png`));
    await keyboard.type(Key.Enter);

    await nextStepOnCallback(() => isImageEqual(new Region(1080, 760, 145, 27), `${imgPath}/bouguwotukuru.png`));
    await keyboard.type(Key.Enter);

    await nextStepOnCallback(() => isImageEqual(new Region(990, 264, 130, 30), `${imgPath}/saihoubari.png`));
    await keyboard.type(Key.Enter);
})();