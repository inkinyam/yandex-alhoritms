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

function mainDFS(arr, n, start) {
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

  const visited = new Set();
  const result = [];
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!visited.has(current)) {
      visited.add(current);
      result.push(current);

      // Добавляем соседей в стек в обратном порядке
      // чтобы они обрабатывались в правильном порядке
      for (let i = adjacencyList[current].length - 1; i >= 0; i--) {
        const neighbor = adjacencyList[current][i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  return result;
}

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const firstVertex = readInt();
  const result = mainDFS(list, n, firstVertex).map(String).join(" ");
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

// Тестовый вызов
const testN = 4;
const testStart = 3;
const testArr = ["4 4", "4 3", "1 4", "1 2"];
const testResult = mainDFS(testArr, testN, testStart);
console.log("Результат:", testResult.join(" "));
