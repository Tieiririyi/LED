angular.module('led').directive('resetPassword', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/reset-password/reset-password.html',
        controllerAs:'resetPasswordCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){

            $reactive(this).attach($scope);
            
            this.init = () =>{
                Meteor.logoutOtherClients();                
                Meteor.logout();
            };

            this.reset = (user) => {
                
                if (user.password1 == user.password2){
                    var token = $stateParams.token;

                    Accounts.resetPassword(token, user.password1, function(error){
                       if (error){
                           console.log(error);
                       } 
                    });
                    this.show = true;
                }
            };
            
            this.helpers({
                success: () => {
                    if (Meteor.user() == null){
                        return false;
                    }
                    else{
                        return true;
                    }
                }
            });
        }
    };
});