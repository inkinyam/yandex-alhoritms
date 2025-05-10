/*
Алла не остановилась на достигнутом –— теперь она хочет научиться быстро вычислять хеши произвольных подстрок данной строки. Помогите ей!

На вход поступают запросы на подсчёт хешей разных подстрок. Ответ на каждый запрос должен выполняться за O(1). Допустимо в начале работы программы сделать предподсчёт для дальнейшей работы со строкой.

Напомним, что полиномиальный хеш считается по формуле

h(s)=(s1an−1+s2an−2+⋯+sn−1a+sn) mod m
В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Формат ввода
В первой строке дано число 
a (1≤a≤1000) –— основание, по которому считается хеш. Во второй строке дано число 
m (1≤m≤10^7) –— модуль. В третьей строке дана строка 
s 0≤∣s∣≤10^6), состоящая из больших и маленьких латинских букв.

В четвертой строке дано число запросов 
t –— натуральное число от 1 до 10^5. В каждой из следующих t строк записаны через пробел два числа 
l и r –— индексы начала и конца очередной подстроки. (1≤l≤r≤∣s∣).

Формат вывода
Для каждого запроса выведите на отдельной строке хеш заданной в запросе подстроки.
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

function getHashes(string, arr, base, mod) {
  const prefixHashes = new Array(string.length + 1).fill(0);
  const pow = new Array(string.length + 1).fill(1);

  for (let s = 1; s <= string.length; s++) {
    pow[s] = (pow[s - 1] * base) % mod;
    prefixHashes[s] =
      (prefixHashes[s - 1] * base + string.charCodeAt(s - 1)) % mod;
  }
  let res = [];

  for (let j = 0; j < arr.length; j++) {
    let [leftIndex, rightIndex] = arr[j].split(" ").map(Number);
    const len = rightIndex - leftIndex + 1;

    const hash =
      (prefixHashes[rightIndex] -
        ((prefixHashes[leftIndex - 1] * pow[len]) % mod) +
        mod) %
      mod;
    res.push(hash);
  }
  return res;
}

function solve() {
  const base = readInt();
  const mod = readInt();
  const string = readLine();
  let count = readInt();
  let arr = readArray(count);

  const result = getHashes(string, arr, base, mod);
  for (let i = 0; i < result.length; i++) {
    process.stdout.write(result[i].toString());
    process.stdout.write("\n");
  }
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
