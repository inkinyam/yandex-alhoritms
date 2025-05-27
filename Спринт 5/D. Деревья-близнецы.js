/*
Гоше на день рождения подарили два дерева. Тимофей сказал, что они совершенно одинаковые. Но, по мнению Гоши, они отличаются.
Помогите разрешить этот философский спор!
*/

class CNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function solution(root1, root2) {
  if (root1 === null && root2 == null) {
    return true;
  }

  return isSame(root1, root2);
}

function isSame(left, right) {
  if (left === null && right === null) {
    return true;
  }

  if (left === null || right === null) {
    return false;
  }

  return (
    left.value === right.value &&
    isSame(left.left, right.left) &&
    isSame(left.right, right.right)
  );
}

function test() {
  var node1 = new CNode(1, null, null);
  var node2 = new CNode(2, null, null);
  var node3 = new CNode(3, node1, node2);

  var node4 = new CNode(1, null, null);
  var node5 = new CNode(2, null, null);
  var node6 = new CNode(3, node4, node5);

  console.assert(solution(node3, node6));
}
