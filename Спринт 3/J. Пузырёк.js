/*
чтобы выбрать самый лучший алгоритм для решения задачи, Гоша продолжил изучать разные сортировки. На очереди сортировка пузырьком — https://ru.wikipedia.org/wiki/Сортировка_пузырьком

Её алгоритм следующий (сортируем по неубыванию):

На каждой итерации проходим по массиву, поочередно сравнивая пары соседних элементов. Если элемент на позиции i больше элемента на позиции i + 1, меняем их местами. После первой итерации самый большой элемент всплывёт в конце массива.
Проходим по массиву, выполняя указанные действия до тех пор, пока на очередной итерации не окажется, что обмены больше не нужны, то есть массив уже отсортирован.
После не более чем n – 1 итераций выполнение алгоритма заканчивается, так как на каждой итерации хотя бы один элемент оказывается на правильной позиции.

Помогите Гоше написать код алгоритма.

Формат ввода
В первой строке на вход подаётся натуральное число n — длина массива, 2 ≤ n ≤ 1000.
Во второй строке через пробел записано n целых чисел.
Каждое из чисел по модулю не превосходит 1000.

Обратите внимание, что считывать нужно только 2 строки: значение n и входной массив.

Формат вывода
После каждого прохода по массиву, на котором какие-то элементы меняются местами, выводите его промежуточное состояние.
Таким образом, если сортировка завершена за k меняющих массив итераций, то надо вывести k строк по n чисел в каждой — элементы массива после каждой из итераций.
Если массив был изначально отсортирован, то просто выведите его.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function bubleSorting(size, arr) {
  const numbers = arr.split(" ").map(Number);
  let result = [];
  if (numbers.length === 0) {
    return;
  }

  for (let s = 0; s < size - 1; s++) {
    let flag = false;
    for (let i = 0; i < size - 1 - s; i++) {
      if (numbers[i] > numbers[i + 1]) {
        let swappedElement = numbers[i];
        numbers[i] = numbers[i + 1];
        numbers[i + 1] = swappedElement;
        flag = true;
      }
    }
    result = [...result, [...numbers]];
    if (!flag) break;
  }
  if (result.length === 0) result = [numbers];
  return result;
}

function solve() {
  const size = readInt();
  const arrNumbers = readStr();

  const result = bubleSorting(size, arrNumbers);
  for (let i = 0; i < result.length; i++) {
    process.stdout.write(result[i].join(" "));
    process.stdout.write("\n");
  }
}

function readInt() {
  return Number(inputLines[curLine++]);
}

function readStr() {
  return inputLines[curLine++];
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
