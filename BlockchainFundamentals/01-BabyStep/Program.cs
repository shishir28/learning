using System;
using System.Text;

namespace BabyStep
{
    class Program
    {
        static void Main(string[] args)
        {
            var originalMessage = "American multinational technology company that specializes in Internet-related services and products";
            var otherMessage = "American multinational technology company that specializes in Internet-related services and products";
            InvokeHash(originalMessage, otherMessage);
            Console.WriteLine("------------------------------------------------------------------------------------");
            InvokeAuthenticatedHash(originalMessage, otherMessage);
            Console.WriteLine("------------------------------------------------------------------------------------");
            InvokeDigitalSignatre(originalMessage);
            Console.Write("Press any key to terminate");
            Console.ReadLine();
        }

        private static void InvokeHash(string originalMessage, string otherMessage)
        {
            var hashValueForOriginal = HashData.HashIt(Encoding.UTF8.GetBytes(otherMessage));
            var hashValueForOther = HashData.HashIt(Encoding.UTF8.GetBytes(originalMessage));
            Console.WriteLine($"Hash value for original message {Convert.ToBase64String(hashValueForOriginal)}");
            Console.WriteLine($"Hash value for other  message {Convert.ToBase64String(hashValueForOther)}");
        }

        private static void InvokeAuthenticatedHash(string originalMessage, string otherMessage)
        {
            var privateKey = HashAuthentication.GenerateKey(32);
            var hashValueForOriginal = HashAuthentication.HashIt(Encoding.UTF8.GetBytes(originalMessage),privateKey);
            var hashValueForOther = HashAuthentication.HashIt(Encoding.UTF8.GetBytes(otherMessage),privateKey);;
            Console.WriteLine($"Hash value for original message {Convert.ToBase64String(hashValueForOriginal)}");
            Console.WriteLine($"Hash value for other  message {Convert.ToBase64String(hashValueForOther)}");
        }

        private static void InvokeDigitalSignatre(string originalMessage)
        {
            var byteOriginalMessage =  Encoding.UTF8.GetBytes(originalMessage);
            var hashedOriginalData =  HashData.HashIt(byteOriginalMessage);

            var digitalSignature = new DigitalSignature();
            digitalSignature.AssignKey();
            var signature = digitalSignature.SignTheData(hashedOriginalData);
            var verificationData = digitalSignature.VerifySignedData(hashedOriginalData,signature);
            Console.WriteLine($"Signature verification output is {verificationData}");
        }
    }
}
