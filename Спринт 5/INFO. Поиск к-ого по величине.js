function calculateSizes(root) {
  // Базовый случай рекурсии – это пустое дерево из нуля вершин.
  if (root === null) {
    return 0;
  }
  // Иначе суммируем размеры левого и правого поддерева
  // и прибавляем саму вершину root.
  root.size = 1 + calculateSizes(root.left) + calculateSizes(root.right);
  return root.size;
}
function findKth(root, k) {
  // Вычисляем размер левого поддерева с учётом того,
  // что оно может быть пустым.
  const leftSize = root.left === null ? 0 : root.left.size;
  // Если слева ровно k вершин, то искомая вершина - корень.
  if (leftSize === k) {
    return root.value;
  }
  // Если левое поддерево слишком мало, то продолжим
  // поиск в правом поддереве.
  if (leftSize < k) {
    return findKth(root.right, k - leftSize - 1);
  }
  // Иначе продолжим поиск в левом поддереве.
  return findKth(root.left, k);
}
