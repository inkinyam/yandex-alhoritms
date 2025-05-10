/*
Алле очень понравился алгоритм вычисления полиномиального хеша. Помогите ей написать функцию, вычисляющую хеш строки s. В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Полиномиальный хеш считается по формуле:

h(s)=(s1an−1+s2an−2+⋯+sn−1a+sn) mod mh(s)=(s 1​ a n−1 +s 2​ a n−2 +⋯+s n−1​ a+s n​ ) mod m

Формат ввода
В первой строке дано число a (1≤a≤1000) –— основание, по которому считается хеш.

Во второй строке дано число m (1≤m≤10^9) –— модуль.

В третьей строке дана строка s (0≤∣s∣≤10^6), состоящая из больших и маленьких латинских букв.

Формат вывода
Выведите целое неотрицательное число –— хеш заданной строки.
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

function checkHash(base, count, line) {
  let hash = 0;
  for (let i = 0; i < line.length; i++) {
    hash = (hash * base + line[i].charCodeAt()) % count;
  }
  return hash;
}

function solve() {
  const base = readInt();
  const count = readInt();
  const line = readLine();

  const result = checkHash(base, count, line);
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
