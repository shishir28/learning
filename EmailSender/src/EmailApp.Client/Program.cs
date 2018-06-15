using EmailApp.Common;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EmailApp.Client
{
    public class Program
    {
        public void Main(string[] args)
        {
            var qh = new QueueHandler();
            qh.MessageReceivedEvent += Qh_MessageReceivedEvent;
            var paths = new Dictionary<string, string> { { Constants.BASE_NAME, Constants.BASE_PATH  } };
            var queues = qh.CreateQueues(paths);
            var firstQueue = queues.First().Value;

            Console.WriteLine("Press any key to send message, Hit enter to terminate");
            ConsoleKeyInfo keyInfo = Console.ReadKey(true);
            do
            {
                if (keyInfo.Key == ConsoleKey.Enter)
                {
                    Console.WriteLine("Terminating the application...");
                    break;
                }
                var emailMessage = new Email
                {
                    From = "a@b.com",
                    Tos = @"shishir28@gmail.com",
                    CCs = @"shishir28@live.com",
                    BCCs = @"shishir28@live.com",
                    Body = "Hello World -- " + DateTime.UtcNow.ToString(),
                };

                firstQueue.Send(emailMessage);
                Console.WriteLine("Press any key to send message, Hit enter to terminate");
                keyInfo = Console.ReadKey(true);

            } while (keyInfo != null);

        }

        private void Qh_MessageReceivedEvent(object sender, QueueHandlerEvent<IEmail> e)
        {
            Console.WriteLine("New message is ready to be receieved! message ID: " + e.MessageId + " on queue path: " + e.QueuePath);
        }
    }
}
