using System.Collections.Generic;
using AutoMapper;
using CabChargeApp.Domain.Entities;
using CabChargeApp.Services.Business;
using CabChargeApp.Services.Interface;
using CabChargeApp.Web.App.Controllers;
using CabChargeApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace CabChargeApp.Test
{
    public class EmailControllerShould
    {
        private void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Email, EmailViewModel>();
                cfg.CreateMap<EmailViewModel, Email>();
            });
        }

        [Fact]
        public void TestSendEmailInvalidModel()
        {
            var emailDetail = new EmailViewModel();
            var mockService = new Mock<IEmailService>();
            var emailServiceProviders = new List<IEmailService>();
            emailServiceProviders.Add(mockService.Object);
            var logger = new Mock<ILogger<EmailController>>();
            var emailController = new EmailController(emailServiceProviders, logger.Object);
            emailController.ModelState.AddModelError("", "To recipient is missing!");
            var result = emailController.SendEmail(emailDetail);
            var convertedResult = result as StatusCodeResult;
            Assert.Equal(412, convertedResult.StatusCode);
        }

        [Fact]
        public void TestSendEmailForException()
        {
            var model = new EmailViewModel
            {
                ToValue = "shishir28@gmail.com",
                SubjectValue = "Hey There",
                MessageValue = "This test should throw exception"
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object
            var emailDetail = Mapper.Map<EmailViewModel, Email>(model);


            var mockService1 = new Mock<IEmailService>();
            mockService1.Setup(x => x.SendEmail(It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<string>(),
            It.IsAny<string>())).Throws(new System.Exception("Some Error found!"));


            var mockService2 = new Mock<IEmailService>();
            mockService2.Setup(x => x.SendEmail(It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<string>(),
            It.IsAny<string>())).Throws(new System.Exception("Some Error found!"));


            var emailServiceProviders = new List<IEmailService>();
            emailServiceProviders.Add(mockService1.Object);
            emailServiceProviders.Add(mockService2.Object);

            var logger = new Mock<ILogger<EmailController>>();
            var emailController = new EmailController(emailServiceProviders, logger.Object);
            var result = emailController.SendEmail(model);
            var convertedResult = result as ObjectResult;
            Assert.Equal(400, convertedResult.StatusCode);
            var contentObject = convertedResult.Value as HttpResultObject;
            Assert.Equal("Email could not be sent  because exception was thrown!", contentObject.Content);
        }

        [Fact]
        public void TestSendEmailFailed()
        {
            var model = new EmailViewModel
            {
                ToValue = "shishir28@gmail.com",
                SubjectValue = "Hey There",
                MessageValue = "This test should throw exception"
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object from view model
            var emailDetail = Mapper.Map<EmailViewModel, Email>(model);

            var mockService1 = new Mock<IEmailService>();
            mockService1.Setup(x => x.SendEmail(It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<string>(),
            It.IsAny<string>())).Returns(false);           

            var emailServiceProviders = new List<IEmailService>();
            emailServiceProviders.Add(mockService1.Object);

            // call controller action 
            var logger = new Mock<ILogger<EmailController>>();
            var emailController = new EmailController(emailServiceProviders, logger.Object);
            var result = emailController.SendEmail(model);
            var convertedResult = result as ObjectResult;
            Assert.Equal(400, convertedResult.StatusCode);
            var contentObject = convertedResult.Value as HttpResultObject;
            Assert.Equal("Email could not be sent!", contentObject.Content);
        }


        [Fact]
        public void TestSendEmailPass()
        {
            var model = new EmailViewModel
            {
                ToValue = "shishir28@gmail.com",
                SubjectValue = "Hey There",
                MessageValue = "This test should throw exception"
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object

            var mockService = new Mock<IEmailService>();
            mockService.Setup(x => x.SendEmail(It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<IList<string>>(),
            It.IsAny<string>(),
            It.IsAny<string>())).Returns(true);

            var emailServiceProviders = new List<IEmailService>();
            emailServiceProviders.Add(mockService.Object);

            var logger = new Mock<ILogger<EmailController>>();
            var emailController = new EmailController(emailServiceProviders, logger.Object);
            var result = emailController.SendEmail(model);
            var convertedResult = result as ObjectResult;
            Assert.Equal(201, convertedResult.StatusCode);
        }
    }
}
