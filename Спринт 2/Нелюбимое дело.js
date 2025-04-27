/*
Вася размышляет, что ему можно не делать из того списка дел, который он составил. Но, кажется, все пункты очень важные! Вася решает загадать число и удалить дело, которое идёт под этим номером. Список дел представлен в виде односвязного списка. Напишите функцию solution, которая принимает на вход голову списка и номер удаляемого дела и возвращает голову обновлённого списка.
Внимание: в этой задаче не нужно считывать входные данные. Нужно написать только функцию, которая принимает на вход голову списка и номер удаляемого элемента и возвращает голову обновлённого списка.

Формат ввода
Функция принимает голову списка и индекс элемента, который надо удалить (нумерация с нуля). Список содержит не более 5000 элементов. Список не бывает пустым.

Вы можете ознакомиться с инструкцией по работе с Make на платформе в разделе "Начало тема «Введение в алгоритмы», урок «Оптимизация ввода и вывода»
Формат вывода
Верните голову списка, в котором удален нужный элемент.
 */

if (process.env.REMOTE_JUDGE !== "true") {
  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }
}

function getNodeByIndex(node, index) {
  while (index) {
    if (!node.next) return null;
    else {
      node = node.next;
      index -= 1;
    }
  }
  return node;
}

function solution(node, idx) {
  if (!node || idx < 0) {
    return node;
  }

  const prevNode = getNodeByIndex(node, idx - 1);
  const nextNode = getNodeByIndex(node, idx + 1);
  if (prevNode) {
    if (nextNode) {
      prevNode.next = nextNode;
    } else {
      prevNode.next = null;
    }
    return node;
  } else {
    return nextNode;
  }
}

function test() {
  var node3 = new Node("node3");
  var node2 = new Node("node2", node3);
  var node1 = new Node("node1", node2);
  var node0 = new Node("node0", node1);
  var newHead = solution(node0, 1);
  // result is node0 -> node2 -> node3
}
