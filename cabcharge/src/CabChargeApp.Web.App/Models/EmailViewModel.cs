using System.ComponentModel.DataAnnotations;

namespace CabChargeApp.Web.App.Models
{
    public class EmailViewModel
    {

        [Required]
        public string ToValue { get; set; }
        public string CCValue { get; set; }
        public string BCCValue { get; set; }

        [Required]
        public string SubjectValue { get; set; }
        public string MessageValue { get; set; }
    }
}