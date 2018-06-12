using BankApp.Domain.Entities;

namespace BankApp.Services.Interface
{
    public interface IPaymentService
    {
        PaymentDetail AddPaymentDetail(PaymentDetail PaymentDetail);
    }
}
