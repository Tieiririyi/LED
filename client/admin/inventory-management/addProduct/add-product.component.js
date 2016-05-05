/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('addProduct', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/inventory-management/addProduct/add-product.html',
        controllerAs:'addProduct',
        controller: function ($scope,$meteor, $stateParams, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('ledtypes');
            this.subscribe('categories');

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                    
                },
                images: () => {
                    return Images.find();
                },
                ledtypes: () => {
                    return Ledtypes.find({});
                }
            });

            this.submit = (product) => {

                var imageID = "";
                if (product.picture != undefined){
                    imageID = Images.insert(product.picture[0])._id;
                }

                //update certification
                var certs = [];
                if (this.cert.CE == true){
                    certs.push("CE");
                }
                if (this.cert.ETL == true){
                    certs.push("ETL");
                }
                if (this.cert.ES == true){
                    certs.push("energy_star");
                }

                product.quantityOnHold = 0;
                product.status = true;
                product.certification = certs;
                product.picture = imageID;
                Products.insert(product);
                
                $location.path("/admin/inventory");
            };
            
        }
    };
});