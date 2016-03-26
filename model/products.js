/**
 * Created by Tieiririyi on 2016-02-07.
 */

Products = new Mongo.Collection("products");

Products.allow({
    insert: function(userId, doc){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    },
    update: function(userId, doc, fields, modifier){
        if (fields == 'quantityOnHold' && userId || Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led')){
            return true;
        }
    }
});

Meteor.methods({
    updateInventory: function(userId, productId, product){
        if (Meteor.isServer){
            Products.update({_id: productId}, product);
        }
    }
});