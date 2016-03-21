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
            Products.insert(
                {
                    "itemNum": "DPAR38-16WT(S2)",
                    "size": "122*135mm",
                    "socket": "E26",
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
                    "discount_pct": 0.1
                },
            );
            Products.insert(
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
            );
        }

        if (Meteor.roles.findOne({name: "super-admin"}) == undefined){
            Accounts.createUser({
                email: "super.admin@led.com",
                password: "12345678",
                profile: {
                    name: "super-admin",
                    status: "active"
                }
            });
            //        Roles.setUserRoles(targetUserId, roles, group);

            Roles.setUserRoles(Meteor.users.findOne({"profile.name": "super-admin"})._id, ["super-admin"], "localhost");
        }

    });

