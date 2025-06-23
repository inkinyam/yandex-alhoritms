/*
Реализация алгоритма Прима для поиска минимального остовного дерева (MST).
Граф неориентированный, рёбра имеют веса.
*/

// arr — массив рёбер вида: [from, to, weight]
const arr = [
  // Пример: [1, 2, 5], [1, 3, 10], ...
];
const n = 99; // количество всех вершин (нумерация с 1)

// Строим список смежности с весами
const graph = new Array(n + 1).fill().map(() => []);
for (const [from, to, weight] of arr) {
  graph[from].push({ to, weight });
  graph[to].push({ to: from, weight }); // неориентированный граф
}

// Мини-реализация мин-кучи для рёбер по весу
class MinHeap {
  constructor() {
    this.data = [];
  }
  add(edge) {
    this.data.push(edge);
    this._siftUp(this.data.length - 1);
  }
  extractMin() {
    if (this.data.length === 0) return null;
    const min = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._siftDown(0);
    }
    return min;
  }
  _siftUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p].weight <= this.data[i].weight) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  _siftDown(i) {
    const n = this.data.length;
    while (true) {
      let left = 2 * i + 1,
        right = 2 * i + 2,
        smallest = i;
      if (left < n && this.data[left].weight < this.data[smallest].weight)
        smallest = left;
      if (right < n && this.data[right].weight < this.data[smallest].weight)
        smallest = right;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
  isEmpty() {
    return this.data.length === 0;
  }
}

function addVertex(v, added, notAdded, heap) {
  added.add(v);
  notAdded.delete(v);
  for (const edge of graph[v]) {
    if (notAdded.has(edge.to)) {
      heap.add({ from: v, to: edge.to, weight: edge.weight });
    }
  }
}

function findMST() {
  const minimumSpanningTree = [];
  const added = new Set();
  const notAdded = new Set();
  for (let i = 1; i <= n; i++) notAdded.add(i);
  const heap = new MinHeap();

  // Берём первую вершину (например, 1)
  const v = 1;
  addVertex(v, added, notAdded, heap);

  while (notAdded.size > 0 && !heap.isEmpty()) {
    const edge = heap.extractMin();
    if (notAdded.has(edge.to)) {
      minimumSpanningTree.push(edge);
      addVertex(edge.to, added, notAdded, heap);
    }
  }

  if (notAdded.size > 0) {
    throw new Error("Исходный граф несвязный");
  }
  return minimumSpanningTree;
}

// Пример использования:
// const mst = findMST();
// console.log(mst);
