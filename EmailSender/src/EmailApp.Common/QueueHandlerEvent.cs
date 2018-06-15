using System;

namespace EmailApp.Common
{
    public class QueueHandlerEvent<T>:EventArgs
    {
        public DateTime ReceivedTime { get; set; }
        public string QueuePath { get; set; }
        public string MessageId { get; set; }
        public T MessageObject { get; set; }

        public QueueHandlerEvent(T messageObject,string path)
        {
            QueuePath = path;
            MessageObject = messageObject;
            ReceivedTime = DateTime.UtcNow;
        }
    }
}
