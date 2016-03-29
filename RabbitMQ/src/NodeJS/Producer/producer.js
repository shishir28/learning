var amqp = require('amqplib/callback_api');
var emailSchema = require('../emailSchema').emailObject;
var Validator = require('jsonschema').Validator;

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var exchangeName = 'sampleTopic';
        var args = process.argv.slice(2);
        var key = (args.length > 0) ? args[0] : 'dummyKey';

        var messageTobeSent = {
            "subject": "Hello  Message",
            "body": "Hello  World",
            "from": {
                "firstName": "John",
                "lastName": "Doe",
                "address": "shishir28@gmail.com"
            },
            "toList": [{
                "firstName": "Jane",
                "lastName": "Doe",
                "address": "shishir28@live.com"
            }]
        };
        //folowing code  will validate the message against schema
        //var v = new Validator();
        //v.addSchema(messageTobeSent, '/EmailPerson');
        //console.log(v.validate(messageTobeSent, emailSchema));

        ch.assertExchange(exchangeName, 'topic', { durable: true });
        ch.publish(exchangeName, key, new Buffer(JSON.stringify(messageTobeSent)));
        console.log(" [x] Sent message with %s and content %s", key, JSON.stringify(messageTobeSent));

        setTimeout(function () {
            conn.close();
            process.exit(0);
        }, 500);
    });
});