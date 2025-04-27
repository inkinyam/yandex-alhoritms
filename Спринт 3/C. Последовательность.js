/*
Гоша любит играть в игру «Подпоследовательность»: даны 2 строки, и нужно понять, является ли первая из них подпоследовательностью второй. Когда строки достаточно длинные, очень трудно получить ответ на этот вопрос, просто посмотрев на них. Помогите Гоше написать функцию, которая решает эту задачу.

Формат ввода
В первой строке записана строка s.

Во второй —- строка t.

Обе строки состоят из маленьких латинских букв, длины строк не превосходят 150000. Строки не могут быть пустыми.

Формат вывода
Выведите True, если s является подпоследовательностью t, иначе —– False.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function getIsSubstring(first, second) {
  let lastIndex = 0;
  let isSubstring = true;

  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i])) {
      let curIndex = second.indexOf(first[i], lastIndex);
      if (curIndex === -1) {
        isSubstring = false;
        break;
      }
      lastIndex = curIndex;
    } else {
      isSubstring = false;
      break;
    }
  }
  return isSubstring;
}

function solve() {
  const firstString = readStr();
  const secondString = readStr();
  let result = getIsSubstring(firstString, secondString) ? "True" : "False";
  process.stdout.write(result);
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
