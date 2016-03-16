/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('productsList', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/products/products-list/products-list.html',
        controllerAs:'productsList',
        controller: function ($scope,$stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);
            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    products: ()=> {
                    return Products.find({"categoryId": $stateParams.id}).map(function(product){
                        return {
                            info: product,
                            categoryName: Categories.findOne({_id: product.categoryId}).categoryName
                        };
                    });
                }
            });
        }
    }
});

