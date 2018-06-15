using CabChargeApp.Domain.Entities;
using CabChargeApp.Web.App.Models;

namespace CabChargeApp.Web.App
{
    public class AutoMapperBootStrapper
    {
        public static void Bootstrap() => ConfigurePageMappings();

        private static void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Email, EmailViewModel>();
                cfg.CreateMap<EmailViewModel, Email>();
            });
        }
    }
}
