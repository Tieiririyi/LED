/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('addProduct', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/addProduct/add-product.html',
        controllerAs:'addProduct',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);


            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                    
                },
                images: () => {
                    return Images.find();
                }
            });


            this.submit = (product) => {
                if (product.picture.length > 0){
                    var imageID = Images.insert(product.picture[0])._id;
                }
                

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
                        "primaryPic": imageID,
                        "otherPics": []
                    });
                    
                    
                $location.path("/inventory");
            };
            
            this.addImages = (files) => {
                
                Images.find({});
                
                console.log(files);
                Images.remove();

                /*console.log(Images.findOne({_id: "D2rRZMFm4e95gDTF8"})._id);*/
                
                /*if (files.length > 0) {
                    Images.insert(files[0]);
                    
                }*/
            };
            
        }
    };
});