/**
 * Created by Tieiririyi on 2016-01-24.
 */
//Meteor.startup(function () {


    Meteor.startup(function () {

        if (Ledtypes.find().count() ===0){
            var ledtypes = [
                {
                    'type':'PAR38'
                },
                {
                    'type':'PAR30'
                }
                ,
                {
                    'type':'PAR20'
                }
                ,
                {
                    'type':'GU10'
                }
                ,
                {
                    'type':'DE26'
                },
                {
                    'type':'MR16'
                }
            ];
            for (var i = 0; i < ledtypes.length; i++) {
                Ledtypes.insert(ledtypes[i]);
            }
        }
        //Categories.remove({});
        if (Categories.find().count() === 0) {

            var categories = [
                {
                    'categoryName': 'LED bulbs',
                    'categoryDescription': 'Amazing LED light bulbs.',
                    'picture':'',
                    'pictureURL':''
                },
                {
                    'categoryName': 'Fixtures',
                    'categoryDescription': 'Premium Design.',
                    'picture':'',
                    'pictureURL':''
                },
                {
                    'categoryName': 'LED Signs',
                    'categoryDescription': 'Customized LED Signs.',
                    'picture':'',
                    'pictureURL':''
                }
            ];

            for (var i = 0; i < categories.length; i++) {
                Categories.insert(categories[i]);
            }
        }

        // Images.find().forEach(function(images){
        //  Images.remove({_id: images._id});
        //  });

        //Orders.remove({});
        //Products.remove({});
        if (Products.find().count() === 0) {
            var id = Categories.findOne({"categoryName": "LED bulbs"})._id;
                for (var i = 1; i<=16;i++){
                    var itemNum = "DPAR38-16WT(S" + i + ")"
                    Products.insert(
                        {
                            "itemNum": itemNum,
                            "size1": 122,
                            "size2": 135,
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
                            "discount_pct": 10,
                            "status": true,
                            "ledtype":""
                        }
                    );
             }
        }
        //     // Products.insert(
        //     //     {
        //     //         "itemNum": "DPAR38-16WT(S2)",
        //     //         "size": "122*135mm",
        //     //         "socket": "E26",
        //     //         "power": 16,
        //     //         "brightness": 1250,
        //     //         "temperature": 3000,
        //     //         "Ra": ">=80",
        //     //         "voltage": "100-130",
        //     //         "beam_angle": 120,
        //     //         "life_time": 50000,
        //     //         "power_factor": ">=0.9",
        //     //         "dimmable": "yes",
        //     //         "housing": "aluminum",
        //     //         "colour": "silver",
        //     //         "cover": "glass lens",
        //     //         "certification": ["CE", "ETL"],
        //     //         "categoryId": id,
        //     //         "picture": "",
        //     //         "price": 10.99,
        //     //         "quantityInStock": 100,
        //     //         "quantityOnHold": 10,
        //     //         "discount_pct": 0.1
        //     //     },
        //     // );
        //     // Products.insert(
        //     //     {
        //     //         "itemNum": "DPAR38-16WT(S2)",
        //     //         "size": "122*135mm",
        //     //         "socket": "E27",
        //     //         "power": 16,
        //     //         "brightness": 1250,
        //     //         "temperature": 3000,
        //     //         "Ra": ">=80",
        //     //         "voltage": "100-130",
        //     //         "beam_angle": 120,
        //     //         "life_time": 50000,
        //     //         "power_factor": ">=0.9",
        //     //         "dimmable": "yes",
        //     //         "housing": "aluminum",
        //     //         "colour": "silver",
        //     //         "cover": "glass lens",
        //     //         "certification": ["CE", "ETL"],
        //     //         "categoryId": id,
        //     //         "picture": "",
        //     //         "price": 10.99,
        //     //         "quantityInStock": 100,
        //     //         "quantityOnHold": 10,
        //     //         "discount_pct": 0
        //     //     }
        //     // );
        // }

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

            Roles.setUserRoles(Meteor.users.findOne({"profile.name": "super-admin"})._id, ["super-admin"], 'led');
        }

    });

