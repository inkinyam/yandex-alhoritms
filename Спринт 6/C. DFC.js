/*
Задан неориентированный граф. Обойдите с помощью DFS все вершины, достижимые из заданной вершины s, и выведите их в порядке обхода, если начинать обход из s.

Формат ввода
В первой строке дано количество вершин 
n (1≤n≤10^5) и рёбер m (0≤m≤10^5). Далее в m строках описаны рёбра графа. Каждое ребро описывается номерами двух вершин u и v (1≤u,v≤n). В последней строке дан номер стартовой вершины s(1≤s≤n). В графе нет петель и кратных рёбер.

Формат вывода
Выведите вершины в порядке обхода, считая что при запуске от каждой конкретной вершины её соседи будут рассматриваться в порядке возрастания (то есть если вершина 2 соединена с 1 и 3, то сначала обход пойдёт в 1, а уже потом в 3).
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

const getLine = (arr, vertexCount, firstVertex) => {};

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const firstVertex = readInt();
  const result = getLine(list, n, firstVertex);
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
