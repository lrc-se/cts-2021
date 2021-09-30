using BenchmarkDotNet.Attributes;
using System.Collections.Generic;
using System.Text;

namespace Performance.Benchmarks
{
    [MemoryDiagnoser]
    public class Strings
    {
        [Benchmark]
        public int Concatenation()
        {
            string str = "1";
            for (int i = 2; i <= 1000; ++i)
            {
                str += $", {i}";
            }
            return str.Length;
        }

        [Benchmark]
        public int Builder()
        {
            var builder = new StringBuilder("1");
            for (int i = 2; i <= 1000; ++i)
            {
                builder.Append($", {i}");
            }
            string str = builder.ToString();
            return str.Length;
        }

        [Benchmark]
        public int ListJoin()
        {
            var strings = new List<string> { "1" };
            for (int i = 2; i <= 1000; ++i)
            {
                strings.Add($", {i}");
            }
            string str = string.Join("", strings);
            return str.Length;
        }
    }
}
