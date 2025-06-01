/*
Неориентированный граф называется полным, если в нём каждая пара различных вершин соединена ребром.

Вам дан неориентированный граф из n вершин и m рёбер. Выясните, является ли этот граф полным.

Формат ввода
В первой строке дано число вершин 
n(1≤n≤10^5) и число рёбер m (0≤m≤5⋅10 ^5)). В следующих m строках записаны рёбра в виде пар вершин u и v (1≤u,v≤n).

Формат вывода
Если граф является полным, выведите «YES», иначе выведите «NO». */

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

function isCompleteGraph(n, edges) {
  // Создаем множество для хранения уникальных рёбер
  const edgeSet = new Set();

  // Добавляем все рёбра в множество, игнорируя петли
  for (const [u, v] of edges) {
    if (u !== v) {
      // Игнорируем петли
      const min = Math.min(u, v);
      const max = Math.max(u, v);
      edgeSet.add(`${min}-${max}`);
    }
  }

  // Проверяем, что все возможные рёбра присутствуют
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (!edgeSet.has(`${i}-${j}`)) {
        return false;
      }
    }
  }

  return true;
}

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const splittedList = list.map((item) => item.split(" ").map(Number));

  const result = isCompleteGraph(n, splittedList) ? "YES" : "NO";
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
