if (Meteor.isServer) {

    Meteor.startup(function () {
        //process.env.MAIL_URL = 'smtp://gracedevelopmenttest%40gmail.com:Test1234567@smtp.gmail.com:587';
    });
// rest of our code here
}

Meteor.methods({
    sendEmail: function (clientEmail, from, subject, text) {
        check([text], [String]);

        this.unblock();

        Email.send({
            to: clientEmail,
            from: from,
            subject: subject,
            text: text
        });
    }
});