const { createWorker } = require('tesseract.js');

// (async () => {
//   const worker = await createWorker('jpn');
//   const { data: { text } } = await worker.recognize('temp4.png');
//   console.log(text);
//   let sortedString = text.replace(/\s/g, "");
//   console.log(sortedString);
//   await worker.terminate();
// })();

async function ocr(filename) {
  const worker = await createWorker('jpn');
  const { data: { text } } = await worker.recognize(filename);
  let sortedText = text.replace(/\s/g, "");
  await worker.terminate();
  return sortedText;
}

module.exports = {
  ocr
}