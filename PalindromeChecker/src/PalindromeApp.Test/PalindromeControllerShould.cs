using AutoMapper;
using PalindromeApp.Domain.Entities;
using PalindromeApp.Domain.Interfaces;
using PalindromeApp.Services.Business;
using PalindromeApp.Services.Interface;
using PalindromeApp.Web.App.Controllers;
using PalindromeApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace PalindromeApp.Test
{
    public class PalindromeControllerShould
    {
        private void ConfigurePageMappings()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Palindrome, PalindromeViewModel>();
                cfg.CreateMap<PalindromeViewModel, Palindrome>();
            });
        }

        [Fact]
        public void TestPreconditionFailed()
        {
            var palindromeDetail = new PalindromeViewModel
            {
                PalindromeValue = "",
            };

            var mockService = new Mock<IPalindromeService>();
            var logger = new Mock<ILogger<PalindromeController>>();
            var palindromeController = new PalindromeController(mockService.Object, logger.Object);
            palindromeController.ModelState.AddModelError("", "Invalid PalindromeValue");
            var result = palindromeController.AddPalindrome(palindromeDetail);
            var convertedResult = result as StatusCodeResult;
            Assert.Equal(412, convertedResult.StatusCode);
        }

        [Fact]
        public void TestAddPalindromeForException()
        {
            var model = new PalindromeViewModel
            {
                PalindromeValue = "A new order began, a more Roman age bred Rowenadsds",
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object
            var palindromeDetail = Mapper.Map<PalindromeViewModel, Palindrome>(model);

            var mockService = new Mock<IPalindromeService>();
            mockService.Setup(x => x.AddPalindrome(palindromeDetail));

            var logger = new Mock<ILogger<PalindromeController>>();
            var palindromeController = new PalindromeController(mockService.Object, logger.Object);
            var result = palindromeController.AddPalindrome(model);
            var convertedResult = result as ObjectResult;
            Assert.Equal(400, convertedResult.StatusCode);
        }

        [Fact]
        public void TestAddPalindromeForInvalid()
        {
            var model = new PalindromeViewModel
            {
                PalindromeValue = "A new order began, a more Roman age bred Rowenadsds",
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object from view model
            var palindromeDetail = Mapper.Map<PalindromeViewModel, Palindrome>(model);

            // configure mock repository 
            var mockRepository = new Mock<IPalindromeRepository>();
            mockRepository.Setup(y => y.Create(palindromeDetail));

            //  Create Instance of Palindrome service 
            var logger = new Mock<ILogger<PalindromeService>>();
            var palindromeService = new PalindromeService(mockRepository.Object, logger.Object);

            // call controller action 
            var controllerLogger = new Mock<ILogger<PalindromeController>>();
            var palindromeController = new PalindromeController(palindromeService, controllerLogger.Object);
            var result = palindromeController.AddPalindrome(model);

            // get response
            var convertedResult = result as ObjectResult;

            Assert.Equal(200, convertedResult.StatusCode);
        }

        [Fact]
        public void TestAddPalindrome()
        {
            var model = new PalindromeViewModel
            {
                PalindromeValue = "A new order began, a more Roman age bred Rowena.",
            };

            // setting up auto mapper
            this.ConfigurePageMappings();
            // retrieve entity object from view model
            var palindromeDetail = Mapper.Map<PalindromeViewModel, Palindrome>(model);

            // configure mock repository 
            var mockRepository = new Mock<IPalindromeRepository>();
            mockRepository.Setup(y => y.Create(palindromeDetail));

            //  Create Instance of Palindrome service 
            var logger = new Mock<ILogger<PalindromeService>>();
            var palindromeService = new PalindromeService(mockRepository.Object, logger.Object);

            // call controller action 
            var controllerLogger = new Mock<ILogger<PalindromeController>>();
            var palindromeController = new PalindromeController(palindromeService, controllerLogger.Object);
            var result = palindromeController.AddPalindrome(model);

            // get response
            var convertedResult = result as ObjectResult;

            Assert.Equal(201, convertedResult.StatusCode);
        }
    }
}
