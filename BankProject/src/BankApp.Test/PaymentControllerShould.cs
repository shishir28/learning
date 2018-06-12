using AutoMapper;
using BankApp.Domain.Entities;
using BankApp.Domain.Interfaces;
using BankApp.Services.Business;
using BankApp.Services.Interface;
using BankApp.Web.App.Controllers;
using BankApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace BankApp.Test
{
    public class PaymentControllerShould
    {
        private  void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<PaymentDetail, PaymentDetailViewModel>();
                cfg.CreateMap<PaymentDetailViewModel, PaymentDetail>();
            });
        }

        [Fact]
        public void TestPreconditionFailed()
        {
            var paymentDetail = new PaymentDetailViewModel
            {
                BSB = "1", 
            };

            var mockService = new Mock<IPaymentService>();
            var logger = new Mock<ILogger<PaymentController>>();
            var paymentController = new PaymentController(mockService.Object, logger.Object);
            paymentController.ModelState.AddModelError("","Invalid BSB");
            var result = paymentController.AddPayment(paymentDetail);
            var convertedResult = result as StatusCodeResult;
            Assert.Equal(412, convertedResult.StatusCode);
        }

        [Fact]
        public void TestAddPaymentForInvalid()
        {
            var model = new PaymentDetailViewModel
            {
                BSB = "123456", 
                AccountNumber = "12345678",
                AccountName = "John Doe",
                Amount = 10, 
                Reference = "From Jane Roe"
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object
            var paymentDetail = Mapper.Map<PaymentDetailViewModel,PaymentDetail>(model);

            var mockService = new Mock<IPaymentService>();
            mockService.Setup(x=>x.AddPaymentDetail(paymentDetail));         
         
            var logger = new Mock<ILogger<PaymentController>>();
            var paymentController = new PaymentController(mockService.Object, logger.Object);
            var result = paymentController.AddPayment(model);
            var convertedResult = result as ObjectResult;
            Assert.Equal(400, convertedResult.StatusCode);
        }

        [Fact]        
        public void TestAddPayment()
        {
            var model = new PaymentDetailViewModel
            {
                BSB = "123456", 
                AccountNumber = "12345678",
                AccountName = "John Doe",
                Amount = 10, 
                Reference = "From Jane Roe"
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object from view model
            var paymentDetail = Mapper.Map<PaymentDetailViewModel,PaymentDetail>(model);

            // configure mock repository 
            var mockRepository = new Mock<IPaymentDetailRepository>();           
            mockRepository.Setup( y=> y.Create(paymentDetail));           

            //  Create Instance of Payment service 
            var logger = new Mock<ILogger<PaymentService>>();
            var paymentService = new PaymentService(mockRepository.Object,logger.Object);            
            
            // call controller action 
            var controllerLogger = new Mock<ILogger<PaymentController>>();
            var paymentController = new PaymentController(paymentService, controllerLogger.Object);
            var result = paymentController.AddPayment(model);

            // get response
            var convertedResult = result as ObjectResult;
            
            Assert.Equal(201, convertedResult.StatusCode);
        }
    }
}
