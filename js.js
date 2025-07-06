/*
На Алгосах устроили турнир по настольному теннису. Гоша выиграл n партий, получив при этом некоторое количество очков за каждую из них.

Гоше стало интересно, можно ли разбить все заработанные им во время турнира очки на две части так, чтобы сумма в них была одинаковой.

Формат ввода
В первой строке записано целое число n (0 ≤ n ≤ 300) –— количество выигранных партий.

Во второй строке через пробел записано n целых неотрицательных чисел, каждое из которых не превосходит 300 –— заработанные в партиях очки.

Формат вывода
Нужно вывести True, если произвести такое разбиение возможно, иначе —– False

*/

let countMatches = 3;
let earnings = [2, 10, 9];

function isEarningsDivisible(countMatches, earnings) {
  // Если нет партий, то нельзя разделить
  if (countMatches === 0) {
    return false;
  }

  // Вычисляем общую сумму очков
  const totalSum = earnings.reduce((sum, points) => sum + points, 0);

  // Если общая сумма нечетная, то нельзя разделить на две равные части
  if (totalSum % 2 !== 0) {
    return false;
  }

  const targetSum = totalSum / 2;

  // Используем динамическое программирование для проверки возможности
  // достижения суммы targetSum
  const dp = new Array(targetSum + 1).fill(false);
  dp[0] = true; // Базовый случай: сумма 0 всегда достижима

  for (let i = 0; i < countMatches; i++) {
    for (let j = targetSum; j >= earnings[i]; j--) {
      if (dp[j - earnings[i]]) {
        dp[j] = true;
      }
    }
  }

  return dp[targetSum];
}

// Тестируем различные примеры
console.log("Тест 1:", isEarningsDivisible(3, [4, 4, 6])); // false (сумма 14)
console.log("Тест 2:", isEarningsDivisible(2, [1, 9])); // false сумма 10
console.log("Тест 3:", isEarningsDivisible(3, [1, 1, 100])); // false сумма 102
