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






// コマンドラインの第1引数に錬金する装備数を入力する
const imgPath = "correct-img/renkin";
const itemCountMax = process.argv[2];
const itemCount = 1;

async function main () {
    // 起動待ち
    await sleep(1000);

    // 左キーを長押ししてログを飛ばす
    // await keyboard.pressKey(Key.Left);  

    // つかう が出てきたらEnterを押す
    await nextStepOnCallback(() => isImageEqual(new Region(1125, 790, 80, 27), `${imgPath}/tukau.png`));
    await keyboard.type(Key.Enter);

    // 錬金をする が出てきたらEnterを押す
    await nextStepOnCallback(() => isImageEqual(new Region(1080, 790, 120, 27), `${imgPath}/renkinwosuru.png`));
    await keyboard.type(Key.Enter);

    // 錬金ランプ が出てきたらEnterを押す
    await nextStepOnCallback(() => isImageEqual(new Region(990, 264, 130, 30), `${imgPath}/renkinranpu.png`));
    await keyboard.type(Key.Enter);

    // 新品のランプだったらダイアログが出てくるのでそれで新品かどうか判別する
    // 新しい錬金ランプのダイアログが出るまで待つ
    await sleep(1000);
    const newLampFlag = true;
    if (newLampFlag) {
        console.log("ランプが新品だと判定された");
        await keyboard.type(Key.Up);
        await keyboard.type(Key.Enter);
    } else {
        console.log("ランプが中古品だと判定された");
    }

    // どれを？ が出てきたら判定ロジックを走らせる
    // 錬金効果の一番下が (錬金効果を付けよう) なら Enter そうでなければ Down 一番下まできたら Right
    // 
    await nextStepOnCallback(() => {});
    if(isImageEqual()) {
        await keyboard.type(Key.Down);
        itemCount++;
        console.log("錬金が最大数付いているという判定が下された");
        if (itemCount % 10 == 0) {
            // TODO: 4/4のような画像を複数枚用意して最後までいったか判定する
            // 最後までいってたらそこで関数の実行を止める 

            await keyboard.type(Key.Right);
            // TODO:bot検知のために遅延を改良する
            await sleep(100);
            await keyboard.type(Key.Down);

        }
    } else {
        console.log("錬金が最大数ついていないという判定が下された");
    }

    // TODO:後でsleep入れて検知誤魔化す
    await keyboard.type(Key.Enter);


    // どれをつける？ が出てきたらEnterを押す
    await nextStepOnCallback(() => {});
    await keyboard.type(Key.Enter);

    // ふつうに付ける が出てきたらEnterを押す
    await nextStepOnCallback(() => {});
    await keyboard.type(Key.Enter);

    // どうする？ が出てきたら効果のダイアログが発生しているか判定する
    await nextStepOnCallback();
    if (isImageEqual()) {
        console.log("効果のダイアログが発生した");
        // ダイアログが発生したタイミングで Left を長押しする
        await keyboard.pressKey(Key.Left);
        // ダイアログの端が無くなったことを確認して Left 長押しを外す
        nextStepOnCallback();
        await keyboard.releaseKey(Key.Left);
    } else {
        console.log("効果のダイアログが発生しなかった");
    }

    // スタートにカーソルをあわせる
    await keyboard.type(Key.Down)
    // TODO:後でbot検知されないように修正する
    await sleep(100);
    // スタートをクリックする
    await keyboard.type(Key.Enter);

    // はい が出てきたら Enter を押す
    await nextStepOnCallback();
    await keyboard.type(Key.Enter);

    // 終了ダイアログを検知して左キーを長押しする
    await nextStepOnCallback();
    await keyboard.pressKey(Key.Left);
    
    // 錬金をする が出てきたら左キーを離す.Enterを押す
    await nextStepOnCallback();
    await keyboard.releaseKey(Key.Left);
    await keyboard.type(Key.Enter);
};


main();