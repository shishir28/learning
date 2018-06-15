using System;
using System.Collections.Generic;
namespace CabChargeApp.Domain.Entities
{
    public class Email
    {
        public string ToValue { get; set; }
        public string CCValue { get; set; }
        public string BCCValue { get; set; }
        public string SubjectValue { get; set; }
        public string MessageValue { get; set; }
    }


    public class AppSettings
    {

        public string FromEmailAddress { get; set; }
        public string FromEmailUserName { get; set; }
        public string SendGridKey { get; set; }

        public string MailGunURL { get; set; }
        public string MailGunDomain { get; set; }
        public string MailGunAPIKey { get; set; }
    }

    public class HttpResultObject
    {

        public int StatusCode { get; set; }
        public string Content { get; set; }
    }
}


