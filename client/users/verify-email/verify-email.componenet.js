angular.module('led').directive('verifyEmail', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/verify-email/verify-email.html',
        controllerAs:'verifyEmailCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            
            $reactive(this).attach($scope);

            this.init = () => {
                Meteor.logoutOtherClients();                
                Meteor.logout();
                this.verified = false;
                var token = $location.search().token;
                //need to check if link has expired
                Accounts.verifyEmail(token, function(error){
                    if (!error){
                        Meteor.call('findUser', $location.search().email, function(error, result){
                            this.verified = result;
                        });
                    }
                });
            },

            this.helpers({
                verified: () => {
                    if (Meteor.user() == null){
                        return false;
                    }
                    else{
                        return Meteor.user().emails[0].verified;
                    }
                }
            });

        }
    };
});