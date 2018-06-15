using PalindromeApp.Domain.Entities;
using PalindromeApp.Web.App.Models;

namespace PalindromeApp.Web.App
{
    public class AutoMapperBootStrapper
    {
        public static void Bootstrap() => ConfigurePageMappings();

        private static void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Palindrome, PalindromeViewModel>();
                cfg.CreateMap<PalindromeViewModel, Palindrome>();
            });
        }
    }
}
