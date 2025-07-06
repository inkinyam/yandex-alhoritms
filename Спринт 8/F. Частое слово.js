/*
Дан набор слов, слова могут повторяться. Среди них надо найти самое частое слово. Если таких слов несколько, то выведите лексикографически наименьшее.

Формат ввода
В первой строке дано число n (1 ≤ n ≤ 103) — количество строк. В следующих n строках даны слова, состоящие из строчных букв английского алфавита. Слово не бывает пустым. Суммарная длина слов не превосходит 107. Длина одного слова не превосходит 105.

Формат вывода
Выведите единственную строку – наиболее частое слово, лексикографически минимальное, если самых частых слов несколько.
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

function compare(arr) {
  const wordFrequency = new Map();
  let maxFrequency = 0;
  let mostFrequentWord = "";

  // Один проход: подсчитываем частоты и сразу находим максимум
  for (const word of arr) {
    const currentFreq = (wordFrequency.get(word) || 0) + 1;
    wordFrequency.set(word, currentFreq);

    // Сразу обновляем максимум и лексикографически минимальное слово
    if (
      currentFreq > maxFrequency ||
      (currentFreq === maxFrequency && word < mostFrequentWord)
    ) {
      maxFrequency = currentFreq;
      mostFrequentWord = word;
    }
  }

  return mostFrequentWord;
}

function solve() {
  const counter = readInt();
  const arr = readArray(counter);

  const result = compare(arr);
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
