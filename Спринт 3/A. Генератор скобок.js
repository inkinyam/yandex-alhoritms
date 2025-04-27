/*
Рита по поручению Тимофея наводит порядок в правильных скобочных последовательностях (ПСП), состоящих только из круглых скобок (). Для этого ей надо сгенерировать все ПСП длины 2n в алфавитном порядке —– алфавит состоит из ( и ) и открывающая скобка идёт раньше закрывающей.

Помогите Рите —– напишите программу, которая по заданному n выведет все ПСП в нужном порядке.

Рассмотрим второй пример. Надо вывести ПСП из четырёх символов. Таких всего две:

(())
()()
(()) идёт раньше ()(), так как первый символ у них одинаковый, а на второй позиции у первой ПСП стоит (, который идёт раньше ).
Формат ввода
На вход функция принимает n — целое число от 0 до 10.

Формат вывода
Функция должна напечатать все возможные скобочные последовательности заданной длины в алфавитном (лексикографическом) порядке.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function genBinary(n, prefix = "", open = 0, close = 0, result = []) {
  if (prefix.length === 2 * n) {
    result.push(prefix);
    return result;
  }

  if (open < n) {
    genBinary(n, prefix + "(", open + 1, close, result);
  }

  if (close < open) {
    genBinary(n, prefix + ")", open, close + 1, result);
  }

  return result;
}

function solve() {
  const counter = readInt();

  const result = genBinary(counter);
  for (let i = 0; i < result.length; i++) {
    process.stdout.write(result[i]);
    process.stdout.write("\n");
  }
}

function readInt() {
  return Number(inputLines[curLine++]);
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
