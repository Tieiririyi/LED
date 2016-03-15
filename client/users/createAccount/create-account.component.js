/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('createAccount', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/createAccount/create-account.html',
        controllerAs:'newUsersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location, store){
            $reactive(this).attach($scope);

            this.register = (user) =>{
                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name,
                        role: "customer"
                    }
                }, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else{
                        Orders.insert({
                            userId: Meteor.userId(),
                            order: store.get('cart'),
                            status: "not ordered",
                            orderDate: "",
                            processDate: "",
                            processBy: ""
                        });

                        var redirect = $location.search().redirect;
                        if (redirect != undefined){
                            $location.search('redirect');
                            $location.path(redirect);
                        }
                        else{
                            $location.path('/categories');
                        }
                    }
                });
                //console.log(Meteor.users.find().fetch());
                //$location.path();
            }
        }
    };
});