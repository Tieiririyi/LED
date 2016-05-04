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
            this.subscribe('categories');
            this.subscribe('products');
            this.subscribe('images');
            this.subscribe('ledtypes');

            //this.categories = $meteor.collection(Categories);
            this.helpers({
                    products: ()=> {
                    return Products.find({categoryId: $stateParams.id, status: true}).map(function(product){
                        return {
                            info: product,
                            categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                            image: (product.picture == "" ? "" : Images.findOne({_id: product.picture}))
                        };
                    });
                },
                ledtypes: ()=>{
                    return Ledtypes.find({});
                }
            }
            );
        }
    }
});