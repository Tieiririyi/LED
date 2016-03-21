/**
 * Created by Tieiririyi on 2016-01-24.
 */
angular.module('led').directive('led', function () {
    return {
        restrict: 'E',
        templateUrl:'client/led/led.html',

        controllerAs: 'led',
        controller: function ($scope, $reactive, $location, store, updateCart) {
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
                this.cart_items = updateCart.cart_items();
                $location.path('/categories');
            };

            this.helpers({
                current_user: ()=> {
                    return Meteor.userId();
                },
                cart_items: () =>{
                    return updateCart.cart_items();
                }
            });
            
        }
    };
});