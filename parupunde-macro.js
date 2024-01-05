const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage } = require("@nut-tree/nut-js");


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
    await sleep(1000);

    await keyboard.type(Key.Enter);
    await sleep(300, getRandomInt(1, 100));
    await keyboard.type(Key.Left);
    await sleep(300, getRandomInt(1, 100));
    await keyboard.type(Key.Enter);

    for (let i = 0; i < (135 - 7) / 7; i++) {
        console.log(i);
        await sleep(300, getRandomInt(1, 100));
        await keyboard.type(Key.Enter);
        await sleep(300, getRandomInt(1, 100));
        await keyboard.type(Key.Enter);
    }
})();


// 一回パルプンデチェンジ使ってから走らせる