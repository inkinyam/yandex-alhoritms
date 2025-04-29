/*
Жители Алгосского архипелага придумали новый способ сравнения строк. Две строки считаются равными, если символы одной из них можно заменить на символы другой так, что первая строка станет точной копией второй строки. При этом необходимо соблюдение двух условий:


Порядок вхождения символов должен быть сохранён.
Одинаковым символам первой строки должны соответствовать одинаковые символы второй строки. Разным символам —– разные.
Например, если строка s = «abacaba», то ей будет равна строка t = «xhxixhx», так как все вхождения «a» заменены на «x», «b» –— на «h», а «c» –— на «i». Если же первая строка s=«abc», а вторая t=«aaa», то строки уже не будут равны, так как разные буквы первой строки соответствуют одинаковым буквам второй.

Формат ввода
В первой строке записана строка s, во второй –— строка t. Длины обеих строк не превосходят 106. Обе строки содержат хотя бы по одному символу и состоят только из маленьких латинских букв.

Строки могут быть разной длины.

Формат вывода
Выведите «YES», если строки равны (согласно вышеописанным правилам), и «NO» в ином случае.
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

function compareLines(first, second) {
  if (first.length !== second.length) return false;

  let mapFirst = new Map();
  let mapSecond = new Map();

  for (let i = 0; i < first.length; i++) {
    if (mapSecond.has(second[i]) && mapSecond.get(second[i]) !== first[i]) {
      return false;
    }
    if (mapFirst.has(first[i]) && mapFirst.get(first[i]) !== second[i]) {
      return false;
    } else {
      mapSecond.set(second[i], first[i]);
      mapFirst.set(first[i], second[i]);
    }
  }
  return true;
}
function solve() {
  const firstLine = readLine();
  const secondLine = readLine();
  const result = compareLines(firstLine, secondLine);
  process.stdout.write(result ? "YES" : "NO");
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
