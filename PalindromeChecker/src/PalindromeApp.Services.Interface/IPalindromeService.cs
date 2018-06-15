using System.Collections.Generic;
using PalindromeApp.Domain.Entities;

namespace PalindromeApp.Services.Interface
{
    public interface IPalindromeService
    {
        IEnumerable<Palindrome> GetAllPalindromes();
        Palindrome AddPalindrome(Palindrome Palindrome);
    }
}
