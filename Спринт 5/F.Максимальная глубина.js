/*
Алла хочет побывать на разных островах архипелага Алгосы. Она составила карту. Карта представлена в виде дерева: корень обозначает центр архипелага, узлы –— другие острова. А листья —– это дальние острова, на которые Алла хочет попасть.

Помогите Алле определить максимальное число островов, через которые ей нужно пройти для совершения одной поездки от стартового острова до места назначения, включая начальный и конечный пункты.
*/
class CNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function solution(root) {
  if (root === null) return 0;

  const leftDepth = solution(root.left);
  const rightDepth = solution(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

function test() {
  var node1 = new CNode(1, null, null);
  var node2 = new CNode(4, null, null);
  var node3 = new CNode(3, node1, node2);
  var node4 = new CNode(8, null, null);
  var node5 = new CNode(5, node3, node4);
  console.assert(solution(node5) === 3);
}
