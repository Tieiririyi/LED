Orders = new Mongo.Collection("orders");

Orders.allow({
    insert: function(userId, doc){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    },
    update: function(userId, doc, fields, modifier){
        return Roles.userIsInRole(userId, ['admin', 'super-admin'], 'led');
    }
});

Meteor.methods({
    updateOrders: function(userId, orderId, order, status){
        check(order, [Object]);
        check(orderId, String);
        check(status, String);
        check(userId, String);

        if ((status == "ordered" || status == "not ordered") && userId == Meteor.userId() && order.length > 0){
            var verify = true;
            if (Orders.findOne({_id: orderId}) == null){
                verify = false;
            }
            order.forEach(function(product){
                if (status == "not ordered"){
                    check(product, {
                        productId: String,
                        quantity: String
                    });
                }
                else if (status == "ordered"){
                    check(product, {
                        productId: String,
                        quantity: String,
                        price: Number
                    });
                }
                var temp_product = Products.findOne({_id: product.productId});
                if (temp_product == null){
                    verify = false;
                }
                else if (order.quantity > (temp_product.quantityInStock - temp_product.quantityOnHold) || temp_product.status == false){
                    verify = false;
                }
            });
            if (verify == true){
                var orderNum = 0;
                var orderDate = "";
                var processDate = "";
                var processBy = "";
                if (status == "ordered"){
                    orderNum = 1000000 + Orders.find({orderDate: {$ne: ""}}).fetch().length + 1;
                    orderDate = new Date();
                }
                else if (status == "not ordered"){
                    orderNum = 1;
                }
                if (orderNum > 0){
                    if (Meteor.isServer){
                        return Orders.update({_id: orderId},{
                            userId: Meteor.userId(),
                            order: order,
                            orderNum: orderNum,
                            status: status,
                            orderDate: orderDate,
                            processDate: processDate,
                            processBy: processBy
                        });
                    }
                }
                else{
                    throw new Meteor.Error(403, "There was an error");
                }
            }
            else{
                throw new Meteor.Error(403, "There was an error");
            }
        }


    },
    insertOrders: function(userId, order, status){
        check(order, [Object]);
        check(status, String);
        check(userId, String);

        if (userId == Meteor.userId()){
            var verify = true;
            order.forEach(function(product){
                if (status == "not ordered"){
                    check(product, {
                        productId: String,
                        quantity: String
                    });
                }
                else if (status == "ordered"){
                    check(product, {
                        productId: String,
                        quantity: String,
                        price: Number
                    });
                }

                var temp_product = Products.findOne({_id: product.productId});
                if (temp_product == null){
                    verify = false;
                }
                else if (order.quantity > (temp_product.quantityInStock - temp_product.quantityOnHold) || temp_product.status == false){
                    verify = false;
                }
            });
            if (verify == false){
                throw new Meteor.Error(403, "There was an error");
            }
            else{
                var orderNum = 0;
                var orderDate = "";
                var processDate = "";
                var processBy = "";
                if (status == "ordered"){
                    orderNum = 1000000 + Orders.find({orderDate: {$ne: ""}}).fetch().length + 1;
                    orderDate = new Date();
                }
                else if (status == "not ordered"){
                    orderNum = 1;
                }
                if (orderNum > 0){
                    if (Meteor.isServer){
                        return Orders.insert({
                            userId: Meteor.userId(),
                            order: order,
                            orderNum: orderNum,
                            status: status,
                            orderDate: orderDate,
                            processDate: processDate,
                            processBy: processBy
                        });
                    }
                }
                else{
                    throw new Meteor.Error(403, "There was an error");
                }
            }
        }
    }
});