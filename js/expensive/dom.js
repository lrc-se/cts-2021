const JSDOM = require("jsdom").JSDOM;
const bench = require("../bench");


JSDOM.fromFile(`${__dirname}/table.html`).then(dom => {
  const document = dom.window.document;
  const selector = "main > .table tbody tr:nth-last-child(2) ~ tr:not(:first-child) > td:last-child";
  const id = "last-cell";
  const idSelector = `#${id}`;

  function case1() {
    for (let i = 0; i < 100; ++i) {
      const el = document.querySelector(selector);
      el.classList.toggle("test");
    }
  }

  function case2() {
    const el = document.querySelector(selector);
    for (let i = 0; i < 100; ++i) {
      el.classList.toggle("test");
    }
  }

  function case3() {
    for (let i = 0; i < 100; ++i) {
      const el = document.querySelector(idSelector);
      el.classList.toggle("test");
    }
  }

  function case4() {
    const el = document.querySelector(idSelector);
    for (let i = 0; i < 100; ++i) {
      el.classList.toggle("test");
    }
  }

  function case5() {
    for (let i = 0; i < 100; ++i) {
      const el = document.getElementById(id);
      el.classList.toggle("test");
    }
  }

  function case6() {
    const el = document.getElementById(id);
    for (let i = 0; i < 100; ++i) {
      el.classList.toggle("test");
    }
  }

  function case7() {
    const el = document.querySelector(idSelector);
  }

  function case8() {
    const el = document.getElementById(id);
  }


  bench("Complex selector", [
    { name: "Without cached lookup", callback: case1 },
    { name: "With cached lookup", callback: case2 }
  ])
    .then(() => bench("ID selector", [
      { name: "Without cached lookup", callback: case3 },
      { name: "With cached lookup", callback: case4 }
    ]))
    .then(() => bench("Direct ID lookup", [
      { name: "Without cached lookup", callback: case5 },
      { name: "With cached lookup", callback: case6 }
    ]))
    .then(() => bench("Lookup functions", [
      { name: "querySelector", callback: case7 },
      { name: "getElementById", callback: case8 }
    ]));
});
