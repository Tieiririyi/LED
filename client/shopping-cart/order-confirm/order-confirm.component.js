angular.module('led').directive('orderConfirm', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/order-confirm/order-confirm.html',
        controllerAs:'orderConfirm',
        controller: function ($scope,$stateParams, $meteor, $reactive, store){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    cart: ()=> {
                        var current_order = Orders.findOne({_id: $stateParams.confirmation}).order;

                        return current_order.map(function(item){
                            var product = Products.findOne({_id: item.productId});
                            return {
                                info: product,
                                categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                                orderQuantity: parseInt(item.quantity),
                                unitPrice: item.price
                            };
                        });
                    },
                   confirmation: () => {
                        return $stateParams.confirmation;
                    },
                    total : () => {
                        var total = 0;
                        this.cart.forEach(function(item){
                            total = total + parseFloat(item.unitPrice) * parseInt(item.orderQuantity);
                        });
                        return total;
                    }
            });

        }
    }
});