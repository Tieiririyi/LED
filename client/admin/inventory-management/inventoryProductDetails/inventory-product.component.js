/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('inventoryProductDetails', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/inventoryProductDetails/inventory-product.html',
        controllerAs:'inventoryProductDetails',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('products');
            this.subscribe('categories');
            this.subscribe('images');
            this.subscribe('ledtypes');
            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                },
                product: () => {
                    return Products.findOne({_id: $stateParams.prodId});
                },
                certification: () => {
                    return {
                        CE: this.product.certification.indexOf("CE") != -1? true : false,
                        ETL: this.product.certification.indexOf("ETL") != -1? true : false,
                        ES: this.product.certification.indexOf("energy_star") != -1? true : false
                    };
                },
                image: () => {
                    if (Products.findOne({_id: $stateParams.prodId}).picture != undefined){
                        return Images.findOne({"_id": Products.findOne({_id: $stateParams.prodId}).picture});
                    }
                },
                ledtypes: ()=>{
                    return Ledtypes.find({});
                }
            });

            this.submit = () => {

                var imageID = (this.product.picture == ""? "": this.product.picture);

                //add image
                if (this.new_picture != undefined){
                    if (imageID != ""){
                        Images.remove({_id: imageID});
                    }
                    imageID = Images.insert(this.new_picture[0])._id;
                }

                //update certification
                var certs = [];
                if (this.certification.CE == true){
                    certs.push("CE");
                }
                if (this.certification.ETL == true){
                    certs.push("ETL");
                }
                if (this.certification.ES == true){
                    certs.push("energy_star");
                }

                this.product.certification = certs;
                this.product.picture = imageID;

                //Products.update({_id: this.product._id}, this.product);
                //updateInventory: function(userId, productId, product)
                Meteor.call('updateInventory', Meteor.userId(), this.product._id, this.product, function(){
                    //window.location.href = Meteor.absoluteUrl('admin/inventory');

                });
                $location.path("/admin/inventory");
            }
        }
    }
});
