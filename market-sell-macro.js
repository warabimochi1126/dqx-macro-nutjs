const { keyboard, Key } = require("@nut-tree/nut-js");

const price = process.argv[2];
const priceDigit = price.length;
const items = process.argv[3];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 第1引数に販売金額.第2引数に販売個数を指定する
// 出品 -> 装備品を選択できる状態で開始する
// とりあえず5桁の値かつ5桁目と4桁目と3桁目以外は0であるという前提で作成する
(async () => {
    await sleep(3000);
    
    for (let i = 0; i < items; i++) {

    // 物品選択
    await keyboard.type(Key.Enter);

    // 価格チェック
    await sleep(1800 + getRandomInt(1, 100));
    await keyboard.type(Key.Down);
    await sleep(1000 + getRandomInt(100, 200));
    await keyboard.type(Key.Enter);

    // 引数で取得した価格を指定して売却する
    for (let i = 0; i < priceDigit; i++) {
        await sleep(500 + getRandomInt(100, 200));
        await keyboard.type(Key.Left);
    }

    console.log(`charAt(4):${price.charAt(4)}`);
    console.log(`charAt(3):${price.charAt(3)}`);
    console.log(`charAt(2):${price.charAt(2)}`);
    console.log(`charAt(1):${price.charAt(1)}`);
    console.log(`charAt(0):${price.charAt(0)}`);
    
    // 余りにも愚直すぎるので後でまとめる
    if (price.charAt(0) === "1") {
        await sleep(300 + getRandomInt(1, 100));
        await keyboard.type(Key.Up);
    } else if (price.charAt(0) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "4") {
        for (let i = 0; i < 0; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(0) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    }

    // 桁をずらす
    await sleep(300 + getRandomInt(1, 100));
    await keyboard.type(Key.Right);

    // 1000の位
    if (price.charAt(1) === "1") {
        await sleep(300 + getRandomInt(1, 100));
        await keyboard.type(Key.Up);
    } else if (price.charAt(1) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "4") {
        for (let i = 0; i < 4; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(1) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    }

    // 桁をずらす
    await sleep(300 + getRandomInt(1, 100));
    await keyboard.type(Key.Right);

    // 100の位
    if (price.charAt(2) === "1") {
        await sleep(300 + getRandomInt(1, 100));
        await keyboard.type(Key.Up);
    } else if (price.charAt(2) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "4") {
        for (let i = 0; i < 4; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(1, 100));
            await keyboard.type(Key.Up);
        }
    }

    // 確定する
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);

    // 装備品を選択できるメニューに帰る
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);

    await sleep(300 + getRandomInt(1, 100));
    }
})();