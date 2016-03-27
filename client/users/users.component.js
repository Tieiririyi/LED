/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('users', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/users.html',
        controllerAs:'usersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location, store, $rootScope, updateCart){
            $reactive(this).attach($scope);
            //this.subscribe('users');
            this.subscribe('orders');

            this.login = (user) => {
                Meteor.loginWithPassword(user.email, user.password, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else {
                        var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});

                        if (store.get('cart').length > 0){
                            if (user != null){
                                user.order = store.get('cart');
                                Meteor.call('updateOrders', Meteor.userId(), user._id, store.get('cart'), "not ordered", function(error, result){
                                    if (!error){
                                        console.log(result);
                                    }
                                    else{
                                        console.log(error);
                                    }
                                });
                            }
                            else{
                                Meteor.call('insertOrders', Meteor.userId(), store.get('cart'), "not ordered", function(error, result){
                                    if (!error){
                                        console.log(result);
                                    }
                                    else{
                                        console.log(error);
                                    }
                                });
                            }
                        }
                        else if(store.get('cart').length == 0 && user != null){
                            store.set('cart', user.order);
                        }
                        
                        $rootScope.led.cart_items = updateCart.cart_items();
                        
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
            };
            this.forgotPassword = () => {
                
                if (this.user.email != ""){
                    Accounts.forgotPassword({"email": this.user.email}, function(error){
                        if (error){
                            this.message = "There was an error, please try again";
                        }
                    });
                }
                else{
                    this.forgotPwd = true;
                }
            };
        }
    };
});