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

            this.newCategory = {};
            
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

                //store.set('cart', []);
                //Session.set('test1');
                //console.log(Session);
                    this.added = false;
                    this.cart = store.get('cart');

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
                //}
            }
        }
    }
});