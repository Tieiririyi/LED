/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('categoriesList', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/categories/categories-list/categories-list.html',
        controllerAs:'categoriesList',
        controller: function ($scope,$meteor, $reactive){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);

            this.newProduct = {};

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                    }
                })

            this.addProduct = () => {
                this.newProduct.categoryId = Categories.findOne({"categoryName": this.newProduct.categoryName})._id;
                Products.insert(this.newProduct);
                this.newProduct = {};
            };

            this.newCategory = {};
        }
    }
});