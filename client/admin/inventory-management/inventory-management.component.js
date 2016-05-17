/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryManagement', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/inventory-management.html',
        controllerAs:'inventoryCtrl',
        controller: function ($scope, $meteor, $reactive, $state){
            $reactive(this).attach($scope);

            this.newProduct = {};
            this.newCategory = {};

            this.subscribe("products");
            this.subscribe("categories");
            this.subscribe("images");
            this.helpers({
                    products: ()=> {
                        return Products.find({}).map(function(product){
                            return {
                                info: product,
                                categoryName: Categories.findOne({_id: product.categoryId}).categoryName

                            }
                        });
                    },
                categories: () => {
                    return Categories.find();
                }


            })

            this.findImage = (imageID) =>{

               return Images.findOne({"_id":imageID});
            }
            this.editCat = (num) => {
                num.showCat = true;
            }

            this.updateCat = (num) => {
                num.showCat = false;
                var imageID = (num.category.picture == ""? "": num.category.picture);
                //console.log(this.new_picture);
                //add image
                if (this.new_picture != null){

                    if (imageID != ""){
                        Images.remove({_id: imageID});
                    }
                    imageID = Images.insert(this.new_picture[0])._id;

                }
                //console.log(imageID);
                num.category.picture = imageID;
                Categories.update({_id: num.category._id}, {
                    $set:{
                    "categoryName": num.category.categoryName,
                    "categoryDescription": num.category.categoryDescription,
                    "picture":num.category.picture
                    }
                });
            }
            this.undoCat = (num) => {
                num.showCat = false;
                num.category = Categories.findOne({_id: num.category._id});
            }

            this.addCat = () =>{
                Categories.insert(this.newCategory);
                this.newCategory = {};
            }

            this.editProduct = (num) => {
                num.showProd = true;
            }

            this.updateProduct = (num) => {
                num.showProd = false;
                //num.product.categoryId = Categories.findOne({"categoryName": num.product.categoryName})._id;
                var inStock = num.product.quantityChange == undefined? 0: parseInt(num.product.quantityChange);
                Products.update({_id: num.product.info._id}, {
                    $set: {
                        "itemNum": num.product.info.itemNum,
                        "categoryId": num.product.info.categoryId,
                        "quantityInStock": (parseInt(num.product.info.quantityInStock)  + inStock),
                        "quantityOnHold": parseInt(num.product.info.quantityOnHold),
                    }
                });
            }

            this.removeProduct = (num) => {
                //Products.remove({_id: num.product.info._id});
                Products.update({_id: num.product.info._id}, {$set: {"status": false}});
            };

            this.reactivateProduct = (num) => {
                Products.update({_id: num.product.info._id}, {$set: {"status": true}});
            }

            this.undoProduct = (num) => {
                num.showProd = false;
                temp_product = Products.findOne({_id: num.product._id});
                num.product = {
                    info: temp_product,
                    categoryName: Categories.findOne({_id: temp_product.categoryId}).categoryName,
                };
            }

            this.addProduct = () => {
                $state.go('addProduct');
            }
        }
    }
});