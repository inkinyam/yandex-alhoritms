//отчет https://contest.yandex.ru/contest/22450/run-report/135468914/

const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const _inputLines = [];
let _curLine = 0;

_reader.on("line", (line) => {
  _inputLines.push(line);
});

process.stdin.on("end", solve);

function getMaxBall(matrix, k) {
  // добавила явное объявление кол-ва персон
  const persons = 2;
  //посчитаем вхождения каждого числа в матрице
  const count = matrix.reduce((acc, row) => {
    row.forEach((item) => {
      if (item !== ".") {
        acc[item] = (acc[item] || 0) + 1;
      }
    });
    return acc;
  }, {});

  let result = 0;
  //проверяем по всем ключам, где можем победить
  for (let i = 1; i <= 9; i++) {
    if (count[i] <= k * persons) {
      result++;
    }
  }
  return result;
}

function solve() {
  const k = readInt();
  const matrix = readMatrix(4);

  process.stdout.write(`${getMaxBall(matrix, k)}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split("")
    .map((el) => (isNaN(el) ? el : Number(el)));
  _curLine++;
  return arr;
}

function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readArray());
  }
  return arr;
}
