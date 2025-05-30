const n = 4;
const m = 4;
const firstVertex = 3;
const arr = ["3 2", "4 3", "1 4", "1 2"];

const getLine = (arr, vertexCount, firstVertex) => {};

console.log(getLine(arr, 5));

const getOutgoingEdges = () => {
  // Получите список исходящих ребер в зависимости от способа хранения графа
};

function DFS(startVertex) {
  let color = new Array(n).fill("white");
  let stack = [];
  stack.push(startVertex); // Добавляем стартовую вершину в стек.

  while (stack.length > 0) {
    // Пока стек не пуст:
    // Получаем из стека очередную вершину.
    // Это может быть как новая вершина, так и уже посещённая однажды.
    const v = stack.pop();

    if (color[v] === "white") {
      // Красим вершину в серый. И сразу кладём её обратно в стек:
      // это позволит алгоритму позднее вспомнить обратный путь по графу.
      color[v] = "gray";
      stack.push(v);

      // Теперь добавляем в стек все непосещённые соседние вершины,
      // вместо вызова рекурсии
      for (let w of outgoingEdges) {
        // Для каждого исходящего ребра (v, w):
        if (color[w] === "white") {
          stack.push(w);
        }
      }
    } else if (color[v] === "gray") {
      // Серую вершину мы могли получить из стека только на обратном пути.
      // Следовательно, её следует перекрасить в чёрный.
      color[v] = "black";
    }
  }
}

function mainDFS() {
  for (let i = 0; i < color.length; i++) {
    // Перебираем варианты стартовых вершин, пока они существуют.
    if (color[i] === "white") {
      DFS(i); // Запускаем обход, стартуя с i-й вершины.
    }
  }
}
