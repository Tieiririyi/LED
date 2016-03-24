Meteor.startup(function(){
    Accounts.emailTemplates.siteName = "LED";
    Accounts.emailTemplates.from = "grace.development.test@gmail.com";
    Accounts.emailTemplates.verifyEmail.text = function(user, url){
      return "Thank you for signing up, please click the following link to verify your email:\n"
      /*needs to be replaced*/
      + url + "&email=" + user.emails[0].address;
      //+ "https://led-amazinggracec.c9users.io/users/verify-email/?email=" + user.emails[0].address + "&token=" + user.services.email.verificationTokens[0].token;
    };
    
    Accounts.urls.resetPassword = function(token) {
        //return Meteor.absoluteUrl('users/reset-password/' + token);
        return "https://led-amazinggracec.c9users.io/users/reset-password/" + token;
    };
    
    Accounts.urls.verifyEmail = function(token){
        return "https://led-amazinggracec.c9users.io/users/verify-email/?token=" + token;
    }
    
    Accounts.emailTemplates.resetPassword.text = function(user, url){
        return "To reset your password, simply click the link below.\n" 
            + url;
      /*needs to be replaced*/
      //+ "https://led-amazinggracec.c9users.io/reset-password/?email=" + user.emails[0].address + "&token=" + user.services.password.reset.token;
    }
});



Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
});

/*Meteor.publish(null, function (){
    return Meteor.roles.find({})
});*/

Meteor.methods({
    findUser: function(email){
        return Accounts.findUserByEmail(email).emails[0].verified;
    },
    verifyUserEmail: function(){
        Accounts.sendVerificationEmail(Meteor.userId());
    },
    
    updateRoles: function (targetUserId, roles, group) {
        var loggedInUser = Meteor.user();

        if (!loggedInUser &&
            !Roles.userIsInRole(loggedInUser, ['admin', 'super-admin'], group)) {
            throw new Meteor.Error(403, "Access denied");
        }

        Roles.setUserRoles(targetUserId, roles, group);
    },

    updateUser: function(userId, userProfile, group){
        var loggedInUser = Meteor.userId();

        if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin', 'super-admin'], group)){
            throw new Meteor.Error(403, "Access denied");
        }

        Meteor.users.update({_id: userId}, {$set:
            {
                profile: userProfile
            }
        });
    },
    
    seeRoles: function(){
        console.log("here");
        return Meteor.users.find();
    }
});