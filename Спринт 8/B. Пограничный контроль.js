/*
Представьте, что вы работаете пограничником и постоянно проверяете документы людей по записи из базы. При этом допустима ситуация, когда имя человека в базе отличается от имени в паспорте на одну замену, одно удаление или одну вставку символа. Если один вариант имени может быть получен из другого удалением одного символа, то человека пропустят через границу. А вот если есть какое-либо второе изменение, то человек грустно поедет домой или в посольство.

Например, если первый вариант —– это «Лена», а второй — «Лера», то девушку пропустят. Также человека пропустят, если в базе записано «Коля», а в паспорте — «оля».

Однако вариант, когда в базе числится «Иннокентий», а в паспорте написано «ннакентий», уже не сработает. Не пропустят также человека, у которого в паспорте записан «Иинннокентий», а вот «Инннокентий» спокойно пересечёт границу.

Напишите программу, которая сравнивает имя в базе с именем в паспорте и решает, пропускать человека или нет. В случае равенства двух строк — путешественника, естественно, пропускают.

Формат ввода
В первой строке дано имя из паспорта.

Во второй строке —- имя из базы.

Обе строки состоят из строчных букв английского алфавита. Размер каждой строки не превосходит 100 000 символов.

Формат вывода
Выведите «OK», если человека пропустят, или «FAIL» в противном случае.

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

function compare(string1, string2) {
  // Если строки равны, сразу возвращаем OK
  if (string1 === string2) {
    return "OK";
  }

  const len1 = string1.length;
  const len2 = string2.length;

  // Если разница в длине больше 1, то нужно больше одной операции
  if (Math.abs(len1 - len2) > 1) {
    return "FAIL";
  }

  // Если строки одинаковой длины, проверяем на замену
  if (len1 === len2) {
    let differences = 0;
    for (let i = 0; i < len1; i++) {
      if (string1[i] !== string2[i]) {
        differences++;
        if (differences > 1) {
          return "FAIL";
        }
      }
    }
    return "OK";
  }

  // Если разница в длине равна 1, проверяем на вставку/удаление
  // Будем считать, что string1 - более длинная строка
  let shorter = len1 < len2 ? string1 : string2;
  let longer = len1 < len2 ? string2 : string1;

  let i = 0; // индекс в короткой строке
  let j = 0; // индекс в длинной строке
  let skipped = false; // флаг пропуска символа

  while (i < shorter.length && j < longer.length) {
    if (shorter[i] === longer[j]) {
      i++;
      j++;
    } else {
      if (skipped) {
        return "FAIL"; // уже пропустили один символ
      }
      skipped = true;
      j++; // пропускаем символ в длинной строке
    }
  }

  return "OK";
}

function solve() {
  const string1 = readLine();
  const string2 = readLine();

  const result = compare(string1, string2);
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
