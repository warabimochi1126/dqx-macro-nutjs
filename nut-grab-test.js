const { screen } = require("@nut-tree/nut-js");

(async () => {
  console.log(await screen.grab());
})();