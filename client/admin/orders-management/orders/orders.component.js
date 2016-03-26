angular.module('led').directive('orders', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/orders-management/orders/orders.html',
        controllerAs:'ordersCtrl',
        controller: function ($scope,$stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('orders');
            this.subscribe('users');
            //this.categories = $meteor.collection(Categories);
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
                    var current_order = Orders.findOne({_id: $stateParams.orderId});
                    return {
                        orderDate: current_order.orderDate,
                        processDate: current_order.processDate,
                        processBy: current_order.processBy == ""? "": Meteor.users.findOne({_id: current_order.processBy}).profile.name
                    }
                },
                processBy: () => {
                    return Orders.findOne({_id: $stateParams.orderId}).processBy;
                },
                total : () => {
                    var total = 0;
                    this.order.forEach(function(item){
                        total = total + parseFloat(item.price) * parseInt(item.orderQuantity);
                    });
                    return total;
                },
                orderId: () => {
                    return $stateParams.orderId;
                }
            });
            this.processOrder = () => {
                Orders.update({_id: this.orderId}, {
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
                $location.path('/admin/orders');
            }

            this.cancelOrder = () => {
                Orders.update({_id: this.orderId}, {
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
                $location.path('/admin/orders');

            }

        }
    }
});