using System;
using System.Security.Cryptography;

namespace BabyStep
{
    public class HashAuthentication
    {
        public static byte[] GenerateKey(int keySize)
        {
            using (var randomGenerator = new RNGCryptoServiceProvider())
            {
                var randomNumber = new byte[keySize];
                randomGenerator.GetBytes(randomNumber);
                return randomNumber;
            }
        }

        public static byte[] HashIt(byte[] originalData, byte[] key)
        {
            using (var sha = new HMACSHA256(key))
            {
                return sha.ComputeHash(originalData);
            }
        }
    }
}
