using PalindromeApp.Domain.Entities;
using PalindromeApp.Domain.Interfaces;
using PalindromeApp.Services.Interface;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace PalindromeApp.Services.Business
{
    public class PalindromeService : IPalindromeService
    {
        private readonly IPalindromeRepository _palindromeDetailRepository;
        private readonly ILogger<PalindromeService> _logger;

        public PalindromeService(IPalindromeRepository palindromeDetailRepository, ILogger<PalindromeService> logger)
        {
            _palindromeDetailRepository = palindromeDetailRepository;
            _logger = logger;
        }

        public IEnumerable<Palindrome> GetAllPalindromes() =>
         _palindromeDetailRepository.GetAll().ToList();


        public Palindrome AddPalindrome(Palindrome palindromeDetail)
        {

            var sanitizedString = Regex.Replace(palindromeDetail.PalindromeValue, "[^A-Za-z0-9]", "");
            var reversedValue = new string(sanitizedString.ToLower().Reverse().ToArray());
            var isPalindrome = sanitizedString.ToLower() == reversedValue;

            if (isPalindrome)
            {
                _palindromeDetailRepository.Create(palindromeDetail);
                _logger.LogInformation($"Palindrome created with Id {palindromeDetail.Id}");
            }
            else
            {
                palindromeDetail.Id = -1;
            }
            return palindromeDetail;
        }
    }
}
