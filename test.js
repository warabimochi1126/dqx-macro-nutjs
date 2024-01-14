const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage, Point } = require("@nut-tree/nut-js");
const sharp = require("sharp");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(1000);
  
  await mouse.move(new Point(1170, 810));

  await screen.captureRegion("rarara", new Region(615, 293, 80, 30));

  const temp = sharp("rarara.png");

  temp.threshold(150);

  temp.toFile("rararaoutput.png");

  console.log(await screen.colorAt(new Point(1000, 870)));  

})();