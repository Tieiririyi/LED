/**
 * Created by Tieiririyi on 2016-04-25.
 */
angular.module('led').directive('home', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/led/home.html',

        controllerAs: 'home',
        controller: function ($scope, $reactive, store, updateCart) {
            $reactive(this).attach($scope);

            this.subscribe('categories');
            this.subscribe('images');
            this.helpers({
                    categories: ()=> {
                    return Categories.find({});
                }
            })

            this.findImage = (imageID) =>
            {

                return Images.findOne({"_id": imageID});
            }
        }
    }

    });