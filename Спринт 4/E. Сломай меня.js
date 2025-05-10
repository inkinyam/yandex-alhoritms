/*
Гоша написал программу, которая сравнивает строки исключительно по их хешам. Если хеш равен, то и строки равны. Тимофей увидел это безобразие и поручил вам сломать программу Гоши, чтобы остальным неповадно было.

В этой задаче вам надо будет лишь найти две различные строки, которые для заданной хеш-функции будут давать одинаковое значение.

Гоша использует следующую хеш-функцию:
h(s)=(s 1​ a n−1 +s 2​ a n−2 +...+s n−1​ a+s n​ ) mod m
для 
a=1000 и m=123987123.

В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.
Формат ввода
В задаче единственный тест без ввода

Формат вывода
Отправьте две строки, по одной в строке. Строки могут состоять только из маленьких латинских букв и не должны превышать в длину 1000 знаков каждая. Код отправлять не требуется. Строки из примера использовать нельзя.
a - 97
z - 122
*/

let mod = 123987123;
let a = 1000;

const generateString = () => {
  let string = "";
  let maxLength = 100;

  for (let a = 0; a < maxLength; a++) {
    let char = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    string = string + char;
  }
  return string;
};

const computeHash = (line, a = 1000, mod = 123987123) => {
  let h = 0;
  for (let s = 0; s < line.length; s++) {
    h = (h * a + line.charCodeAt(s)) % mod;
  }
  return h;
};

const findCollisions = () => {
  const map = new Map();
  const maxAttempts = 1000000; // Чтобы скрипт не завис

  for (let i = 0; i < maxAttempts; i++) {
    const str = generateString();
    const hash = computeHash(str);
    if (map.has(hash)) {
      const prevStr = map.get(hash);
      if (prevStr !== str) {
        console.log(`Строка 1: "${prevStr}", хеш: ${hash}`);
        console.log(`Строка 2: "${str}", хеш: ${hash}`);
        return;
      }
    } else {
      map.set(hash, str);
    }
  }
  console.log("давай по новой");
};
findCollisions();
