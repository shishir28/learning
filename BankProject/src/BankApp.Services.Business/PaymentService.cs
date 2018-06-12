using BankApp.Domain.Entities;
using BankApp.Domain.Interfaces;
using BankApp.Services.Interface;
using Microsoft.Extensions.Logging;
using System;

namespace BankApp.Services.Business
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentDetailRepository _paymentDetailRepository;
        private readonly ILogger<PaymentService> _logger;

        public PaymentService(IPaymentDetailRepository paymentDetailRepository, ILogger<PaymentService> logger)
        {
            _paymentDetailRepository = paymentDetailRepository;
            _logger = logger;
        }
        
        public PaymentDetail AddPaymentDetail(PaymentDetail paymentDetail)
        {
            var currentTime = DateTime.Now;
            paymentDetail.CreatedDate = currentTime;
            _paymentDetailRepository.Create(paymentDetail);
            _logger.LogInformation($"Payment created with Id {paymentDetail.Id}");
            return paymentDetail;
        }
    }
}
