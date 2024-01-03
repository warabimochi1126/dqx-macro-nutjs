const { createWorker } = require('tesseract.js');


(async () => {
  const worker = await createWorker('jpn');
  const { data: { text } } = await worker.recognize('temp.png');
  console.log(text);
  let sortedString = text.replace(/\s/g, "");
  console.log(sortedString);
  await worker.terminate();
})();