const bench = require("../bench");


class FooClass1 {
  constructor(bar) {
    this.bar = bar;
  }

  toString() {
    return `My bar is a ${this.bar}`;
  }
}

function FooConstructor(bar) {
  this.bar = bar;
}

FooConstructor.prototype.toString = function() {
  return `My bar is a ${this.bar}`;
};

const FooProto1 = {
  toString() {
    return `My bar is a ${this.bar}`;
  }
};

function createFoo1(bar) {
  const obj = Object.create(FooProto1);
  obj.bar = bar;
  return obj;
}

const FooProto2 = {
  init(bar) {
    this.bar = bar;
    return this;
  },

  toString() {
    return `My bar is a ${this.bar}`;
  }
};

function createFoo2(bar) {
  return Object.create(FooProto2).init(bar);
}

function createFoo3(bar) {
  const obj = {
    bar,

    toString() {
      return `My bar is a ${obj.bar}`;
    }
  };
  return obj;
}

class FooClass2 {
  constructor(bar) {
    this.bar = bar;
    this.toString = this.toString.bind(this);
  }

  toString() {
    return `My bar is a ${this.bar}`;
  }
}

class FooClass3 {
  constructor(bar) {
    this.bar = bar;
    this.toString = () => {
      return `My bar is a ${this.bar}`;
    };
  }
}

class FooClass4 {
  constructor(bar) {
    this.bar = bar;
  }

  toString = () => {
    return `My bar is a ${this.bar}`;
  };
}


function case1() {
  const foo = new FooClass1("bar");
  return foo.toString();
}

function case2() {
  const foo = new FooConstructor("bar");
  return foo.toString();
}

function case3() {
  const foo = createFoo1("bar");
  return foo.toString();
}

function case4() {
  const foo = createFoo2("bar");
  return foo.toString();
}

function case5() {
  const foo = createFoo3("bar");
  return foo.toString();
}

function case6() {
  const foo = new FooClass2("bar");
  return foo.toString();
}

function case7() {
  const foo = new FooClass3("bar");
  return foo.toString();
}

function case8() {
  const foo = new FooClass4("bar");
  return foo.toString();
}


bench(null, [
  { name: "Class declaration", callback: case1 },
  { name: "Constructor function", callback: case2 },
  { name: "Factory function with prototype and manual init", callback: case3 },
  { name: "Factory function with prototype and init function", callback: case4 },
  { name: "Factory function with closure", callback: case5 },
  { name: "Class with bound method", callback: case6 },
  { name: "Class with arrow function in constructor", callback: case7 },
  { name: "Class with arrow function field", callback: case8 }
], { runCasesFirst: true });
