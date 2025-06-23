/*
# Длины массивов равны числу вершин|V|.
color = [white, white, ...]
previous = [None, None, ...]
distance = [None, None, ...]

функция BFS(s):
    # Создадим очередь вершин и положим туда стартовую вершину.
    planned = Queue()
    planned.push(s)
    color[s] = gray
    distance[s] = 0
    пока очередь planned не пуста:
        u = planned.pop() # Возьмём вершину из очереди.
        для каждого ребра (u,v), исходящего из u:
            возьмём вершину v
            if color[v] == white: # Серые и чёрные вершины уже
                                  # либо в очереди, либо обработаны.
                distance[v] = distance[u] + 1
                previous[v] = u
                color[v] = gray
                planned.push(v) # Запланируем посещение вершины.
        color[u] = black # Теперь вершина считается обработанной.

функция ShortestPath(v): # Кратчайший путь от s до v.
    # Класть вершины будем в стек, тогда
    # стартовая вершина окажется наверху стека
    # и порядок следования от s до v будет соответствовать
    # порядку извлечения вершин из стека.
    path = Stack()
    current_vertex = v
    while current_vertex != None: # Предшественник вершины s равен None.
        path.push(current_vertex)
        current_vertex = previous[current_vertex]
    return path 
*/

// Длины массивов равны числу вершин |V|.
let V = 12;

//получение списка исходящих вершин
const outgoingEdges = () => {};

let color = Array.from({ length: V }, () => "white");
let previous = Array.from({ length: V }, () => null);
let distance = Array.from({ length: V }, () => null);

function bfs(s) {
  // Создадим очередь вершин и положим туда стартовую вершину.
  let planned = [];
  planned.push(s);
  color[s] = "gray";
  distance[s] = 0;

  while (planned.length > 0) {
    let u = planned.shift(); // Возьмём вершину из очереди.

    for (let v of outgoingEdges(u)) {
      if (color[v] === "white") {
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
}

function shortestPath(v) {
  // Класть вершины будем в стек, тогда
  // стартовая вершина окажется наверху стека
  // и порядок следования от s до v будет соответствовать
  // порядку извлечения вершин из стека.
  let path = [];
  let currentVertex = v;

  while (currentVertex !== null) {
    // Предшественник вершины s равен null.
    path.push(currentVertex);
    currentVertex = previous[currentVertex];
  }

  return path;
}
