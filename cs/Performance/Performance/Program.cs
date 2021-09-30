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
            Console.WriteLine();

            var re = new Regexes();
            Console.WriteLine("Regexes");
            Console.WriteLine("=======");
            Console.WriteLine();
            Console.WriteLine("Simple pattern invalid e-mails (library method): " + re.ValidateEmailsSimpleMethod());
            Console.WriteLine("Simple pattern invalid e-mails (object instance): " + re.ValidateEmailsSimpleObject());
            Console.WriteLine("Simple pattern invalid e-mails (class instance): " + re.ValidateEmailsSimpleClass());
            Console.WriteLine("Simple pattern invalid e-mails (compiled instance): " + re.ValidateEmailsSimpleCompiled());
            Console.WriteLine("Medium pattern invalid e-mails (library method): " + re.ValidateEmailsMediumMethod());
            Console.WriteLine("Medium pattern invalid e-mails (object instance): " + re.ValidateEmailsMediumObject());
            Console.WriteLine("Medium pattern invalid e-mails (class instance): " + re.ValidateEmailsMediumClass());
            Console.WriteLine("Medium pattern invalid e-mails (compiled instance): " + re.ValidateEmailsMediumCompiled());
            Console.WriteLine("Complex pattern invalid e-mails (library method): " + re.ValidateEmailsComplexMethod());
            Console.WriteLine("Complex pattern invalid e-mails (object instance): " + re.ValidateEmailsComplexObject());
            Console.WriteLine("Complex pattern invalid e-mails (class instance): " + re.ValidateEmailsComplexClass());
            Console.WriteLine("Complex pattern invalid e-mails (compiled instance): " + re.ValidateEmailsComplexCompiled());
            Console.WriteLine();
            BenchmarkRunner.Run<Regexes>();

            Pause();
            Console.WriteLine();

            var strs = new Strings();
            Console.WriteLine("Strings");
            Console.WriteLine("=======");
            Console.WriteLine();
            Console.WriteLine("String length (concatenation): " + strs.Concatenation());
            Console.WriteLine("String length (builder): " + strs.Builder());
            Console.WriteLine("String length (list + join): " + strs.ListJoin());
            Console.WriteLine();
            BenchmarkRunner.Run<Strings>();

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
