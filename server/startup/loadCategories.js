/**
 * Created by Tieiririyi on 2016-01-24.
 */
//Meteor.startup(function () {


    Meteor.startup(function () {
        if (Categories.find().count() === 0) {

            var categories = [
                {
                    'name': 'Dubstep-Free Zone',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'name': 'All dubstep all the time',
                    'description': 'Get it on!'
                },
                {
                    'name': 'Savage lounging',
                    'description': 'Leisure suit required. And only fiercest manners.'
                }
            ];

            for (var i = 0; i < categories.length; i++) {
                Categories.insert(categories[i]);
            }
        }
    });
