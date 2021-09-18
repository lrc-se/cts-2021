using BenchmarkDotNet.Attributes;
using System.Collections.Generic;
using System.Linq;

namespace Performance.Benchmarks
{
    public class LazyLinq
    {
        private readonly IEnumerable<int> _lazy;
        private readonly IEnumerable<int> _eager;


        public LazyLinq()
        {
            var items = new List<Item>();
            for (int i = 0; i < 100000; ++i)
            {
                items.Add(new Item { Value = i });
            }

            _lazy = items
                .Select(i => i.Value)
                .Where(v => v % 2 > 0)
                .Distinct();
            _eager = _lazy.ToList();
        }


        [Benchmark]
        public long GetLazySumFunctional()
            => _lazy.Sum(i => (long)i);

        [Benchmark]
        public long GetLazySumImperative()
        {
            long sum = 0;
            foreach (int value in _lazy)
            {
                sum += value;
            }
            return sum;
        }

        [Benchmark]
        public long GetEagerSumFunctional()
            => _eager.Sum(i => (long)i);

        [Benchmark]
        public long GetEagerSumImperative()
        {
            long sum = 0;
            foreach (int value in _eager)
            {
                sum += value;
            }
            return sum;
        }


        private class Item
        {
            public int Value { get; set; }
        }
    }
}
