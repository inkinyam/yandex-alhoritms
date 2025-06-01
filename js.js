const n = 5;
const m = 3;
const arr = [
  [3, 2],
  [3, 4],
  [2, 5],
];

function topSort(n, arr) {
  let color = new Array(n + 1).fill("white");
  let order = [];

  const getOutgoingEdges = (vertex) => {
    let vertexes = [];
    for (let i = 0; i < arr.length; i++) {
      let [from, to] = arr[i];
      if (from === vertex) {
        vertexes.push(to);
      }
    }
    return vertexes;
  };

  function DFS(v) {
    color[v] = "gray";

    for (let w of getOutgoingEdges(v)) {
      if (color[w] === "white") {
        DFS(w);
      }
    }
    color[v] = "black";
    order.push(v);
  }

  for (let i = n + 1; i >= 1; i--) {
    if (color[i] === "white") {
      DFS(i);
    }
  }

  return order.reverse();
}
console.log(topSort(n, arr));
