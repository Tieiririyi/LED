/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('createAccount', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/createAccount/create-account.html',
        controllerAs:'newUsersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $state, store){
            $reactive(this).attach($scope);
            //this.subscribe('users');

            this.register = (user) =>{
                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name,
                        status: "active",
                    }
                }, (error) => {
                    if (error){
                        this.message = error.reason;
                    }
                    else{
                        Meteor.call('verifyUserEmail');
                        Meteor.call('updateRoles', Meteor.userId(), ['customer'], 'led', (error) => {
                            if (!error){
                                Meteor.call('insertOrders', Meteor.userId(), store.get('cart'), "not ordered", function(error, result){
                                    if (error){
                                        console.log(error);
                                    }
                                });
                                if ($state.params.redirect != undefined){
                                    $state.go($state.params.redirect);
                                }
                                else{
                                    $state.go('categories');
                                }
                            }
                        });
                    }
                });
            }
        }
    };
});