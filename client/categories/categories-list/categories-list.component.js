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
            this.newCategory = {};

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                    }
                })

            this.addProduct = () => {
                var id = "";
                if (this.newProduct.categoryName == "new"){
                    Categories.insert({
                        "categoryName": this.newCategory.categoryName,
                        "categoryDescription": this.newCategory.categoryDescription
                    });
                    id = Categories.findOne({"categoryName": this.newCategory.categoryName})._id;
                    this.newCategory = {};
                }
                this.newProduct.categoryId = (id == ""? Categories.findOne({"categoryName": this.newProduct.categoryName})._id :id);
                Products.insert(this.newProduct);
                this.newProduct = {};
            };

        }
    }
});