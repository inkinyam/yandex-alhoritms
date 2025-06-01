/*
order = Stack()  # В этом стеке будет записан порядок обхода.
color = [white, white, ...]

функция TopSort(v):
    color[v] = gray
    для каждого исходящего ребра (v,w):
        возьмём вершину w
        если color[w] == white, то:
            TopSort(w)
    color[v] = black
    order.push(v)  # Кладём обработанную вершину в стек.

функция MainTopSort():
    для каждого i от 0 до |V| - 1:
        если color[i] == white, то:
            TopSort(i) 
*/
let order = []; // В этом стеке будет записан порядок обхода.
let color = ["white", "white" /* ... */];

function mainTopSort(n, arr) {
  let order = [];
  let color = new Array(n);

  const getOutgoingEdges = () => {};
  function topSort(v) {
    color[v] = "gray";
    for (let w of getOutgoingEdges(v)) {
      if (color[w] == "white") {
        topSort(w);
      }
    }
    color[v] = "black";
    order.push(v); // Кладём обработанную вершину в стек.
  }

  for (let i = 0; i < n; i++) {
    if (color[i] == "white") {
      topSort(i);
    }
  }
}
