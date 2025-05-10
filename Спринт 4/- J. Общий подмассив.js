/* 
Гоша увлёкся хоккеем и часто смотрит трансляции матчей. Чтобы более-менее разумно оценивать силы команд, он сравнивает очки, набранные во всех матчах каждой командой.

Гоша попросил вас написать программу, которая по результатам игр двух выбранных команд найдёт наибольший по длине отрезок матчей, когда эти команды зарабатывали одинаковые очки.

Рассмотрим первый пример:

Результаты первой команды: [1 2 3 2 1].

Результаты второй команды: [3 2 1 5 6].

Наиболее продолжительный общий отрезок этих массивов имеет длину 3 –— это [3 2 1].

Формат ввода
В первой строке находится число n (1 ≤ n ≤ 105) –— количество матчей, которые были сыграны первой командой.

Во второй строке записано n целых чисел –— очки в этих играх.

В третьей строке дано число m (1 ≤ m ≤ 105) —– количество матчей, которые сыграла вторая команда.

В четвертой строке заданы m целых чисел —– результаты второй команды.

Число очков, заработанных в одной игре, лежит в диапазоне от 0 до 255.

Формат вывода
Выведите целое неотрицательное число —– максимальное количество матчей подряд, в которых команды зарабатывали одинаковые очки.
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

function compareLines(first, second) {
  const n = first.length;
  const m = second.length;
  let maxLength = 0;

  const indices = new Map();
  for (let i = 0; i < n; i++) {
    if (!indices.has(first[i])) {
      indices.set(first[i], []);
    }
    indices.get(first[i]).push(i);
  }

  for (let j = 0; j < m; j++) {
    const matches = indices.get(second[j]);
    if (matches) {
      for (const i of matches) {
        let length = 0;
        while (
          i + length < n &&
          j + length < m &&
          first[i + length] === second[j + length]
        ) {
          length++;
        }
        maxLength = Math.max(maxLength, length);
      }
    }
  }

  return maxLength;
}

function solve() {
  const count1 = readInt();
  const first = readLine().split(" ").map(Number);
  const count2 = readInt();
  const second = readLine().split(" ").map(Number);
  const result = compareLines(first, second);
  process.stdout.write(result.toString());
}

function readLine() {
  const line = inputLines[curLine];
  curLine++;
  return line;
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
