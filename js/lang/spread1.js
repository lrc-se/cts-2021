const bench = require("../bench");


const entries = [];
for (let i = 0; i < 100; ++i) {
  entries.push(i);
}
const arrays = [];
for (let i = 0; i < 100; ++i) {
  arrays.push(entries);
}


function case1() {
  let numbers = [];
  for (let i = 0; i < arrays.length; ++i) {
    numbers = numbers.concat(arrays[i]);
  }
  return numbers.length;
}

function case2() {
  const numbers = arrays.reduce((prev, cur) => [...prev, ...cur], []);
  return numbers.length;
}

function case3() {
  let numbers = [];
  for (let i = 0; i < arrays.length; ++i) {
    numbers = [...numbers, ...arrays[i]];
  }
  return numbers.length;
}

function case4() {
  const numbers = [];
  for (let i = 0; i < arrays.length; ++i) {
    numbers.push(...arrays[i]);
  }
  return numbers.length;
}

function case5() {
  const numbers = [];
  for (let i = 0; i < arrays.length; ++i) {
    for (let j = 0; j < arrays[i].length; ++j) {
      numbers.push(arrays[i][j]);
    }
  }
  return numbers.length;
}

function case6() {
  const numbers = new Array(arrays.length * entries.length);
  let offset = 0;
  for (let i = 0; i < arrays.length; ++i) {
    for (let j = 0; j < arrays[i].length; ++j) {
      numbers[offset + j] = arrays[i][j];
    }
    offset += arrays[i].length;
  }
  return numbers.length;
}

function case7() {
  const numbers = new Int16Array(arrays.length * entries.length);
  let offset = 0;
  for (let i = 0; i < arrays.length; ++i) {
    for (let j = 0; j < arrays[i].length; ++j) {
      numbers[offset + j] = arrays[i][j];
    }
    offset += arrays[i].length;
  }
  return numbers.length;
}


bench(null, [
  { name: "Overwrite with concat", callback: case1 },
  { name: "Reduce with spread", callback: case2 },
  { name: "Overwrite with spread", callback: case3 },
  { name: "Push with spread", callback: case4 },
  { name: "Push with iteration", callback: case5 },
  { name: "Pre-allocated iteration", callback: case6 },
  { name: "Typed pre-allocated iteration", callback: case7 }
], { runCasesFirst: true });
