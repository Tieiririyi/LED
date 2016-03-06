/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryManagement', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/inventory_management/inventory_management.html',
        controllerAs:'inventoryCtrl',
        controller: function ($scope, $meteor, $reactive){
            $reactive(this).attach($scope);

            this.newProduct = {};
            this.newCategory = {};

            this.helpers({
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
            })
            this.helpers({
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
                console.log(num.product.quantityChange);
                //num.product.categoryId = Categories.findOne({"categoryName": num.product.categoryName})._id;
                var inStock = num.product.quantityChange == undefined? 0: parseInt(num.product.quantityChange);
                Products.update({_id: num.product._id}, {
                    _id: num.product._id,
                    "productName": num.product.productName,
                    "productDescription": num.product.productDescription,
                    "categoryId": num.product.categoryId,
                    "power": num.product.power,
                    "brightness": num.product.brightness,
                    "colours": num.product.colours,
                    "dimmable": num.product.dimmable,
                    "certification": num.product.certification,
                    "quantityInStock": (parseInt(num.product.quantityInStock)  + inStock),
                    "quantityOnHold": parseInt(num.product.quantityOnHold),
                    "price": num.product.price,
                    "primaryPic": num.product.primaryPic,
                    "otherPics": num.product.otherPics
                });
            }

            this.removeProduct = (num) => {
                Products.remove({_id: num.product._id});
            }

            this.undoProduct = (num) => {
                num.showProd = false;
                temp_product = Products.findOne({_id: num.product._id});
                num.product = {
                    _id: temp_product._id,
                    "productName": temp_product.productName,
                    "productDescription": temp_product.productDescription,
                    "categoryId": temp_product.categoryId,
                    "categoryName": Categories.findOne({_id: temp_product.categoryId}).categoryName,
                    "power": temp_product.power,
                    "brightness": temp_product.brightness,
                    "colours": temp_product.colours,
                    "dimmable": temp_product.dimmable,
                    "quantityInStock": parseInt(temp_product.quantityInStock),
                    "quantityOnHold": parseInt(temp_product.quantityOnHold),
                    "price": temp_product.price,
                    "primaryPic": temp_product.primaryPic,
                    "otherPics": temp_product.otherPics
                };
            }

            this.addProduct = () => {
                Products.insert(this.newProduct);
                this.newProduct = {};
            }
        }
    }
});