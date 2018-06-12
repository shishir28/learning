using BankApp.Common;
using BankApp.Domain.Entities;
using BankApp.Domain.Interfaces;
using Microsoft.Extensions.Options;

namespace BankApp.Infrastructure.Data
{
    public class PaymentDetailRepository : Repository<PaymentDetail>, IPaymentDetailRepository
    {
        public PaymentDetailRepository(IOptions<AppSettings> appSettings) : base(appSettings)
        {
        }
    }
}
