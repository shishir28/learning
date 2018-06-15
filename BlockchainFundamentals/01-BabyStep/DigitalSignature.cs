using System;
using System.Security.Cryptography;

namespace BabyStep
{
    public class DigitalSignature
    {
        private RSAParameters _privateKey;
        private RSAParameters _publicKey;

        public void AssignKey()
        {
            using (var serviceProvider = new RSACryptoServiceProvider(2048))
            {
                serviceProvider.PersistKeyInCsp = false;
                _publicKey = serviceProvider.ExportParameters(false);
                _privateKey = serviceProvider.ExportParameters(true);
            }
        }

        public byte[] SignTheData(byte[] originalData)
        {
            using (var serviceProvider = new RSACryptoServiceProvider(2048))
            {
                serviceProvider.PersistKeyInCsp = false;
                serviceProvider.ImportParameters(this._privateKey);
                var rsaFormmater = new RSAPKCS1SignatureFormatter(serviceProvider);
                rsaFormmater.SetHashAlgorithm("SHA256");
                return rsaFormmater.CreateSignature(originalData);
            }
        }

        public bool VerifySignedData(byte[] hashedData, byte[] signature)
        {
            using (var serviceProvider = new RSACryptoServiceProvider(2048))
            {
                serviceProvider.PersistKeyInCsp = false;
                serviceProvider.ImportParameters(this._publicKey);
                var rsaDeformmater = new RSAPKCS1SignatureDeformatter(serviceProvider);
                rsaDeformmater.SetHashAlgorithm("SHA256");
                return rsaDeformmater.VerifySignature(hashedData, signature); ;
            }
        }
    }
}
