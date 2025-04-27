/*
Помогите Васе понять, будет ли фраза палиндромом. Учитываются только буквы и цифры, заглавные и строчные буквы считаются одинаковыми.

Решение должно работать за O(N), где N — длина строки на входе.

Формат ввода
В единственной строке записана фраза или слово. Буквы могут быть только латинские. Длина текста не превосходит 20000 символов.

Фраза может состоять из строчных и прописных латинских букв, цифр, знаков препинания.

Формат вывода
Выведите «True», если фраза является палиндромом, и «False», если не является.
*/
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

function isPalindrome(line) {
  let res = true;
  let normalizeLine = line.toLowerCase().replace(/[^\w]|_/g, "");
  for (let i = 0; i < normalizeLine.length; i++) {
    if (normalizeLine[i] !== normalizeLine[normalizeLine.length - i - 1]) {
      res = false;
      break;
    }
  }
  return res;
}

function solve() {
  const line = readLine();
  if (isPalindrome(line)) {
    console.log("True");
  } else {
    console.log("False");
  }
}

function readLine() {
  const line = _inputLines[_curLine];
  _curLine++;
  return line;
}

function readInt() {
  const n = Number(_inputLines[_curLine]);
  _curLine++;
  return n;
}

function readArray() {
  var arr = _inputLines[_curLine]
    .trim(" ")
    .split(" ")
    .map((num) => Number(num));
  _curLine++;
  return arr;
}
