var amqp = require('amqplib/callback_api');
var emailDispatcher = require('./emailDispatcher');
var args = process.argv.slice(2);

if (args.length == 0) {
    console.log('Insufficient Parameter');
    process.exit(1);
}

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var exchangeName = 'sampleTopic';
        ch.assertExchange(exchangeName, 'topic', { durable: true });
        ch.assertQueue('', { exclusive: true }, function (err, usedQueue) {
            console.log('Consumer is waiting. Press CTRL+C to exit');
            args.forEach(function (key) {
                ch.bindQueue(usedQueue.queue, exchangeName, key);
            });

            ch.consume(usedQueue.queue, function (msg) {
                //  console.log(JSON.parse(msg.content.toString()));
                emailDispatcher.sendEmail(msg.content.toString());
                console.log(" Message key is %s and content is %s ", msg.fields.routingKey, msg.content);
            }, { noAck: true });
        });
    });
});