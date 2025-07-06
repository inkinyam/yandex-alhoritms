/*
Палиндром —– это строка, которая одинаково читается как слева направо, так и справа налево.

Из данной строки s путём удаления и перестановки букв надо получить палиндром максимальной длины. Среди всех таких палиндромов надо получить лексикографически минимальный. Количество удалений и перестановок символов может быть любым.

Формат ввода
В единственной строке дана строка s. Длина строки |s| ≤ 105. Строка состоит из строчных букв английского алфавита.

Формат вывода
Выведите полученный палиндром. Заметьте, что ответ определяется однозначно.
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

function solve() {
  const string = readLine();

  const result = getPalindrome(string);
  process.stdout.write(result);
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
