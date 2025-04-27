/*
Алла получила задание, связанное с мониторингом работы различных серверов. Требуется понять, сколько времени обрабатываются определённые запросы на конкретных серверах. Эту информацию нужно хранить в матрице, где номер столбца соответствуют идентификатору запроса, а номер строки — идентификатору сервера. Алла перепутала строки и столбцы местами. С каждым бывает. Помогите ей исправить баг.

Есть матрица размера m × n. Нужно написать функцию, которая её транспонирует.

Транспонированная матрица получается из исходной заменой строк на столбцы.

Формат ввода
В первой строке задано число n — количество строк матрицы.
Во второй строке задано m — число столбцов, m и n не превосходят 1000. В следующих n строках задана матрица. Числа в ней не превосходят по модулю 1000.

Формат вывода
Напечатайте транспонированную матрицу в том же формате, который задан во входных данных. Каждая строка матрицы выводится на отдельной строке, элементы разделяются пробелами.
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

function getNewMatrix(matrix, rows, cols) {
  const res = Array.from({ length: cols }, () =>
    Array.from({ length: rows }, () => 0)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      res[c][r] = matrix[r][c];
    }
  }
  return res;
}

function solve() {
  const rowsCount = readInt();
  const colsCount = readInt();
  const matrix = readMatrix(rowsCount);

  const result = getNewMatrix(matrix, rowsCount, colsCount);

  for (let i = 0; i < result.length; i++) {
    process.stdout.write(result[i].join(" "));
    process.stdout.write("\n");
  }
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

function readMatrix(rows) {
  var arr = [];
  for (let i = 0; i !== rows; i++) {
    arr.push(readArray());
  }
  return arr;
}
