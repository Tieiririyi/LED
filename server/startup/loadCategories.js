/**
 * Created by Tieiririyi on 2016-01-24.
 */
//Meteor.startup(function () {


    Meteor.startup(function () {
        //Categories.remove({});
        if (Categories.find().count() === 0) {

            var categories = [
                {
                    'categoryName': 'Dubstep-Free Zone',
                    'categoryDescription': 'Fast just got faster with Nexus S.'
                },
                {
                    'categoryName': 'All dubstep all the time',
                    'categoryDescription': 'Get it on!'
                },
                {
                    'categoryName': 'Savage lounging',
                    'categoryDescription': 'Leisure suit required. And only fiercest manners.'
                }
            ];

            for (var i = 0; i < categories.length; i++) {
                Categories.insert(categories[i]);
            }
        }

        //Products.remove({});
        if (Products.find().count() === 0) {
            var id = Categories.findOne({"categoryName": "Dubstep-Free Zone"})._id;
            for (var i = 0; i < 5; i++) {
                Products.insert(
                    {
                        'productName': 'product' + i,
                        'productDescription': 'description' + i,
                        'categoryName': "Dubstep-Free Zone",
                        'categoryId': id,
                        'stock': 1
                    }
                );
                //console.log(Products.findOne({"productName": "product" + i}));
            }
        }

    });
