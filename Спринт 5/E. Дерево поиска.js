/*
Гоша понял, что такое дерево поиска, и захотел написать функцию, которая определяет, является ли заданное дерево деревом поиска. Значения в левом поддереве должны быть строго меньше, в правом —- строго больше значения в узле.
Помогите Гоше с реализацией этого алгоритма.
*/
if (process.env.REMOTE_JUDGE !== "true") {
  class CNode {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
}

function solution(root, min = -Infinity, max = Infinity) {
  if (root === null) {
    return true;
  }

  if (root.value <= min || root.value >= max) {
    return false;
  }

  return (
    solution(root.left, min, root.value) &&
    solution(root.right, root.value, max)
  );
}

function test() {
  var node1 = new CNode(1, null, null);
  var node2 = new CNode(4, null, null);
  var node3 = new CNode(3, node1, node2);
  var node4 = new CNode(8, null, null);
  var node5 = new CNode(5, node3, node4);
  console.assert(solution(node5));
  node4.value = 5;
  console.assert(!solution(node5));
}
