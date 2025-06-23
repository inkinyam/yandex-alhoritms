/*
Задан неориентированный граф. Обойдите поиском в ширину все вершины, достижимые из заданной вершины s, и выведите их в порядке обхода, если начинать обход из s.

Формат ввода
В первой строке дано количество вершин n (1 ≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 105). Далее в m строках описаны рёбра графа. Каждое ребро описывается номерами двух вершин u и v (1 ≤ u, v ≤ n). В последней строке дан номер стартовой вершины s (1 ≤ s ≤ n).

Гарантируется, что в графе нет петель и кратных рёбер.

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

function mainBFS(arr, n, start) {
  let color = Array.from({ length: n + 1 }, () => "white");
  let previous = Array.from({ length: n + 1 }, () => null);
  let distance = Array.from({ length: n + 1 }, () => null);

  // Создаем список смежности
  const adjacencyList = Array(n + 1)
    .fill()
    .map(() => []);

  // Заполняем список смежности
  for (const edge of arr) {
    const [u, v] = edge.split(" ").map(Number);
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  // Сортируем соседей для каждой вершины
  for (let i = 1; i <= n; i++) {
    adjacencyList[i].sort((a, b) => a - b);
  }

  // Создадим очередь вершин и положим туда стартовую вершину.
  let planned = [];
  const next = [];
  planned.push(start);
  color[start] = "gray";
  distance[start] = 0;

  next.push(start);
  while (planned.length > 0) {
    let u = planned.shift(); // Возьмём вершину из очереди.

    for (let v of adjacencyList[u]) {
      if (color[v] === "white") {
        next.push(v);
        // Серые и чёрные вершины уже
        // либо в очереди, либо обработаны.
        distance[v] = distance[u] + 1;
        previous[v] = u;
        color[v] = "gray";
        planned.push(v); // Запланируем посещение вершины.
      }
    }
    color[u] = "black"; // Теперь вершина считается обработанной.
  }

  return next;
}

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const firstVertex = readInt();
  const result = mainBFS(list, n, firstVertex).map(String).join(" ");
  process.stdout.write(result);
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
