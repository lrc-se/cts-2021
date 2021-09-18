const bench = require("../bench");


const sub = {
  prop: 47,
  foo: "bar",
  baz: true,
  quux: null
};

function case1() {
  const obj = { prop: "value" };
  Object.assign(obj, sub);
  return obj;
}

function case2() {
  const obj = { prop: "value", ...sub };
  return obj;
}

function case3() {
  const obj = { prop: "value" };
  for (const prop of Object.keys(sub)) {
    obj[prop] = sub[prop];
  }
  return obj;
}

function case4() {
  const obj = { prop: "value" };
  for (const prop in sub) {
    obj[prop] = sub[prop];
  }
  return obj;
}


bench(null, [
  { name: "Object.assign()", callback: case1 },
  { name: "Spread operator", callback: case2 },
  { name: "Object.keys()", callback: case3 },
  { name: "Enumeration", callback: case4 }
], { runCasesFirst: true });
