using System.Collections.Generic;
using CabChargeApp.Domain.Entities;

namespace CabChargeApp.Services.Interface
{
    public interface IEmailService
    {
        bool SendEmail(IList<string> toEmailAddressList,
            IList<string> ccEmailAddressList,
            IList<string> bccEmailAddressList,
            string subject,
            string messageBody);
    }
}
