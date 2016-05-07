/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('product', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/product/product.html',
        controllerAs:'productCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, store, $rootScope, updateCart){
            $reactive(this).attach($scope);
            this.subscribe('categories');
            this.subscribe('products');
            this.subscribe('orders');
            this.subscribe('images');


            this.helpers({
                product: ()=> {
                    return Products.findOne({_id: $stateParams.prodId});
                },
                image : () => {
                    if (Products.findOne({_id: $stateParams.prodId}).picture != undefined){
                        return Images.findOne({"_id": Products.findOne({_id: $stateParams.prodId}).picture});
                    }
                },
                categories: ()=> {
                    return Categories.find({});
                }
            });

            this.addToCart = () => {
                this.added = false;
                this.cart = store.get('cart');

                if (this.cart == null){
                    this.cart = [];
                }
                for (var i = 0; i < this.cart.length; i++){
                    if (this.cart[i].productId == $stateParams.prodId){
                        this.cart[i].quantity = parseInt(this.cart[i].quantity) + parseInt(this.quantity);
                        this.added = true;
                    }
                }
                if (this.added == false){
                    this.cart.push({"productId": $stateParams.prodId, "quantity": this.quantity});
                }
                store.set('cart', this.cart);
                this.quantity = "";

                $rootScope.led.cart_items = updateCart.cart_items();

                if (Meteor.user() != null){
                    var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                    if (user != null){
                        Meteor.call('updateOrders', Meteor.userId(), user._id, store.get('cart'), "not ordered", function(error, result){
                            if (error){
                                console.log(error);
                            }
                        });
                    }
                    else{
                        Meteor.call('insertOrders', Meteor.userId(), store.get('cart'), "not ordered", function(error, result){
                            if (error){
                                console.log(error);
                            }
                        });
                    }
                }
            }
        }
    }
});