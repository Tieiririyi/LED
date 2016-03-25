/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('forgotPassword', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/forgot-password/forgot-password.html',
        controllerAs:'usersForgotPwdCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);
            //this.subscribe('users');

            this.forgotPassword = (user) => {
                if (user.email != undefined){
                    console.log("here");
                    Accounts.forgotPassword({"email": user.email}, function(error){
                        if (error){
                            this.message = "There was an error, please try again";
                        }
                    });
                }
            };
        }
    };
});