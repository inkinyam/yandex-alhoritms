/*
Вася делает тест по математике: вычисляет значение функций в различных точках. Стоит отличная погода, и друзья зовут Васю гулять. Но мальчик решил сначала закончить тест и только после этого идти к друзьям. К сожалению, Вася пока не умеет программировать. Зато вы умеете. Помогите Васе написать код функции, вычисляющей y = ax2 + bx + c. Напишите программу, которая будет по коэффициентам a, b, c и числу x выводить значение функции в точке x.

Формат ввода
На вход через пробел подаются целые числа a, x, b, c. В конце ввода находится перенос строки.

Формат вывода
Выведите одно число — значение функции в точке x.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function evaluateFunction(x, a, b, c) {
  return (a * x + b) * x + c;
}

function solve() {
  const inputNumbers = readArray();
  const a = inputNumbers[0];
  const x = inputNumbers[1];
  const b = inputNumbers[2];
  const c = inputNumbers[3];
  process.stdout.write(`${evaluateFunction(x, a, b, c)}`);
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
