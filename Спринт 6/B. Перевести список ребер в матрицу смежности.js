/*
Алла успешно справилась с предыдущим заданием, и теперь ей дали новое. На этот раз список рёбер ориентированного графа надо переводить в матрицу смежности. Конечно же, Алла попросила вас помочь написать программу для этого.

Формат ввода
В первой строке дано число вершин 
n(1≤n≤100) и число рёбер m (1≤m≤n(n−1)). В следующих m строках заданы ребра в виде пар вершин (u,v), если ребро ведет от u к v

Формат вывода
Выведите матрицу смежности 
n на n. На пересечении i-й строки и j-го столбца стоит единица, если есть ребро, ведущее из i в j.
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

const getMatrix = (arr, vertexCount) => {};

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const result = getMatrix(list, n);
  result.forEach((i) => {
    process.stdout.write(i);
    process.stdout.write("\n");
  });
}

function readInt() {
  const n = Number(inputLines[curLine]);
  curLine++;
  return n;
}
function readLine() {
  const line = inputLines[curLine];
  curLine++;
  return line;
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(inputLines[curLine++]);
  }
  return arr;
}
