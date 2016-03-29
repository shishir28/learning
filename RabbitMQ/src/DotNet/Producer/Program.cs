using RabbitMQ.Client;
using System;
using System.Linq;
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

                var messageTobeSent = (args.Length > 1) ? string.Join(" ", args.Skip(1).ToArray()) : "Hello Shishir from .NET";
                ch.BasicPublish(exchange: "sampleTopic",
                                    routingKey: key,
                                    basicProperties: null,
                                    body: Encoding.UTF8.GetBytes(messageTobeSent));
                Console.WriteLine(" [x] Sent message with [0] and content [1]", key, messageTobeSent);
            }
        }

    }
}
