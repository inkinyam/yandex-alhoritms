/*
Алла хочет доказать, что она умеет прыгать вверх по лестнице быстрее всех. На этот раз соревнования будут проходить на специальной прыгательной лестнице. С каждой её ступеньки можно прыгнуть вверх на любое расстояние от 1 до k. Число k придумывает Алла.

Гоша не хочет проиграть, поэтому просит вас посчитать количество способов допрыгать от первой ступеньки до n-й. Изначально все стоят на первой ступеньке.

Формат ввода
В единственной строке даны два числа — n и k (1 ≤ n ≤ 1000, 1 ≤ k ≤ n).

Формат вывода
Выведите количество способов по модулю 109 + 7.
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

function answer(steps, height) {
  const MOD = 1000000007;
  const dp = Array(height + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= height; i++) {
    for (let j = 1; j <= steps; j++) {
      if (i - j >= 1) {
        dp[i] = (dp[i] + dp[i - j]) % MOD;
      }
    }
  }
  return dp[height].toString();
}
function solve() {
  const data = readStr();
  const [height, steps] = data.split(" ").map(Number);

  const result = answer(steps, height);
  process.stdout.write(result);
}

function readStr() {
  const n = inputLines[curLine];
  curLine++;
  return n;
}
