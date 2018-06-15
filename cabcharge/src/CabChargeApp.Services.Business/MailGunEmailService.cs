
using CabChargeApp.Domain.Entities;
using CabChargeApp.Services.Interface;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RestSharp.Authenticators;
using RestSharp;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Text;
using System;

namespace CabChargeApp.Services.Business
{
    public class MailGunEmailService : IEmailService
    {

        private readonly ILogger<MailGunEmailService> _logger;
        private IOptions<AppSettings> _options;

        public MailGunEmailService(ILogger<MailGunEmailService> logger, IOptions<AppSettings> options)
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
            RestClient client = new RestClient();
            client.BaseUrl = new Uri(this._options.Value.MailGunURL);
            client.Authenticator = new HttpBasicAuthenticator("api", this._options.Value.MailGunAPIKey);
            RestRequest request = new RestRequest();
            request.AddParameter("domain", this._options.Value.MailGunDomain, ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", $"{this._options.Value.FromEmailUserName}<{this._options.Value.FromEmailAddress}>");

            foreach (var toEmail in toEmailAddressList)
                request.AddParameter("to", toEmail);

            foreach (var ccEmail in ccEmailAddressList)
                request.AddParameter("cc", ccEmail);

            foreach (var bccEmail in bccEmailAddressList)
                request.AddParameter("bcc", bccEmail);
                

            request.AddParameter("subject", subject);
            request.AddParameter("text", messageBody);
            request.Method = Method.POST;
            var result = client.Execute(request);
            return result.IsSuccessful;
        }
    }
}
