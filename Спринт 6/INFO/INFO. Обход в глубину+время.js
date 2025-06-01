/*

* */
let color = ["white", "white" /* ... */];
let time = 0;
let entry = [null, null /* ... */];
let leave = [null, null /* ... */];

const getOutgoingEdges = () => {
  // Получите список исходящих ребер в зависимости от способа хранения графа
};
function DFS(v) {
  time += 1; // При входе в вершину время (номер шага) увеличивается.
  entry[v] = time; // Запишем время входа.
  color[v] = "gray";
  for (let w of getOutgoingEdges(v)) {
    if (color[w] === "white") {
      DFS(w);
    }
  }
  time += 1; // Перед выходом из вершины время снова обновляется.
  leave[v] = time; // Запишем время выхода.
  color[v] = "black";
}
