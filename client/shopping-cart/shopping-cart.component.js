angular.module('led').directive('shoppingCart', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/shopping-cart.html',
        controllerAs:'shoppingCart',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, $location, $rootScope, updateCart){
            $reactive(this).attach($scope);
            
            this.helpers({
                cart: ()=> {
                    var cart = store.get('cart');
                    console.log(updateCart.setCart());
                    return updateCart.setCart();
                },
                total: () => {
                    return updateCart.setCartTotal(this.cart);
                }
            });
            
            this.updateQuantity = (num) =>{
                var cart = store.get('cart');

                cart[num.$index] = {'productId': num.item.info._id, 'quantity': parseInt(num.item.orderQuantity)};
                store.set('cart', cart);
                
                this.cart = updateCart.setCart();
                this.total = updateCart.setCartTotal(this.cart);
                $rootScope.led.cart_items = updateCart.cart_items();
            };

            this.removeProduct = (num) => {
                var cart = store.get('cart');
                var temp_cart = [];
                
                temp_cart = cart.filter(function(item){
                    if (item.productId != num.item.info._id){
                        return true;
                    }
                });

                store.set('cart', temp_cart);
                this.cart = updateCart.setCart();
                this.total = updateCart.setCartTotal(this.cart);
                $rootScope.led.cart_items = updateCart.cart_items();
            };

            this.review = () => {

                if (Meteor.userId() == null && this.total != 0){
                    $location.search('redirect', '/orders/review');
                    $location.path("/users");
                }
                else if(Meteor.userId() != null && this.total != 0){
                    $location.path('/orders/review');

                }
            };
        }
    };
});

