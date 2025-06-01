/*
Дан ациклический ориентированный граф (так называемый DAG, directed acyclic graph). Найдите его топологическую сортировку, то есть выведите его вершины в таком порядке, что все рёбра графа идут слева направо. У графа может быть несколько подходящих перестановок вершин. Вам надо найти любую топологическую сортировку.

Формат ввода
В первой строке даны два числа – количество вершин n (1≤n≤10 ^5) и количество рёбер m (0≤m≤10 ^5 ). В каждой из следующих 
m строк описаны рёбра по одному на строке. Каждое ребро представлено парой вершин (from,to), 1≤from,to≤n, соответственно номерами вершин начала и конца.

Формат вывода
Выведите номера вершин в требуемом порядке.
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

function topSort(n, arr) {
  // Создаем список смежности для более быстрого доступа к рёбрам
  const graph = new Array(n + 1).fill().map(() => []);
  for (const [from, to] of arr) {
    graph[from].push(to);
  }

  const color = new Array(n + 1).fill("white");
  const order = [];

  function DFS(v) {
    color[v] = "gray";

    // Используем предварительно построенный список смежности
    for (const w of graph[v]) {
      if (color[w] === "white") {
        DFS(w);
      }
    }

    color[v] = "black";
    order.push(v);
  }

  // Начинаем с вершин с наибольшими номерами
  for (let i = n; i >= 1; i--) {
    if (color[i] === "white") {
      DFS(i);
    }
  }

  return order.reverse();
}

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const splittedList = list.map((item) => item.split(" ").map(Number));

  const result = topSort(n, splittedList).join(" ");
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
