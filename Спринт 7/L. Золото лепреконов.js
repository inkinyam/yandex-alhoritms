/*

Лепреконы в данной задаче появились по соображениям общей морали, так как грабить банки — нехорошо.

Вам удалось заключить неплохую сделку с лепреконами, поэтому они пустили вас в своё хранилище золотых слитков. Все слитки имеют единую пробу, то есть стоимость 1 грамма золота в двух разных слитках одинакова. В хранилище есть n слитков, вес i-го слитка равен wi кг. У вас есть рюкзак, вместимость которого M килограмм.

Выясните максимальную суммарную массу золотых слитков, которую вы сможете унести.

Формат ввода
В первой строке дано число слитков —– натуральное число n (1 ≤ n ≤ 1000) и вместимость рюкзака –— целое число M (0 ≤ M ≤ 104). Во второй строке записано n натуральных чисел wi (1 ≤ wi ≤ 104) -— массы слитков.

Формат вывода
Выведите единственное число — максимальную массу, которую можно забрать с собой.*/

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const inputLines = [];
let curLine = 0;

_reader.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function goResult(counter, maxWeight, arr) {
  // Используем одномерный массив для экономии памяти
  // dp[w] - максимальная масса, которую можно получить с ограничением веса w
  const dp = Array(maxWeight + 1).fill(0);

  // Обрабатываем каждый слиток
  for (let i = 0; i < counter; i++) {
    // Идем в обратном порядке, чтобы не перезаписывать значения,
    // которые еще нужны для текущей итерации
    for (let w = maxWeight; w >= arr[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - arr[i]] + arr[i]);
    }
  }

  // Возвращаем максимальную массу, которую можно унести
  return dp[maxWeight];
}
function solve() {
  const data = readLine();
  const [counter, maxWeight] = data.split(" ").map(Number);
  const arr = readLine().split(" ").map(Number);
  const result = goResult(counter, maxWeight, arr);
  process.stdout.write(String(result));
}

function readLine() {
  const line = inputLines[curLine];
  curLine++;
  return line;
}

function readInt() {
  const n = Number(inputLines[curLine]);
  curLine++;
  return n;
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(inputLines[curLine++]);
  }
  return arr;
}
