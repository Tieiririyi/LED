/**
 * Created by Tieiririyi on 2016-02-07.
 */

Products = new Mongo.Collection("products");

Products.allow({
    insert: function(userId, doc){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    },
    update: function(userId, doc, fields, modifier){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    }
});

Meteor.methods({
    updateInventory: function(userId, productId, product){
        if (Meteor.isServer){
            Products.update({_id: productId}, product);
        }
    },
    updateQuantityOnHold: function(userId, productId, number){
        if (Meteor.isServer){
            Products.update({_id: productId}, {$set:{quantityOnHold: number}});
        }
    }
});