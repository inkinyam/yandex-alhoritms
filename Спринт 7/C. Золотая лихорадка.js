/*
Гуляя по одному из островов Алгосского архипелага, Гоша набрёл на пещеру, в которой лежат кучи золотого песка. К счастью, у Гоши есть с собой рюкзак грузоподъёмностью до M килограмм, поэтому он может унести с собой какое-то ограниченное количество золота.

Всего золотых куч n штук, и все они разные. В куче под номером i содержится mi килограммов золотого песка, а стоимость одного килограмма — ci алгосских франков.

Помогите Гоше наполнить рюкзак так, чтобы общая стоимость золотого песка в пересчёте на алгосские франки была максимальной.

Формат ввода
В первой строке задано целое число M — грузоподъёмность рюкзака Гоши (0 ≤ M ≤ 108).

Во второй строке дано количество куч с золотым песком — целое число n (1 ≤ n ≤ 105).

В каждой из следующих n строк описаны кучи: i-ая куча задаётся двумя целыми числами ci и mi, записанными через пробел (1 ≤ ci ≤ 107, 1 ≤ mi ≤ 108).

Формат вывода
Выведите единственное число —– максимальную сумму (в алгосских франках), которую Гоша сможет вынести из пещеры в своём рюкзаке.
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
  // Сортируем кучи по убыванию стоимости за килограмм (жадный алгоритм)
  // Это оптимально для дробного рюкзака
  arr.sort((a, b) => b[0] - a[0]);

  let totalValue = 0;
  let remainingWeight = maxWeight;

  for (let i = 0; i < arr.length && remainingWeight > 0; i++) {
    const [costPerKg, weight] = arr[i];

    // Берем либо всю кучу, либо сколько поместится
    const takeWeight = Math.min(weight, remainingWeight);
    totalValue += takeWeight * costPerKg;
    remainingWeight -= takeWeight;
  }

  return totalValue;
}

function solve() {
  const maxWeight = readInt();
  const counter = readInt();
  const arr = readArray(counter);
  let array = arr.map((i) => i.split(" ").map(Number));

  const result = goResult(maxWeight, array);
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
