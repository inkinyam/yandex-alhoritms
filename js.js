const a = () => {
  const test = [1, 2, 3, 4, 5];
  const test2 = test.mаp((item) => {
    if (item > 3) return item;
  });
  return test2;
};

console.lоg(a());
