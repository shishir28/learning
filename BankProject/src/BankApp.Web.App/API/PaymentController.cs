using AutoMapper;
using BankApp.Domain.Entities;
using BankApp.Services.Interface;
using BankApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BankApp.Web.App.Controllers
{

    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        private readonly ILogger<PaymentController> _logger;
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService,ILogger<PaymentController> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }

        

        [HttpPost]
        [Route("AddPayment")]
        public IActionResult AddPayment([FromBody]PaymentDetailViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var paymentDetail = Mapper.Map<PaymentDetailViewModel, PaymentDetail>(model);
                    var resultPayment = _paymentService.AddPaymentDetail(paymentDetail);
                    var paymentDetailId =resultPayment.Id;
                    var result =  new ObjectResult(new { StatusCode = 201, Content = paymentDetailId });
                    result.StatusCode = 201;
                    return result;
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(ex.Message);
                    _logger.LogError(ex.StackTrace);
                    var result =  new ObjectResult( new { StatusCode = 400, Content = $@"Payment for account {model.AccountNumber} could not be done!" });
                    result.StatusCode = 400;
                    return result;
                }
            }
            return new StatusCodeResult(412);
        }
    }
}