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
                currentCat: ()=> {
                  
                    return Categories.findOne({_id: $stateParams.id});
                }
                }
            );

            $scope.selectedLedtypes =[];

            this.getValuesFor = function(propName){
                return (Products.find({categoryId: $stateParams.id, status: true}) || []).map(function (w) {
                    return w[propName];
                }).filter(function (w, idx, arr) {
                    if (w == "") return false;
                    return arr.indexOf(w) === idx;
                });
            }
            this.ledtypeFilter = function (product) {

                if ($scope.selectedLedtypes.length > 0) {
                    if ($.inArray(product.info.ledtype, $scope.selectedLedtypes) < 0)
                        return;
                }

                return product;
            };

            this.includetype = function(selectedledtype){
                var i = $.inArray(selectedledtype, $scope.selectedLedtypes);
                if (i > -1) {
                    $scope.selectedLedtypes.splice(i, 1);
                } else {
                    $scope.selectedLedtypes.push(selectedledtype);
                }
            }
        }
    }
});