using System;
using System.Security.Cryptography;

namespace BabyStep
{
    public class HashData
    {
        public static byte[] HashIt(byte[] originalData)
        {
            using (var sha256 = SHA256.Create())
            {
                return sha256.ComputeHash(originalData);
            }
        }
    }
}
