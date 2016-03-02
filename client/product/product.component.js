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
            this.helpers({
                    product: ()=> {
                    return Products.findOne({_id: $stateParams.prodId});
                }
            });
            this.removeProduct = (product) => {
                Products.remove({_id: product._id});
                $location.path("/categories/" + $stateParams.catId);
            }
        }
    }
});