using PalindromeApp.Domain.Entities;
using PalindromeApp.Domain.Interfaces;

namespace PalindromeApp.Infrastructure.Data
{
    public class PalindromeRepository : Repository<Palindrome>, IPalindromeRepository
    {
         public PalindromeRepository(ApplicationDBContext dataContext) : base(dataContext)
        {
        }
    }
}
