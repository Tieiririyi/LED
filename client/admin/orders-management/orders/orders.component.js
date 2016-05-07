angular.module('led').directive('orders', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/orders-management/orders/orders.html',
        controllerAs:'ordersCtrl',
        controller: function ($scope,$stateParams, $meteor, $reactive, $state){
            $reactive(this).attach($scope);
            this.subscribe('orders');
            this.subscribe('users');

            this.helpers({
                order: ()=> {

                    var current_order = Orders.findOne({_id: $stateParams.orderId});
                    return current_order.order.map(function(item){
                        var product = Products.findOne({_id: item.productId});
                        return {
                            info: product,
                            categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                            /*orderQuantity: parseInt(item.quantity)*/
                            itemInfo: item
                        };
                    });
                },
                order_info: () => {
                    return Orders.findOne({_id: $stateParams.orderId});
                },
                processBy: () => {
                    return Orders.findOne({_id: $stateParams.orderId}).processBy;
                },
                total : () => {
                    var total = 0;
                    this.order.forEach(function(item){
                        total = total + parseFloat(item.itemInfo.price) * parseInt(item.itemInfo.quantity);
                    });
                    return total;
                }
            });
            this.processOrder = () => {
                Orders.update({_id: this.order_info._id}, {
                    $set: {
                        status: "processed",
                        processDate: new Date(),
                        processBy: Meteor.userId()}
                });

                this.order.forEach(function(items){
                    var temp_product = Products.findOne({_id: items.info._id});
                    Products.update({_id: items.info._id}, {$set:{
                            quantityOnHold: parseInt(temp_product.quantityOnHold) - parseInt(items.itemInfo.quantity),
                            quantityInStock: parseInt(temp_product.quantityInStock) - parseInt(items.itemInfo.quantity)
                        }
                    });

                });
                $state.go('ordersMngt');
            }

            this.cancelOrder = () => {
                Orders.update({_id: this.order_info._id}, {
                    $set: {
                        status: "cancelled",
                        processDate: new Date(),
                        processBy: Meteor.userId()
                    }
                });
                this.order.forEach(function(items){
                    var temp_product = Products.findOne({_id: items.info._id});
                    Products.update({_id: items.info._id}, {$set: {
                        quantityOnHold: parseInt(temp_product.quantityOnHold) - parseInt(items.itemInfo.quantity)
                    }})
                });
                $state.go('ordersMngt');

            }

            this.edit = (order_item) => {
                order_item.editItem = true;
            }
            this.undo = (order_item) =>{
                order_item.editItem = false;
                var original = Orders.findOne({_id: $stateParams.orderId}).order.filter(function(products){
                    return products.productId == order_item.item.itemInfo.productId;
                });
                order_item.item.itemInfo.quantity = original[0].quantity;
                order_item.item.itemInfo.price = original[0].price;
            }
            this.confirm = (order_item) => {
                //update Products database
                var original = Orders.findOne({_id: $stateParams.orderId}).order.filter(function(products){
                    return products.productId == order_item.item.itemInfo.productId;
                });

                //difference will be negative if a larger quantity is wanted by customer
                var difference = parseInt(original[0].quantity) - parseInt(order_item.item.itemInfo.quantity);
                var temp_product = Products.findOne({_id: order_item.item.info._id});

                //check if there is enough stock
                if (difference > 0 || (temp_product.quantityInStock - temp_product.quantityOnHold) >= -difference)
                {

                    Products.update({_id: order_item.item.info._id}, {$set: {
                        quantityOnHold: temp_product.quantityOnHold - difference
                    }});

                    var original_order = Orders.findOne({_id: $stateParams.orderId});
                    var new_order = original_order.order.map(function(product){
                        if (product.productId == order_item.item.itemInfo.productId){
                            return {
                                productId: product.productId,
                                quantity: order_item.item.itemInfo.quantity,
                                price: order_item.item.itemInfo.price
                            };
                        }
                        else{
                            return product;
                        }
                    });

                    Orders.update({_id: $stateParams.orderId}, {$set:{
                        order: new_order
                    }});

                    order_item.editItem = false;

                    var total = 0;
                    new_order.forEach(function(product){
                        total = total + product.price * product.quantity;
                    });
                    this.total = total;
                }
                else{
                    alert("Not enough stock, stock available: " + temp_product.quantityInStock + " and stock on hold:" + temp_product.quantityOnHold);
                }
            }

        }
    }
});