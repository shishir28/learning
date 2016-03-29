using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Producer
{

    [Serializable]
    public class EmailPerson
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
    }

    [Serializable]
    public class Email
    {
        public string subject { get; set; }
        public string body { get; set; }
        public EmailPerson from { get; set; }
        public List<EmailPerson> toList { get; set; }
    }

}
