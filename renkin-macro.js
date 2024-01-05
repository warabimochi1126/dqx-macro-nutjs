const { keyboard, Key, screen, Region } = require("@nut-tree/nut-js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    await sleep(1000);
    

    // つかう を選択
    await keyboard.type(Key.Enter);
    console.log("使うを押した");
    // 錬金をする を選択
    await dialogSkip();
    console.log("錬金をするを押した");
    // ランプを選択する
    await dialogSkip();
    console.log("ランプを選択した");
    
    // TODO:ランプが新品だった時の分岐を行う

    for (let i = 0; i < 3; i++) {
        // 錬金対象を選択する
        await dialogSkip();
        console.log("錬金対象を選択した");
        // 錬金効果を選択する
        await dialogSkip();
        console.log("錬金効果を選択した");
        // ふつうに付けるを選択する
        await dialogSkipMin();
        console.log("ふつうに付けるを選択した");

        // TODO:パル・大成功・失敗防止の分岐を行う


        // スタートを選択する
        // とりあえずsleepいれとくけどあとで消す
        await sleep(1500);

        await keyboard.type(Key.Up);
        await sleep(200 + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        console.log("スタートを選択する");
        // スタートを確定する
        await sleep(500);
        await keyboard.type(Key.Enter);
        console.log("スタートを確定する");

        // 抽選終わった後
        await sleep(25000);
        // TODO:パラ判定を行う

        // 左キー押しっぱなしでログを流す
        await keyboard.pressKey(Key.Left);
        await sleep(1500);
        await keyboard.releaseKey(Key.Left);
        console.log("ログを流す");
        // 装備選択に戻る
        await sleep(1000);
        await keyboard.type(Key.Enter);
    }

})();