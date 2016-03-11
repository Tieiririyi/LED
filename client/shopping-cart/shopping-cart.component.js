angular.module('led').directive('shoppingCart', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/shopping-cart/shopping-cart.html',
        controllerAs:'shoppingCart',
        controller: function ($scope,$stateParams, $meteor, $reactive, store){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    cart: ()=> {
                        var cart = store.get('cart');

                        console.log(cart);
                        cart.forEach(function(item){
                            console.log(Products.findOne({_id: item.productId}));
                        });
                        return cart.map(function(item){
                            var product = Products.findOne({_id: item.productId});
                            return {
                                 "_id": product._id,
                                 "productName": product.productName,
                                 "productDescription": product.productDescription,
                                 "categoryId": product.categoryId,
                                 "categoryName": Categories.findOne({_id: product.categoryId}).categoryName,
                                 "power": product.power,
                                 "brightness": product.brightness,
                                 "colours": product.colours,
                                 "dimmable": product.dimmable == "true"? true: false,
                                 "certification": product.certification,
                                 "quantityInStock": parseInt(product.quantityInStock),
                                 "quantityOnHold": parseInt(product.quantityOnHold),
                                 "price": product.price,
                                 "primaryPic": Images.findOne({"_id": product.primaryPic}),
                                 "otherPics": [],
                                 "quantity": item.quantity
                            };
                        });
                    },
                    total: () => {
                        var total = 0;
                        this.cart.forEach(function(item){
                            total = total + parseFloat(item.price) * parseInt(item.quantity);
                        });
                        return total;
                    }
            });
        }
    }
});