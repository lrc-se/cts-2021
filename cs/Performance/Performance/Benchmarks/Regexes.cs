using BenchmarkDotNet.Attributes;
using System.Text.RegularExpressions;

namespace Performance.Benchmarks
{
    public class Regexes
    {
        private static readonly string _simplePattern = @".+@.+\..{2,}";
        private static readonly string _mediumPattern = @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        private static readonly string _complexPattern = @"^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$";
        private static readonly Regex _simpleRegex = new(_simplePattern, RegexOptions.IgnoreCase);
        private static readonly Regex _mediumRegex = new(_mediumPattern, RegexOptions.IgnoreCase);
        private static readonly Regex _complexRegex = new(_complexPattern, RegexOptions.IgnoreCase);
        private static readonly Regex _compiledSimpleRegex = new(_simplePattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        private static readonly Regex _compiledMediumRegex = new(_mediumPattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        private static readonly Regex _compiledComplexRegex = new(_complexPattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        private static readonly string[] _emails = new[]
        {
            "info@cygni.se",
            "info@cygni.s",
            "info@cygni",
            "first.last@cygni.se",
            "@cygni.info",
            "info@cygni.info"
        };


        [Benchmark]
        public int ValidateEmailsSimpleMethod()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (Regex.IsMatch(email, _simplePattern, RegexOptions.IgnoreCase))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsSimpleObject()
        {
            int invalidCount = 0;
            var regex = new Regex(_simplePattern, RegexOptions.IgnoreCase);
            foreach (string email in _emails)
            {
                if (!regex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsSimpleClass()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_simpleRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsSimpleCompiled()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_compiledSimpleRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsMediumMethod()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!Regex.IsMatch(email, _mediumPattern, RegexOptions.IgnoreCase))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsMediumObject()
        {
            int invalidCount = 0;
            var regex = new Regex(_mediumPattern, RegexOptions.IgnoreCase);
            foreach (string email in _emails)
            {
                if (!regex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsMediumClass()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_mediumRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsMediumCompiled()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_compiledMediumRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsComplexMethod()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!Regex.IsMatch(email, _complexPattern, RegexOptions.IgnoreCase))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsComplexObject()
        {
            int invalidCount = 0;
            var regex = new Regex(_complexPattern, RegexOptions.IgnoreCase);
            foreach (string email in _emails)
            {
                if (!regex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsComplexClass()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_complexRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }

        [Benchmark]
        public int ValidateEmailsComplexCompiled()
        {
            int invalidCount = 0;
            foreach (string email in _emails)
            {
                if (!_compiledComplexRegex.IsMatch(email))
                {
                    ++invalidCount;
                }
            }
            return invalidCount;
        }
    }
}
