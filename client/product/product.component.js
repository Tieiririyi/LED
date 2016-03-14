/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('product', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/product/product.html',
        controllerAs:'productCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, store){
            $reactive(this).attach($scope);

            this.helpers({
                    product: ()=> {
                        return Products.findOne({_id: $stateParams.prodId});
                    },
                    image : () => {
                        if (Products.findOne({_id: $stateParams.prodId}).primaryPic != undefined){
                            return Images.findOne({"_id": Products.findOne({_id: $stateParams.prodId}).primaryPic});
                        }
                        
                        //console.log(Products.findOne({_id: $stateParams.prodId}).primaryPic);
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
                
                    if (Meteor.user() != null){
                        var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                        if (user != null){
                            Orders.update({_id: user._id}, {
                                $set: {
                                    order: this.cart
                                }
                            });
                        }
                        else{
                            Orders.insert({
                                userId: Meteor.userId(),
                                order: this.cart,
                                status: "not ordered"
                            });
                        }
                    }
                    
                    /*
                    var cart = store.get('cart');
                    if (cart.length > 0){
                        led.cart_items = cart.map(function(item){
                           return parseInt(item.quantity); 
                        }).reduce(function(a, b){
                            return a + b;
                        });
                    }
                    else{
                        led.cart_items = 0;
                    }*/
                    
                    
                    //how to update the number beside the cart?
                //}
            }
        }
    }
});