/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryProductDetails', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/inventory_management/inventoryProductDetails/inventory-product.html',
        controllerAs:'inventoryProductDetails',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);

            this.helpers({
                    categories: ()=> {
                        return Categories.find({});
                    }
            });

            this.helpers({
                product: () => {
                    return Products.findOne({_id: $stateParams.prodId});
                }
            });

            this.submit = () => {
                Products.update({_id: this.product._id},
                    {
                        "productName": this.product.productName,
                        "productDescription": this.product.productDescription,
                        "categoryId": this.product.categoryId,
                        "categoryName": Categories.findOne({_id: this.product.categoryId}).categoryName,
                        "power": this.product.power,
                        "brightness": this.product.brightness,
                        "colours": this.product.colours,
                        "dimmable": this.product.dimmable == "true"? true: false,
                        "certification": this.product.certification,
                        "quantityInStock": parseInt(this.product.quantityInStock),
                        "quantityOnHold": parseInt(this.product.quantityOnHold),
                        "price": this.product.price,
                        "primaryPic": this.product.primaryPic,
                        "otherPics": this.product.otherPics
                    });
                $location.path("/inventory");
            }
        }
    }
});