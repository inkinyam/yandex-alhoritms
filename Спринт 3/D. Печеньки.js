/*
К Васе в гости пришли одноклассники. Его мама решила угостить ребят печеньем.

Но не всё так просто. Печенья могут быть разного размера. А у каждого ребёнка есть фактор жадности —– минимальный размер печенья, которое он возьмёт. Нужно выяснить, сколько ребят останутся довольными в лучшем случае, когда они действуют оптимально.

Каждый ребёнок может взять не больше одного печенья.

Формат ввода
В первой строке записано n —– количество детей.

Во второй —– n чисел, разделённых пробелом, каждое из которых –— фактор жадности ребёнка. Это натуральные числа, не превосходящие 1000.

В следующей строке записано число m –— количество печенек.

Далее —– m натуральных чисел, разделённых пробелом —– размеры печенек. Размеры печенек не превосходят 1000.

Оба числа n и m не превосходят 10000.

Формат вывода
Нужно вывести одно число –— количество детей, которые останутся довольными
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

function cookies(wantsArr, hasArr) {
  let sortedWants = wantsArr.sort((a, b) => a - b);
  let sortedHas = hasArr.sort((a, b) => a - b);

  let w = 0;
  let h = 0;
  let res = 0;
  while (h < hasArr.length && w < wantsArr.length) {
    if (sortedHas[h] >= sortedWants[w]) {
      res++;
      w++;
      h++;
    }
    if (sortedHas[h] < sortedWants[w]) {
      h++;
    }
  }

  return res;
}

function solve() {
  const wantsCounter = inputLines[curLine++];
  const wantsArr = inputLines[curLine++].split(" ").map(Number);
  const hasCounter = inputLines[curLine++];
  const hasArr = inputLines[curLine++].split(" ").map(Number);

  const res = cookies(wantsArr, hasArr);
  process.stdout.write(`${res}`);
}

function readStr() {
  return inputLines[curLine++];
}

function readArray(counter) {
  const arr = [];
  for (let i = 0; i < counter; i++) {
    arr.push(Number(inputLines[curLine++]));
  }
  return arr;
}
