/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('users', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/users.html',
        controllerAs:'usersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);


            this.login = (user) => {
                Meteor.loginWithPassword(user.email, user.password, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else {
                        $location.path('/categories');
                    }
                });
            }

        }
    };
});