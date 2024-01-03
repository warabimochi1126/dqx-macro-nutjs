const { keyboard, Key } = require("@nut-tree/nut-js");

const price = process.argv[2];
const priceDigit = price.length;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 出品 -> 装備品を選択できる状態で開始する
// とりあえず5桁の値かつ5桁目と4桁目と3桁目以外は0であるという前提で作成する
(async () => {
    await sleep(3000);
    
    // 物品選択
    await keyboard.type(Key.Enter);

    // 価格チェック
    await sleep(300 + getRandomInt(100, 200));
    await keyboard.type(Key.Down);
    await sleep(300 + getRandomInt(100, 200));
    await keyboard.type(Key.Enter);

    // 引数で取得した価格を指定して売却する
    for (let i = 0; i < priceDigit; i++) {
        await sleep(300 + getRandomInt(100, 200));
        await keyboard.type(Key.Right);
    }

    // 余りにも愚直すぎるので後でまとめる
    if (price.charAt(4) === "1") {
        await sleep(300 + getRandomInt(100, 200));
        await keyboard.type(Key.Up);
    } else if (price.charAt(4) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "4") {
        for (let i = 0; i < 4; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(4) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    }

    // 桁をずらす
    await sleep(300 + getRandomInt(100, 200));
    await keyboard.type(Key.Right);

    // 1000の位
    if (price.charAt(3) === "1") {
        await sleep(300 + getRandomInt(100, 200));
        await keyboard.type(Key.Up);
    } else if (price.charAt(3) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "4") {
        for (let i = 0; i < 4; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(3) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    }

    // 桁をずらす
    await sleep(300 + getRandomInt(100, 200));
    await keyboard.type(Key.Right);

    // 100の位
    if (price.charAt(2) === "1") {
        await sleep(300 + getRandomInt(100, 200));
        await keyboard.type(Key.Up);
    } else if (price.charAt(2) === "2") {
        for (let i = 0; i < 2; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "3") {
        for (let i = 0; i < 3; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "4") {
        for (let i = 0; i < 4; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "5") {
        for (let i = 0; i < 5; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "6") {
        for (let i = 0; i < 6; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "7") {
        for (let i = 0; i < 7; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "8") {
        for (let i = 0; i < 8; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    } else if (price.charAt(2) === "9") {
        for (let i = 0; i < 9; i++) {
            await sleep(300 + getRandomInt(100, 200));
            await keyboard.type(Key.Up);
        }
    }

    // 確定する
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);

    // 装備品を選択できるメニューに帰る
    await sleep(1000, getRandomInt(300, 600));
    await keyboard.type(Key.Enter);
})();