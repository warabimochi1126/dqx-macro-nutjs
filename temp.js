const { screen, Region } = require("@nut-tree/nut-js");

(async () => {
  await screen.captureRegion("temp", new Region(0, 0, 1000, 1000));
})();