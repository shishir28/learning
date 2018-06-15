using System;

namespace EmailApp.Common
{
    [Serializable]
    public class Email : IEmail
    {
        public string Tos { get; set; }
        public string BCCs { get; set; }
        public string CCs { get; set; }
        public string From { get; set; }
        public string Body { get; set; }
    }
}
