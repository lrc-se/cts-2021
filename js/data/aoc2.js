const bench = require("../bench");


function createCups(input, totalCount = 0) {
  const cups = input.slice();
  if (cups.length < totalCount) {
    for (let i = cups.length + 1; i <= totalCount; ++i) {
      cups.push(i);
    }
  }
  return cups;
}

function createCupGame(input, totalCount = 0) {
  const cups = createCups(input, totalCount);
  const links = {};
  for (let i = 0; i < cups.length - 1; ++i) {
    links[cups[i]] = cups[i + 1];
  }
  links[cups[cups.length - 1]] = cups[0];

  return {
    links,
    current: cups[0],
    count: cups.length
  };
}

function getCupList(cupGame, startCup, count) {
  const cups = [];
  let cup = startCup;
  for (let i = 0; i < count; ++i) {
    cups.push(cup);
    cup = cupGame.links[cup];
  }
  return cups;
}

function moveCups1(cups) {
  const highest = cups.length;
  const pickedUp = cups.splice(1, 3);
  let destinationCup = (cups[0] > 1 ? cups[0] - 1 : highest);
  while (pickedUp.includes(destinationCup)) {
    destinationCup = (destinationCup > 1 ? destinationCup - 1 : highest);
  }
  cups.splice(cups.indexOf(destinationCup) + 1, 0, ...pickedUp);
  cups.push(cups.shift());
}

function moveCups2(cupGame) {
  const pickedUp = getCupList(cupGame, cupGame.links[cupGame.current], 3);
  let destinationCup = (cupGame.current > 1 ? cupGame.current - 1 : cupGame.count);
  while (pickedUp.includes(destinationCup)) {
    destinationCup = (destinationCup > 1 ? destinationCup - 1 : cupGame.count);
  }
  cupGame.links[cupGame.current] = cupGame.links[pickedUp[2]];
  cupGame.links[pickedUp[2]] = cupGame.links[destinationCup];
  cupGame.links[destinationCup] = pickedUp[0];
  cupGame.current = cupGame.links[cupGame.current];
}

const input = [3, 8, 9, 1, 2, 5, 4, 6, 7];
const cups1 = createCups(input);
const cupGame1 = createCupGame(input);
const cups2 = createCups(input, 1e6);
const cupGame2 = createCupGame(input, 1e6);


function case1() {
  moveCups1(cups1);
}

function case2() {
  moveCups2(cupGame1);
}

function case3() {
  moveCups1(cups2);
}

function case4() {
  moveCups2(cupGame2);
}


bench("Part 1", [
  { name: "Straight collection", callback: case1 },
  { name: "Linked list", callback: case2 }
])
  .then(() => bench("Part 2", [
    { name: "Straight collection", callback: case3 },
    { name: "Linked list", callback: case4 }
  ]));
