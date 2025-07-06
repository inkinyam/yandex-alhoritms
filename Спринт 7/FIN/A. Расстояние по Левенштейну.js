/*
1. ОТЧЕТ https://contest.yandex.ru/contest/25597/run-report/139902212/
2. ПРИНЦИП РАБОТЫ
Используем динамическое программирование для построения матрицы dp[i][j]. где указаны минимальные расстояния между первыми i символами firstString и первыми j символами secondString.

составляем рекурентную формулу: Для каждой ячейки матрицы dp[i][j] проверяем три операции:
  - заменить символы, если они разные dp[i-1][j-1]+1
  - удалить символ из первой строки dp[i-1][j]+1
  - вставляем символ во вторую строку dp[i][j-1]=1
   Также добавим особый случей, если dp[i][j] === dp[i-1][j-1], оставляем без изменений
   
В итоге в [i][j] ячейке матрицы dp мы имеем минимальное "расстроение" между строками

3. ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ
Описаны базовые случаи
-чтобы превратить строку dp[i][0] в пустую, нужно удалить i символов
-чтобы превратить пустую строку dp[0][j] в пустую, нужно добавить j символов
- расстояние между пустыми строками равно 0
В процессе заполнения мы обошли все N*M строк, в каждой вычислили расстояние для подстроки. N - длина первой строки, M- длина второй строки
Для каждого элемента матрицы идет проверка всех возможных действий для сведения к одинаковому значению, при этом выбирается самое "дешевое" (минимальное) действие.

4. ВРЕМЕННАЯ СЛОЖНОСТЬ
Сложность: O(N*M), где N и M - длины строк.

5. ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
Входящие данные
- O(N) - зависит от длины 1 строки
- O(M) - завитсит от длины 2 строки
На матрицу dp = O(N*M)
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
  const n = firstString.length;
  const m = secondString.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(m + 1).fill(0));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= m; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (firstString[i - 1] === secondString[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1,
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1
        );
      }
    }
  }

  return dp[n][m];
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
