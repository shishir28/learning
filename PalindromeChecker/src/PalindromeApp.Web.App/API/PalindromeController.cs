using AutoMapper;
using PalindromeApp.Domain.Entities;
using PalindromeApp.Services.Interface;
using PalindromeApp.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace PalindromeApp.Web.App.Controllers
{

    [Route("api/[controller]")]
    public class PalindromeController : Controller
    {
        private readonly ILogger<PalindromeController> _logger;
        private readonly IPalindromeService _palindromeService;

        public PalindromeController(IPalindromeService palindromeService, ILogger<PalindromeController> logger)
        {
            _palindromeService = palindromeService;
            _logger = logger;
        }


        [HttpGet]
        [Route("GetAllSavedPalindromes")]
        public IEnumerable<PalindromeViewModel> GetAllSavedPalindromes()
        {
            return Mapper.Map<IEnumerable<Palindrome>, IEnumerable<PalindromeViewModel>>( _palindromeService.GetAllPalindromes());            
        }

        [HttpPost]
        [Route("AddPalindrome")]
        public IActionResult AddPalindrome([FromBody]PalindromeViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var palindromeDetail = Mapper.Map<PalindromeViewModel, Palindrome>(model);
                    var resultPalindrome = _palindromeService.AddPalindrome(palindromeDetail);
                    var palindromeDetailId = resultPalindrome.Id;

                    if (palindromeDetailId == -1)
                    {
                        var result = new ObjectResult(new { StatusCode = 200, Content = "Not Valid Palindrome!" });
                        result.StatusCode = 200;
                        return result;
                    }
                    else
                    {
                        var result = new ObjectResult(new { StatusCode = 201, Content = palindromeDetailId });
                        result.StatusCode = 201;
                        return result;
                    }
                }
                catch (System.Exception ex)
                {
                    _logger.LogError(ex.Message);
                    _logger.LogError(ex.StackTrace);
                    var result = new ObjectResult(new { StatusCode = 400, Content = $@"Palindrome {model.PalindromeValue} could not be done!" });
                    result.StatusCode = 400;
                    return result;
                }
            }
            return new StatusCodeResult(412);
        }
    }
}