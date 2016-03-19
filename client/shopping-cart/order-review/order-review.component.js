angular.module('led').directive('orderReview', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/order-review/order-review.html',
        controllerAs:'orderReview',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, updateCart, $rootScope){
            $reactive(this).attach($scope);

            this.helpers({
                    cart: () => {
                        return updateCart.setCart();
                    },
                    total : () => {
                        return updateCart.setCartTotal;
                    }
            });
            
            this.buy = () => {
                var confirmation = "";
                //if user has an order that has unfinished status, then replace order
                var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                if (user != null){
                   confirmation = user._id;
                   Orders.update({_id: Orders.findOne({userId: Meteor.userId(), status: "not ordered"})._id},
                       {$set: {
                           order: store.get('cart'),
                           status: "ordered",
                           orderDate: new Date()
                        }
                   });
                }
                else{
                    confirmation = Orders.insert({
                        userId: Meteor.userId(),
                        order: store.get('cart'),
                        status: "ordered",
                        orderDate: new Date(),
                        processDate: "",
                        processBy: ""
                    });
                }
                
                if (confirmation != ""){
                    var cart_items = store.get('cart');

                    cart_items.forEach(function(product){
                        var temp_product = Products.findOne({_id: product.productId}).quantityOnHold;

                        Products.update({_id: product.productId}, {$set: {
                            quantityOnHold: parseInt(temp_product) + parseInt(product.quantity)
                        }});
                    });
                    store.set('cart', []);
                    $rootScope.led.cart_items = 0;
                    $location.path('/shoppingCart/' + confirmation);
                }
            }

        }
    }
});