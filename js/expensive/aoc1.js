const bench = require("../bench");


function getReachableRatings(ratings) {
  const reachable = {};
  for (let i = 0, len = ratings.length - 1; i < len; ++i) {
    for (let j = i + 1, k = i + 4; j < k; ++j) {
      if (ratings[j] - ratings[i] <= 3) {
        if (!reachable[ratings[i]]) {
          reachable[ratings[i]] = [];
        }
        reachable[ratings[i]].push(ratings[j]);
      } else {
        break;
      }
    }
  }
  return reachable;
}

function countArrangements1(rating, reachableRatings) {
  const reachable = reachableRatings[rating];
  if (reachable) {
    return reachable
      .map(reachableRating => countArrangements1(reachableRating, reachableRatings))
      .reduce((prev, cur) => prev + cur);
  }
  return 1;
}

function countArrangements2(rating, reachableRatings, lookup = {}) {
  const reachable = reachableRatings[rating];
  if (reachable) {
    return reachable
      .map(reachableRating => {
        if (!lookup[reachableRating]) {
          lookup[reachableRating] = countArrangements2(reachableRating, reachableRatings, lookup);
        }
        return lookup[reachableRating];
      })
      .reduce((prev, cur) => prev + cur);
  }
  return 1;
}

const ratings1 = [0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22];
const ratings2 = [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 17, 18, 19, 20, 23, 24, 25, 28, 31, 32, 33, 34, 35, 38, 39, 42, 45, 46, 47, 48, 49, 52];
const reachableRatings1 = getReachableRatings(ratings1);
const reachableRatings2 = getReachableRatings(ratings2);


function case1() {
  return countArrangements1(ratings1[0], reachableRatings1);
}

function case2() {
  return countArrangements2(ratings1[0], reachableRatings1);
}

function case3() {
  return countArrangements1(ratings2[0], reachableRatings2);
}

function case4() {
  return countArrangements2(ratings2[0], reachableRatings2);
}


bench("Small example", [
  { name: "Naive recursion", callback: case1 },
  { name: "Memoized recursion", callback: case2 }
], { runCasesFirst: true })
  .then(() => bench("Large example", [
    { name: "Naive recursion", callback: case3 },
    { name: "Memoized recursion", callback: case4 }
  ], { runCasesFirst: true }));
