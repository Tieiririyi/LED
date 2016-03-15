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

        /*Images.find().forEach(function(images){
            Images.remove({_id: images._id});
        });*/

        //Products.remove({});
        if (Products.find().count() === 0) {
            var id = Categories.findOne({"categoryName": "Dubstep-Free Zone"})._id;
            for (var i = 0; i < 5; i++) {
                Products.insert(
                    {
                        'productName': 'product' + i,
                        'productDescription': 'description' + i,
                        'categoryId': id,
                        'power': "90 - 1000",
                        'brightness': 490,
                        'colours': ['blue', 'white'],
                        'dimmable': true,
                        'certification': {"cert1": true, "cert2": false},
                        'quantityInStock': 10,
                        'quantityOnHold': 1,
                        'price': 10.99,
                        'primaryPic': '/',
                        'otherPics': []
                    }
                );
                //console.log(Products.findOne({"productName": "product" + i}));
            }
        }
        /*if (Meteor.users().findOne({email: "superuser@led.com"}) == null){
            Accounts.createUser({
                email: "superuser@led.com",
                password: "superuser",
                profile: {
                    name: "superuser",
                    role: "superuser"
                }
            });
        }*/

        //Orders.remove({});

    });
