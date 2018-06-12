using System;
using System.Collections.Generic;
namespace BankApp.Domain.Entities
{
    public class PaymentDetail : BaseEntity
    {
        public string BSB { get; set; }
        public string AccountNumber { get; set; }
        public string AccountName{ get; set; }
        public string Reference{ get; set; }
        public double Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }

    }
}
