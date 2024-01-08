const { keyboard, Key, screen, Region, mouse, Point, sleep } = require("@nut-tree/nut-js");
const sharp = require("sharp");
const { createWorker } = require("tesseract.js");

(async () => {
    await sleep(1000);
    // await mouse.move(new Point(1120, 790));
    await screen.captureRegion("temp", new Region(1125, 790, 80, 27));

    // const image = sharp("temp.png");
    // console.log(image);
    // image.threshold(100);
    // await image.toFile("temp2.png");


    const tukauImage = await screen.grabRegion(new Region(1125, 790, 80, 27));
    console.log("-------------------------------------");
    console.log(tukauImage);
    console.log("-------------------------------------");
    const tukauImageSharp = sharp(tukauImage.data, {
        raw: {
            width: tukauImage.width,
            height: tukauImage.height,
            channels: tukauImage.channels
        }
    });
    tukauImageSharp.threshold(100);
    tukauImageSharp.toFile("rarara.png");

    const worker = await createWorker("jpn");
    const { data: { text } } = await worker.recognize("rarara.png");
    console.log(text);
    await worker.terminate();
})();