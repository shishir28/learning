var nodemailer = require('nodemailer');
String.prototype.format = function () {
    var content = this;
    for (var i = 0; i < arguments.length; i++) {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

module.exports = {
    sendEmail: function (emailString) {
        var emailObject = JSON.parse(emailString)
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'a@b.com',
                pass: 'ababababaababa'
            },
            logger: false, // log to console
            debug: false // include SMTP traffic in the logs
        }, {
            from: '{0}  {1} <{2}>'.format(emailObject.from.firstName, emailObject.from.lastName, emailObject.from.address) 
        });
       
        var message = {
            // Comma separated list of recipients
            to: '{0}  {1} <{2}>'.format(emailObject.toList[0].firstName, emailObject.toList[0].lastName, emailObject.toList[0].address),
            subject: emailObject.subject, //
            text: emailObject.body
        };

        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
        });
    }
}