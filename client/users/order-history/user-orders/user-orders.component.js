angular.module('led').directive('userOrders', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/order-history/user-orders/user-orders.html',
        controllerAs:'userOrdersCtrl',
        controller: function ($scope,$stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);
            this.subscribe('orders');
            this.subscribe('users');
            this.subscribe('images');
            this.helpers({
                order: ()=> {
                    var current_order = Orders.findOne({_id: $stateParams.orderId});
                    return current_order.order.map(function(item){
                        var product = Products.findOne({_id: item.productId});
                        return {
                            info: product,
                            categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                            itemInfo: item
                        };
                    });
                },
                order_info: () => {
                    return current_order = Orders.findOne({_id: $stateParams.orderId});
                },
                total : () => {
                    var total = 0;
                    this.order.forEach(function(item){
                        total = total + parseFloat(item.itemInfo.price) * parseInt(item.itemInfo.quantity);
                    });
                    return total;
                }
            });
            this.retrievePicture = (picID)=>{

                return Images.findOne({"_id": picID});
            };
        }
    }
});