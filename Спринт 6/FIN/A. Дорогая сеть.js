/*
1. ОТЧЕТ https://contest.yandex.ru/contest/25070/run-report/139467645/

2. ПРИНЦИП РАБОТЫ
Используем чуть модифицированный класс HEAP из прошлого спринта, в него передается новая функция-компаратор, которая сравнивает веса ребер.
В самой функции getMaxTreeWeight мы создаем граф смежности всех ребер и реализуем функции добавления вершин  и поиска максимального остовного дерева.
У нас есть несколько переменных, 
added - уже добавленные в дерево вершины,  
notAdded - не добавленные вершины, 
heap - максимальная куча ребер, которые соединяют уже добавленные вершины с недобавленными

Так как алгоритм в любом случае пройдет по всем вершинам, начинаем с первой и добавляем ее в Остов, все ее ребра - в кучу.
ПОка есть недобавленные вершины и куча не пуста, извлекаем ребро из кучи, если оно ведет в недобавленную вершину, добавляем это ребро в Остов, а вершину - в added, и все ее ребра к недобавленным вершинам - в кучу.

Если после завершения этого действия выясняется, что остались недобавленные вершины - считаем что граф является несвязным, и в таком случае выдаем строку, требуемую задачей.

В случае, если все вершины прошли, недобавленных не осталось, считаем вес нашего остовного дерева, для этого проходим по всем ребрам и суммируем их вес.

3. ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

Алгоритм всегда выбирает самое большое по weight ребро, соединяющее дерево с вершиной, что и требуется по условиям задачи для построения максимального остовного дерева.

Куча обеспечивает быстрое получение максимального ребра.

Так как используется мапа Set в переменных added, notAdded, мы гарантируем, что исключаем все циклы, при этом все вершины будут рассмотрены в любом случае.

4. ВРЕМЕННАЯ СЛОЖНОСТЬ
    4.1 Построение графа O(m), m - число ребер
    4.2. Алгоритм Прима:
        - Добавление ребра O(log K), k - размер кучи в момент добавления
        - Извлечение максимального ребра O(logK)
    Так как граф неориентированный, каждое ребро может быть добавлено дважды, для from , to вершин.
    Всего операций добавления и удаления из кучи O(2m)~O(m), m - количество вершин

    Итого всего работа с кучей:O(M*logM)
    Создание мапов added, notAdded = О(1)
    Подсчет веса максимального дерева - O(M)

    Итого: O(M)+O(M*logM)+O(M)


5. ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
- массив входных данных O(M)
- граф смежности O(N+M), тк граф неориентированный
- хранение кучи O(M)
- мапы added, notAdded 2*O(N)~O(N)
- хранение макс.остова O(n)

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

class Heap {
  constructor(comparator) {
    this.items = [null];
    this.comparator = comparator;
  }
  siftDown(index) {
    while (true) {
      const left = 2 * index;
      const right = 2 * index + 1;
      if (left >= this.items.length) {
        break;
      }
      const indexLargest =
        right < this.items.length &&
        this.comparator(this.items[right], this.items[left]) > 0
          ? right
          : left;
      if (this.comparator(this.items[indexLargest], this.items[index]) > 0) {
        [this.items[index], this.items[indexLargest]] = [
          this.items[indexLargest],
          this.items[index],
        ];
        index = indexLargest;
      } else {
        break;
      }
    }
  }
  siftUp(index) {
    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      if (this.comparator(this.items[parentIndex], this.items[index]) < 0) {
        [this.items[parentIndex], this.items[index]] = [
          this.items[index],
          this.items[parentIndex],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }
  addElement(key) {
    this.items.push(key);
    const index = this.items.length - 1;
    this.siftUp(index);
  }
  popMax() {
    if (this.items.length <= 1) return null;
    const result = this.items[1];
    this.items[1] = this.items[this.items.length - 1];
    this.items.pop();
    if (this.items.length > 1) {
      this.siftDown(1);
    }
    return result;
  }
  isEmpty() {
    return this.items.length <= 1;
  }
}

function edgeComparator(a, b) {
  if (a.weight !== b.weight) {
    return a.weight > b.weight ? 1 : -1;
  }
  return 0;
}

const getMaxTreeWeight = (arr, n) => {
  const graph = new Array(n + 1).fill().map(() => []);
  for (const edge of arr) {
    const [from, to, weight] = edge.split(" ").map(Number);
    graph[from].push({ to, weight });
    graph[to].push({ to: from, weight });
  }

  const addVertex = (v, added, notAdded, heap) => {
    added.add(v);
    notAdded.delete(v);
    for (const edge of graph[v]) {
      if (notAdded.has(edge.to)) {
        heap.addElement({ from: v, to: edge.to, weight: edge.weight });
      }
    }
  };

  const findMaxST = () => {
    const maxTree = [];
    const added = new Set();
    const notAdded = new Set();
    for (let i = 1; i <= n; i++) notAdded.add(i);
    const heap = new Heap(edgeComparator);

    const v = 1;
    addVertex(v, added, notAdded, heap);

    while (notAdded.size > 0 && !heap.isEmpty()) {
      const edge = heap.popMax();
      if (edge && notAdded.has(edge.to)) {
        maxTree.push(edge);
        addVertex(edge.to, added, notAdded, heap);
      }
    }

    if (notAdded.size > 0) {
      return "Oops! I did it again";
    }
    let result = 0;
    for (const edge of maxTree) {
      result = result + edge.weight;
    }
    return result.toString();
  };

  return findMaxST();
};

function solve() {
  const counters = readLine();
  const [n, m] = counters.split(" ").map(Number);
  const list = readArray(m);
  const result = getMaxTreeWeight(list, n);
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
