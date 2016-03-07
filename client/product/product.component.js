/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('product', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/product/product.html',
        controllerAs:'productCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive){
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

        }
    }
});