/*

Алла придумала новый способ сравнивать две строки: чтобы сравнить строки a и b, в них надо оставить только те буквы, которые в английском алфавите стоят на четных позициях. Затем полученные строки сравниваются по обычным правилам. Помогите Алле реализовать новое сравнение строк.

Формат ввода
На вход подаются строки a и b по одной в строке. Обе строки состоят из маленьких латинских букв, не бывают пустыми и не превосходят 105 символов в длину.

Формат вывода
Выведите -1, если a < b, 0, если a = b, и 1, если a > b.
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

function filterEvenLetters(str) {
  return str
    .split("")
    .filter((char) => {
      const position = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
      return position % 2 === 0;
    })
    .join("");
}
function compare(string1, string2) {
  const filtered1 = filterEvenLetters(string1);
  const filtered2 = filterEvenLetters(string2);

  if (filtered1 < filtered2) {
    return -1;
  } else if (filtered1 > filtered2) {
    return 1;
  } else {
    return 0;
  }
}

function solve() {
  const string1 = readLine();
  const string2 = readLine();

  const result = compare(string1, string2);
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
