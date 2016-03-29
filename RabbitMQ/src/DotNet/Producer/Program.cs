using RabbitMQ.Client;
using System;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
namespace Producer
{
    public class Program
    {
       
        public static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var conn = factory.CreateConnection())
            using (var ch = conn.CreateModel())
            {
                ch.ExchangeDeclare(exchange: "sampleTopic", type: "topic", durable: true);
                var key = (args.Length > 0) ? args[0] : "dummyKey";

                // var messageTobeSent = (args.Length > 1) ? string.Join(" ", args.Skip(1).ToArray()) : "Hello Shishir from .NET";

                var messageTobeSent = new Email
                {
                    body = "Hello .Net  World",
                    subject = "Hello  .NET Message",
                    from = new EmailPerson { firstName = "JohnDot", lastName = "DoeNET", address = "shishir28@gmail.com" },
                    toList = new System.Collections.Generic.List<EmailPerson> { new EmailPerson { firstName = "JaneDot", lastName = "DoeNET", address = "shishir28@live.com" } }
                };

                ch.BasicPublish(exchange: "sampleTopic",
                                    routingKey: key,
                                    basicProperties: null,
                                    body: Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messageTobeSent)));
                Console.WriteLine(" [x] Sent message with [0] and content [1]", key, messageTobeSent);
            }
        }

    }
}
