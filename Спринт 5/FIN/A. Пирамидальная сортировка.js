/*
1. ОТЧЕТ
 https://admin.contest.yandex.ru/submissions/138866563
м2 https://admin.contest.yandex.ru/submissions/138905123

2. ПРИНЦИП РАБОТЫ
Создаем класс Heap, у которого есть несколько методов:
- добавление элемента в конец кучи
- удаление элемента 
- просеивание вниз (используется при удалении элемента)
- просеивание вверх (используется при добавлении элемента в конец)
- внутренний метод для сравнения элементов

Куча фактически является массивом, в котором нулевой элемент = null для корректности расчетов с началом массива в 1. 
При добавлении элемента используется просеивание вверх, при котором сравниваются добавленный элемент и его корень, в случае, если корень менее приоритетен, чем добавленный элемент, они меняются местами, 
и далее  функция рекурсивно исполняется дойдя корня всего дерева (первого элемента массива) или до момента, когда условие перестанет выполняться.

При удалении элемента используется просеивание вниз, при котором  берется самый последний элемент из кучи (массива), вставляется на место максимального элемента (и удаляется с конца),
и далее начинается сравнение этого элемента с его нынешними дочерними элементами, они меняются местами в случае, если дочерний элемент более приоритетен чем вставленный корень. 
Далее рекурсивно выполняется эта же функция уже для элемента, который становится дочерним до момента когда не дойдет до последних дочерних элементов или условие проверки не перестанет выполняться. 
Вторая часть дерева при этом не затрагивается.

В самой функции pyramidSort  мы сначала добавляем элементы в кучу heap, а далее извлекаем из нее максимальные элементы. В результате получаем отсортированный по условиям задачи массив имен студентов.

3. ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ.
Реализация кучи
- куча реализована как массив с нулевым элементом null для удобства индексации кучи
- для каждого элемента  с индексом i его потомки находятся на позициях 2i и 2i+1
- родитель элемента с индексом i находится на позиции i/2
Просеивание вверх:
- при добавлении элемента в кучу он меняется со своим родителем, если является более приоритетным чем родитель
- гарантирует что после добавления элемента свойства кучи сохраняются
Просеивание вниз:
- при удалении максимального элемента, последний элемент добавляется в корень и опускается вниз, если он менее приоритетный чем его дочерние элементы
- перемещенный элемент сравнивается с обоими потомками и меняется местами с более приоритетным с ним
- гарантирует что свойства кучи после удаления максимального элемента сохраняются

4. ВРЕМЕННАЯ СЛОЖНОСТЬ
    4.1 построение кучи, общая сложность O(N*logN)
        каждый элемент добавляется в конец кучи O(1), после добавления выполняется siftUp для восстановления свойств кучи, 
        в худшем случае пройдет из самого нижнего уровня (листа) до корня кучи за О(logN)
        высота кучи logN, соответственно siftUp выполняется за O(logN), 
        так как нужно произвести эту операцию для n элементов, общая сложность составит O(N*logN)

    4.2 извлечение элементов из кучи, общая сложность O(N*logN)
        извлечь нужно N элементов из кучи, замена корня последним элементом за O(1), удаление последнего элемента за O(1),
        выполнение siftDown выполняется в худшем случае за O(logN), когда элементу нужно пройти из корня в самый нижний уровень (лист)
        соответственно для извлечения N элементов потребуется O(N*logN) времени
    
    4.3 сравнение элементов, общая сложность О(1)
        разбиение строки О(1)
        преобразование в число О(1)
        сравнение чисел О(1)
        сравнение строк О(1)

    Общая сложность выполнения алгоритма: O(N*logN+O(N*logN)+O(1) ~ O(N*logN)

5. ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
-массив входных данных O(N)
-хранение кучи O(N)
-результирующий массив O(N)

Дополнительная память:
- переменные для метода siftDown - 3*O(1) 
- переменные для метода siftUp - O(1)
- итеративные просеивания вниз и вверх занимают теперь O(1) памяти
- переменные для разбиения строк для сравнения 2*O(1)

6.ИЗМЕНЕНИЯ С ПЕРВОЙ ВЕРСИИ

1. Функцию сравнения вынесла из класса, теперь она передается в конструктор для возможности использовать разные методы сравнения в разных экземплярах класса Heap
2. Функция сравнения стала более оптимальной, она теперь не разбивает сравниваемые элементы на куски для сравнения, а просто их сравнивает.
3. Методы siftUp, siftDown теперь работают итеративно, чтобы не занимать память на рекурсивные вызовы.

Доказательство корректности итеративных методов:
- есть условия выхода из цикла, если элемент находится на правильном месте
- есть условия выхода в siftDown, если цикл дошел до конца кучи
*/
const _readline = require("readline");

const _reader = _readline.createInterface({
  input: process.stdin,
});

const inputLines = [];
let curLine = 0;

_reader.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

class Heap {
  constructor(comparator) {
    this.items = [null];
    this.comparator = comparator;
  }
  siftDown(index) {
    while (true) {
      const left = 2 * index;
      const right = 2 * index + 1;

      if (left >= this.items.length) {
        break;
      }

      const indexLargest =
        right < this.items.length &&
        this.comparator(this.items[right], this.items[left]) > 0
          ? right
          : left;

      if (this.comparator(this.items[indexLargest], this.items[index]) > 0) {
        [this.items[index], this.items[indexLargest]] = [
          this.items[indexLargest],
          this.items[index],
        ];
        index = indexLargest;
      } else {
        break;
      }
    }
  }

  siftUp(index) {
    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      if (this.comparator(this.items[parentIndex], this.items[index]) < 0) {
        [this.items[parentIndex], this.items[index]] = [
          this.items[index],
          this.items[parentIndex],
        ];
        index = parentIndex;
      } else {
        break;
      }
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
}

const compareElements = (a, b) => {
  const [low_a, hight_a, medium_a] = a;
  const [low_b, hight_b, medium_b] = b;

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
};

const pyramidSort = (array) => {
  const heap = new Heap(compareElements);

  for (let item of array) {
    heap.addElement(item);
  }

  let sortedArr = [];
  while (heap.items.length > 1) {
    let maxEl = heap.popMax()[0];
    sortedArr.push(maxEl);
  }

  return sortedArr;
};

function solve() {
  const count = readInt();
  const list = readArray(count);
  const splittedList = list.map((item) => item.split(" "));
  const result = pyramidSort(splittedList);
  result.forEach((student) => {
    process.stdout.write(student);
    process.stdout.write("\n");
  });
}

function readInt() {
  const n = Number(inputLines[curLine]);
  curLine++;
  return n;
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(inputLines[curLine++]);
  }
  return arr;
}
