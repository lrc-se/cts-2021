const bench = require("../bench");


const numbers = [];
for (let i = 0; i < 1e4; ++i) {
  numbers.push(i);
}

function calculateAverage(arr) {
  return arr.reduce((prev, cur) => prev + cur, 0) / arr.length;
}


function case1() {
  let sum = 0;
  let i = 0;
  while (i < numbers.length && sum < calculateAverage(numbers) * 4) {
    sum += numbers[i++];
  }
  return sum;
}

function case2() {
  let sum = 0;
  let i = 0;
  const limit = calculateAverage(numbers) * 4;
  while (i < numbers.length && sum < limit) {
    sum += numbers[i++];
  }
  return sum;
}


bench(null, [
  { name: "Without cached calculation", callback: case1 },
  { name: "With cached calculation", callback: case2 }
], { runCasesFirst: true });
