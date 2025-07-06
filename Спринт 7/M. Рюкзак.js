/*
Тимофей решил отправиться в поход. Ему надо собрать рюкзак. Так как поход долгий и трудный, необходимо подбирать вещи вдумчиво.

Каждому предмету Тимофей присвоил условную значимость: она равна ci для предмета с номером i. Также каждый предмет весит mi килограммов. А грузоподъёмность рюкзака  равна M килограмм.

Найдите максимальную суммарную значимость предметов, которые Тимофей может взять с собой, не порвав рюкзак, и укажите, как набрать эту значимость.

Формат ввода
В первой строке вводится число предметов n, не превышающее 100 и грузоподъемность M, не превышающая 104.

Далее следуют описания предметов по одному в строке. Каждый предмет описывается парой mi, ci, оба числа не превосходят 100 по модулю.

Формат вывода
Выведите в первой строке единственное число — сколько предметов надо взять. Во второй строке перечислите их номера (нумерация с единицы). Если ответов несколько, то выведите любой.
*/

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

function goResult(maxWeight, arr) {
  const n = arr.length;
  const dp = new Array(maxWeight + 1).fill(0);

  const selected = new Array(maxWeight + 1).fill(null).map(() => []);

  for (let i = 0; i < n; i++) {
    const [weight, value] = arr[i];

    for (let w = maxWeight; w >= weight; w--) {
      if (dp[w - weight] + value > dp[w]) {
        dp[w] = dp[w - weight] + value;
        selected[w] = [...selected[w - weight], i];
      }
    }
  }

  const result = selected[maxWeight].map((index) => index + 1); // +1 для нумерации с единицы

  return {
    maxValue: dp[maxWeight],
    count: result.length,
    items: result,
  };
}
function solve() {
  const data = readLine();
  const [counter, maxWeight] = data.split(" ").map(Number);
  const arr = readArray(counter);
  let array = arr.map((i) => i.split(" ").map(Number));
  let info = goResult(maxWeight, array);

  let result = info.count + "\n";

  for (let i of info.items) {
    result += i + " ";
  }
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
