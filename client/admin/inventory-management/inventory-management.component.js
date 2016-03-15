/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryManagement', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/inventory-management.html',
        controllerAs:'inventoryCtrl',
        controller: function ($scope, $meteor, $reactive, $location){
            $reactive(this).attach($scope);

            this.newProduct = {};
            this.newCategory = {};

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

            this.editCat = (num) => {
                num.showCat = true;
            }

            this.updateCat = (num) => {
                num.showCat = false;
                Categories.update({_id: num.category._id}, {
                    "categoryName": num.category.categoryName,
                    "categoryDescription": num.category.categoryDescription
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
                    _id: num.product.info._id,
                    "productName": num.product.info.productName,
                    "productDescription": num.product.info.productDescription,
                    "categoryId": num.product.info.categoryId,
                    "power": num.product.info.power,
                    "brightness": num.product.info.brightness,
                    "colours": num.product.info.colours,
                    "dimmable": num.product.info.dimmable,
                    "certification": num.product.info.certification,
                    "quantityInStock": (parseInt(num.product.info.quantityInStock)  + inStock),
                    "quantityOnHold": parseInt(num.product.info.quantityOnHold),
                    "price": num.product.info.price,
                    "primaryPic": num.product.info.primaryPic,
                    "otherPics": num.product.info.otherPics
                });
            }

            this.removeProduct = (num) => {
                Products.remove({_id: num.product.info._id});
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
                $location.path('inventory/addProduct');
            }
        }
    }
});