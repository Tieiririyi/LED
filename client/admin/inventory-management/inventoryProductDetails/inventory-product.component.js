/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryProductDetails', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/inventoryProductDetails/inventory-product.html',
        controllerAs:'inventoryProductDetails',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                },
                product: () => {
                    return Products.findOne({_id: $stateParams.prodId});
                },
                image: () => {
                    if (Products.findOne({_id: $stateParams.prodId}).primaryPic != undefined){
                        return Images.findOne({"_id": Products.findOne({_id: $stateParams.prodId}).primaryPic});
                    }
                }
            });

            this.submit = () => {
                
                var imageID = this.product.primaryPic;
                console.log(this.product.picture);
                if (this.product.picture != undefined){
                    if (Images.findOne({_id: this.product.primaryPic}) != undefined) {
                        Images.remove({_id: this.product.primaryPic});
                    }
                    var imageID = Images.insert(this.product.picture[0])._id;
                }
                
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
                        "primaryPic": imageID,
                        "otherPics": this.product.otherPics
                    });
                $location.path("/inventory");
            }
        }
    }
});