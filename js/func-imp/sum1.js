const bench = require("../bench");


const numbers = [];
for (let i = 0; i < 1e5; ++i) {
  numbers.push(i);
}


function case1() {
  return numbers.reduce((prev, cur) => prev + cur, 0);
}

function case2() {
  let sum = 0;
  numbers.forEach(number => {
    sum += number;
  });
  return sum;
}

function case3() {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}

function case4() {
  let sum = 0;
  for (let i = 0; i < numbers.length; ++i) {
    sum += numbers[i];
  }
  return sum;
}


bench(null, [
  { name: "Functional reduce", callback: case1 },
  { name: "Functional for-each", callback: case2 },
  { name: "Imperative new for loop", callback: case3 },
  { name: "Imperative classic for loop", callback: case4 }
], { runCasesFirst: true });
