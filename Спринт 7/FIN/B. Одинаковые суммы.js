/*
1. ОТЧЕТ
- https://contest.yandex.ru/contest/25597/run-report/139903331/
2. ПРИНЦИП РАБОТЫ
Нам нужно проверить, можно ли из цифр, которые означают заработанные балы сложить суммы, которые являются половиной общей суммы.

Для этого первым делом проверим граничные случаиесли всего матчей было 0, сразу вернем False, потому что складывать не из чего.
Далее посчитаем общую сумму баллов, чтобы было с чем сравнивать, и проверим второй граничный случай, делится ли общая сумма баллов на нужное количество частей, сразу вернем False, если не делится без остатка.

Далее составляем матрицу dp размером которое необходимо для "набора" баллами (totalSum % PARTS_COUNT), опишем базовый случай, dp[0] = true (сумма 0 всегда достижима), далее проходимся двумя циклами, первый: по заработанным баллам, второй для каждого числа проверяем какие суммы можно получить добавив это число. Идем в обратном порядке с чисел, чтобы не обработать одно и то же число несколько раз.
В итоге у нас в dp[targetSumm] будет решение задачи, true/false 

3. ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ
- Сумма 0 всегда достижима (просто не берем ни одного числа из "баллов"

Предположение: После обработки первых i чисел, dp[j]  будет меть значение true, когда можно набрать сумму j из первых i чисел.
Рассмотрим для i+1-го числа:

Пусть мы обрабатываем число earnings[i] = x:
Если dp[j] = true после обработки i чисел, то dp[j] будет true и после обработки i+1 чисел (не используея новое число)
Если dp[j-x] = true после обработки i чисел, то dp[j] после обработки i+1 чисел будет тоже true (используя новое число x)

Обратно: Если dp[j] = true после обработки i+1 чисел, то либо:
dp[j]  было true и после обработки i чисел (не использовали новое число)
dp[j-x] было   true после обработки i чисел (использовали новое число)

4. ВРЕМЕННАЯ СЛОЖНОСТЬ
 - проверить на длину матчей O(1)
 - посчитать сумму O(countMatches)
 - высчитать targetSum  O(1)
 - первый цикл O(countMatches)
 - второй цикл O(targetSum)

 Итого: O(countMatches) +  O(countMatches * targetSum)
 
5. ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
 - входящие данные
    countMatches = O(1)
    earnings = O(countMatches)
 - totalSum, targetSum =  O(2)
 - массив dp = O(targetSum)

 Общее занятое пространство O(countMatches) + O(targetSum)
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

const PARTS_COUNT = 2;

function isEarningsDivisible(countMatches, earnings) {
  if (countMatches === 0) {
    return false;
  }

  const totalSum = earnings.reduce((sum, points) => sum + points, 0);

  if (totalSum % PARTS_COUNT !== 0) {
    return false;
  }

  const targetSum = totalSum / PARTS_COUNT;

  const dp = new Array(targetSum + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < countMatches; i++) {
    for (let j = targetSum; j >= earnings[i]; j--) {
      if (dp[j - earnings[i]]) {
        dp[j] = true;
      }
    }
  }

  return dp[targetSum];
}

function solve() {
  const countMatches = readInt();
  const earnings = readLine().split(" ").map(Number);
  const result = isEarningsDivisible(countMatches, earnings);

  process.stdout.write(result === false ? "False" : "True");
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
