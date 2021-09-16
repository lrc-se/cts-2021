const Benchmark = require("benchmark");


/**
 * @typedef BenchCase
 * @property {string} [name] Name of the benchmark case
 * @property {function} callback Function to benchmark
 * @property {Benchmark.Options} [options] Benchmark case options
 */

/**
 * @typedef BenchOptions
 * @property {boolean} [runCasesFirst] Whether to execute the cases before running the suite
 */


let suiteCount = 0;

/**
 * Runs a benchmark suite asynchronously.
 * @param {?string} name Benchmark name
 * @param {BenchCase[]} cases Cases to benchmark
 * @param {BenchOptions} [options] Suite options
 * @returns {Promise}
 */
function bench(name, cases, options) {
  const suiteName = name || `Benchmark suite #${++suiteCount}`;
  console.log("");
  console.log(suiteName);
  console.log("=".repeat(suiteName.length));
  console.log("");

  if (options?.runCasesFirst) {
    cases.forEach((item, i) => {
      if (typeof item == "function") {
        /** @type {BenchCase} */
        item = { callback: item };
      }
      console.log(`Running case ${item.name ? `"${item.name}"` : `${i + 1}/${cases.length}`}...`);
      const result = item.callback();
      console.log(`Result:`, result);
    });
    console.log("");
  }

  return new Promise((resolve, reject) => {
    const suite = new Benchmark.Suite(suiteName);
    cases.forEach((item, i) => {
      if (typeof item == "function") {
        item = { callback: item };
      }
      suite.add(item.name || `Case ${i + 1}/${cases.length}`, item.callback, item.options);
    });

    suite.on("cycle", printCycle);
    suite.on("error", () => {
      reject(Error("Error running suite"));
    });
    suite.on("complete", function() {
      printResults(this);
      resolve();
    });

    console.log("Running suite...");
    suite.run({ async: true });
  });
}

function printCycle(e) {
  console.log(e.target.toString());
}

function printResults(suite) {
  const baseline = suite[0];
  console.log("");
  console.log("RESULTS");
  console.log("-------");
  console.log(`Baseline: "${baseline.name}" (${Benchmark.formatNumber(baseline.hz.toFixed(2))} ops/sec)`);

  Array.prototype.slice.call(suite, 1).forEach(result => {
    const cmp = result.compare(baseline);
    let msg;
    if (cmp < 0) {
      msg = `${Benchmark.formatNumber(((1 - result.hz / baseline.hz) * 100).toFixed(2))}% slower than baseline`;
    } else if (cmp > 0) {
      msg = `${Benchmark.formatNumber(((result.hz / baseline.hz - 1) * 100).toFixed(2))}% faster than baseline`;
    } else {
      msg = "on par with baseline";
    }
    console.log(`"${result.name}" is ${msg} (${Benchmark.formatNumber((result.hz / baseline.hz).toFixed(2))}x speed)`);
  });
}


module.exports = bench;
