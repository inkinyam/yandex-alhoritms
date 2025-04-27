/*
Отчет: https://contest.yandex.ru/contest/22781/run-report/136320739/
Отчет v2: https://contest.yandex.ru/contest/22781/run-report/136430044/

ПРИНЦИП РАБОТЫ
функция принимает число - размер дека и массив команд, которые необходимо выполнить.
Каждый элемент в массиве может иметь доп.значение (число которое нужно добавить в дек) или не иметь его, в связи с этим, разбиваем каждое значение на массив из "команды" и "значения".
Далее по массиву команд проходимся поэлементно (т.к. нам не нужен мутированный массив, используем forEach вместо map) и выполняем команду, которая пришла в первой части item, записываем в массив результатов результат выполнения команды, если он есть (при добавлении элемента в конец или начало может быть ответ 'error', если нет места в деке, и не быть ответа, если элемент был добавлен).

Для методов push_front и pop_back класса Deck реализован интересный механизм переноса tail или head: для того, чтобы исключить получение отрицательного индекса я добавляю к результату "вычисления" индекса размер дека и только потом делю на макс.кол-во элементов в деке.

ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

Из описания алгоритма следует, что чем в дек элемент может быть добавлен как в начало, так и в конец, и также может быть извлечен как с начала дека, так и с его конца.
У дека есть два указателя, на начало очереди(head) и на пустой элемент в конце(tail) в который добавляется элемент.
При добавлении элемента мы в первую очередь должны проверить, влезает ли этот элемент в очередь, если размер очереди меньше заданного, можем поместить элемент в конец очереди на место которое указывает tail (при этом передвинуть tail на +1), так и в начало на место с индексом head-1 (при этом передвинуть head на него, проверив, что индексы не являются отрицательными)
При удалении элемента, мы проверяем есть ли в очереди хотя бы один элемент, который можно удалить, далее сохраняем его в переменную, чтобы вернуть, а на его место записываем 'null' как пустое значение. В случае удаления с конца очереди, мы передвигаем tail на -1. В случае если удаляем с начала очереди, передвигаем head на +1. 

ВРЕМЕННАЯ СЛОЖНОСТЬ
На вход передается M команд  и размер очереди N.
Обработка m команд занимает O(m) времени.
В связи с тем, задача реализована на кольцевом буфере, добавление, удаление из начала или конца такого буфера всегда занимает О(1) времени. 
Проверка на переполнение/пустоту, а именно сравнение размера с 0(пустотой) или размером очереди N занимает также O(1) времени.
Итого получается, что общее решение займет O(m)*O(1) ~ O(m), поскольку каждая из m команд обрабатывается за O(1) времени


ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ
Мы храним массив команд из m элементов для выполнения действий, поэтому O(m) памяти занято хранением этих данных
Очередь содержит n элементов, соответственно, считаем, очередью занято O(n) памяти.
Мы храним массив результатов выполнения m действий, допустим размера k, при этом, некоторые действия не имеют результата, который добавляется в этот массив, поэтому мы можем считать, что k < m

Итого в худшем случае будет занято О(m)+О(n)+О(k) памяти
В лучшем случае, ~O(m)

*/

var readline = require("readline");
var ioInterface = readline.createInterface({ input: process.stdin });

const inputLines = [];
let curLine = 0;

ioInterface.on("line", (line) => {
  inputLines.push(line);
});

process.stdin.on("end", solve);

class FullDeckError extends Error {
  constructor() {
    super("Ошибка: Невозможно выполнить команду push, дек заполнен");
    this.name = "FullDeckError";
  }
}

class EmptyDeckError extends Error {
  constructor() {
    super("Ошибка: Невозможно выполнить команду pop, дек пуст");
    this.name = "EmptyDeckError";
  }
}

class Deck {
  static ERRORS = "error";
  constructor(size) {
    this.items = new Array(size).fill(null);
    this.head = 0;
    this.tail = 0;
    this.maxSize = size;
    this.size = 0;
  }
  isEmpty() {
    return this.size === 0;
  }
  isFull() {
    return this.size === this.maxSize;
  }
  increaseIterator(prevValue) {
    return (prevValue + 1) % this.maxSize;
  }

  decreaseIterator(prevValue) {
    return (prevValue - 1 + this.maxSize) % this.maxSize;
  }
  push_back(element) {
    if (this.isFull()) {
      throw new FullDeckError();
    } else {
      this.items[this.tail] = element;
      this.tail = this.increaseIterator(this.tail);
      this.size++;
    }
  }

  push_front(element) {
    if (this.isFull()) {
      throw new FullDeckError();
    } else {
      this.head = this.decreaseIterator(this.head);
      this.items[this.head] = element;
      this.size++;
    }
  }
  pop_front() {
    if (this.isEmpty()) {
      throw new EmptyDeckError();
    } else {
      let deletedElement = this.items[this.head];
      this.items[this.head] = null;
      this.head = this.increaseIterator(this.head);
      this.size--;
      return deletedElement;
    }
  }

  pop_back() {
    if (this.isEmpty()) {
      throw new EmptyDeckError();
    } else {
      this.tail = this.decreaseIterator(this.tail);
      let deletedElement = this.items[this.tail];
      this.items[this.tail] = null;
      this.size--;
      return deletedElement;
    }
  }
}

function solution(maxDeckSize, commands) {
  const commandList = commands.map((command) => command.split(" "));
  let deck = new Deck(maxDeckSize);
  const res = [];

  commandList.forEach((item) => {
    switch (item[0]) {
      case "push_back":
        try {
          deck.push_back(item[1]);
        } catch (error) {
          res.push("error");
        }
        break;

      case "push_front":
        try {
          deck.push_front(item[1]);
        } catch (error) {
          res.push("error");
        }
        break;

      case "pop_front":
        try {
          res.push(deck.pop_front());
        } catch (error) {
          res.push("error");
        }
        break;

      case "pop_back":
        try {
          res.push(deck.pop_back());
        } catch (error) {
          res.push("error");
        }
        break;
    }
  });

  return res;
}

function solve() {
  const commandCounts = readInt();
  const maxDeckSize = readInt();
  const commands = readArray(commandCounts);

  let result = solution(maxDeckSize, commands);
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

function readArray(counter) {
  const commands = [];
  for (let i = 0; i < counter; i++) {
    commands.push(inputLines[curLine].trim());
    curLine++;
  }
  return commands;
}
