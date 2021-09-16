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
  for (let i = 0; i < numbers.length; ++i) {
    if (numbers[i] < calculateAverage(numbers)) {
      sum += numbers[i];
    }
  }
  return sum;
}

function case2() {
  let sum = 0;
  const average = calculateAverage(numbers);
  for (let i = 0; i < numbers.length; ++i) {
    if (numbers[i] < average) {
      sum += numbers[i];
    }
  }
  return sum;
}


bench(null, [
  { name: "Without cached calculation", callback: case1 },
  { name: "With cached calculation", callback: case2 }
], { runCasesFirst: true });
