/*
Алла захотела, чтобы у неё под окном были узкие клумбы с тюльпанам. На схеме земельного участка клумбы обозначаются просто горизонтальными отрезками, лежащими на одной прямой. Для ландшафтных работ было нанято n садовников. Каждый из них обрабатывал какой-то отрезок на схеме. Процесс был организован не очень хорошо, иногда один и тот же отрезок или его часть могли быть обработаны сразу несколькими садовниками. Таким образом, отрезки, обрабатываемые двумя разными садовниками, сливаются в один. Непрерывный обработанный отрезок затем станет клумбой. Нужно определить границы будущих клумб.
Рассмотрим примеры.

Пример 1:
Даны 4 отрезка: [7,8], [7, 8] ,[2,3], [6,10]. Два одинаковых отрезка [7,8] и [7,8] сливаются в один, но потом их накрывает отрезок [6,10]. Таким образом, имеем две клумбы с координатами [2,3] и [6,10].

Пример 2:
Во втором сэмпле опять 4 отрезка: [2,3], [3,4], [3,4], [5,6]. Отрезки [2,3], [3,4] и [3,4] сольются в один отрезок [2,4]. Отрезок [5,6] ни с кем не объединяется, добавляем его в ответ.

Формат ввода
В первой строке задано количество садовников n. Число садовников не превосходит 100000.
В следующих n строках через пробел записаны координаты клумб в формате: start end, где start —– координата начала, end —– координата конца. Оба числа целые, неотрицательные и не превосходят 10^7. start строго меньше, чем end.

Формат вывода
Нужно вывести координаты каждой из получившихся клумб в отдельных строках. Данные должны выводиться в отсортированном порядке —– сначала клумбы с меньшими координатами, затем —– с бОльшими.
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function findRidges(arr) {
  const coords = arr.sort((a, b) => a[0] - b[0]);
  const result = [];

  let currentStart = coords[0][0];
  let currentEnd = coords[0][1];

  for (let next = 1; next < coords.length; next++) {
    let nextElStart = coords[next][0];
    let nextElEnd = coords[next][1];
    if (nextElStart < currentStart && nextElEnd < currentEnd) {
      currentStart = Math.min(currentStart, nextElStart);
    } else if (nextElStart <= currentEnd) {
      currentEnd = Math.max(currentEnd, nextElEnd);
    } else {
      result.push([currentStart, currentEnd]);
      currentStart = coords[next][0];
      currentEnd = coords[next][1];
    }
  }
  result.push([currentStart, currentEnd]);

  return result;
}

function solve() {
  const size = readInt();
  const arrOfCoordinates = readArray(size);
  const result = findRidges(arrOfCoordinates);
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
    arr.push(inputLines[curLine++].split(" ").map(Number));
  }
  return arr;
}
