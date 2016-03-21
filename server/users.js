Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1/*, userStatus: 1*/}});
});

/*Meteor.publish(null, function (){
    return Meteor.roles.find({})
});*/

Meteor.methods({
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