const bench = require("../bench");


const items = [];
for (let i = 0; i < 1e5; ++i) {
  items.push({ value: i });
}


function case1() {
  return items
    .map(item => item.value)
    .filter(value => value % 2)
    .reduce((prev, cur) => prev + cur, 0);
}

function case2() {
  let oddSum = 0;
  for (let i = 0; i < items.length; ++i) {
    if (items[i].value % 2) {
      oddSum += items[i].value;
    }
  }
  return oddSum;
}


bench(null, [
  { name: "Functional", callback: case1 },
  { name: "Imperative", callback: case2 }
], { runCasesFirst: true });
