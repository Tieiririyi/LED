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
    this.setCart = function(){
        var cart = store.get('cart');
        return cart.map(function(item){
            var product = Products.findOne({_id: item.productId});
            return {
                info: product,
                categoryName: Categories.findOne({_id: product.categoryId}).categoryName,
                orderQuantity: parseInt(item.quantity)
            };
        });
    }
    this.setCartTotal = function(cart){
        var total = 0;
        
        cart.forEach(function(item){
            total = total + (parseFloat(item.info.price) * (1 - parseFloat(item.info.discount_pct))) * parseInt(item.orderQuantity);
        });
        return total;
    }
});



angular.element(document).ready(onReady);







