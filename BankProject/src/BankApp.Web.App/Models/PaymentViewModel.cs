using System.ComponentModel.DataAnnotations;

namespace BankApp.Web.App.Models
{
    public class PaymentDetailViewModel
    {
        public int Id { get; set; }

        [Required]       
        [RegularExpression("^(\\d{6})$", ErrorMessage = "Invalid BSB")]
        public string BSB { get; set; }

        [Required]
        [MaxLength(10)]
        [MinLength(6)]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Invalid AccountNumber")]
        public string AccountNumber { get; set; }

        [Required]
        public string AccountName { get; set; }

        public string Reference { get; set; }

        [Required]
        [Range(1.0, double.MaxValue, ErrorMessage = "Please enter a value bigger than 1")]
        public double Amount { get; set; }
    }
}