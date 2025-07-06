/*
Дано количество учебных занятий, проходящих в одной аудитории. Для каждого из них указано время начала и конца. Нужно составить расписание, в соответствии с которым в классе можно будет провести как можно больше занятий.

Если возможно несколько оптимальных вариантов, то выведите любой. Возможно одновременное проведение более чем одного занятия нулевой длительности.

Формат ввода
В первой строке задано число занятий. Оно не превосходит 1000. Далее для каждого занятия в отдельной строке записано время начала и конца, разделённые пробелом. Время задаётся одним целым числом h, если урок начинается/заканчивается ровно в h часов. Если же урок начинается/заканчивается в h часов m минут, то время записывается как h.m. Гарантируется, что каждое занятие начинается не позже, чем заканчивается. Указываются только значащие цифры.

Формат вывода
Выведите в первой строке наибольшее число уроков, которое можно провести в аудитории. Далее выведите время начала и конца каждого урока в отдельной строке в порядке их проведения.
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

function reshenie(arr) {
  // Преобразуем строки в числа
  let lessons = arr.map((line) => {
    const [start, end] = line.split(" ");
    return {
      start: Number(start),
      end: Number(end),
      raw: line, // для вывода в исходном формате
    };
  });

  // Сортируем по времени окончания, затем по времени начала
  lessons.sort((a, b) => {
    if (a.end !== b.end) return a.end - b.end;
    return a.start - b.start;
  });

  let selected = [];
  let currentTime = -Infinity;

  for (let lesson of lessons) {
    if (lesson.start >= currentTime) {
      selected.push(lesson);
      currentTime = lesson.end;
    }
  }

  // Формируем результат
  let result = selected.length + "\n";
  for (let lesson of selected) {
    result += lesson.start + " " + lesson.end + "\n";
  }

  return result;
}
function solve() {
  const counter = readInt();
  const list = readArray(counter);
  const result = reshenie(list);
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
