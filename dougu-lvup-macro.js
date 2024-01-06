const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage, Point } = require("@nut-tree/nut-js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    await sleep(1000);
    
    // 家具をつくるにカーソルを合わせる
    await keyboard.type(Key.Down);
    console.log("家具をつくるにカーソルを合わせた");
    // 家具をつくるをクリックする
    // このsleepは反応させるためにある
    await sleep(30 + getRandomInt(0, 50)); 
    await keyboard.type(Key.Enter);
    console.log("家具をつくるを選択した");
    // ハンマーを選択する
    // 選択欄が画面遷移するのでsleepを合わせて選択出来るまで待つ
    await sleep(830 + getRandomInt(0, 50));
    await keyboard.type(Key.Enter);
    console.log("ハンマーを選択した");
    // おもちゃの池にカーソルを合わせる
    // 選択欄が画面遷移するのでsleepを合わせて選択出来るまで待つ
    await sleep(850 + getRandomInt(0, 50));
    // カーソルで選択欄からおもちゃの池を選択する
    await keyboard.pressKey(Key.Up);
    await sleep(150 + getRandomInt(0, 30));
    await keyboard.releaseKey(Key.Up);
    console.log("おもちゃの池にカーソルを合わせた");
    // おもちゃの池を選択する
    await sleep(30 + getRandomInt(0, 50));
    await keyboard.type(Key.Enter);
    // いっぱつしあげにカーソルを合わせる
    await sleep(800 + getRandomInt(0, 50));
    await keyboard.type(Key.Down);
    console.log("いっぱつしあげにカーソルを合わせた");
    await sleep(300 + getRandomInt(0, 50));
    await keyboard.type(Key.Enter);
    console.log("いっぱつしあげを選択した");
    // いっぱつしあげを行う
    await sleep(1500 + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
    console.log("いっぱつしあげを行った");

    // 終了時ダイアログの発生を検知する
    while (true) {
        await sleep(1000);
        const finishDialogFlag = await screen.colorAt(new Point(1095, 869));
        const finishDialogFlagR = finishDialogFlag.R;
        const finishDialogFlagG = finishDialogFlag.G;
        const finishDialogFlagB = finishDialogFlag.B;

        if (finishDialogFlagR >= 180 && finishDialogFlagG >= 180 && finishDialogFlagB >= 180) {
            console.log(`抽選終了時のダイアログが発生したと判定された:${finishDialogFlag}`);
            break;
        }
    }
    // 終了したら左キーをプレスしてログを流す
    await keyboard.pressKey(Key.Left);
    
    // 最後までログが流れ切ったことを検知したら左キープレスを外す
    while (true) {
        await sleep(1000);
        const logFInishFlag = await screen.colorAt(new Point(1116, 719));
        const logFinishFlagR = logFInishFlag.R;
        const logFinishFlagG = logFInishFlag.G;
        const logFinishFlagB = logFInishFlag.B;

        if (logFinishFlagR >= 200 && logFinishFlagG >= 200 && logFinishFlagB >= 200) {
            console.log(`ログが流れ切ったと判定された:${logFInishFlag}`);
            await keyboard.releaseKey(Key.Left);
            break;
        }
    }

    // ここからエンターを押すだけのループに入る
    for (let i = 0; i < process.argv[2]; i++) {
        // 家具をつくるを選択する
        await keyboard.type(Key.Enter);
        console.log("家具をつくるを選択した");
        // ハンマーを選択
        // おもちゃの池を選択する
        await sleep(2000 + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        console.log("おもちゃの池を選択した");
        // いっぱつしあげを選択する
        await sleep(1200) + getRandomInt(0, 100);
        await keyboard.type(Key.Enter);
        console.log("いっぱつしあげを選択した");
        // いっぱつしあげを行う
        await sleep(2000) + getRandomInt(0, 100);
        await keyboard.type(Key.Enter);
        console.log("いっぱつしあげを行った");

        // 終了時ダイアログの発生を検知する
        while (true) {
            await sleep(1000);
            const finishDialogFlag = await screen.colorAt(new Point(1095, 869));
            const finishDialogFlagR = finishDialogFlag.R;
            const finishDialogFlagG = finishDialogFlag.G;
            const finishDialogFlagB = finishDialogFlag.B;

            if (finishDialogFlagR >= 180 && finishDialogFlagG >= 180 && finishDialogFlagB >= 180) {
                console.log(`抽選終了時のダイアログが発生したと判定された:${finishDialogFlag}`);
                break;
            }
        }

        // 終了したら左キーをプレスしてログを流す
        await keyboard.pressKey(Key.Left);
    
        // 最後までログが流れ切ったことを検知したら左キープレスを外す
        while (true) {
            await sleep(1000);
            const logFInishFlag = await screen.colorAt(new Point(1116, 719));
            const logFinishFlagR = logFInishFlag.R;
            const logFinishFlagG = logFInishFlag.G;
            const logFinishFlagB = logFInishFlag.B;

            if (logFinishFlagR >= 200 && logFinishFlagG >= 200 && logFinishFlagB >= 200) {
                console.log(`ログが流れ切ったと判定された:${logFInishFlag}`);
                await keyboard.releaseKey(Key.Left);
                break;
            }
        }
    }
})();