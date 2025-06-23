/*
Сложность такой реализации алгоритма Дейкстры 
O(∣V∣^2 +∣E∣), она складывается из двух основных операций:
1. Поиск вершины с наименьшим расстоянием до s;
2. Релаксация.

Первая операция выполняется O(∣V∣) раз, вторая — O(∣E∣). Если расстояния до вершин хранятся в массиве, то сложность поиска наименьшего значения будет O(∣V∣). Релаксация происходит за константное время.

Получим: O(∣V∣)⋅O(∣V∣)+O(∣E∣)=O(∣V∣^2 +∣E∣).
*/
let countVertex = 10;
const dist = new Array(countVertex + 1);
const visited = new Array(countVertex + 1);
const previous = new Array(countVertex + 1);

//получить все исходящие ребра
const outgoingEdges = (v) => {};

const graph = new Array(countVertex + 1); //все вершины

//получить вес ребра, который начинается в start и заканчивается в end
const weight = (start, end) => {};

function relax(u, v) {
  // Проверяем, не получился ли путь короче найденного ранее.
  if (dist[v] > dist[u] + weight(u, v)) {
    dist[v] = dist[u] + weight(u, v);
    previous[v] = u;
  }
}

function getMinDistNotVisitedVertex() {
  // Находим ещё непосещённую вершину с минимальным расстоянием от s.
  let currentMinimum = Number.MAX_VALUE;
  let currentMinimumVertex = null;

  for (let v of graph) {
    if (!visited[v] && dist[v] < currentMinimum) {
      currentMinimum = dist[v];
      currentMinimumVertex = v;
    }
  }
  return currentMinimumVertex;
}

function dijkstra(graph, s) {
  for (let v of graph.vertices) {
    dist[v] = Number.MAX_VALUE; // Задаём расстояние по умолчанию.
    previous[v] = null; // Задаём предшественника для восстановления SPT.
    visited[v] = false; // Список статусов посещённости вершин.
  }

  dist[s] = 0; // Расстояние от вершины до самой себя 0.

  while (true) {
    let u = getMinDistNotVisitedVertex();

    if (u == null || dist[u] == Number.MAX_VALUE) {
      break;
    }

    visited[u] = true;
    // из множества рёбер графа выбираем те, которые исходят из вершины u
    let neighbours = outgoingEdges(u);

    for (let [_, v] of neighbours) {
      relax(u, v);
    }
  }
}
