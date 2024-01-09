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

// 乱数生成用関数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    const imgPath = "correct-img/kawanotebukuro";
    await sleep(1000);

    // つかう で判定
    await nextStepOnCallback(() => isImageEqual(new Region(1125, 790, 80, 27), `${imgPath}/tukau.png`));
    await keyboard.type(Key.Enter);

    // 防具をつくる で判定
    await nextStepOnCallback(() => isImageEqual(new Region(1080, 760, 145, 27), `${imgPath}/bouguwotukuru.png`));
    await keyboard.type(Key.Enter);

    // さいほう針 で判定
    await nextStepOnCallback(() => isImageEqual(new Region(990, 264, 130, 30), `${imgPath}/saihoubari.png`));
    await keyboard.type(Key.Enter);

    // 種類 で判定
    await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 50, 30), `${imgPath}/syurui.png`));
    for(let i = 0; i < 3; i++) {
        await sleep(100 + getRandomInt(0, 100));
        await keyboard.type(Key.Down);
    }
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);

    // なにをつくる？ で判定
    await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 160, 30), `${imgPath}/naniwotukuru.png`));
    await keyboard.type(Key.Enter);

    // ふつうに作る で判定
    await nextStepOnCallback(() => isImageEqual(new Region(1080, 810, 145, 36), `${imgPath}/hutuunitukuru.png`));
    await keyboard.type(Key.Enter);




    // 1週目
    
    // どうする で判定
    await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 110, 30), `${imgPath}/dousuru.png`));
    await keyboard.type(Key.Down);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);

    // とくぎ で判定
    await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 70, 30), `${imgPath}/tokugi.png`));
    await keyboard.type(Key.Right);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Up);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);

    // 改心の判定ロジック
    // どうする で判定
    while (true) {
        await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 110, 30), `${imgPath}/dousuru.png`));
        // 現在のぬいパワーが改心×2だったら
        await sleep(500);
        if (isImageEqual(new Region(1065, 282, 90, 33), `${imgPath}/kaisinkakeruni.png`)) {
            console.log("改心×2だと判定された");
            await keyboard.type(Key.Enter);
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Down);
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
            break;
        } else {
            console.log("改心×2ではないと判定された");
            await keyboard.type(Key.Enter);
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
        }
    }

    // ねらいぬいロジック
    await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 110, 30), `${imgPath}/dousuru.png`));
    await sleep(500);
    await keyboard.type(Key.Enter);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Left);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Up);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
    await sleep(100 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
    // 2週目以降
    for(let i = 0; i < 5; i++) {
        await nextStepOnCallback(() => isImageEqual(new Region(624, 264, 110, 30), `${imgPath}/dousuru.png`));
        await sleep(500);

        await keyboard.type(Key.Enter);
        
        await sleep(100 + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);

        if (i == 0 && i == 1) {
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Right);
    
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
        } else if (i == 2) {
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Down);

            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
        } else {
            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Left);

            await sleep(100 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
        }
    }
})();