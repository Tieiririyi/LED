angular.module('led').directive('verifyEmail', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/verify-email/verify-email.html',
        controllerAs:'verifyEmailCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $state){
            
            $reactive(this).attach($scope);

            this.init = () => {
                Meteor.logoutOtherClients();                
                Meteor.logout();

                //need to check if link has expired
                var token = $state.params.token;

                Accounts.verifyEmail(token, (error) => {
                    if (error){
                        this.message = "Your email could not be verified";
                    }
                    else{
                        this.message = "Your email has been verified";
                    }
                    $scope.$apply();
                });
            }
        }
    };
});