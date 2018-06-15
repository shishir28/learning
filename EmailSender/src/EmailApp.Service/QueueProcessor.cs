using System;
using System.Collections.Generic;
using System.Messaging;
using System.Threading;
using EmailApp.Common;
using System.Xml.Serialization;

namespace EmailApp.Service
{
    public class QueueProcessor
    {
        private MessageQueue _queue;
        private bool _processingStarted;
        private Thread _workingThread;
        private System.Timers.Timer _timer;

        public ISet<string> Ids;
        public MessageQueue Queue => _queue;
        public bool IsProcessing => _processingStarted;
        public event EventHandler<QueueHandlerEvent<Message>> MessageReceivedEvent;

        public QueueProcessor()
        {
            Ids = new HashSet<string>();
            var qh = new QueueHandler();
           
            _queue = qh.RetrieveQueueByPath(Constants.BASE_PATH, Constants.BASE_NAME);
            this.MessageReceivedEvent += Processor_MessageReceivedEvent;
        }

        public void StartProcessing()
        {
            _timer = new System.Timers.Timer(10000);
            _timer.Elapsed += _timer_Elapsed;
            _timer.AutoReset = true;
            _timer.Enabled = true;
        }

        private void _timer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
        {
            _processingStarted = true;
            if (_workingThread != null && _workingThread.IsAlive)
                return;

            _workingThread = new Thread(() =>
            {
                while (_processingStarted)
                {
                    var msg = _queue.Peek();
                    if (msg != null && (!Ids.Contains(msg.Id)))
                    {
                        Ids.Add(msg.Id);
                        var evnt = new QueueHandlerEvent<Message>(msg, _queue.Path) { MessageId = msg.Id };
                        MessageReceivedEvent.Invoke(this, evnt);
                        _queue.ReceiveById(msg.Id);
                    }
                }
            })
            {
                IsBackground = true
            };
            _workingThread.Start();
        }

        public void StopProcessing()
        {
            _processingStarted = false;
        }

        private void Processor_MessageReceivedEvent(object sender, QueueHandlerEvent<Message> e)
        {
            // To Do :  Write code to send Email
            var serializer = new XmlSerializer(typeof(Email));
            IEmail emailBody = serializer.Deserialize(e.MessageObject.BodyStream) as Email;
            Console.WriteLine(emailBody.Body);
        }
    }
}
