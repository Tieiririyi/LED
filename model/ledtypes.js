/**
 * Created by Tieiririyi on 2016-05-02.
 */
Ledtypes = new Mongo.Collection("ledtypes");

Ledtypes.allow({
    insert: function(userId, doc){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    },
    update: function(userId, doc, fields, modifier){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    }
});