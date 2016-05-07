/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('users', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/users.html',
        controllerAs:'usersCtrl',
        controller: function ($scope, $state, $meteor, $reactive, store, $rootScope, updateCart, $stateParams){
            $reactive(this).attach($scope);
            //this.subscribe('users');
            this.subscribe('orders');

            //this.error = 'bye';

            this.login = (user) => {
                Meteor.loginWithPassword(user.email, user.password, (err) => {
                    if (err){
                        this.success = null;
                        this.error = err.reason;
                    }
                    else {
                        var user = Orders.findOne({userId: Meteor.userId(), status: "not ordered"});

                        if (store.get('cart').length > 0){
                            if (user != null){
                                user.order = store.get('cart');
                                Meteor.call('updateOrders', Meteor.userId(), user._id, store.get('cart'), "not ordered", function(error, result){
                                    if (error){
                                        console.log(error);
                                    }
                                });
                            }
                            else{
                                Meteor.call('insertOrders', Meteor.userId(), store.get('cart'), "not ordered", function(error, result){
                                    if (error){
                                        console.log(error);
                                    }
                                });
                            }
                        }
                        else if(store.get('cart').length == 0 && user != null){
                            store.set('cart', user.order);
                        }
                        
                        $rootScope.led.cart_items = updateCart.cart_items();

                        if ($state.params.redirect != undefined){
                            $state.go($state.params.redirect);
                        }
                        else{
                            $state.go('categories');
                        }
                    }
                });
            };

            this.forgot = (user) => {
                if (user != undefined){
                    if (user.email != undefined){
                        Accounts.forgotPassword({"email": user.email}, (err) => {
                            if (err){
                                this.success = false;
                                this.message = "Your password could not be reset because: " + err.reason;
                            }
                            else{
                                this.success = true;
                                this.message = "Please check your email for instructions to reset your password";
                            }
                            this.error = null;
                            $scope.$apply();
                        });
                    }
                }
            };
            this.createAccount = () => {
                if ($state.params.redirect != undefined){
                    $state.go('createAccount', {redirect: $state.params.redirect}, true);
                }
                else{
                    $state.go('createAccount');
                }
            };
        }
    };
});