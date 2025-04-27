/*
Нужно реализовать класс StackMax, который поддерживает операцию определения максимума среди всех элементов в стеке. Класс должен поддерживать операции push(x), где x – целое число, pop() и get_max().

Формат ввода
В первой строке записано одно число n — количество команд, которое не превосходит 10000. В следующих n строках идут команды. Команды могут быть следующих видов:


push(x) — добавить число x в стек. Число x не превышает 105;
pop() — удалить число с вершины стека;
get_max() — напечатать максимальное число в стеке;
Если стек пуст, при вызове команды get_max() нужно напечатать «None», для команды pop() — «error».

Формат вывода
Для каждой команды get_max() напечатайте результат её выполнения. Если стек пустой, для команды get_max() напечатайте «None». Если происходит удаление из пустого стека — напечатайте «error».
*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

class Stack {
  constructor() {
    this.items = [];
    this.maxStack = []; // дополнительный стек для хранения максимумов
  }

  push(item) {
    const num = parseInt(item);
    this.items.push(num);
    if (
      this.maxStack.length === 0 ||
      num >= this.maxStack[this.maxStack.length - 1]
    ) {
      this.maxStack.push(num);
    }
  }

  pop() {
    if (this.items.length === 0) return "error";
    const popped = this.items.pop();
    if (popped === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }
    return popped;
  }

  get_max() {
    if (this.items.length === 0) return "None";
    return this.maxStack[this.maxStack.length - 1];
  }
}

function solution(commands) {
  const command_arr = commands.map((command) => command.split(" "));
  let stack = new Stack();
  const res = [];

  command_arr.forEach((item) => {
    switch (item[0]) {
      case "push":
        stack.push(item[1]);
        break;
      case "pop":
        const popped = stack.pop();
        if (popped === "error") {
          res.push("error");
        }
        break;
      case "get_max":
        res.push(stack.get_max());
        break;
    }
  });

  return res;
}

function solve() {
  const commands = readArray();
  let result = solution(commands);
  result.map((item) => {
    process.stdout.write(`${item}`);
    process.stdout.write(`\n`);
  });
}

function readInt() {
  const n = Number(inputLines[curLine]);
  curLine++;
  return n;
}

function readArray() {
  const n = readInt();
  const commands = [];
  for (let i = 0; i < n; i++) {
    commands.push(inputLines[curLine].trim());
    curLine++;
  }
  return commands;
}
