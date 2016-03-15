/**
 * Created by Tieiririyi on 2016-01-12.
 */
angular.module('led',[
    'angular-meteor',
    'ui.router', 
    'ngMaterial',
    'ngFileUpload',
    'accounts.ui',
    'angular-storage']);

function onReady(){

    angular.bootstrap(document,['led'],{
        strictDI: true
    });
}

angular.module('led').service('updateCart', function(store, $rootScope) {

    this.cart_items = function(){
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
    };

});



angular.element(document).ready(onReady);







