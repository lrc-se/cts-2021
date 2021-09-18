CTS 2021: Performance – It still matters
========================================

This repository contains the code behind the examples in the presentation "Performance – It still matters"
prepared for the 2021 edition of [Cygni Tech Summit](https://cts.cygni.se).


Introduction
------------

TODO

Code examples
-------------

The examples included here are the same as the ones in the presentation, in runnable form, with some additions. They can be found in the following directories, with the following prerequisites:

- *asm*

  DOS-based x86 assembly, using [NASM](https://www.nasm.us/) syntax which differs very slightly from the typical way of representing memory access. An assembled *.com* file is included which can be executed in [dosbox](https://www.dosbox.com/), and will display a growing diagonal line of pixels (green, red, white) using each of the presented versions, waiting for a keypress after each iteration.

- *js*

  JavaScript, using ES2020. The benchmarks use a custom wrapper around [Benchmark.js](https://benchmarkjs.com/) for ease of presenting the results and are located in separate files grouped in a number of subdirectories, so just point Node at them and go. The results in the presentation were produced with Node 14.7, apart from the DOM example (see below).

- *cs*

  C#, using .NET 5. The (console) application uses [BenchmarkDotNet](https://benchmarkdotnet.org/) and runs all benchmarks in sequence, pausing for the Enter key in between. The results in the presentation were produced with Visual Studio Professional 2019.

### Functional vs. imperative (JS)

The main takeaway here is that function calls are usually expensive, as are repeated iterations arising from pipeline-style code. On the other hand, functional code is typically more readable and *obvious* than its imperative equivalent.

### Deferred execution (C#)

Again, the lazy version is less efficient because it performs all the iterations every time the result is calculated. Finding the optimal "cutoff point" where one goes from abstract to concrete is key when dealing with things like LINQ chains, especially when an external data source is involved.

The benchmark here also includes imperative versions of the `Sum()` LINQ calls, and it is interesting to note that the advantage these are expected to provide almost disappears in the noise when using the lazy variant, due to the much larger cost of the repeated iterations before the final step.

### Expensive calculations (JS)

In short: Cache everything that will be reused as-is for as long as it *can* be reused – but first be sure that the cost of maintaining the cache isn't greater than the cost of just performing the operations as they are. The term "cache" is used loosely here and refers to any mechanism which pre-calculates and stores oft-requested values, the simplest of which is lifting invariant function calls out of iteration bodies (including iteration conditions).

A comment on the [Advent of Code](https://adventofcode.com/) benchmark: The small example can have rather a high error percentage and the memoized version may not actually show a reliable improvement at all in subsequent runs, whereas the large example is invariably faster due to the drastically reduced number of recursive calls. This serves to underscore the points about unrealistically small data set sizes hiding inherent inefficiencies in the code and that the cache itself doesn't come for free.

### Expensive lookups (JS)

This applies to any situation which involves traversal, of which the DOM is a well-known example of the tree kind. Caching and query simplification are key here, and especially in the database world the use of indexes is paramount.

The benchmark here also tests how `getElementById("foo")` compares to `querySelector("#foo")`, and as we can see the former performs appreciably better and should be used whenever possible. In this repo [jsdom](https://github.com/jsdom/jsdom) is used in order to stay in the Node world, but the results in the presentation were collected using [JSBench.Me](https://jsbench.me/) in Firefox for greater realism.

### Expensive initializations (C#)

The main point here is to perform costly setup as early as possible, and as seldom as possible – preferably once at application startup, if that is achievable. The warning about using `RegexOptions.Compiled` on anything *other* than a static field is also extremely important, and is therefore hereby repeated. As for the patterns used, the simple one is a naive, quick check based on the most common formats, the medium one is from the [W3C specification](https://html.spec.whatwg.org/multipage/input.html#email-state-%28type%3Demail%29) of the `email` input type, and the complex one is taken from the [source code](https://github.com/microsoft/referencesource/blob/master/System.ComponentModel.DataAnnotations/DataAnnotations/EmailAddressAttribute.cs) of Microsoft's `EmailAddressAttribute` validator.

Regex literals in JavaScript are a different beast, however, and in general it is safe to assume that these are *not* in fact re-evaluated every time they are encountered, but rather that this is something that occurs only once. The performance degradation when using the `RegExp` constructor is comparable, though, and should be avoided when the pattern is known to be constant. Benchmarking this is left as an exercise to the reader.

### Data structures (JS)

Lookups will always be faster with indexed data structures than with straight collections that require iteration, but the thing that trips many developers up is that this difference usually does not manifest itself until the data set grows large – which it typically isn't in the development and/or testing phases.

The AoC slide in the presentation video unfortunately contains a couple of errors in the benchmark labels, which have since been corrected in the presentation source. The examples in the [referenced puzzle](https://adventofcode.com/2020/day/23) are in fact 10 cups with 100 moves in part 1 and 1,000,000 cups with 10,000,000 moves in part 2, but the benchmark figures presented are from *single runs* of the cup moving algorithms for 10 and 1,000,000 cups respectively, since we'd be waiting forever for the naive version to finish the full 10,000,000 runs – hence the exploding heads. Sorry for the mixup.

### Language features (JS)

The spread operator, in all its forms, is a very useful addition to the language, but it's also slower than older techniques – and when combined with `reduce()` it's a downright disaster. To wit, repeatedly re-instantiating, copying and abandoning objects, especially in large numbers, is something that should always be avoided whenver possible if performance is of importance. The point about pre-allocation where suitable should be heeded, and helping the compiler/runtime/whatever by being as specific as you can is always, well, helpful.

The following benchmarks are also included here, which were not part of the recorded presentation:

- __Property merging__

  The spread operator is slower here as well, but what's really interesting about this one is that `Object.assign()` is the fastest of the bunch, beating out even the good ol' enumeration approach (which may or may not have to be further encumbered with `hasOwnProperty()` checks).

- __Object instantiation__

  Here we compare different ways of creating an object, where the class declaration, the constructor function and the prototype-based factory functions are all basically on par with each other, although the version of the latter with an `init()` method is slightly slower due to the added function call – all of which is expected.

  What's also expected is that the closure-based factory function, the `bind()`-in-constructor version (if you've done pre-hooks React development you've likely seen – and cursed – this pattern many a time) and the arrow-function-in-constructor version are likewise comparable, since they all result in the recreation of the method every time an object is instantiated.

  What might not be quite as expected, however, is the extremely poor performance of the arrow-function-as-field version, which is embarrassingly slow compared even to the middle tier. At least for now – this is still an experimental TC39 feature which has yet to gain ES-level standardization, so there may well be some engine improvements in the future in this regard. Still, it should give you pause.

  Now, before you go throwing out all your code it should be noted, and noted well, that all the differences above apply to a *single* object instantiation. In other words – again with the data set sizes – this is only going to be a real issue if you find yourself having to create, say, tens of thousands of objects per second – and if that's the case, the main problem with your code is likely related to the fact that you're *creating tens of thousands of objects per second* in the first place, so you should probably start there. Remember: large bottlenecks first, small ones later – and it's a safe bet that object creation mechanisms will be found among the latter.

  Finally, remember that there [aren't actually any classes in JavaScript](https://cygni.se/there-are-no-classes-in-javascript).
