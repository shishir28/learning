using System;
using System.Collections.Generic;
using System.Linq;
using System.Messaging;

namespace EmailApp.Common
{
    public class QueueHandler
    {
        private IDictionary<string, MessageQueue> _queues;
        public IDictionary<string, MessageQueue> Queues => _queues;
        public event EventHandler<QueueHandlerEvent<IEmail>> MessageReceivedEvent;

        public QueueHandler()
        {
            _queues = new Dictionary<string, MessageQueue>();
        }

        public MessageQueue RetrieveQueueByPath(string path, string label )
        {
            MessageQueue result;
            _queues.TryGetValue(path, out result);
            if (result == null)
            {
                if (MessageQueue.Exists(path))
                {
                    result = new MessageQueue(path);
                }
                else
                {
                    try
                    {
                        result = MessageQueue.Create(path);
                        _queues.Add(path, result);
                    }
                    catch (MessageQueueException ex)
                    {
                        throw;
                    }
                }
            }
            result.Label = label;
            return result;
        }

        public MessageQueue GetPublicMessageQueueByName(string name)
        {
            return MessageQueue.GetPublicQueues().FirstOrDefault(x => x.QueueName.Equals(name));
        }

        public IDictionary<string, MessageQueue> CreateQueues(IDictionary<string, string> queueLabelsPaths)
        {
            return queueLabelsPaths
               .Select(x => new { x.Key, Queue = RetrieveQueueByPath(x.Value, x.Key) })
               .ToDictionary(y => y.Key, y => y.Queue);
        }
       
    }
}
