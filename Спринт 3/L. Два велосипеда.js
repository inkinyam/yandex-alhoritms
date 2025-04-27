/*
Вася решил накопить денег на два одинаковых велосипеда — себе и сестре. У Васи есть копилка, в которую каждый день он может добавлять деньги (если, конечно, у него есть такая финансовая возможность). В процессе накопления Вася не вынимает деньги из копилки.

У вас есть информация о росте Васиных накоплений — сколько у Васи в копилке было денег в каждый из дней.

Ваша задача — по заданной стоимости велосипеда определить

первый день, в которой Вася смог бы купить один велосипед,
и первый день, в который Вася смог бы купить два велосипеда.
Подсказка: решение должно работать за O(log n).

Формат ввода
В первой строке дано число дней n, по которым велись наблюдения за Васиными накоплениями. 1 ≤ n ≤ 106.

В следующей строке записаны n целых неотрицательных чисел. Числа идут в порядке неубывания. Каждое из чисел не превосходит 10^6.

В третьей строке записано целое положительное число s — стоимость велосипеда. Это число не превосходит 10^6.

Формат вывода
Нужно вывести два числа — номера дней по условию задачи.

Если необходимой суммы в копилке не нашлось, нужно вернуть -1 вместо номера дня.
*/
var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

const VELO_COUNTER = 2;

function solution(moneyArr, veloPrice) {
  const secondPrice = veloPrice * VELO_COUNTER;
  const firstDay = binarySearch(moneyArr, veloPrice, 0, moneyArr.length);
  const secondDay = binarySearch(moneyArr, secondPrice, 0, moneyArr.length);

  return [firstDay, secondDay];
}

function binarySearch(arr, x, left, right) {
  if (right <= left) {
    return -1;
  }
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] >= x && (mid === 0 || arr[mid - 1] < x)) {
    /*если серединный элемент больше чем кол-во денег, при этом не равен нулю и предыдущий элемент меньше чем кол-во денег, возвращаем день, иначе ищем другоц */
    return mid + 1;
  } else if (arr[mid] < x) {
    return binarySearch(arr, x, mid + 1, right);
  } else {
    return binarySearch(arr, x, left, mid);
  }
}

function solve() {
  const counterDays = readInt();
  const moneyArr = inputLines[curLine++].split(" ").map(Number);
  const veloPrice = readInt();

  const result = solution(moneyArr, veloPrice);
  process.stdout.write(result.join(" "));
}

function readInt() {
  return Number(inputLines[curLine++]);
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
