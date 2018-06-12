using BankApp.Domain.Interfaces;
using BankApp.Infrastructure.Data;
using BankApp.Services.Business;
using BankApp.Services.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BankApp.Infrastructure.DependencyResolver
{
    public class DependencyInstaller
    {
        public static void InjectDependencies(IServiceCollection services, IConfiguration configuration)
        {
            InjectDependenciesForDAL(services, configuration);
            InjectDependenciesForBL(services);
        }

        private static void InjectDependenciesForDAL(IServiceCollection services, IConfiguration configuration)
        {
          
            services.AddTransient<IPaymentDetailRepository, PaymentDetailRepository>();
          
        }

        private static void InjectDependenciesForBL(IServiceCollection services)
        {
       
            services.AddTransient<IPaymentService, PaymentService>();
           
        }
    }
}
