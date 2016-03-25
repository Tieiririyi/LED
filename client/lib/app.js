/**
 * Created by Tieiririyi on 2016-01-12.
 */
angular.module('led',[
    'angular-meteor',
    'ui.router', 
    // 'ngMaterial',
    'ngFileUpload',
    'accounts.ui',
    'angular-storage',
    'angularUtils.directives.dirPagination']);
/*
myApp.config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('path/to/dirPagination.tpl.html');
});
*/
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


    this.setCartTotal = function(cart){
        var total = 0;
        
        cart.forEach(function(item){
            total = total + (parseFloat(item.info.price) * ((100 - parseFloat(item.info.discount_pct))/100)) * parseInt(item.orderQuantity);
        });
        return total;
    }
});



angular.element(document).ready(onReady);







