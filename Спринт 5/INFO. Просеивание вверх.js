/*
функция heap_add(heap, key):
    index = heap.size + 1
    heap[index] = key
    sift_up(heap, index)

функция sift_up(heap, index):
    если index == 1, то
        завершить работу
    parent_index = index / 2  (целочисленное деление)
    если heap[parent_index] < heap[index], то
        обменять местами heap[parent_index] и heap[index]
        sift_up(heap, parent_index) 
*/

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
