using System;

namespace EmailApp.Service
{
    public class Program
    {
        public void Main(string[] args)
        {
            var processor = new QueueProcessor();
            processor.StartProcessing();
            Console.ReadLine();
        }
    }
}
