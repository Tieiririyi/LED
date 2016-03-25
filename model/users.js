/*
Meteor.methods({
    updateUser: function(userId, userProfile, group){
        var loggedInUser = Meteor.userId();

        if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin', 'super-admin'], group)){
            throw new Meteor.Error(403, "Access denied");
        }
        if (Meteor.isServer) {
            Meteor.users.update({_id: userId}, {$set:
            {
                profile: userProfile
            }
            });
        }
    }
});*/
