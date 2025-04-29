/*
Жители Алгосов любят устраивать турниры по спортивному программированию. Все участники разбиваются на пары и соревнуются друг с другом. А потом два самых сильных программиста встречаются в финальной схватке, которая состоит из нескольких раундов. Если в очередном раунде выигрывает первый участник, в таблицу с результатами записывается 0, если второй, то 1. Ничьей в раунде быть не может.

Нужно определить наибольший по длине непрерывный отрезок раундов, по результатам которого суммарно получается ничья. Например, если дана последовательность 0 0 1 0 1 1 1 0 0 0, то раунды с 2-го по 9-й (нумерация начинается с единицы) дают ничью.

Формат ввода
В первой строке задаётся n (0 ≤ n ≤ 105) –— количество раундов. Во второй строке через пробел записано n чисел –— результаты раундов. Каждое число равно либо 0, либо 1.

Формат вывода
Выведите длину найденного отрезка.
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

function countRounds(arr) {
  const prefixSums = new Map();
  prefixSums.set(0, -1);
  let sum = 0;
  let maxLength = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i] === 0 ? -1 : 1;

    if (prefixSums.has(sum)) {
      maxLength = Math.max(maxLength, i - prefixSums.get(sum));
    } else {
      prefixSums.set(sum, i);
    }
  }

  return maxLength;
}

function solve() {
  const counter = readInt();
  const arr = readLine().split(" ").map(Number);
  const result = countRounds(arr);
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
