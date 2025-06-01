/*
Алла пошла на стажировку в студию графического дизайна, где ей дали такое задание: для очень большого числа ориентированных графов преобразовать их список рёбер в список смежности. Чтобы побыстрее решить эту задачу, она решила автоматизировать процесс.

Помогите Алле написать программу, которая по списку рёбер графа будет строить его список смежности.

Формат ввода
В первой строке дано число вершин 
n(1≤n≤100) и число ребер 
m(1≤m≤n(n−1)). В следующих m строках заданы ребра в виде пар вершин (u,v), если ребро ведет от u к v.

Формат вывода
Выведите информацию о рёбрах, исходящих из каждой вершины.

В строке i надо написать число рёбер, исходящих из вершины i, а затем перечислить вершины, в которые ведут эти рёбра –— в порядке возрастания их номеров.
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

const getMatrix = (arr, vertexCount) => {
  const res = Array(vertexCount + 1)
    .fill()
    .map(() => [0, []]);

  const beams = arr.map((item) => item.split(" ").map(Number));
  for (let b = 0; b < beams.length; b++) {
    let [vertex, beam] = beams[b];
    res[vertex][0] = res[vertex][0] + 1;
    res[vertex][1].push(beam);
  }

  return res.slice(1).map((item) => {
    return `${item[0]} ${item[1].sort((a, b) => a - b).join(" ")}`;
  });
};

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
