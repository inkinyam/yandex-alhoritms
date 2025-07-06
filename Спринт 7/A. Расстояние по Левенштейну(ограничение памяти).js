/*
1. ОТЧЕТ https://contest.yandex.ru/contest/25597/run-report/139901870/

2. ПРИНЦИП РАБОТЫ
Что делаем: пытаемся найти минимальное кол-во операций для превращения одной строки в другую, для этого
- строим матрицу dp[i][j] = минимальное расстрояние между "префиксами" firstString[0...i-1], secondString[0...i-1]
 -

1. Инициализация: prev[j] = j для всех j от 0 до n
   (расстояние от пустой строки до префиксов второй строки)
2. Для каждого символа первой строки вычисляем новую строку матрицы
3. При совпадении символов: curr[j] = prev[j-1] (без изменений)
4. При несовпадении: curr[j] = min(удаление, вставка, замена)
5. Обмен массивами для следующей итерации

3. ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

4. ВРЕМЕННАЯ СЛОЖНОСТЬ
5. ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
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

function getDistance(firstString, secondString) {
  const m = firstString.length;
  const n = secondString.length;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j++) {
    prev[j] = j;
  }

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (firstString[i - 1] === secondString[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + 1);
      }
    }

    // Обмен массивами для следующей итерации
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

function solve() {
  const firstString = readLine();
  const secondString = readLine();
  const result = getDistance(firstString, secondString);
  process.stdout.write(String(result));
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
