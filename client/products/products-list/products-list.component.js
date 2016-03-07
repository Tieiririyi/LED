/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('productsList', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/products/products-list/products-list.html',
        controllerAs:'productsList',
        controller: function ($scope,$stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    products: ()=> {
                    return Products.find({"categoryId": $stateParams.id}).map(function(product){
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
                            "otherPics": []
                        };
                    });
                }
            });
        }
    }
});