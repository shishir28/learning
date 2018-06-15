using PalindromeApp.Domain.Interfaces;
using PalindromeApp.Infrastructure.Data;
using PalindromeApp.Services.Business;
using PalindromeApp.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PalindromeApp.Infrastructure.DependencyResolver
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
            services
             .AddDbContext<ApplicationDBContext>(options =>
            {
                var connString = configuration.GetConnectionString("DefaultConnection");
                options.UseSqlServer(connString, opt =>
                 {
                 });
            });

            services.AddTransient<IPalindromeRepository, PalindromeRepository>();

        }

        private static void InjectDependenciesForBL(IServiceCollection services)
        {

            services.AddTransient<IPalindromeService, PalindromeService>();

        }
    }
}
