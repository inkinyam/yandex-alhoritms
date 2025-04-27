/*
Дана матрица. Нужно написать функцию, которая для элемента возвращает всех его соседей. Соседним считается элемент, находящийся от текущего на одну ячейку влево, вправо, вверх или вниз. Диагональные элементы соседними не считаются.

Например, в матрице A соседними элементами для (0, 0) будут 2 и 0. А для (2, 1) –— 1, 2, 7, 7.
Формат ввода
В первой строке задано n — количество строк матрицы. Во второй — количество столбцов m. Числа m и n не превосходят 1000. В следующих n строках задана матрица. Элементы матрицы — целые числа, по модулю не превосходящие 1000. В последних двух строках записаны координаты элемента, соседей которого нужно найти. Индексация начинается с нуля.

Формат вывода
Напечатайте нужные числа в возрастающем порядке через пробел.
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

function getNeighbours(matrix, row, col) {
  let res = [];
  for (let i = 0; i < matrix.length; i++) {
    if (i === row - 1 || i === row + 1) {
      res.push(matrix[i][col]);
    } else if (i === row) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (j === col - 1 || j === col + 1) {
          res.push(matrix[i][j]);
        }
      }
    }
  }

  return res.sort((a, b) => a - b);
}

function solve() {
  const rows = readInt();
  const cols = readInt();
  const matrix = readMatrix(rows);
  const rowId = readInt();
  const colId = readInt();

  process.stdout.write(`${getNeighbours(matrix, rowId, colId).join(" ")}`);
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

function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    arr.push(readArray());
  }
  return arr;
}
