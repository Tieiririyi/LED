/**
 * Created by Tieiririyi on 2016-02-07.
 */

Products = new Mongo.Collection("products");

Meteor.methods({
    setCart: function(){
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
});