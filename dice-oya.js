/**
 * TODO: 家帰ってきてから呼び込みメッセージの間隔を測る
 * 間隔ごとにF5 -> Enterをループする
 * Qキーを検出する関数を記述する
 * Qキーが検出されたらストップして客対応する
 */

/**
 * 10秒間隔でメッセージを流れるっぽいので11秒でメッセージ流す
 * 流すのに必要なのが F5 -> Enter 
 * Qキー押したらループ止めるようにする
 * いいねのダイアログでたら止めるようにする -> ダイアログ検出を動画で取っておいてピクセルぬいてくる？
 */

const { keyboard, key, sleep, Key } = require("@nut-tree/nut-js");

while (true) {
  await sleep(11000);

  await keyboard.type(Key.F5);
  await sleep(500);
  await key.type(Key.Enter);

  await sleep(11000);
  await keyboard.type(Key.F5);
  await key.type(Key.Enter);
  break;
}