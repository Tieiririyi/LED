/**
 * Created by Tieiririyi on 2016-02-07.
 */
Categories = new Mongo.Collection("categories");

Categories.allow({
    insert: function(userId, doc){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    },
    update: function(userId, doc, fields, modifier){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    }
});