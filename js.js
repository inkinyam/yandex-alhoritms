function compareLines(first, second) {
  if (first.length !== second.length) return false;

  let mapFirst = new Map();
  let mapSecond = new Map();

  for (let i = 0; i < first.length; i++) {
    if (mapSecond.has(second[i]) && mapSecond.get(second[i]) !== first[i]) {
      return false;
    }
    if (mapFirst.has(first[i]) && mapFirst.get(first[i]) !== second[i]) {
      return false;
    } else {
      ``;
      mapSecond.set(second[i], first[i]);
      mapFirst.set(first[i], second[i]);
    }
  }
  return true;
}

const a = "agg";
const b = "xda";
console.log(compareLines(a, b));
