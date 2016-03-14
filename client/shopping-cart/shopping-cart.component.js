angular.module('led').directive('shoppingCart', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/shopping-cart.html',
        controllerAs:'shoppingCart',
        controller: function ($scope,$stateParams, $meteor, $reactive, store, $location){
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
                var total = 0;
                cart.forEach(function(item){
                    total = total + parseFloat(item.info.price) * parseInt(item.orderQuantity);
                });
                this.total = total;

                this.cart = cart.map(function(item){
                    var product = Products.findOne({_id: item.info.productId});

                    return {

                        info: product,
                        categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                        orderQuantity: parseInt(item.quantity)
                    };
                });
            };

            this.buy = () => {

                if (Meteor.userId() == null){
                    $location.path("/users");
                }
                else{

                    var confirmation = "";
                    //if user has an order that has unfinished status, then replace order
                    var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                    if (user != null){
                       confirmation = user._id;
                       Orders.update({_id: Orders.findOne({userId: Meteor.userId(), status: "not ordered"})._id},{
                            userId: Meteor.userId(),
                            order: store.get('cart'),
                            status: "ordered"
                        });
                    }
                    else{
                        confirmation = Orders.insert({
                            userId: Meteor.userId(),
                            order: store.get('cart'),
                            status: "ordered"
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

                        //console.log($location.path());
                        $location.path('/shoppingCart/' + confirmation);
                    }
                }
            };
        }
    }
});