const commands = [
  "get 1",
  "put 1 10",
  "put 2 4",
  "get 1",
  "get 2",
  "delete 2",
  "get 2",
  "put 1 5",
  "get -1",
  "delete 2",
];

class ElementAbsentError extends Error {
  constructor() {
    super("Ошибка: Элемент отсутствует");
    this.name = "ElementAbsentError";
  }
}

class HashTable {
  constructor(size = 100007) {
    this.table = new Array(size);
    this.size = size;
    this.base = 0.6180339887;
  }

  getHash(key) {
    return Math.floor(
      Math.abs(Number(key) * this.base + this.size) % this.size
    );
  }

  put(key, value) {
    const index = this.getHash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    const bucket = this.table[index];

    for (let b = 0; b < bucket.length; b++) {
      if (bucket[b][0] === key) {
        bucket[b][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
  }

  get(key) {
    const index = this.getHash(key);
    const bucket = this.table[index];

    if (!bucket) throw new ElementAbsentError();

    for (const [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }

    throw new ElementAbsentError();
  }

  delete(key) {
    const index = this.getHash(key);
    const bucket = this.table[index];

    if (!bucket) throw new ElementAbsentError();
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        const deletedValue = bucket[i][1];
        bucket.splice(i, 1);
        return deletedValue;
      }
    }
    throw new ElementAbsentError();
  }
}

const handleHashOperations = (commands) => {
  let hashTable = new HashTable();
  const res = [];

  for (const commandStr of commands) {
    const [command, key, value] = commandStr.split(" ");
    switch (command) {
      case "get":
        try {
          res.push(hashTable.get(key));
        } catch (error) {
          res.push("None");
        }
        break;

      case "put":
        hashTable.put(key, value);
        break;

      case "delete":
        try {
          res.push(hashTable.delete(key));
        } catch (error) {
          res.push("None");
        }
        break;
    }
  }

  return res;
};

console.log(handleHashOperations(commands));
