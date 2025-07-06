/*
Найдите наибольший по длине общий префикс нескольких строк.

Формат ввода
В первой строке дано число n (1 ≤ n ≤ 105). Затем по одной на строке даны n строк, каждая не превышает 105 в длину. Суммарная длина всех строк не превосходит 107.

Формат вывода
Выведите единственное число — длину наибольшего префикса всех данных строк
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

function compare(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0].length;

  // Находим минимальную длину среди всех строк
  const minLength = Math.min(...arr.map((str) => str.length));

  // Сравниваем символы напрямую без создания подстрок
  for (let i = 0; i < minLength; i++) {
    const char = arr[0][i];
    for (let j = 1; j < arr.length; j++) {
      if (arr[j][i] !== char) {
        return i;
      }
    }
  }

  return minLength;
}

function solve() {
  const counter = readInt();
  const arr = readArray(counter);

  const result = compare(arr);
  process.stdout.write(result.toString());
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
