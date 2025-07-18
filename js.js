/*
Палиндром —– это строка, которая одинаково читается как слева направо, так и справа налево.

Из данной строки s путём удаления и перестановки букв надо получить палиндром максимальной длины. Среди всех таких палиндромов надо получить лексикографически минимальный. Количество удалений и перестановок символов может быть любым.

Формат ввода
В единственной строке дана строка s. Длина строки |s| ≤ 105. Строка состоит из строчных букв английского алфавита.

Формат вывода
Выведите полученный палиндром. Заметьте, что ответ определяется однозначно.
*/

function getPalindrome(str) {
  // Подсчитываем частоту каждого символа
  const charCount = {};
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Собираем символы для левой половины палиндрома
  const leftHalf = [];
  const centerChar = [];

  // Сортируем символы лексикографически
  const sortedChars = Object.keys(charCount).sort();

  for (let char of sortedChars) {
    const count = charCount[char];

    // Добавляем пары символов в левую половину
    for (let i = 0; i < Math.floor(count / 2); i++) {
      leftHalf.push(char);
    }

    // Если количество символов нечетное, один символ может быть в центре
    if (count % 2 === 1 && centerChar.length === 0) {
      centerChar.push(char);
    }
  }

  // Создаем правую половину (зеркальное отражение левой)
  const rightHalf = [...leftHalf].reverse();

  // Собираем палиндром
  const palindrome =
    leftHalf.join("") + centerChar.join("") + rightHalf.join("");

  return palindrome;
}

// Тестовые примеры
console.log("Тест 1:", getPalindrome("aaaabb")); // Ожидаем: aabbaa
console.log("Тест 2:", getPalindrome("abc")); // Ожидаем: a
console.log("Тест 3:", getPalindrome("aabb")); // Ожидаем: abba
console.log("Тест 4:", getPalindrome("xyz")); // Ожидаем: x
console.log("Тест 5:", getPalindrome("hello")); // Ожидаем: lhl
