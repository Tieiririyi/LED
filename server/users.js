Meteor.publish("users", function () {

    return Meteor.users.find({}, {fields: {emails: 1, profile: 1/*, roles: 1, userStatus: 1*/}});
});

/*Meteor.publish(null, function (){
    return Meteor.roles.find({})
});*/

Meteor.methods({
    /**
     * update a user's permissions
     *
     * @param {Object} targetUserId Id of user to update
     * @param {Array} roles User's new permissions
     * @param {String} group Company to update permissions for
     */



    updateRoles: function (targetUserId, roles, group) {
        var loggedInUser = Meteor.user();

        if (!loggedInUser &&
            !Roles.userIsInRole(loggedInUser,
                ['admin', 'super-admin'], group)) {
            throw new Meteor.Error(403, "Access denied");
        }

        Roles.setUserRoles(targetUserId, roles, group);
    },

    updateUser: function(userId, userProfile){
        var loggedInUser = Meteor.userId();

        if (!loggedInUser && !Roles.userIsInRole(loggedInUser, ['admin', 'super-admin'], 'localhost')){
            throw new Meteor.Error(403, "Access denied");
        }

        Meteor.users.update({_id: userId}, {$set:
            {
                profile: userProfile
            }
        });
    }
});