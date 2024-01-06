const { keyboard, Key, screen, Point } = require("@nut-tree/nut-js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const typeDelay = 1000;
let itemDownSelectFlag = false;
let lampBreakFlag = true;
let roopCount = 1;
(async () => {
    // ループ回数を表示する
    console.log(`${roopCount}回目のループです。`);
    await sleep(1000);
    
    // 左キーを長押ししてログを飛ばす
    await keyboard.pressKey(Key.Left);

    // つかうを選択する
    await sleep(typeDelay + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
    console.log("つかうを選択した");

    // 錬金するを選択する
    await sleep(typeDelay + getRandomInt(0, 100));
    await keyboard.type(Key.Enter);
    console.log("錬金するを選択した");

    // 左キーを切ってループに合わせる
    await keyboard.releaseKey(Key.Left);


    // ランプを選択する
    while (true) {
        // ループに合わせる
        await keyboard.pressKey(Key.Left);

        // ループ回数をカウントする
        if (roopCount !== 1) {
            console.log(`${roopCount}回目のループです。`);
        } 

        // ランプが破損した時に処理側を合わせる
        if (lampBreakFlag) {
            lampBreakFlag = false;
            await sleep(typeDelay + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
            console.log("ランプを選択した");

            // TODO:ランプが新品だった時の分岐
            // ３行目の"か"の部分が白色ならtrueを取得する
            await sleep(1000 + getRandomInt(0, 100));
            const newLampFlag = await screen.colorAt(new Point(1095, 960));
            const newLampFlagR = newLampFlag.R;
            const newLampFLagG = newLampFlag.G;
            const newLampFlagB = newLampFlag.B;
            if (newLampFlagR >= 200 && newLampFLagG >= 200 && newLampFlagB >= 200) {
                console.log(`ランプが新品と判定された:${newLampFlag}`);
                await sleep(500);
                await keyboard.type(Key.Up);
                await sleep(500);
                await keyboard.type(Key.Enter);
            } else {
                console.log(`ランプが使用済みと判定された:${newLampFlag}`);
            }
        }

        // 錬金する装備を選択する
        await sleep(typeDelay + getRandomInt(0, 100));
        // 選んだ装備が３回錬金されていたら一つ下の装備を錬金する
        if (itemDownSelectFlag) {
            await keyboard.type(Key.Down);
            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
            itemDownSelectFlag = false;
        } else {
            await keyboard.type(Key.Enter);
        }
        console.log("錬金する装備を選択した");

        // 錬金する効果を選択する
        await sleep(typeDelay + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        console.log("錬金する効果を選択した");

        // ふつうに付けるを選択する
        await sleep(typeDelay + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        console.log("ふつうにつけるを選択する");

        // 右キーを外す
        await keyboard.releaseKey(Key.Left);


        // TODO:パル・大成功・失敗防止だった時の分岐
        // ダイアログの上の部分の色を取得して白色なら左キーを走らせる
        await sleep(500);
        const plusDialogFlag = await screen.colorAt(new Point(1095, 869));
        const plusDialogFlagR = plusDialogFlag.R;
        const plusDialogFlagG = plusDialogFlag.G;
        const plusDialogFlagB = plusDialogFlag.B;

        if (plusDialogFlagR >= 180 && plusDialogFlagG >= 180 && plusDialogFlagB >= 180) {
            console.log(`効果のダイアログが発生したと判定された:${plusDialogFlag}`);
            await keyboard.pressKey(Key.Left);
            await sleep(1300 + getRandomInt(0, 100));
            await keyboard.releaseKey(Key.Left);
        } else {
            console.log(`効果のダイアログは発生しなかったと判定された:${plusDialogFlag}`);
        }
        

        // スタートを押す
        await sleep(1300 + getRandomInt(0, 100));
        await keyboard.type(Key.Up);
        await sleep(500 + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        // スタート確定
        await sleep(500);
        await keyboard.type(Key.Enter);

        // 抽選終了
        // ダイアログの上部分を取得して白色なら処理を次に飛ばす
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

        // TODO:通常終了かパルか判定する
        // パルプンデの"!"の部分が白色かどうかで判定する
        await sleep(1500, getRandomInt(0, 100));
        const parupundeFlag = await screen.colorAt(new Point(1117, 930));
        const parupundeFlagR = parupundeFlag.R;
        const parupundeFlagG = parupundeFlag.G;
        const parupundeFlagB = parupundeFlag.B;

        // ランプの白色と髪の毛ので発火しないように判別を付け加える
        if (parupundeFlagR >= 180 && parupundeFlagR <= 220 && parupundeFlagG >= 180 && parupundeFlagG <= 220 && parupundeFlagB >= 180 && parupundeFlagB <= 220) {
            console.log(`パルプンデが発生したと判定された:${parupundeFlag}`);

            await keyboard.type(Key.Enter);
            
            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Escape);

            // TODO:埋め尽くしかそれ以外か判定する
            await sleep(500);
            const umetukusiFlag = await screen.colorAt(new Point(1196, 930));
            const umetukusiFlagR = umetukusiFlag.R;
            const umetukusiFlagG = umetukusiFlag.G;
            const umetukusiFlagB = umetukusiFlag.B;

            if (umetukusiFlagR >= 170 && umetukusiFlagG >= 170 && umetukusiFlagB >= 170) {
                console.log(`パルプンデ埋め尽くしが発生したと判定された:${umetukusiFlag}`);

                await keyboard.type(Key.Enter);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Escape);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Enter);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Escape);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Enter);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Escape);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Enter);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Escape);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Enter);
            } else {
                console.log(`パルプンデ埋め尽くしが発生しなかったと判定された:${umetukusiFlag}`);
                
                await keyboard.type(Key.Enter);

                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Escape);
        
                await sleep(500 + getRandomInt(0, 100));
                await keyboard.type(Key.Enter);
            }
        } else {
            console.log(`パルプンデが発生しなかったと判定された:${parupundeFlag}`);
            await keyboard.type(Key.Enter);

            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Escape);

            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Enter);
        }

        // TODO:ランプが壊れたことを判定する
        // "た"を使って判定する
        await sleep(1500 + getRandomInt(0, 100));
        const breakLampFlag = await screen.colorAt(new Point(855, 954));
        const breakLampFlagR = breakLampFlag.R;
        const breakLampFlagG = breakLampFlag.G;
        const breakLampFlagB = breakLampFlag.B;

        if (breakLampFlagR >= 200 && breakLampFlagG >= 200 && breakLampFlagB >= 200) {
            console.log(`ランプが壊れたと判定された:${breakLampFlag}`);
            await keyboard.type(Key.Enter);
            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Escape);
            lampBreakFlag = true;
        } else {
            console.log(`ランプが壊れなかったと判定された:${breakLampFlag}`);
        }

        // TODO:錬金上限に達したことを判定する
        // 最後の"!"の部分が白色かどうかで判定する
        await sleep(500);
        const maxAlchemyFlag = await screen.colorAt(new Point(1038, 930));
        const maxAlchemyFlagR = maxAlchemyFlag.R;
        const maxAlchemyFlagG = maxAlchemyFlag.G;
        const maxAlchemyFlagB = maxAlchemyFlag.B;

        if (maxAlchemyFlagR >= 170 && maxAlchemyFlagG >= 170 && maxAlchemyFlagB >= 170) {
            console.log(`錬金上限に達したと判定された:${maxAlchemyFlag}`);
            await keyboard.type(Key.Enter);
            await sleep(500 + getRandomInt(0, 100));
            await keyboard.type(Key.Escape);
            itemDownSelectFlag = true;
        } else {
            console.log(`錬金上限に達さなかったと判定された:${maxAlchemyFlag}`);
        }

        // 錬金をするを選択する
        await sleep(500 + getRandomInt(0, 100));
        await keyboard.type(Key.Enter);
        console.log("錬金をするを選択した");
        // 選択した後に遅延入れとく
        await sleep(1000);

        // ログカット
        console.log("-------------------------------------");
        }
})();



