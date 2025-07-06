/*
У Риты была строка s, Гоша подарил ей на 8 марта ещё n других строк ti, 1≤ i≤ n. Теперь Рита думает, куда их лучше поставить. Один из вариантов —– расположить подаренные строки внутри имеющейся строки s, поставив строку ti сразу после символа строки s с номером ki (в частности, если ki=0, то строка вставляется в самое начало s).

Помогите Рите и определите, какая строка получится после вставки в s всех подаренных Гошей строк.

Формат ввода
В первой строке дана строка s. Строка состоит из строчных букв английского алфавита, не бывает пустой и её длина не превышает 105 символов.

Во второй строке записано количество подаренных строк — натуральное число n, 1 ≤ n ≤ 105.

В каждой из следующих n строк через пробел записаны пары ti и ki. Строка ti состоит из маленьких латинских букв и не бывает пустой. ki — целое число, лежащее в диапазоне от 0 до |s|. Все числа ki уникальны. Гарантируется, что суммарная длина всех строк ti не превосходит 105.

Формат вывода
Выведите получившуюся в результате вставок строку. */

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

function getString(string, newStrings) {
  // Преобразуем строку в массив символов для более эффективной работы
  let chars = string.split("");

  // Парсим и сортируем вставки по убыванию индекса
  let insertions = newStrings
    .map((str) => {
      let [substring, index] = str.split(" ");
      return { substring, index: parseInt(index) };
    })
    .sort((a, b) => b.index - a.index); // Сортируем по убыванию

  // Вставляем строки в обратном порядке, чтобы индексы не смещались
  for (let insertion of insertions) {
    chars.splice(insertion.index, 0, ...insertion.substring.split(""));
  }

  return chars.join("");
}

function solve() {
  const string = readLine();
  const counter = readInt();
  const newStrings = readArray(counter);

  const result = getString(string, newStrings);
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
