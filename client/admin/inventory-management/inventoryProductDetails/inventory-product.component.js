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

            this.helpers({
                categories: ()=> {
                    return Categories.find({});
                },
                product: () => {
                    return Products.findOne({_id: $stateParams.prodId});
                },
                image: () => {
                    if (Products.findOne({_id: $stateParams.prodId}).picture != undefined){
                        return Images.findOne({"_id": Products.findOne({_id: $stateParams.prodId}).picture});
                    }
                }
            });

            this.submit = () => {

                var imageID = (this.product.picture == ""? "": this.product.picture);
                console.log(this.new_picture, imageID);
                //add image
                if (this.new_picture.length > 0){
                    if (imageID != ""){
                        Images.remove({_id: imageID});
                    }
                    imageID = Images.insert(this.new_picture[0])._id;
                }

                Products.update({_id: this.product._id},
                    {
                        "itemNum": this.product.itemNum,
                        "size": this.product.size,
                        "socket": this.product.socket,
                        "power": this.product.power,
                        "brightness": this.product.brightness,
                        "temperature": this.product.temperature,
                        "Ra": this.product.Ra,
                        "voltage": this.product.voltage,
                        "beam_angle": this.product.beam_angle,
                        "life_time": this.product.life_time,
                        "power_factor": this.product.power_factor,
                        "dimmable": this.product.dimmable,
                        "housing": this.product.housing,
                        "colour": this.product.colour,
                        "cover": this.product.cover,
                        "certification": ["CE", "ETL"], /* need to update*/
                        "categoryId": this.product.categoryId,
                        "picture": imageID,
                        "price": this.product.price,
                        "quantityInStock": this.product.quantityInStock,
                        "quantityOnHold": this.product.quantityOnHold,
                        "discount_pct": this.product.discount_pct
                    });
                $location.path("/inventory");
            }
        }
    }
});
/*
 {
 "itemNum": "DPAR38-16WT(S2)",
 "size": "122*135mm",
 "socket": "E27",
 "power": 16,
 "brightness": 1250,
 "temperature": 3000,
 "Ra": ">=80",
 "voltage": "100-130",
 "beam_angle": 120,
 "life_time": 50000,
 "power_factor": ">=0.9",
 "dimmable": "yes",
 "housing": "aluminum",
 "colour": "silver",
 "cover": "glass lens",
 "certification": ["CE", "ETL"],
 "categoryId": id,
 "picture": "",
 "price": 10.99,
 "quantityInStock": 100,
 "quantityOnHold": 10,
 "discount_pct": 0
 }
 */