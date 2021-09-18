using BenchmarkDotNet.Running;
using Performance.Benchmarks;
using System;

namespace Performance
{
    class Program
    {
        static void Main()
        {
            var ll = new LazyLinq();
            Console.WriteLine("Lazy LINQ");
            Console.WriteLine("=========");
            Console.WriteLine();
            Console.WriteLine("Lazy sum (functional): " + ll.GetLazySumFunctional());
            Console.WriteLine("Lazy sum (imperative): " + ll.GetLazySumImperative());
            Console.WriteLine("Eager sum (functional): " + ll.GetEagerSumFunctional());
            Console.WriteLine("Eager sum (imperative): " + ll.GetEagerSumImperative());
            Console.WriteLine();
            BenchmarkRunner.Run<LazyLinq>();

            Pause();
        }

        private static void Pause()
        {
            if (Console.IsInputRedirected)
            {
                Console.Read();
            }
            else
            {
                Console.ReadKey(true);
            }
        }
    }
}
