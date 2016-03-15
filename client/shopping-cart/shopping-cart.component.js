angular.module('led').directive('shoppingCart', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/shopping-cart.html',
        controllerAs:'shoppingCart',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, $location, $rootScope, updateCart){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    cart: ()=> {
                        var cart = store.get('cart');

                        return cart.map(function(item){
                            var product = Products.findOne({_id: item.productId});
                            return {
                                info: product,
                                categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                                orderQuantity: parseInt(item.quantity)
                            };
                        });
                    },
                    total: () => {
                        var total = 0;
                        this.cart.forEach(function(item){
                            total = total + parseFloat(item.info.price) * parseInt(item.orderQuantity);
                        });
                        return total;
                    }
            });
            this.updateQuantity = (num) =>{
                var cart = store.get('cart');

                cart[num.$index] = {'productId': num.item.info._id, 'quantity': parseInt(num.item.orderQuantity)};
                store.set('cart', cart);

                this.cart = cart.map(function(item){
                    var product = Products.findOne({_id: item.productId});

                    return {

                        info: product,
                        categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                        orderQuantity: parseInt(item.quantity)
                    };
                });

                var total = 0;
                this.cart.forEach(function(item){
                    total = total + parseFloat(item.info.price) * parseInt(item.orderQuantity);
                });
                this.total = total;
                $rootScope.led.cart_items = updateCart.cart_items();
            };

            this.removeProduct = (num) => {
                var cart = store.get('cart');
                var temp_cart = [];
                cart.forEach(function(item){
                    if (item.productId != num.item.info._id){
                        temp_cart.push({
                            productId: item.productId,
                            quantity: parseInt(item.quantity)
                        });
                    }
                });
                store.set('cart', temp_cart);
                this.cart = temp_cart.map(function(item){
                    var product = Products.findOne({_id: item.productId});

                    return {

                        info: product,
                        categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                        orderQuantity: parseInt(item.quantity)
                    };
                });

                var total = 0;
                this.cart.forEach(function(item){
                    total = total + parseFloat(item.info.price) * parseInt(item.orderQuantity);
                });
                this.total = total;
                $rootScope.led.cart_items = updateCart.cart_items();
            };

            this.buy = () => {

                if (Meteor.userId() == null && this.total != 0){
                    $location.path("/users");
                }
                else if(this.total != 0){

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
                        //console.log($location.path());
                        $location.path('/shoppingCart/' + confirmation);
                    }
                }
            };
        }
    }
});