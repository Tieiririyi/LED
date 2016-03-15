/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('users', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/users.html',
        controllerAs:'usersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location, store){
            $reactive(this).attach($scope);


            this.login = (user) => {
                Meteor.loginWithPassword(user.email, user.password, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else {
                        if (Orders.find() != undefined){
                            var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});
                            console.log(user);
                            if (store.get('cart').length != 0){
                                Orders.insert({
                                    userId: Meteor.userId(),
                                    order: store.get('cart'),
                                    status: "not ordered",
                                    orderDate: "",
                                    processDate: "",
                                    processBy: ""
                                });
                            }
                            else if (store.get('cart').length == 0 && user != null){
                                store.set('cart', user.order);
                            }
                        }
                        else if (store.get('cart').length > 0){
                            Orders.insert({
                                userId: Meteor.userId(),
                                order: store.get('cart'),
                                status: "not ordered",
                                orderDate: "",
                                processDate: "",
                                processBy: ""
                            });
                        }


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
            }

        }
    };
});