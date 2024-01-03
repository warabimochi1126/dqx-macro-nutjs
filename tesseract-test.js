const { createWorker } = require('tesseract.js');


(async () => {
  const worker = await createWorker('jpn');
  const { data: { text } } = await worker.recognize('temp.png');
  console.log(text);
  await worker.terminate();
})();