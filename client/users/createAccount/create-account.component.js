/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('createAccount', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/createAccount/create-account.html',
        controllerAs:'newUsersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);

            this.register = (user) =>{
                console.log(user);
                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name
                    }
                }, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else{

                        console.log(Meteor.users.find().fetch());
                    }
                });
                //console.log(Meteor.users.find().fetch());
                //$location.path();
            }
        }
    };
});