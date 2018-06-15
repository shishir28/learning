using PalindromeApp.Domain.Entities;
using PalindromeApp.Domain.Interfaces;
using PalindromeApp.Infrastructure.Data;
using PalindromeApp.Services.Business;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using Xunit;

namespace PalindromeApp.Test
{
    public class PalindrometServiceShould
    {
        [Fact]
        public void TestCreate()
        {
            var palindromeDetail = new Palindrome
            {

                PalindromeValue = "A Santa at Nasa.",
            };

            var mockRepository = new Mock<IPalindromeRepository>();
            mockRepository.Setup(y => y.Create(palindromeDetail));
            var logger = new Mock<ILogger<PalindromeService>>();
            var palindromeService = new PalindromeService(mockRepository.Object, logger.Object);
            var returnedPaymentObject = palindromeService.AddPalindrome(palindromeDetail);
            Assert.Equal(0, returnedPaymentObject.Id);
            Assert.Equal(palindromeDetail.PalindromeValue, returnedPaymentObject.PalindromeValue);
        }
    }
}
