/*
Вечером ребята решили поиграть в игру «Большое число».
Даны числа. Нужно определить, какое самое большое число можно из них составить.

Формат ввода
В первой строке записано n — количество чисел. Оно не превосходит 100.
Во второй строке через пробел записаны n неотрицательных чисел, каждое из которых не превосходит 1000.

Формат вывода
Нужно вывести самое большое число, которое можно составить из данных чисел.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function findBiggestNumber(size, arr) {
  const numbers = arr.split(" ");
  if (numbers.length === 0) {
    return;
  }

  numbers.sort((a, b) => {
    const ab = a + b;
    const ba = b + a;
    return ba.localeCompare(ab);
  });

  return numbers.join("");
}

function solve() {
  const size = readInt();
  const arrNumbers = readStr();
  process.stdout.write(findBiggestNumber(size, arrNumbers));
}

function readInt() {
  return Number(inputLines[curLine++]);
}

function readStr() {
  return inputLines[curLine++];
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
