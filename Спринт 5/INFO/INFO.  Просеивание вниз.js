/*
функция sift_down(heap, index):
    left = 2 * index 
    right = 2 * index + 1
    
    # нет дочерних узлов    
    если heap.size < left, то
        завершить работу
    
    # right <= heap.size проверяет, что есть оба дочерних узла
    если (right <= heap.size) и (heap[left] < heap[right]), то
        index_largest = right
    иначе
        index_largest = left

    если heap[index] < heap[index_largest], то
        обменять местами heap[index] и heap[index_largest]
        sift_down(heap, index_largest)


функция pop_max(heap):
  result = heap[1]
  heap[1] = heap[heap.size]
  heap.size -= 1
  sift_down(heap, 1)
  верни result 
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

function popMax(heap) {
  const result = heap[1];
  heap[1] = heap[heap.length - 1];
  heap.pop();
  siftDown(heap, 1);
  return result;
}
