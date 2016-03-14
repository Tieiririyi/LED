/**
 * Created by Tieiririyi on 2016-01-24.
 */
angular.module('led').directive('led', function () {
    return {
        restrict: 'E',
        templateUrl:'client/led/led.html',

        controllerAs: 'led',
        controller: function ($scope, $reactive, $location, store) {
            $reactive(this).attach($scope);
            if (store.get('cart') == null){
                store.set('cart', []);
            }
            this.login = () =>{
                Meteor.loginWithPassword;
            };

            this.logout = () => {
                store.set('cart', []);
                Meteor.logout();
                $location.path('/categories');
            };

            this.helpers({
                current_user: ()=> {
                    return Meteor.userId();
                },
                cart_items: () =>{
                    var cart = store.get('cart');
                    if (cart.length > 0){
                        return cart.map(function(item){
                           return parseInt(item.quantity); 
                        }).reduce(function(a, b){
                            return a + b;
                        });
                    }
                    else{
                        return 0;
                    }
                }
            });
        }
    };
});