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

function mainDFS(n, arr) {
  let time = -1;
  const color = new Array(n + 1).fill("white");
  const entry = new Array(n + 1).fill(-1);
  const leave = new Array(n + 1).fill(-1);
  const result = new Array(n + 1);

  // Предварительная обработка рёбер
  const edges = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    edges[i] = [];
  }

  // Заполняем рёбра и сразу сортируем
  for (const [from, to] of arr) {
    edges[from].push(to);
  }

  // Сортируем рёбра для каждой вершины
  for (let i = 1; i <= n; i++) {
    if (edges[i].length > 0) {
      edges[i].sort((a, b) => a - b);
    }
  }

  const stack = [1];
  const stackIndex = new Array(n + 1).fill(0);

  while (stack.length > 0) {
    const v = stack[stack.length - 1];
    const currentIndex = stackIndex[v];

    if (color[v] === "white") {
      time++;
      entry[v] = time;
      color[v] = "gray";
    }

    if (currentIndex < edges[v].length) {
      const w = edges[v][currentIndex];
      stackIndex[v]++;
      if (color[w] === "white") {
        stack.push(w);
      }
    } else {
      time++;
      leave[v] = time;
      color[v] = "black";
      result[v] = `${entry[v]} ${leave[v]}`;
      stack.pop();
    }
  }

  return result.slice(1);
}

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const splittedList = list.map((item) => item.split(" ").map(Number));

  const result = mainDFS(n, splittedList);
  result.forEach((i) => {
    process.stdout.write(String(i));
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
