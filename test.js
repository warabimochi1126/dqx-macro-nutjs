const { keyboard, Key, screen, Region, mouse, straightTo, centerOf, imageResource, loadImage, Point } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(1000);
  
  // await mouse.move(new Point(1116, 719));
  console.log(await screen.colorAt(new Point(1116, 719)));

  // await screen.captureRegion("rarara", new Region(854, 954, 500, 100));
  // console.log(await screen.colorAt(new Point(855, 954)));
  // console.log(await screen.colorAt(new Point(1037, 930)));
})();