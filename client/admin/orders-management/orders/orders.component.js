angular.module('led').directive('orders', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/orders-management/orders/orders.html',
        controllerAs:'ordersCtrl',
        controller: function ($scope,$stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    order: ()=> {

                    var current_order = Orders.findOne({_id: $stateParams.orderId});
                    return current_order.order.map(function(item){
                        var product = Products.findOne({_id: item.productId});
                        return {
                            info: product,
                            categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                            orderQuantity: parseInt(item.quantity)
                        };
                    });
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
                
                console.log(this.order);
                this.order.forEach(function(items){
                    var temp_product = Products.findOne({_id: items.info._id});
                    Products.update({_id: items.info._id}, {$set:{
                            quantityOnHold: parseInt(temp_product.quantityOnHold) - parseInt(items.orderQuantity),
                            quantityInStock: parseInt(temp_product.quantityInStock) - parseInt(items.orderQuantity)                        
                        }
                    });
                    console.log(temp_product);
                    console.log(Products.findOne({_id: items.info._id}));
                });
            }

        }
    }
});