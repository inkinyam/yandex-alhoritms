const arr = [
  "alla 4 100",
  "gena 6 1000",
  "gosha 2 90",
  "rita 2 90",
  "timosha 4 80",
];

const gotToBeResult = ["gena", "timosha", "alla", "gosha", "rita"];

/*
имя задачи штрафы
сначала сравниваем задачи у кого больше, потом штрафы у кого меньше, потом имя по алфавиту
*/

class Heap {
  constructor() {
    this.items = [null];
  }
  siftDown(index) {
    const left = 2 * index;
    const right = 2 * index + 1;

    if (left >= this.items.length) {
      return;
    }
    const indexLargest =
      right < this.items.length &&
      this._compareElements(this.items[right], this.items[left]) > 0
        ? right
        : left;

    if (
      this._compareElements(this.items[indexLargest], this.items[index]) > 0
    ) {
      [this.items[index], this.items[indexLargest]] = [
        this.items[indexLargest],
        this.items[index],
      ];
      this.siftDown(indexLargest);
    }
  }

  siftUp(index) {
    if (index === 1) {
      return;
    }

    const parentIndex = Math.floor(index / 2);
    if (this._compareElements(this.items[parentIndex], this.items[index]) < 0) {
      [this.items[parentIndex], this.items[index]] = [
        this.items[index],
        this.items[parentIndex],
      ];
      this.siftUp(parentIndex);
    }
  }

  addElement(key) {
    this.items.push(key);
    const index = this.items.length - 1;
    this.siftUp(index);
  }

  popMax() {
    const result = this.items[1];
    this.items[1] = this.items[this.items.length - 1];
    this.items.pop();
    this.siftDown(1);
    return result;
  }

  _compareElements(a, b) {
    const [low_a, hight_a, medium_a] = a.split(" ");
    const [low_b, hight_b, medium_b] = b.split(" ");

    // Сравниваем количество задач (больше - выше)
    if (Number(hight_a) !== Number(hight_b)) {
      return Number(hight_a) > Number(hight_b) ? 1 : -1;
    }

    // При равном количестве задач сравниваем штрафы (меньше - выше)
    if (Number(medium_a) !== Number(medium_b)) {
      return Number(medium_a) < Number(medium_b) ? 1 : -1;
    }

    // При равных штрафах сравниваем имена по алфавиту
    return low_a < low_b ? 1 : -1;
  }
}

const pyramidSort = (array) => {
  const heap = new Heap();

  for (let item of array) {
    heap.addElement(item);
  }

  let sortedArr = [];
  while (heap.items.length > 1) {
    let maxEl = heap.popMax().split(" ")[0];
    sortedArr.push(maxEl);
  }

  return sortedArr;
};

console.log(pyramidSort(arr));
