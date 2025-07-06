/*
Теперь черепашке Кондратине надо узнать не только, сколько цветочков она может собрать, но и как ей построить свой маршрут для этого. Помогите ей!

Напомним, что Кондратине надо дойти от левого нижнего до правого верхнего угла, а передвигаться она умеет только вверх и вправо.

Формат ввода
В первой строке даны размеры поля n и m (через пробел). Оба числа лежат в диапазоне от 1 до 1000. В следующих n строках задано поле. Каждая строка состоит из m символов 0 или 1 и завершается переводом строки. Если в клетке записана единица, то в ней растет цветочек.

Формат вывода
Выведите в первой строке максимальное количество цветочков, которое сможет собрать Кондратина. Во второй строке выведите маршрут в виде последовательности символов «U» и «R», где «U» означает передвижение вверх, а «R» – передвижение вправо.

Если возможных оптимальных путей несколько, то выведите любой.
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

function solve() {
  const size = readLine();
  const [n, m] = size.split(" ").map(Number);
  const matrix = readMatrix(n);

  const [maxFlowers, path] = answer(matrix);
  process.stdout.write(maxFlowers + "\n" + path);
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
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
function readMatrix(rowsCount) {
  var arr = [];
  for (let i = 0; i !== rowsCount; i++) {
    let line = readLine();
    arr.push(line.split("").map(Number));
  }
  return arr;
}

function answer(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;
  // Используем только два ряда dp для экономии памяти
  let dp = Array.from({ length: 2 }, () => Array(m).fill(0));
  // Для восстановления пути будем хранить направление, откуда пришли
  // 0 - слева (R), 1 - снизу (U)
  let from = Array.from({ length: n }, () => Array(m).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let best = -1;
      let dir = -1;
      if (i > 0 && dp[(i - 1) % 2][j] > best) {
        best = dp[(i - 1) % 2][j];
        dir = 1; // пришли снизу
      }
      if (j > 0 && dp[i % 2][j - 1] > best) {
        best = dp[i % 2][j - 1];
        dir = 0; // пришли слева
      }
      if (i === 0 && j === 0) {
        dp[i % 2][j] = matrix[i][j];
        from[i][j] = -1;
      } else {
        dp[i % 2][j] = best + matrix[i][j];
        from[i][j] = dir;
      }
    }
  }

  // Восстановление пути
  let path = [];
  let i = n - 1,
    j = m - 1;
  while (from[i][j] !== -1) {
    if (from[i][j] === 1) {
      path.push("U");
      i--;
    } else {
      path.push("R");
      j--;
    }
  }
  path.reverse(); // Важно: путь строится с конца, поэтому разворачиваем
  return [dp[(n - 1) % 2][m - 1], path.join("")];
}
