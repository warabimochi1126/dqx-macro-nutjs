const { screen, Region } = require("@nut-tree/nut-js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(1000);
  console.log(await screen.grab());
  await screen.captureRegion("temp", new Region(630, 875, 660, 120));
})();