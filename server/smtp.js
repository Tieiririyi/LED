if (Meteor.isServer) {

    Meteor.startup(function () {
        process.env.MAIL_URL = 'smtp://gracedevelopmenttest%40gmail.com:PASSWORD@smtp.gmail.com:587';
    });
// rest of our code here
}

Meteor.methods({
    sendEmail: function (clientEmail, text) {
        check([text], [String]);

        this.unblock();

        Email.send({
            to: clientEmail,
            from: "grace.development.test@gmail.com",
            subject: 'New message from contact form',
            text: text
        });
    }
});