using BankApp.Domain.Entities;
using BankApp.Web.App.Models;

namespace BankApp.Web.App
{
    public class AutoMapperBootStrapper
    {
        public static void Bootstrap() => ConfigurePageMappings();

        private static void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<PaymentDetail, PaymentDetailViewModel>();
                cfg.CreateMap<PaymentDetailViewModel, PaymentDetail>();
            });
        }
    }
}
