/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('addProduct', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/inventory_management/addProduct/add-product.html',
        controllerAs:'addProduct',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);

            this.helpers({
                    categories: ()=> {
                    return Categories.find({});
            }
        });


            this.submit = (product) => {
                console.log(product);
                Products.insert(
                    {
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
                        "primaryPic": "/",
                        "otherPics": []
                    });
                $location.path("/inventory");
                /*
                 products: ()=> {
                 return Products.find({}).map(function(product){
                 return {
                 _id: product._id,
                 "productName": product.productName,
                 "productDescription": product.productDescription,
                 "categoryId": product.categoryId,
                 "categoryName": Categories.findOne({_id: product.categoryId}).categoryName,
                 "power": product.power,
                 "brightness": product.brightness,
                 "colours": product.colours,
                 "dimmable": product.dimmable,
                 "certification": product.certification,
                 "quantityInStock": parseInt(product.quantityInStock),
                 "quantityOnHold": parseInt(product.quantityOnHold),
                 "price": product.price,
                 "primaryPic": product.primaryPic,
                 "otherPics": product.otherPics
                 }
                 });
                 }
                 */
            }
        }
    }
});