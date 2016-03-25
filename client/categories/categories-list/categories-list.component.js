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

            this.subscribe('categories');

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                    }
                })

        }
    }
});