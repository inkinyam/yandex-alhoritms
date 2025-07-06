/*
В некоторых языках предложения пишутся и читаются не слева направо, а справа налево.

Вам под руку попался странный текст –— в нём обычный (слева направо) порядок букв в словах. А вот сами слова идут в противоположном направлении. Вам надо преобразовать текст так, чтобы слова в нём были написаны слева направо.

Формат ввода
На ввод подаётся строка, состоящая из слов, разделённых пробелами (один пробел между соседними словами). Всего слов не более 1000, длина каждого из них —– от 1 до 100 символов. Слова состоят из строчных букв английского алфавита.

Формат вывода
Выведите строку с обратным порядком слов в ней.
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

function getReverseString(str) {
  return str.split(" ").reverse().join(" ");
}

function solve() {
  const string = readLine();

  const result = getReverseString(string);
  process.stdout.write(result);
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
