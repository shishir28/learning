using CabChargeApp.Domain.Entities;
using CabChargeApp.Services.Interface;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System;
using Newtonsoft.Json;
namespace CabChargeApp.Services.Business
{
    public class SendGridEmailService : IEmailService
    {
        private readonly ILogger<MailGunEmailService> _logger;
        private IOptions<AppSettings> _options;

        public SendGridEmailService(ILogger<MailGunEmailService> logger, IOptions<AppSettings> options)
        {

            _logger = logger;
            _options = options;
        }

        public bool SendEmail(IList<string> toEmailAddressList,
            IList<string> ccEmailAddressList,
            IList<string> bccEmailAddressList,
            string subject,
            string messageBody)
        {

            var client = new SendGridClient(_options.Value.SendGridKey);
            var toAddress = new List<EmailAddress>();

            var personalization = new Personalization();

            foreach (var toEmail in toEmailAddressList)
            {
                if (personalization.Tos == null)
                    personalization.Tos = new List<EmailAddress>();
                personalization.Tos.Add(new EmailAddress(toEmail));
            }

            foreach (var ccmail in ccEmailAddressList)
            {
                if (personalization.Ccs == null)
                    personalization.Ccs = new List<EmailAddress>();
                personalization.Ccs.Add(new EmailAddress(ccmail));
            }

            foreach (var bccmail in bccEmailAddressList)
            {
                if (personalization.Bccs == null)
                    personalization.Bccs = new List<EmailAddress>();
                personalization.Bccs.Add(new EmailAddress(bccmail));
            }

            personalization.Subject = subject;            
            
            var conetent = new Content(){Type=@"text/plain",Value=messageBody};

            var msg = new SendGridMessage()
            {
                From = new EmailAddress(this._options.Value.FromEmailAddress, this._options.Value.FromEmailUserName),                                            
            };
            msg.Contents = new List<Content>();
            msg.Contents.Add(conetent);
            msg.Personalizations = new List<Personalization>();
            msg.Personalizations.Add(personalization);
           ;

            var response = client.SendEmailAsync(msg).Result;
    
            return response.StatusCode == System.Net.HttpStatusCode.Accepted;
        }
    }
}
