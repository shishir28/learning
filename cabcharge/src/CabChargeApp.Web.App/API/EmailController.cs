
using AutoMapper;
using CabChargeApp.Domain.Entities;
using CabChargeApp.Services.Interface;
using CabChargeApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace CabChargeApp.Web.App.Controllers
{

    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IList<IEmailService> _emailServiceProviders;
        private const int SERVICE_PROVIDER_COUNTS = 2;
        public EmailController(IEnumerable<IEmailService> emailServiceProviders, ILogger<EmailController> logger)
        {
            _emailServiceProviders = emailServiceProviders.ToList();
            _logger = logger;
        }


        [HttpPost]
        [Route("SendEmail")]
        public IActionResult SendEmail([FromBody]EmailViewModel model)
        {
            if (ModelState.IsValid)
            {

                var emailDetail = Mapper.Map<EmailViewModel, Email>(model);
                emailDetail.ToValue = Regex.Replace(emailDetail.ToValue, @"\s+", "");

                if (emailDetail.CCValue != null)
                    emailDetail.CCValue = Regex.Replace(emailDetail.CCValue, @"\s+", "");
                    
                if (emailDetail.BCCValue != null)
                    emailDetail.BCCValue = Regex.Replace(emailDetail.BCCValue, @"\s+", "");

                var regExUtil = new RegexUtilities();
                var toEmailAddressList = emailDetail.ToValue.ToLower().Split(',');
                var filteredToEmailList = toEmailAddressList.Where(x => regExUtil.IsValidEmail(x)).Distinct().ToList();

                if (filteredToEmailList.Count <= 0) //since it is required field                
                    return new StatusCodeResult(412);


                var filteredCCEmailList = new List<string>();
                var ccEmailAddressList = emailDetail.CCValue?.ToLower().Split(',');

                if (ccEmailAddressList != null)
                {
                    filteredCCEmailList = ccEmailAddressList.Where(x => regExUtil.IsValidEmail(x)).Distinct().ToList();
                    filteredCCEmailList = filteredCCEmailList.Where(x => !filteredToEmailList.Any(y => y == x)).ToList(); // dont include if  already part of to list as send grid complains 
                }

                var filteredBCCEmailList = new List<string>();
                var bccEmailAddressList = emailDetail.BCCValue?.ToLower().Split(',');
                if (bccEmailAddressList != null)
                {
                    filteredBCCEmailList = bccEmailAddressList.Where(x => regExUtil.IsValidEmail(x)).Distinct().ToList();
                    filteredBCCEmailList = filteredBCCEmailList.Where(x => !filteredToEmailList.Any(y => y == x)).ToList(); 
                    filteredBCCEmailList = filteredBCCEmailList.Where(x => !filteredCCEmailList.Any(y => y == x)).ToList(); 
                }

                for (int index = 0; (index < SERVICE_PROVIDER_COUNTS && index < _emailServiceProviders.Count); index++)
                {
                    var emailServiceProvider = _emailServiceProviders[index];
                    try
                    {
                        var isSuccessful = emailServiceProvider.SendEmail(filteredToEmailList,
                        filteredCCEmailList,
                        filteredBCCEmailList,
                        emailDetail.SubjectValue,
                        emailDetail.MessageValue);

                        if (isSuccessful)
                        {
                            var result = new ObjectResult(new HttpResultObject { StatusCode = 201, Content = "Email  sent!" });
                            result.StatusCode = 201;

                            _logger.LogInformation("Email  sent!");
                            return result;
                        }
                        else
                        {
                            // if it was unsuccessful from first service provider call another one . Sinple way of checking is servie is unavailable
                            if ((index == 0) && (_emailServiceProviders.Count > 1))
                                continue;

                            var result = new ObjectResult(new HttpResultObject { StatusCode = 400, Content = "Email could not be sent!" });
                            result.StatusCode = 400;
                            _logger.LogWarning("Email could not be sent!");
                            return result;
                        }
                    }
                    catch (System.Exception ex)
                    {
                        _logger.LogError("Email could not be sent  because exception was thrown!");
                        _logger.LogError(ex.Message);
                        _logger.LogError(ex.StackTrace);
                        // if exception was thrown using first from first service provider call another one . Sinple way of checking is servie is unavailable
                        if ((index == 0) && (_emailServiceProviders.Count > 1))
                            continue;

                        var result = new ObjectResult(new HttpResultObject { StatusCode = 400, Content = "Email could not be sent  because exception was thrown!" });
                        result.StatusCode = 400;
                        return result;
                    }
                }
            }
            return new StatusCodeResult(412);
        }
    }
}