// отчет: https://contest.yandex.ru/contest/22450/run-report/135376023/

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

function getNearestZero(length, line) {
  //переименовала массив
  let distances = line.split(" ").map((i) => Number(i));
  let resLeftRight = [];
  let res = [];

  let distance = length;
  for (let i = 0; i < length; i++) {
    if (distances[i] === 0) {
      distance = 0;
    } else {
      distance++;
    }
    //вынесла запись в массив ниже
    resLeftRight.push(distance);
  }

  distance = length;
  for (let i = length - 1; i >= 0; i--) {
    if (distances[i] === 0) {
      distance = 0;
      res[i] = 0;
    } else {
      distance++;
      res[i] = Math.min(resLeftRight[i], distance);
    }
  }

  return res;
}

function solve() {
  const length = readInt();
  const line = readLine();
  const result = getNearestZero(length, line).join(" ");
  process.stdout.write(`${result}`);
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
