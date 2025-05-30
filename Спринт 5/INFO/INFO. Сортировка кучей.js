/*
функция heapsort(array):
  # Создадим пустую бинарную кучу.
  heap = []
  
  # Вставим в неё по одному все элементы массива, сохраняя свойства кучи.
  для каждого элемента item из массива array:
    heap_add(heap, item)   # псевдокод для heap_add можно посмотреть в прошлом уроке
  
  # Будем извлекать из неё наиболее приоритетные элементы, удаляя их из кучи.
  sorted_array = []
  i = 0
  до тех пор, пока куча не пуста:
    heap, sorted_array[i] = heap_get_max_priority(heap) 
    # псевдокод для heap_get_max_priority можно посмотреть в прошлом уроке
    i += 1 
*/

function siftDown(heap, index) {
  const left = 2 * index;
  const right = 2 * index + 1;

  // Нет дочерних узлов
  if (left >= heap.length) {
    return;
  }

  // right < heap.length проверяет, что есть оба дочерних узла
  const indexLargest =
    right < heap.length && heap[right] > heap[left] ? right : left;

  if (heap[indexLargest] > heap[index]) {
    [heap[index], heap[indexLargest]] = [heap[indexLargest], heap[index]];
    siftDown(heap, indexLargest);
  }
}
function siftUp(heap, index) {
  if (index === 1) {
    return;
  }

  const parentIndex = Math.floor(index / 2);
  if (heap[parentIndex] < heap[index]) {
    [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
    siftUp(heap, parentIndex);
  }
}

function heapAdd(heap, key) {
  heap.push(key);
  const index = heap.length - 1;
  siftUp(heap, index);
}

function heapsort(array) {
  // Создадим пустую бинарную кучу.
  let heap = [null];

  // Вставим в неё по одному все элементы массива, сохраняя свойства кучи.
  for (let item of array) {
    heapAdd(heap, item);
  }

  function popMax(heap) {
    const result = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.pop();
    siftDown(heap, 1);
    return result;
  }

  // Будем извлекать из неё наиболее приоритетные элементы, удаляя их из кучи.
  let sortedArray = [];
  while (heap.length > 1) {
    let max = popMax(heap);
    sortedArray.push(max);
  }
  return sortedArray;
}
