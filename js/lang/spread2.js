const bench = require("../bench");


const entries = [
  { key: "prop", value: 47 },
  { key: "foo", value: "bar" },
  { key: "baz", value: true },
  { key: "quux", value: null }
];


function case1() {
  const obj = entries.reduce((prev, entry) => ({
    ...prev,
    [entry.key]: entry.value
  }), {});
  return obj;
}

function case2() {
  const obj = Object.fromEntries(
    entries.map(entry => [entry.key, entry.value])
  );
  return obj;
}

function case3() {
  const obj = {};
  for (const entry of entries) {
    obj[entry.key] = entry.value;
  }
  return obj;
}

function case4() {
  const obj = {};
  for (let i = 0; i < entries.length; ++i) {
    obj[entries[i].key] = entries[i].value;
  }
  return obj;
}


bench(null, [case1, case2, case3, case4], { runCasesFirst: true });
