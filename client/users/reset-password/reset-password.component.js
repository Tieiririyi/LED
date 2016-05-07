angular.module('led').directive('resetPassword', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/reset-password/reset-password.html',
        controllerAs:'resetPasswordCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive){

            $reactive(this).attach($scope);
            
            this.init = () =>{
                Meteor.logoutOtherClients();                
                Meteor.logout();
            };

            this.reset = (user) => {
                
                if (user.password1 == user.password2){
                    var token = $stateParams.token;

                    Accounts.resetPassword(token, user.password1, (error)=>{
                       if (error){
                           this.success = false;
                           this.message = error.reason;
                       }
                        else{
                            this.success = true;
                            this.message = "Your password has been reset";
                        }
                    });
                }
            };
        }
    };
});