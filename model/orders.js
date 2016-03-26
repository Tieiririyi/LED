Orders = new Mongo.Collection("orders");

Orders.allow({
    insert: function(userId, doc){
        return userId && doc.userId == userId;
    },
    update: function(userId, doc, fields, modifier){
        return userId && doc.userId == userId || Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    }
});

Meteor.methods({
    updateOrders: function(){
        if (Meteor.isServer){
            Orders.update();
        }
    }
});