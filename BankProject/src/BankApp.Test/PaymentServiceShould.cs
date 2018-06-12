using BankApp.Domain.Entities;
using BankApp.Domain.Interfaces;
using BankApp.Infrastructure.Data;
using BankApp.Services.Business;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using Xunit;

namespace BankApp.Test
{
    public class PaymentServiceShould
    {
        [Fact]
        public void TestCreate()
        {
            var paymentDetail = new PaymentDetail
            {
                BSB = "123456", 
                AccountNumber = "12345678",
                AccountName = "John Doe",
                Amount = 10, 
                Reference = "From Jane Roe"
            };

            var mockRepository = new Mock<IPaymentDetailRepository>();           
            mockRepository.Setup( y=> y.Create(paymentDetail));           

            var logger = new Mock<ILogger<PaymentService>> ();

            var paymentService = new PaymentService(mockRepository.Object,logger.Object);
            var returnedPaymentObject = paymentService.AddPaymentDetail(paymentDetail);
            Assert.Equal(0, returnedPaymentObject.Id);            
            Assert.Equal(paymentDetail.AccountNumber, returnedPaymentObject.AccountNumber);
        }
    }
}
