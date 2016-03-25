angular.module('led').directive('orderReview', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/order-review/order-review.html',
        controllerAs:'orderReview',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, updateCart, $rootScope, $location){
            $reactive(this).attach($scope);
            this.subscribe('categories');
            this.subscribe('products');
            this.subscribe('users');
            this.subscribe('orders');

            this.helpers({
                    cart: () => {
                        return $rootScope.led.setCart();
                    },
                    total : () => {
                        return updateCart.setCartTotal;
                    }
            });
            
            this.buy = () => {
                var confirmation = "";
                //if user has an order that has unfinished status, then replace order
                var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                console.log(user);
                var cart = store.get('cart');
                var order_details = cart.map(function(item){
                    var product = Products.findOne({_id: item.productId});
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price * ((100-product.discount_pct)/100)
                    }
                });

                if (user != null){
                   confirmation = user._id;
                   Orders.update({_id: user._id},
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

                /*if order has gone through, then update products database*/
                if (confirmation != ""){

                    /*not tested, need to know where they want to send email to*/
                    Meteor.call('sendEmail', "gracedevelopmenttest@gmail.com", "gracedevelopmenttest@gmail.com", "New orders", "there is a new order");
                    
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