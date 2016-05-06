/**
 * Created by Tieiririyi on 2016-04-25.
 */
angular.module('led').directive('home', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/led/home.html',

        controllerAs: 'home',
        controller: function ($scope, $reactive, $location, store, updateCart) {
            $reactive(this).attach($scope);
            this.subscribe('images');
            this.subscribe('categories');
            this.helpers({
                    categories: ()=> {
                    return Categories.find({});
                },
                catimages: ()=> {
                    return Images.find({});
                }




            })

            this.findImage = (imageID) =>
            {
                // var thisimage = Images.findOne({"_id":imageID});
                //
                //
                // var   imageurl = thisimage.url("images");
                //
                //
                // return imageurl;
                return Images.findOne({"_id":imageID});


            }
        }
    }

    });