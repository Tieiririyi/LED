angular.module('led').directive('orderReview', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/order-review/order-review.html',
        controllerAs:'orderReview',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, updateCart, $rootScope, $location){
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
                var cart = store.get('cart');
                var order_details = cart.map(function(item){
                    var product = Products.findOne({_id: item.productId});
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price * (1-product.discount_pct)
                    }
                });

                console.log(order_details);


                if (user != null){
                   confirmation = user._id;
                   Orders.update({_id: Orders.findOne({userId: Meteor.userId(), status: "not ordered"})._id},
                       {$set: {
                           order: order_details,
                           status: "ordered",
                           orderDate: new Date()
                        }
                   });
                }
                else{
                    confirmation = Orders.insert({
                        userId: Meteor.userId(),
                        order: order_details,
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