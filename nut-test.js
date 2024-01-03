const { screen, Region } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(1000);
  console.log(await screen.grabRegion(new Region(1030, 875, 1, 1)));
  await screen.captureRegion("temp5", new Region(1030, 875, 1, 1));

  await screen.captureRegion("temp6", new Region(700, 900, 1, 1));
  console.log(await screen.grabRegion(new Region(700, 900, 1, 1)));

  await screen.captureRegion("temp7", new Region(790, 920, 1, 1));
})();