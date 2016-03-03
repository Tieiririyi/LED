/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('product', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/product/product.html',
        controllerAs:'productCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);

            this.newCategory = {};

            this.helpers({
                    product: ()=> {
                        return Products.findOne({_id: $stateParams.prodId});
                    }
            });

            this.helpers({
                    categories: ()=> {
                        return Categories.find({});
                    }
            });

            this.removeProduct = (product) => {
                Products.remove({_id: product._id});
                $location.path("/categories/" + $stateParams.catId);
            }

            this.editProduct = () => {

                if (this.product.categoryName == "new"){
                    Categories.insert({
                        "categoryName": this.newCategory.categoryName,
                        "categoryDescription": this.newCategory.categoryDescription
                    });
                    this.product.categoryId = Categories.findOne({"categoryName": this.newCategory.categoryName})._id;
                }
                else{
                    this.product.categoryId = Categories.findOne({"categoryName": this.product.categoryName})._id;
                }


                Products.update({_id: this.product._id}, this.product);

                $location.path("/categories/" + $stateParams.catId);
            }
        }
    }
});