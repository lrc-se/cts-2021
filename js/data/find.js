const bench = require("../bench");


const list = [];
const obj = {};
const map = new Map();
for (let i = 0; i < 1e5; ++i) {
  const item = { id: i.toString(), value: i };
  list.push(item);
  obj[item.id] = item;
  map.set(item.id, item);
}


function case1() {
  const item = list.find(i => i.id === "55555");
  return item.value;
}

function case2() {
  const item = obj["55555"];
  return item.value;
}

function case3() {
  const item = map.get("55555");
  return item.value;
}


bench(null, [
  { name: "Array", callback: case1 },
  { name: "Object", callback: case2 },
  { name: "Map", callback: case3 }
], { runCasesFirst: true });
