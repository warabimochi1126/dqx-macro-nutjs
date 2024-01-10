const { keyboard, Key, screen, Point, sleep, Region } = require("@nut-tree/nut-js");
const sharp = require("sharp");
const PNG = require('pngjs').PNG;
const Pixelmatch = require("pixelmatch");
const fs = require("fs");


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
    imgRegionSharp.threshold(150);

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
        await sleep(10);
        const nextFlag = await callback();
        if (nextFlag) {
            console.log("callbackの実行結果がtrueになった。");
            break;
        } else {
            console.log("callbackの実行結果がfalseになった。");
        }
    }
}






const imgPath = "correct-img/renkin";

async function main () {
    // 起動待ち
    await sleep(1000);

    // 左キーを長押ししてログを飛ばす
    await keyboard.pressKey(Key.Left);

    // つかう が出てきたらEnterを押す
    await nextStepOnCallback(() => isImageEqual(new Region(1125, 790, 80, 27), `${imgPath}/tukau.png`));
    await keyboard.type(Key.Enter);

};


main();