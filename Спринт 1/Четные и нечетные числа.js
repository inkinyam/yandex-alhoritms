/*
Представьте себе онлайн-игру для поездки в метро: игрок нажимает на кнопку, и на экране появляются три случайных числа. Если все три числа оказываются одной чётности, игрок выигрывает.

Напишите программу, которая по трём числам определяет, выиграл игрок или нет.

Формат ввода
В первой строке записаны три случайных целых числа a, b и c. Числа не превосходят 109 по модулю.

Формат вывода
Выведите «WIN», если игрок выиграл, и «FAIL» в противном случае.
*/
var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function checkParity(a, b, c) {
  if (a % 2 && b % 2 & c % 2) return "WIN";
  else if (!(a % 2) && !(b % 2) & !(c % 2)) return "WIN";
  else return "FAIL";
}

function solve() {
  const inputNumbers = readArray();
  const a = inputNumbers[0];
  const b = inputNumbers[1];
  const c = inputNumbers[2];

  process.stdout.write(checkParity(a, b, c));
}

function readInt() {
  const n = Number(inputLines[curLine]);
  curLine++;
  return n;
}

function readArray() {
  const arr = inputLines[curLine]
    .trim()
    .split(" ")
    .map((num) => Number(num));
  curLine++;
  return arr;
}
