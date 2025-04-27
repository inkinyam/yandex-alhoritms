/*
На клавиатуре старых мобильных телефонов каждой цифре соответствовало несколько букв. Примерно так:

2:'abc',
3:'def',
4:'ghi',
5:'jkl',
6:'mno',
7:'pqrs',
8:'tuv',
9:'wxyz'

Вам известно в каком порядке были нажаты кнопки телефона, без учета повторов. Напечатайте все комбинации букв, которые можно набрать такой последовательностью нажатий.

Формат ввода
На вход подается строка, состоящая из цифр 2-9 включительно. Длина строки не превосходит 10 символов.

Формат вывода
Выведите все возможные комбинации букв через пробел в лексикографическом (алфавитном) порядке по возрастанию.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

const KEYS = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz",
};

function genBinary(string, prefix = "", result = []) {
  if (prefix.length === string.length) {
    result.push(prefix);
    return result;
  }
  const currentDigit = string[prefix.length];
  const letters = KEYS[currentDigit];

  for (let i = 0; i < letters.length; i++) {
    genBinary(string, prefix + letters[i], result);
  }
  return result;
}

function solve() {
  const string = readInt();
  const result = genBinary(string).join(" ");
  process.stdout.write(result);
}

function readInt() {
  return inputLines[curLine++];
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
