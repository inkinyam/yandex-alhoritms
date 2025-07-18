/*
Черепаха Кондратина путешествует по клетчатому полю из n строк и m столбцов. В каждой клетке либо растёт цветочек, либо не растёт. Кондратине надо добраться из левого нижнего в правый верхний угол и собрать как можно больше цветочков.

Помогите ей с этой сложной задачей и определите, какое наибольшее число цветочков она сможет собрать при условии, что Кондратина умеет передвигаться только на одну клетку вверх или на одну клетку вправо за ход.

Формат ввода
В первой строке даны размеры поля n и m (через пробел). Оба числа лежат в диапазоне от 1 до 1000. В следующих n строках задано поле. Каждая строка состоит из m символов 0 или 1, записанных подряд без пробелов, и завершается переводом строки. Если в клетке записана единица, то в ней растёт цветочек.

Формат вывода
Выведите единственное число — максимальное количество цветочков, которое сможет собрать Кондратина.
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

function answer(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j < m; j++) {
      let fromDown = i < n - 1 ? dp[i + 1][j] : 0;
      let fromLeft = j > 0 ? dp[i][j - 1] : 0;
      if (i === n - 1 && j === 0) {
        dp[i][j] = matrix[i][j];
      } else {
        dp[i][j] = Math.max(fromDown, fromLeft) + matrix[i][j];
      }
    }
  }

  return dp[0][m - 1];
}
function solve() {
  const size = readLine();
  const [n, m] = size.split(" ").map(Number);
  const matrix = readMatrix(n);

  const result = answer(matrix).toString();
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
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    let line = readLine();
    arr.push(line.split("").map(Number));
  }
  return arr;
}
