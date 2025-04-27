/*
Васе нужно распечатать свой список дел на сегодня. Помогите ему: напишите функцию, которая печатает все его дела. Известно, что дел у Васи не больше 5000.
Внимание: в этой задаче не нужно считывать входные данные. Нужно написать только функцию, которая принимает на вход голову списка и печатает его элементы.

Формат ввода
Длина списка не превосходит 5000 элементов. Список не бывает пустым.

Вы можете ознакомиться с инструкцией по работе с Make на платформе в разделе "Начало тема «Введение в алгоритмы», урок «Оптимизация ввода и вывода»
Формат вывода
Функция должна напечатать элементы списка по одному в строке.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }
}

function solution(node) {
  while (node) {
    process.stdout.write(`${node.value}` + `\n`);
    node = node.next;
  }
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  solution(node0);
  /*
    Output is:
    node0
    node1
    node2
    node3
    */
}
